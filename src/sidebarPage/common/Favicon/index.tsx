import React from "react";

type FaviconProps = {
  url: string;
  favIconUrl?: string;
};

function getFaviconBackgroundImageByGeneralUrl(url: string) {
  return `-webkit-image-set(url("chrome://favicon/size/16@1x/${url}") 1x, url("chrome://favicon/size/16@2x/${url}") 2x)`;
}

function render(favIconBackgroundImage: string) {
  return (
    <div
      className="favicon"
      style={{
        backgroundImage: favIconBackgroundImage,
        height: "16px",
        width: "16px",
        minWidth: "16px",
        backgroundSize: "16px",
      }}
    />
  );
}

function Favicon({ url, favIconUrl }: FaviconProps) {
  if (favIconUrl) {
    return render(`url("${favIconUrl}")`);
  }

  return render(getFaviconBackgroundImageByGeneralUrl(url));
}

export default Favicon;
