import React from "react";

import "./index.scss";

type TopButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function TopButton({ onClick }: TopButtonProps) {
  return (
    <div id="top-button-container">
      <button
        type="button"
        onClick={onClick}
        style={{ background: "none", border: "none" }}
      >
        <img
          className="arrow-img"
          alt="arrow"
          src="/img/arrow-down.svg"
          style={{ width: "25px", transform: "rotate(180deg)" }}
        />
      </button>
    </div>
  );
}

export default TopButton;
