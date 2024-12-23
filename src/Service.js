export const OrdersService = {
     getPreviousOrders : (orders) =>{
        return orders.filter((ord)=> ord.isPaymentCompleted===true);
      },
       // getCart
   getCart : (orders) =>{
    return orders.filter((ord)=> ord.isPaymentCompleted===false);
  },
};

export  const ProductsService = {
    getProductByproductId : (products,productId) =>{
      return  products.find((prod)=> prod.id == productId);
    },

   fetchProducts : async()=> {
   return await fetch("http://localhost:5000/products",{method:"GET",});
   },
}