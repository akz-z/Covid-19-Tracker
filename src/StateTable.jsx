import React from "react";
import "./Table.css";
import numeral from "numeral";

const StateTable=({ state})=>{

   return( <div className="table">
       {
           state.map(({name,cases})=>(
                <tr>
                    <td className="tr">{name}</td>
                    <td><strong>{numeral(cases).format(0,0)}</strong></td>
                </tr>
          ))
       }  
         </div>  
   );
}

export default StateTable;