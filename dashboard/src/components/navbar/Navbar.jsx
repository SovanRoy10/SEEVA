import styles from "./Navbar.module.css"; // Import the CSS module
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin/logout`, {},{withCredentials : true});
      dispatch(logoutUser());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.data?.message || error.message);
    }
  };
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src="logo.svg" alt="" className="w-[35px]" />
        <span>
          <img src="/logoText.svg" alt="logotext" className="h-[50px]" />
          {/* SEEVA */}
        </span>
      </Link>
      <div className={styles.icons}>
        {!user && (
          <Link
            to={"/login"}
            className="relative inline-block px-4 py-2 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white">
              Login
            </span>
          </Link>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="relative inline-block px-4 py-2 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white">
              Logout
            </span>
          </button>
        )}
        {user && (
          <div className={styles.user}>
            <img src={user.profileImageUrl} alt="profile image" />
            <span>{user.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
