import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Shared/Card";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data using Axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`
        );
        setProducts(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>All Products Show Here</h1>
      <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} product={product}></Card>
        ))}
      </div>
      <h2 className="my-4 text-center">Total Products: {products.length}</h2>
    </>
  );
};

export default AllProducts;
