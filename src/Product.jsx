import React, { useState } from 'react'

function Product(props) {
  let [prod] = useState(props.product)
  return (
    <div className='col-lg-6'>
      <div className='card m-1'>
        <div className='card-body'>
          <h5>
            <i class="bi bi-arrow-right-short"></i>{prod?.productName}
            </h5>
          <div>${prod.price.toFixed(2)}</div>
          <div className='mt-2 text-muted' >#{prod?.brand?.brandName} #{prod?.category?.category}</div>
          <div>
            {[...Array(prod.rating).keys()].map((n)=>{
              return <i class="bi bi-star-fill text-warning" key={n}></i>
            })}
            {[...Array(5-prod.rating).keys()].map((n)=>{
              return <i class="bi bi-star text-warning" key={n}></i>
            })}
          </div>
          <div className='float-right'>
            {prod.isOrdered ? (
              <span className='text-primary'>Added to Cart!</span>
            ):(
                <button className='btn btn-sm btn-primary' onClick={()=>{props.onAddToCartClick(prod)}}><i class="bi bi-cart-plus"></i>{" "}Add to Cart</button>
            )}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Product