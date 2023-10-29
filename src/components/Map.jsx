import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map({ data }) {
  const margin = { top: 20, bottom: 20, left: 60, right: 30 };
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTV1ZzUwMDJwdzJrb2w0dXRmc2d0In0.p6GGlfyV-WksaDV_KdN27A",
  });

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      style={{ background: "gray" }}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}></g>
    </svg>
  );
}

export default Map;
