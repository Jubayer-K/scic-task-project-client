import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Root = () => {
    return (
        <div className="font-poppins dark:bg-gray-800 dark:text-white">
            <Outlet></Outlet>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Root;