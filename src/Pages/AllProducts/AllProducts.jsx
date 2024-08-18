import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Card";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("dateNewestFirst");

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, brand, category, priceRange, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          params: {
            page: currentPage,
            limit: 8,
            search: searchTerm,
            brand,
            category,
            priceMin: priceRange.min,
            priceMax: priceRange.max,
            sortBy,
          },
        }
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when a new search is initiated
    fetchProducts(); // Trigger the search
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1 className="text-center font-nunito font-medium text-3xl md:text-5xl my-5">All Products</h1>
      <div className="my-5 mx-auto max-w-lg">
        <div className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} aria-label="Search" className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex flex-col md:flex-row gap-4 justify-center my-5 px-4">
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select select-bordered w-full md:w-auto">
          <option value="">All Brands</option>
          <option value="TechBrand">TechBrand</option>
          <option value="HomeTech">HomeTech</option>
          <option value="FitTech">FitTech</option>
          <option value="AudioTech">AudioTech</option>
          <option value="EcoBrand">EcoBrand</option>
          <option value="FashionBrand">FashionBrand</option>
          <option value="BeautyTech">BeautyTech</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full md:w-auto">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fitness">Fitness</option>
          <option value="beauty">Beauty</option>
          <option value="accessories">Accessories</option>
        </select>

        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="number"
            placeholder="Min Price"
            className="input input-bordered w-full md:w-auto"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="input input-bordered w-full md:w-auto"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
        </div>
      </div>

      {/* Sorting Options */}
      <div className="flex justify-center my-5 px-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered w-full md:w-auto"
        >
          <option value="dateNewestFirst">Date: Newest First</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="grid gap-5 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      <h2 className="my-4 text-center">Total Products: {products.length}</h2>
      <div className="flex justify-center my-5 px-4">
        <div className="join">
          <button
            className="join-item btn"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              className={`join-item btn ${
                currentPage === pageNumber + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            className="join-item btn"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
