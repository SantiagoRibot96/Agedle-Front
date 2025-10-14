import { Tooltip } from "react-tooltip";

const CivImg = (props) => {
  return (
    <div
      className={
        "container text-center mb-2 p-2 " +
        (props.isCorrect
          ? "correct"
          : "incorrect")
      }
    >
      <img
        id={`civImg-${props.name}`}
        key={props.name}
        src={"/units/" + props.name + "_AoE2.webp"}
        alt={props.name}
        className="civData mx-auto"
      />
      <p>{props.name}</p>
      <Tooltip
        anchorSelect={`#civImg-${props.name}`}
        place="bottom"
      >
        {props.name}
      </Tooltip>
    </div>
  );
}

export default CivImg