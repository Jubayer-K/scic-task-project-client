import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../Shared/Card";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data using Axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-products`
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
      <h1 className="text-center md:text-3xl text-xl my-3">Start Shopping</h1>

      <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-3">
      {products.slice(0, 8).map((product) => (
        <Card key={product.id} product={product} />
      ))}
      </div>
    </>
  );
};

export default Home;
