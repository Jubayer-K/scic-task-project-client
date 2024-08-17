import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProviders";

const Register = () => {
  const successToast = () => toast.success("User created Successfully");
  const errorToast = () => toast.error("User creation Unsuccessful !");
  const passErrorToast = (toastText) => toast.error(toastText);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    console.log(name, email, password);
    setRegisterError("");
    setSuccess("");
    if (password.length < 6) {
      passErrorToast("Length must be at least 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      passErrorToast("Must have an Uppercase letter in the password");
      return;
    } else if (!/[a-z]/.test(password)) {
      passErrorToast("Must have a Lowercase letter in the password");
      return;
    }

    createUser(email, password, name, photoURL)
      .then(() => {
        setSuccess("User created Successfully");
        successToast();
      })
      .catch((error) => {
        setRegisterError(error.message);
        errorToast("User creation Unsuccessful !");
      });
  };
  return (
    <div>
      <h1 className="md:text-6xl text-3xl text-center md:my-10">Register</h1>
        <div className=" flex flex-col lg:flex-row justify-center items-center mx-auto">
          <div className="bg-white dark:bg-gray-500 dark:text-white p-8 rounded-lg shadow-md md:w-2/3 w-96 mx-auto">
            <div className="min-h-60 bg-contain bg-no-repeat bg-center flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl font-semibold mb-4">Create an Account</h2>
            </div>
            <form className="md:max-w-lg mx-auto" onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="photoURL" className="block mb-2">
                  Photo URL
                </label>
                <input
                  required
                  type="text"
                  id="photoURL"
                  name="photoURL"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <span
                  className="cursor-pointer text-2xl absolute right-5 bottom-2 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEyeSlash></FaRegEyeSlash>
                  ) : (
                    <FaRegEye></FaRegEye>
                  )}
                </span>
              </div>
              <button
                type="submit"
                className="bg-gray-500 text-white btn glass rounded-3xl hover:bg-gray-800"
              >
                Register
              </button>
            </form>
            {registerError && (
              <p className="my-2 text-sm text-red-800">{registerError}</p>
            )}
            {success && (
              <p className="my-2 text-sm text-green-700">{success}</p>
            )}
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to={"/login"} className="text-gray-800 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
    </div>
  );
};

export default Register;
