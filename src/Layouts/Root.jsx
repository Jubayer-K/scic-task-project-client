import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";

const Root = () => {
    return (
        <div className="font-poppins">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Root;