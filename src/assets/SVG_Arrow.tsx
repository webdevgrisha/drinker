const SVG_Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    id="right-arrow"
    className="right-arrow"
  >
    <path
      id="primary"
      d="M3,12H21m-3,3,3-3L18,9"
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 1.5,
      }}
    />
  </svg>
);

export default SVG_Arrow;
