import React, { useState, useEffect, useMemo } from "react";
import { ProductsService, BrandsService, CategoriesService, SortService } from "./Service";

function ProductsList() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("productName");
  const [sortOrder, setSortOrder] = useState("ASC");

  // Fetch data on component mount
  useEffect(() => {
    (async () => {
      const [brandsRes, categoriesRes, productsRes] = await Promise.all([
        BrandsService.fetchBrands(),
        CategoriesService.fetchCategories(),
        ProductsService.fetchProducts(),
      ]);

      const brandsData = await brandsRes.json();
      const categoriesData = await categoriesRes.json();
      const productsData = await productsRes.json();

      // Map products with category and brand
      const mappedProducts = productsData.map((product) => ({
        ...product,
        category: CategoriesService.getCategoryByCategoryId(categoriesData, product.categoryId),
        brand: BrandsService.getBrandByBrandId(brandsData, product.brandId),
      }));

      setBrands(brandsData);
      setProducts(mappedProducts);
    })();
  }, []);

  // Combined filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = products.filter(
      (product) =>
        (selectedBrand === "" || product.brand.brandName === selectedBrand) &&
        (product.productName.toLowerCase().includes(lowercasedSearch) ||
          product.brand.brandName.toLowerCase().includes(lowercasedSearch) ||
          product.category.category.toLowerCase().includes(lowercasedSearch))
    );

    return SortService.getSortedArray(filtered, sortBy, sortOrder);
  }, [products, search, selectedBrand, sortBy, sortOrder]);

  // Handle sorting column clicks
  const handleSortClick = (columnName) => {
    setSortBy(columnName);
    setSortOrder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));
  };

  // Render column headers
  const renderHeader = (columnName, displayName) => (
    <th>
      <button
        onClick={() => handleSortClick(columnName)}
        className="btn btn-link p-0 text-decoration-none"
      >
        {displayName}
        {sortBy === columnName && (
          <i className={`bi bi-arrow-${sortOrder === "ASC" ? "up" : "down"}`}></i>
        )}
      </button>
    </th>
  );

  return (
    <div className="row">
      <div className="col-12">
        <div className="row p-3 header">
          <div className="col-lg-3">
            <h4>
              <i className="bi bi-suitcase-lg"></i>
              &nbsp; Products &nbsp;
              <span className="badge badge-secondary">{filteredAndSortedProducts.length}</span>
            </h4>
          </div>
          <div className="col-lg-6">
            <input
              type="search"
              placeholder="Search"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-lg-3">
            <select
              className="form-control"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option value={brand.brandName} key={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="col-lg-10 mx-auto mb-2">
        <div className="card my-2 shadow">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  {renderHeader("productName", "Product Name")}
                  {renderHeader("price", "Price")}
                  {renderHeader("brand", "Brand")}
                  {renderHeader("category", "Category")}
                  {renderHeader("rating", "Rating")}
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.brand.brandName}</td>
                    <td>{product.category.category}</td>
                    <td>
                      {[...Array(5).keys()].map((n) => (
                        <i
                          key={n}
                          className={`bi ${n < product.rating ? "bi-star-fill" : "bi-star"
                            } text-warning`}
                        ></i>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
