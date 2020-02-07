import React from "react";

type CollapseToggleProps = {
  isOpen: boolean;
  onChange?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function CollapseToggle({ isOpen, onChange }: CollapseToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      style={{ background: "none", border: "none" }}
    >
      {isOpen ? (
        <img
          alt="arrow"
          src="/img/arrow-down.svg"
          style={{ width: "16px", transform: "rotate(180deg)" }}
        />
      ) : (
        <img alt="arrow" src="/img/arrow-down.svg" style={{ width: "16px" }} />
      )}
    </button>
  );
}

export default CollapseToggle;
