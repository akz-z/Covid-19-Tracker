import React from "react";
import {Card,CardContent,Typography} from "@material-ui/core";

import numeral from "numeral";
import "./InfoBox.css";
<style>
@import url('https://fonts.googleapis.com/css2?family=Langar&family=Oswald&display=swap');
</style>

const typo={
    fontfamily:  "cursive Langar"
}


const InfoBox=({title,cases,total,active,isRed,onClick})=>
{
    
    
  
    return(
            <button className="infoButoon">
            <Card  onClick={onClick} 
                
                >
                    
                    <CardContent  className="Cardcon">
                        <Typography style={typo} color="textPrimary" className="infobox__title">{ title}</Typography>
                        <h1 className="h1" >{cases}</h1>
                        <Typography  color="textSecondary" className="Infobox__total">{numeral(total).format("0,0")} Total </Typography>
                    </CardContent>
                
         </Card>
            </button>
    )


}

export default InfoBox;