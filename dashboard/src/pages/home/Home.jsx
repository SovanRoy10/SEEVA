import styles from "./Home.module.css";
import TopBox from "../../components/topBox/TopBox";
import ChartBox from "../../components/chartBox/ChartBox";
import { chartBoxUser } from "../../data";


export default function Home() {
  return (
    <div className={styles.home}>
      <div className={`${styles.box1} ${styles.box}`}>
        <TopBox />
      </div>
      <div className={`${styles.box2} ${styles.box}`}>
        <ChartBox {...chartBoxUser} />
      </div>
      <div className={`${styles.box3} ${styles.box}`}>
        {/* <ChartBox {...chartBoxProduct} /> */}
      </div>
      <div className={`${styles.box4} ${styles.box}`}>
        {/* <PieChartBox /> */}
      </div>
      <div className={`${styles.box5} ${styles.box}`}>
        {/* <ChartBox {...chartBoxConversion} /> */}
      </div>
      <div className={`${styles.box6} ${styles.box}`}>
        {/* <ChartBox {...chartBoxRevenue} /> */}
      </div>
      <div className={`${styles.box7} ${styles.box}`}>
        {/* <BigChartBox /> */}
      </div>
      <div className={`${styles.box8} ${styles.box}`}>
        {/* <BarChartBox {...barChartBoxVisit} /> */}
      </div>
      <div className={`${styles.box9} ${styles.box}`}>
        {/* <BarChartBox {...barChartBoxRevenue} /> */}
      </div>
    </div>
  );
}
