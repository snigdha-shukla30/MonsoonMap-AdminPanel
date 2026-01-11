"use client";

import React from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

export default function ReportGoogleMap() {
  const center = { lat: 28.6139, lng: 77.209 }; // Delhi

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={11}
        >
          {/* Example marker */}
          <MarkerF position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
