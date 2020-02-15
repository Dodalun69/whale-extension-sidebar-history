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
      style={{
        background: "none",
        border: "none",
        outline: "none !important",
        margin: "0px",
        padding: "0px",
        color: "var(--primary-light-color)",
        fontSize: "var(--primary-small-font-size)",
      }}
    >
      {isOpen ? `(닫기)` : `(열기)`}
    </button>
  );
}

export default CollapseToggle;
