import { Tooltip } from "react-tooltip";

const CivDetails = (props) => {
  return (
    <div className="container text-center mb-2 civ-container">
      <div className="row">
        <div className="col-1">
          <img
            id={`civImg-${props.name}`}
            key={props.name}
            src={"/civs/" + props.name + "_AoE2" + ".webp"}
            alt={props.name}
            className="civData mx-auto"
          />
          <Tooltip
            anchorSelect={`#civImg-${props.name}`}
            place="bottom"
          >
            {props.name}
          </Tooltip>
        </div>
        <div
          className={
            "col-2 civData " +
            (props.similarites.sameType === "partial"
              ? "partial"
              : props.similarites.sameType
              ? "correct"
              : "incorrect")
          }
          id="type"
        >
          <span className="align-center breakWord">
            {props.type}
          </span>
        </div>
        <div
          className={
            "col-2 civData " +
            (props.similarites.sameDlc
              ? "correct"
              : "incorrect")
          }
          id="dlc"
        >
          <span className="align-center">
            {props.dlc}
          </span>
        </div>
        <div
          className={
            "col-2 civData " +
            (props.similarites.sameUUType === "partial"
              ? "partial"
              : props.similarites.sameUUType
              ? "correct"
              : "incorrect")
          }
          id="UUType"
        >
          <span className="align-center breakWord">
            {props.UUType}
          </span>
        </div>
        <div
          className={
            "col-1 civData " +
            (props.similarites.sameHasFullBlacksmith
              ? "correct"
              : "incorrect")
          }
          id="hasFullBlacksmith"
        >
          <span className="align-center">
            {props.hasFullBlacksmith}
          </span>
        </div>
        <div
          className={
            "col-1 civData " +
            (props.similarites.sameHasRendemption
              ? "correct"
              : "incorrect")
          }
          id="hasRendemption"
        >
          <span className="align-center">
            {props.hasRendemption}
          </span>
        </div>
        <div
          className={
            "col-2 civData " +
            (props.similarites.sameArchitectureSet
              ? "correct"
              : "incorrect")
          }
          id="architectureSet"
        >
          <span className="align-center">
            {props.architectureSet}
          </span>
        </div>
        <div
          className={
            "col-1 civData " +
            (props.similarites.sameHasCannonGalleon
              ? "correct"
              : "incorrect")
          }
          id="hasCannonGalleon"
        >
          <span className="align-center">
            {props.hasCannonGalleon}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CivDetails