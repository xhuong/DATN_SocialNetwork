export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.2)",
      }}
    >
      <span
        style={{
          fontSize: "24px",
          color: "#ffffff",
        }}
      >
        Loading...
      </span>
    </div>
  );
}
