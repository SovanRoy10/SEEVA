import { topDealUsers } from "../../data";
import styles from "./TopBox.module.css";

const TopBox = () => {
  return (
    <div className={styles.topBox}>
      <h1>Top Deals</h1>
      <div className={styles.list}>
        {topDealUsers.map((user) => (
          <div className={styles.listItem} key={user.id}>
            <div className={`${styles.user} flex gap-5`}>
              <img src={user.img} alt="" className="xl:block hidden" />
              <div className={styles.userTexts}>
                <span className={styles.username}>{user.username}</span>
                <span className={`${styles.email} xl:block hidden`}>
                  {user.email}
                </span>
              </div>
            </div>
            <span className={styles.amount}>${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
