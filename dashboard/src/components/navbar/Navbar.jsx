import styles from "./Navbar.module.css"; // Import the CSS module
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <img src="logo.svg" alt="" className="w-[35px]" />
        <span>SEEVA</span>
      </Link>
      <div className={styles.icons}>
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
