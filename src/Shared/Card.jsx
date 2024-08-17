/* eslint-disable react/prop-types */

const Card = ({ product }) => {
  const {
    Product_Name,
    Product_Image,
    Price,
    Ratings,
    Description,
    Category,
    date,
  } = product;
  return (
    <>
      <div className="card bg-base-100 w-full shadow-xl">
        <figure>
          <img src={Product_Image} alt="Product image" className=" p-4 md:w-64 md:h-64 object-cover" />
        </figure>
        <div className="card-body">
        <p className="text-sm">Date: {new Date(date).toLocaleString()}</p>
          <h2 className="card-title">
            {Product_Name}
            <div className="badge badge-secondary">{Ratings}</div>
          </h2>
          <p>{Description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline text-green-700 hover:bg-green-700 hover:text-white">
              ${Price}
            </div>
            <div className="badge badge-outline">{Category}</div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
