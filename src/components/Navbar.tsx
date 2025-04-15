import {
  Link,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import LogoLg from "../assets/logo-devlinks-large.svg";
import LogoSm from "../assets/logo-devlinks-small.svg";
import useResponsiveWidth from "../hooks/useResponsiveWidth";
import { useAuth } from "../auth";

const Navbar: React.FC = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: "/login" });
        });
      });
    }
  };
  const width = useResponsiveWidth();
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={width > 720 ? LogoLg : LogoSm}
            className={width > 720 ? "" : "w-8 h-8"}
            alt="devlinks"
          />
        </Link>
        <ul className="flex space-x-3 font-medium dark:bg-gray-800 md:dark:bg-gray-900">
          <li>
            <Link
              to="/"
              className="[&.active]:bg-[#6F5EE0] [&.active]:text-white [&.active]:focus:ring-4 
                [&.active]:focus:outline-none [&.active]:focus:ring-[#3b5998]/50 [&.active]:rounded-lg text-sm 
                lg:px-5 lg:py-2.5 
                px-2 py-1.5 h-8 w-8 lg:h-auto lg:w-auto // Adjusted padding and set height to 32px
                flex items-center justify-center // Center the icon vertically and horizontally
                [&.active]:dark:focus:ring-[#3b5998]/55 
                font-medium text-gray-900 dark:text-gray-800 hover:underline"
            >
              <svg
                className={`${location.pathname === "/" ? "text-white dark:text-gray-500" : "text-gray-800 dark:text-white"} w-5 h-5 lg:me-1`} // Adjusted margin for large screens
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                />
              </svg>
              <span className="hidden lg:block">Links</span>
            </Link>
          </li>
          <li>
            <Link
              to="/details"
              className="[&.active]:bg-[#6F5EE0] [&.active]:text-white [&.active]:focus:ring-4 
                [&.active]:focus:outline-none [&.active]:focus:ring-[#3b5998]/50 [&.active]:rounded-lg text-sm 
                lg:px-5 lg:py-2.5 
                px-2 py-1.5 h-8 w-8 lg:h-auto lg:w-auto // Adjusted padding and set height to 32px
                flex items-center justify-center // Center the icon vertically and horizontally
                [&.active]:dark:focus:ring-[#3b5998]/55 
                font-medium text-gray-900 dark:text-gray-800 hover:underline"
            >
              <svg
                className={`${location.pathname === "/details" ? "text-white dark:text-gray-500" : "text-gray-800 dark:text-white"} w-5 h-5 lg:me-1`} // Adjusted margin for large screens
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span className="hidden lg:block">Profile Details</span>
            </Link>
          </li>
          <li>
            <Link
              to="/preview"
              className="[&.active]:bg-[#6F5EE0] [&.active]:text-white [&.active]:focus:ring-4 
                [&.active]:focus:outline-none [&.active]:focus:ring-[#3b5998]/50 [&.active]:rounded-lg text-sm 
                lg:px-5 lg:py-2.5 
                px-2 py-1.5 h-8 w-8 lg:h-auto lg:w-auto // Adjusted padding and set height to 32px
                flex items-center justify-center // Center the icon vertically and horizontally
                [&.active]:dark:focus:ring-[#3b5998]/55 
                font-medium text-gray-900 dark:text-gray-800 hover:underline"
            >
              <svg
                className={`${location.pathname === "/preview" ? "text-white dark:text-gray-500" : "text-gray-800 dark:text-white"} w-5 h-5 lg:me-1`} // Adjusted margin for large screens
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span className="hidden lg:block">Preview</span>
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="text-gray-800 hover:text-gray-700 border border-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-yellow-400 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-yellow-500 dark:focus:ring-yellow-900"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
