import styles from "./Navbar.module.css"; // Import the CSS module
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <button href="#_" class="relative inline-block px-4 py-2 font-medium group">
          <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span class="relative text-black group-hover:text-white">
           Login
          </span>
        </button>
        <div className={styles.user}>
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt="profile image"
          />
          <span>Sovan</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
