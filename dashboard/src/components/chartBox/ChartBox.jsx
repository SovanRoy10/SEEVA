import styles from "./ChartBox.module.css";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

export default function ChartBox(props) {
  return (
    <div className={`${styles.chartBox}`}>
      <div className={styles.boxInfo}>
        <div className="flex gap-5">
          <img src={props.icon} alt="" />
          <span className="text-lg">{props.title}</span>
        </div>
        <h1 className="text-2xl font-bold">{props.number}</h1>
        <Link to="/" className={`text-[${props.color}]`}>
          View all
        </Link>
      </div>

      <div className={styles.chartInfo}>
        <div className={styles.chart}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.texts}>
          <span
            className={styles.percentage}
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className={styles.duration}>this month</span>
        </div>
      </div>
    </div>
  );
}
