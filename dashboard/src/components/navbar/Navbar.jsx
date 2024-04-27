import styles from "./Navbar.module.css"; // Import the CSS module

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="logo.svg" alt="" />
        <span>SEEVA</span>
      </div>
      <div className={styles.icons}>
        {/* <img src="/search.svg" alt="" className={styles.icon} />
        <img src="/app.svg" alt="" className={styles.icon} />
        <img src="/expand.svg" alt="" className={styles.icon} />
        <div className={styles.notification}>
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div> */}
        <div className={styles.user}>
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Sovan</span>
        </div>
        <img src="/settings.svg" alt="" className={styles.icon} />
      </div>
    </div>
  );
};

export default Navbar;
