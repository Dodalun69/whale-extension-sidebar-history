import React from "react";

type CollapseToggleProps = {
  isOpen: boolean;
  onChange?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function CollapseToggle({ isOpen, onChange }: CollapseToggleProps) {
  return (
    <button type="button" onClick={onChange}>
      {isOpen ? "Close" : "Open"}
    </button>
  );
}

export default CollapseToggle;
