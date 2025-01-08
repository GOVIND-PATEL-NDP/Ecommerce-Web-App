export const OrdersService = {
  getPreviousOrders: (orders) => {
      return orders.filter((ord) => ord.isPaymentCompleted === true);
  },
  getCart: (orders) => {
      return orders.filter((ord) => ord.isPaymentCompleted === false);
  },
};
const env_Var =  process.env. REACT_APP_BackendUrl;


export const ProductsService = {
  getProductByProductId: (products, productId) => {
      return products.find((prod) => prod.id == productId);
  },
  fetchProducts: () => {
      return fetch(`${env_Var}/products`, {
          method: "GET",
      });
  },
};

export const BrandsService = {
  fetchBrands: async()=> {
      return await fetch(`${env_Var}/brands`, {
          method : "GET",
      })
  },
  getBrandByBrandId : (brands, brandId) =>{
      return brands.find((brand) =>(brand.id == brandId));
  }
};
export const CategoriesService = {
  fetchCategories: ()=> {
      return fetch(`${env_Var}/categories`, {
          method : "GET",
      })
  },
  
  getCategoryByCategoryId: (categories, categoryId) => {
      return categories.find((category) => (category.id == categoryId));
  }

 
}
;
export const SortService = {
  getSortedArray : (elements, sortBy, sortOrder) => {
      if(!elements)
          return elements;
      let array = [...elements];

      array.sort((a,b)=>{
          // a = cat
          // b = dog
          //c = 99
          // d= 100
          // return 99-100 = -1
          // a comes first, and then b
          // cat comes first; and then dog
          if(a[sortBy] && b[sortBy])
          return a[sortBy].toString().toLowerCase()-b[sortBy].toString().toLowerCase();

          else 
          return 0;
      });
      if(sortOrder === "DESC")
          array.reverse();
      return array;
  }
}