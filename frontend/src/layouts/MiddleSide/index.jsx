import YourThink from "@/components/YourThink";

import styles from "./index.module.scss";

function MiddleSide() {
  return (
    <div className={styles.middleSide}>
      <YourThink />
      <ul>
        <li
          style={{
            marginBottom: "8px",
            background: "#d3d3d3",
            height: "300px",
            width: "100%",
          }}
        ></li>
        <li
          style={{
            marginBottom: "8px",
            background: "#d3d3d3",
            height: "300px",
            width: "100%",
          }}
        ></li>
        <li
          style={{
            marginBottom: "8px",
            background: "#d3d3d3",
            height: "300px",
            width: "100%",
          }}
        ></li>
        <li
          style={{
            marginBottom: "8px",
            background: "#d3d3d3",
            height: "300px",
            width: "100%",
          }}
        ></li>
        <li
          style={{
            marginBottom: "8px",
            background: "#d3d3d3",
            height: "300px",
            width: "100%",
          }}
        ></li>
      </ul>
    </div>
  );
}

export default MiddleSide;
