import  {Circle,Popup} from "react-leaflet";
import React from "react";
import numeral from "numeral";

const casesTypeColors = {
    cases: {
      option: { color:"#cc1034", fillColor: "#cc1034" },
      multiplier: 800,
    },
    recovered: {
      
      option: { color:"#7dd71d", fillColor: "#7dd71d" },
      multiplier: 1200,
    },
    deaths: {
      option: { color:"#fb4443", fillColor: "#cc1034" },
      multiplier: 2000,
    },
  };


export const showDataonMap=(data ,casesType)=>
  (
    data.map((country) =>(
        <Circle
         center={[country.countryInfo.lat,country.countryInfo.long]}
         fillOpacity={0.4} 
        pathOptions={casesTypeColors[casesType].option}
         radius={Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier/2.5}>
          
         <Popup>
             <div className="popup_info">
              <div 
                className="popup_flag"
                style={ {backgroundImage: `url(${country.countryInfo.flag})`} }
                ></div>
                  <div className="popup_cname">{country.country}</div>
                  <div className="popup_cases">Cases: {numeral(country.cases).format("0,0")}</div>
                  <div className="popup_recover">Recovered: {numeral(country.recovered).format("0,0")}</div>
                  <div className="popup_death">Death: {numeral(country.deaths).format("0,0")}</div>
             </div>

         </Popup>
        </Circle>
    ))
  );
  





export  const sortData=(data)=>{

    const sortedData=[...data];
    sortedData.sort((a,b)=>{

        if(a.cases>b.cases){
            return -1;
        }
        else
            return 1;
    })
    return sortedData;
};