import React from 'react'
import { Color } from '../GlobalStyle'
import { Button } from '@mui/material'
function JobCard(props) { 
    return (
        <div className='hover-div' style={{ position: "relative", padding: 16, height: 570, width: 318, borderRadius: 10, borderColor:Color.Midgrey, boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px" }}>
            <div style={{borderRadius:20, fontSize:10, fontWeight:300, margin:"10px 0px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px", width:"35%", padding:"5px 8px"}}>
            ⏳ Posted 10 days ago
               </div>
            <div style={{ display: "flex", flexDirection: "row", justifyItems: "center", alignItems: "center" }}>
             
                <div>
                    <img style={{ borderRadius: 0 }} src={props?.item.logoUrl} height={40} width={35} alt="Logo" />
                </div>
                <div style={{ marginLeft: 10 }}>
                    <div style={{ color: Color.Midgrey, fontSize: 13, fontWeight: 600 }}>{props.item.companyName}</div>
                    <div style={{ lineHeight: 1.5, fontWeight: 300 }}>{props.item?.jobRole}</div>
                    <div style={{ marginTop: 5, fontWeight: 800, fontSize: 11 }}>{props.item?.location}</div>
                </div>
            </div>
            <div style={{ marginTop: 8, marginBottom: 8, fontSize: 13, fontWeight: 300 }}>Estimated Salary : {} {props.item?.minJdSalary ? `${props.item?.minJdSalary} - ` : ""} {props.item?.maxJdSalary}  {props.item?.salaryCurrencyCode ?? props.item?.salaryCurrencyCode}</div>
            <div style={{}}>About Company:</div>
            <div style={{ marginTop: 8, marginBottom: 8, fontSize: 13, fontWeight: 300 , height:235, overflow:"hidden"}}>
                {props?.item?.jobDetailsFromCompany}
                
            </div>
            <div className='blurred-div opacity-800' style={{ position: "absolute", bottom: 170 }}>

            </div>
            <div style={{ color: Color.PrimaryBlue1, position: "relative", zIndex: "2", bottom: 30, left: 100, fontWeight:300, cursor: "pointer",  }}>
                View Job
            </div>
            { props?.item?.minExp && <div>
                <div style={{ color: Color.Midgrey, fontSize: 13, fontWeight: 600 }}>Minimum Experience</div>
                <div style={{ marginTop: 8, marginBottom: 8, fontSize: 13, fontWeight: 300 }}>{props?.item?.minExp} year</div>
            </div>}
            <div style={{ position: "absolute", bottom: 10 }}>
                <Button onClick={()=> window.open(props.item?.jdLink, '_blank')} variant="contained" color="success" style={{ textTransform: "none", padding: "8px 18px", width: 310, backgroundColor:Color.PrimaryTheme, fontFamily: "Lexend"}} >
                    <text style={{color:"black", fontWeight:700, fontSize:15}}>⚡ Easy Apply</text>
                </Button>
                <Button variant="contained" color="success" style={{ textTransform: "none", padding: "8px 18px", width: 310, backgroundColor:Color.SecondaryTheme, fontFamily: "Lexend", marginTop:10}} >
                    <text style={{color:"#fff", fontWeight:300, fontSize:15}}>Unlock Referral Asks</text>
                </Button>
               

            </div>
        </div>
    )
}

export default JobCard