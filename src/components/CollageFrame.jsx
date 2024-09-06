import React from "react";

function CollageFrame({ layout, images }) {
  // Render frames based on layout
  switch (layout) {
    case "square":
      return (
        <div className="collage-frame square">{/* Render single image */}</div>
      );
    case "square-2":
      return (
        <div className="collage-frame square-2">{/* Render two images */}</div>
      );
    case "square-4":
      return (
        <div className="collage-frame square-4">{/* Render four images */}</div>
      );
    default:
      return null;
  }
}

export default CollageFrame;
