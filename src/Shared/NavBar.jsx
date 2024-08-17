import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import { toast } from "react-toastify";

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);
    const logOutToast = () => toast("User Logged out Successfully");
    const handleLogOut = () => {
      logOut()
        .then(() => {
          logOutToast();
        })
        .catch();
    };

  const navLinks = (
    <>
      <li id="nav-link">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li id="nav-link">
        <NavLink to={"/listed"}>All Products</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 font-workSans lg:my-12 my-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to={'/'}>
          <button className="btn btn-ghost text-3xl font-bold text-nowrap">
            Khan Shop
          </button>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-normal text-lg">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end lg:flex gap-4 ">
        {user ? (
          <div
            className="avatar p-4 tooltip tooltip-bottom"
            data-tip={user.displayName}
          >
            <div className="md:w-12 w-8 rounded-full">
              <img src={user.photoURL} />
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="md:btn sm:btn-sm md:glass hover:bg-gray-700 p-1 hover:text-white text-black md:rounded-3xl rounded-xl content-center"
          >
            Log In
          </Link>
        )}
        {user ? (
          <button
            onClick={handleLogOut}
            className="md:btn sm:btn-sm md:glass  hover:bg-red-950 hover:text-red-100 text-black md:rounded-3xl rounded-xl content-center"
          >
            Log Out
          </button>
        ) : (
          <Link
            to={"/register"}
            className="md:btn sm:btn-sm md:glass hover:bg-gray-700 p-1 hover:text-white text-black md:rounded-3xl rounded-xl content-center"
          >
            Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
