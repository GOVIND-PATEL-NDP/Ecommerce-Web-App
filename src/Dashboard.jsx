import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import Order from './Order';
import { OrdersService, ProductsService } from './Service';

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  let  [showOrderDeletedAlert, setShowOrderDeletedAlert] = useState(false);
  let [showOrderPlacedAlert,setShowOrderPlacedAlert] = useState(false);

  // Load data from database
  const loadDataFromDatabase = useCallback(async () => {
    try {
      let ordersResponse = await fetch(
        `http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
        { method: 'GET' }
      );

      if (ordersResponse.ok) {
        let ordersResponseBody = await ordersResponse.json();

        // Get all the data from products
        let productResponse = await ProductsService.fetchProducts();
        if (productResponse.ok) {
          let productsResponseBody = await productResponse.json();

          ordersResponseBody.forEach((order) => {
            order.product = ProductsService.getProductByproductId(
              productsResponseBody,
              order.productId
            );
          });

          setOrders(ordersResponseBody);
          console.log('Orders loaded:', ordersResponseBody);
        }
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }, [userContext.user.currentUserId]);

  // useEffect - Trigger on initial render and when userId changes
  useEffect(() => {
    console.log('Dashboard - eCommerce');
    loadDataFromDatabase();
  }, [loadDataFromDatabase]);

  // Buy Now Click Handler
  const onBuyNowClick = useCallback( async (orderId, userId, productId, quantity) => {
    if (window.confirm('Do you want to place order for this product?')) {
      let updateOrder = {
        id: orderId,
        productId: productId,
        userId: userId,
        quantity: quantity,
        isPaymentCompleted: true,
      };

      let ordersResponse = await fetch(
        `http://localhost:5000/orders/${orderId}`,
        { method: 'PUT' ,
          body : JSON.stringify(updateOrder),
          headers : {"Conteent-type":"application/json"}, 
        }
      );
      let ordersResponseBody = await ordersResponse.json(); 
      if (ordersResponse.ok) {
        
        console.log('Order placed:', ordersResponseBody);
        loadDataFromDatabase();
        setShowOrderPlacedAlert(true);
      }
    }
  },[loadDataFromDatabase]);

  // when the user clicks on delete button

  let onDeleteClick = useCallback(async(orderId) =>{
    if(window.confirm("Are you sure to delete this item from cart?")){
      let ordersResponse = await fetch(`http://localhost:5000/orders/${orders}/${orderId}`,
        {method : "DELETE"}
      );
          if (ordersResponse.ok)
          {
            let ordersResponseBody = await ordersResponse.json();
            console.log(ordersResponseBody);

            loadDataFromDatabase();
            setShowOrderDeletedAlert(true);
          }
    }
  },[loadDataFromDatabase]);

  return (
    <div className='row'>
      <div className='col-12 py-3 header'>
        <h1>
          <i className='bi bi-speedometer2'></i> Dashboard{' '}
          <button className='btn btn-sm btn-info' onClick={loadDataFromDatabase}>
            <i className='bi bi-arrow-clockwise'></i> Refresh
          </button>
        </h1>
      </div>
      <div className='col-12'>
        <div className='row'>
          {/* Previous Orders */}
          <div className='col-lg-6'>
            <h4 className='py-2 my-2 text-info border-bottom border-info'>
              <i className='bi bi-clock-history'></i> Previous Orders{' '}
              <span className='badge bg-info'>
                {OrdersService.getPreviousOrders(orders).length}
              </span>
            </h4>
            {showOrderPlacedAlert?(
              <div className='col-12'>
              <div
              className='alert alert-success alert-dismissible fade show mt-1'
              role='alert'
              >
                Your order has been placed.
                <button className='close' type='button' data-dismiss='alert'>
                  <span>&times</span>
                </button>
              </div>
              </div>
            ):("")}
            {showOrderDeletedAlert?(
              <div className='col-12'>
              <div
              className='alert alert-danger alert-dismissible fade show mt-1'
              role='alert'
              >
                Your order has been placed.
                <button className='close' type='button' data-dismiss='alert'>
                  <span>&times</span>
                </button>
              </div>
              </div>
            ):("")}
            {OrdersService.getPreviousOrders(orders).length === 0 ? (
              <div className='text-danger'>No Orders</div>
            ) : (
              OrdersService.getPreviousOrders(orders).map((ord) => (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                  onBuyNowClick={onBuyNowClick}
                  onDeleteClick={onDeleteClick}
                />
              ))
            )}
          </div>
          {/* Cart */}
          <div className='col-lg-6'>
            <h4 className='py-2 my-2 text-primary border-bottom border-primary'>
              <i className='bi bi-cart-plus'></i> Cart{' '}
              <span className='badge bg-info'>
                {OrdersService.getCart(orders).length}
              </span>
            </h4>
            {OrdersService.getCart(orders).length === 0 ? (
              <div className='text-danger'>No Products in your cart</div>
            ) : (
              OrdersService.getCart(orders).map((ord) => (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                  onBuyNowClick={onBuyNowClick}
                  onDeleteClick={onDeleteClick}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
