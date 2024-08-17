import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="text-center">
        <p className="text-3xl text-gray-200 mt-4 font-nunito">
          We&apos;re sorry, the page you are looking for cannot be found.
        </p>
        <Link to={"/"}>
          <button className="btn glass bg-transparent hover:bg-gray-800 text-white font-bold text-xl px-5 py-7 content-center border-none mt-10 font-nunito">
            Go Back to Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default Error;
