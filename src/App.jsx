
import './App.css';
import React,{useState, useEffect} from "react";
import { FormControl,Select, MenuItem,  Card, CardContent} from '@material-ui/core';
import Table from "./Table";
import InfoBox from "./InfoBox";
import Maps from "./Map";
import {sortData} from "./util";
import "leaflet/dist/leaflet.css";
import StateTable from "./StateTable";
<style>
@import url('https://fonts.googleapis.com/css2?family=Langar&family=Oswald&display=swap');
</style>
//import { useMapEvent } from 'react-leaflet';

function App() {

  
    const [countries, setcountries] = useState([]);
    const [CountryCode,setCountryCode] = useState("WorldWide");
    const [CountryInfo,setCountryInfo]= useState({});
    const [table,setTable]=useState([]);
    const [center,setCenter]=useState({lat : 34,lng : -40});
    const [zoom,setZoom] =useState(3);
    const [circleMap, setcircleMap]=useState([]);
   const [casesType, setCasesType] = useState("cases");
    const[myState,setMyState]=useState([]);
    


    useEffect(()=>{
      fetch("https://disease.sh/v3/covid-19/all").then((response)=>response.json())
      .then((data)=>{
        setCountryInfo(data);
      })
    },[]);
    useEffect(()=>{
     
     const getcounntriesData=async function()
     {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response)=> response.json())
        .then((data)=>{
            const countries=data.map((country)=>({
                name:country.country,
                value:country.countryInfo.iso3
 
            }));
            setcountries(countries);
            const sortdata=sortData(data);
            setTable(sortdata);
            setcircleMap(data);
 
        });
       
     };
 
     getcounntriesData();
    },[]);

    useEffect(()=>{
      const  getIndiadata=async function(){
      await fetch("https://api.covid19india.org/data.json")
      .then((response)=>response.json()).then((data)=>{
        const mystate=data.statewise.map((state)=>({
          name:state.state,
          cases:state.confirmed
          
        }))
        
        setMyState(mystate);
      })
     
      };
      getIndiadata();
    },[]);
 
  const selectCountry=async (e)=>{
 
         const conCode =e.target.value;
         
          const url = conCode === "WorldWide" ? "https://disease.sh/v3/covid-19/all" 
          :  `https://disease.sh/v3/covid-19/countries/${conCode}`;
          await fetch(url).then(response =>
               response.json())
          .then(data=>{     
             setCountryCode(conCode);
             setZoom(4);
             
             setCenter([data.countryInfo.lat,data.countryInfo.long]);
            
             setCountryInfo(data);
          });
          
     };
     
      


  return (
    <>
    <div className="app">
    <div className="app__left">  
        <div>
         
        <div className="app_header">
            <h1>Covid-19 Tracker</h1>
            <FormControl className="app_dropdown">
                <Select className="app_dropdownSelect" variant="outlined" value={CountryCode} onChange={selectCountry}>
                    <MenuItem value="WorldWide">WorldWide</MenuItem>
                    {  
                    
                    countries.map((country,id)=>
                        <MenuItem value={country.value} key={id}>{country.name} </MenuItem>
                    
                        )
                    }   
                </Select>

                </FormControl> 


            </div>
            <div className="app__stats">

            </div>
        </div>
        <div className="info__stats">
              <InfoBox className="ifbox1" title={'CASES'} cases={CountryInfo.todayCases} total={CountryInfo.cases}
               onClick={e=>setCasesType("cases")} isRed
               active={casesType === "cases"}/>
              <InfoBox className="ifbox2" title={'Recovered'} cases={CountryInfo.todayRecovered} total={CountryInfo.recovered}
              onClick={e=>setCasesType("recovered")} 
              active={casesType === "recovered"}/>
              <InfoBox className="ifbox3" title={'Deaths'} cases={CountryInfo.todayDeaths} total={CountryInfo.deaths}
              onClick={e=>setCasesType("deaths")} isRed
              active={casesType === "deaths"}/>
             
          </div>
          
            <Maps  center={center} zoom ={zoom} countries={circleMap} casesType={casesType}/>
          
           </div> 
      <div className="app_right1">     
        <Card className="app__right">
          <CardContent>
          <h1 className="h1">Live Cases By Country</h1>
          <Table countries= {table} className="table"></Table>
          
            <h2 className="h2">STATE-WISE</h2>
            <StateTable state={myState} className="table"></StateTable>
          </CardContent>  
        </Card>
      </div>  
    </div> 
    </>
  );
}


export default App;
///https://console.firebase.google.com/project/covid-tracker-5c345/overview
//Hosting URL: https://covid-tracker-5c345.web.app




// .......AKZZZ......