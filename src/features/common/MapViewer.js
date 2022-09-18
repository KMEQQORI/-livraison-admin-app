import React from "react";
import GoogleMapReact from "google-map-react";
import { GiPositionMarker } from "react-icons/all";
import { colors } from "../../css/colors";

export function MapViewer(props) {
  const { lat, lng } = props;

  return (
    <>
      <div>
        {lat}/{lng}
      </div>
      <GoogleMapReact
        defaultZoom={17}
        bootstrapURLKeys={{ key: "AIzaSyACNsJ44UoZmnRO0tHyEQHSGX6Z3jEfsOo" }}
        center={{
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        }}
      >
        <GiPositionMarker
          style={{ fontSize: 56, color: colors.error, cursor: "pointer" }}
          lat={parseFloat(lat)}
          lng={parseFloat(lng)}
          text={""}
          onClick={() => {
            window.location.href = `https://map.google.com/?q=${lat},${lng}`;
          }}
        />
      </GoogleMapReact>
    </>
  );
}
