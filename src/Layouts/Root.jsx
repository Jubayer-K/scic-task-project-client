import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "../Shared/NavBar";

const Root = () => {
    return (
        <div className="font-poppins">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Root;