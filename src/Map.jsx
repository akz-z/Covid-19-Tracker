
import React from 'react';
import {MapContainer as LeafletMap,TileLayer, useMap } from "react-leaflet";
import {showDataonMap} from "./util";
import "./Map.css";

function SetMap({center,zoom }){

    const map = useMap();
    map.setView(center,zoom);
   
    return null;
}

function Maps({center,zoom,countries,casesType}) {

    
    return (
        <div className="map">
            <LeafletMap >
                <SetMap center={center} zoom={zoom}  />
                
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataonMap(countries, casesType)}
               
            </LeafletMap>
        </div>
      
    )
}

export default Maps;
