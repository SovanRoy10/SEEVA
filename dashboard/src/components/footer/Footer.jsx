import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link to="/" className="flex gap-2 items-center">
        <img src="logo.svg" alt="" className="w-[30px]" />
        <span>SEEVA</span>
      </Link>
      <span>© Seeva Admin Dashboard</span>
    </div>
  );
};

export default Footer;
