import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { BrandsService, CategoriesService, ProductsService } from './Service';
import Product from './Product';
import { event } from 'jquery';

function Store() {
    // get user content
    let [brands,setBrands] = useState([]);
    let [categories,setCategories] = useState([]);
    let [products,setProducts] = useState([]);
    let [productsToShow,setProductsToShow] = useState([]);
  let [search, setSearch] = useState("");
    let userContext = useContext(UserContext);
    const env_Var =  process.env. REACT_APP_BackendUrl;


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch brands
        let brandResponse = await BrandsService.fetchBrands();
        let brandsResponseBody = await brandResponse.json();
        brandsResponseBody.forEach((brand) => {
          brand.isChecked = true;
        });
        setBrands(brandsResponseBody);

        // Fetch categories
        let categoriesResponse = await CategoriesService.fetchCategories();
        let categoriesResponseBody = await categoriesResponse.json();
        categoriesResponseBody.forEach((category) => {
          category.isChecked = true;
        });
        setCategories(categoriesResponseBody);

        // Fetch products
        let productsResponse = await fetch(`${env_Var}/products?productName_like=${search}`, {
          method: "GET"
        });
        // let productsResponse = await ProductsService.fetchProducts();
        let productsResponseBody = await productsResponse.json();

        if (productsResponse.ok) {
          // Assign brands and categories to products
          const updatedProducts = productsResponseBody.map((product) => {
            const brand = BrandsService.getBrandByBrandId(brandsResponseBody, product.brandId) || { brandName: "Unknown Brand" };
            const category = CategoriesService.getCategoryByCategoryId(categoriesResponseBody, product.categoryId) || { category: "Unknown Category" };

            return {
              ...product,
              brand: brand,
              category: category,
              isOrdered: false,
            };
          });

          setProducts(updatedProducts);
          setProductsToShow(updatedProducts);
          document.title = "Store - eCommerce";
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    const filteredProducts = products.filter((prod) =>
      prod.productName.toLowerCase().includes(search.toLowerCase())
    );
    setProductsToShow(filteredProducts);
  }, [search, products]);
  
    // updateBrandIsChecked
    let updateBrandIsChecked = (id) => {
      let brandData = brands.map((brd)=>{
        if(brd.id == id) brd.isChecked = !brd.isChecked;
        return brd;
      });
      setBrands(brandData);
      updateProductsToShow();
    };
    // updateCategory is Checked
    let updateCategoryIsChecked = (id) => {
      let categoryData = categories.map((cat) => {
        if(cat.id == id)
           cat.isChecked = !cat.isChecked;
           return cat;
      });
      setCategories(categoryData);
      updateProductsToShow();
    };

    // updateProductsToShow
    let updateProductsToShow = () => {
      setProductsToShow(products
        .filter((prod) =>{
        return categories.filter((category) =>
       category.id === prod.categoryId && category.isChecked
        ).length>0;
      })
      .filter((prod)=>{
        return (
          brands.filter(
            (brand) => brand.id == prod.brandId && brand.isChecked
          ).length>0
        )
      })
    );
    };
    // When the user clicks on Add to Cart function
    let onAddToCartClick = (prod) =>{
       (async() =>{
        let newOrder = {
          userId : userContext.user.currentUserId,
          productId : prod.id,
          quantity : 1,
          isPaymentCompleted : false,
        };
        let orderResponse = await fetch(`${env_Var}/orders`,{
          method : "POST",
          body : JSON.stringify(newOrder),
          headers : {"Content-Type":"application/json"},
        });
        if(orderResponse.ok){
           let prods = products.map((p) => { if (p.id == prod.id) p.isOrdered = true 

             return p;
         });
          // isOrdered = true
          setProducts(prods);
          updateProductsToShow();

        }
        else {
          console.log(orderResponse);
          
        }
       })();
    }
  return (
    <div>
      <div className='row py-3 header'>
        <div className='col-lg-3'>
          <h4 className='fa fa-shopping-bag'><i class="bi bi-shop"></i>Store{"       "}
          <span className='badge badge-secondary'>
            {productsToShow.length}
          </span>
          </h4>
        </div>
        <div className='col-lg-9'>
          <input type='search' value={search} placeholder='Search' className='form-control' autoFocus="autoFocus" onChange={(event) =>{
            setSearch(event.target.value);
          }}/>
        </div>
      </div>
      <div className='d-flex'>
      <div>
          {/* // brands */}
      <div className='row'>
        <div className='col-lg-3 py-2'>
          <div className='my-2'>
            <h5>Brands</h5>
            {brands.map((brand)=>(<li
             className='list-group-item' key={brand.id}>
              <div className='form-check'>
                <input type='checkbox' className='form-check-input' value='true' 
                  checked={brand.isChecked} onChange={() => { updateBrandIsChecked(brand.id);}}
                id={`brand${brand.id}`}
                />
                <label 
                className='form-check-lable'
                htmlFor={`brand${brand.id}`}>
                  {brand.brandName}
                </label>
              </div>
            </li>))}
          </div>
        </div>
      </div>
          {/* // categories */}
      <div className='row'>
        <div className='col-lg-3 py-2'>
          <div className='my-2'>
            <h5>Categories</h5>
            {categories.map((category)=>(<li
             className='list-group-item' key={category.id}>
              <div className='form-check'>
                <input type='checkbox' className='form-check-input' value='true' 
                  checked={category.isChecked} onChange={() => { updateCategoryIsChecked(category.id)}}
                id={`category${category.id}`}
                />
                <label 
                className='form-check-lable'
                htmlFor={`category${category.id}`}>
                  {category.category}
                </label>
              </div>
            </li>))}
          </div>
        </div>
        
        
      </div>
      </div>
        <div className='col-lg-9 py-2'>
          <div className='row'>
            {productsToShow.map((prod) => (
              <Product key={prod.id} product={prod} onAddToCartClick={onAddToCartClick} />
            ))}
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default Store