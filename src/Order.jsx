import React from 'react'

const Order = (props)=>
     {
        console.log("Order rendered",props);
        
  return (
   
    <div className='card my-2 shadow'>
        <div className='card-body '>
        <div className='d-flex justify-content-between align-items-center'>
          <h6 className='mb-0'>
            <i className='bi bi-arrow-right'></i> {props.productName}
          </h6>
          {props.isPaymentCompleted === false && (
            <div>
              <button className='btn btn-sm btn-info mr-2' onClick={() =>{
                props.onBuyNowClick(
                    props.orderId,
                    props.userId,
                    props.productId,
                    props.quantity
                );
              }}>
                <i className='bi bi-truck'></i> Buy Now
              </button>
              <button className='btn btn-sm btn-danger'onClick={() =>{
                props.onDeleteClick(props.orderId)}}>
                <i className='bi bi-trash-fill'></i> Delete
              </button>
            </div>
          )}
        </div>
            <table className='table table-sm table-borderless mt-1'>
                <tbody>
                    <tr>
                        <td style={{width : "100px"}}>Quantity:</td>
                        <td>{props.quantity}</td>
                    </tr>
                    <tr>
                        <td style={{width : "100px"}}>Price:</td>
                        <td>${props.price}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
   
     
  )
}

export default React.memo(Order);