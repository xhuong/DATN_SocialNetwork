import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.2)",
      }}
    >
      <ReactLoading
        color={"var(--purple-color)"}
        height={"40px"}
        width={"40px"}
      />
    </div>
  );
}
