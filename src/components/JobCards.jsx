import React from 'react'
import { Color } from '../GlobalStyles'
import { Button } from '@mui/material'
function JobCard() {
    return (
        <div style={{ position: "relative", padding: 16, height: 550, width: 318, borderRadius: 10, boxShadow: "-4px 0px 14px 4px rgba(148,143,143,0.75)" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyItems: "center", alignItems: "center" }}>
                <div>
                    <img style={{ borderRadius: 20 }} src={"/logo192.png"} height={40} width={35} alt="Logo" />
                </div>
                <div style={{ marginLeft: 10 }}>
                    <div style={{ color: Color.Midgrey, fontSize: 13, fontWeight: 600 }}>Zuma</div>
                    <div style={{ lineHeight: 1.5, fontWeight: 300 }}>Founding Staff Frontend Software Engineer</div>
                    <div style={{ marginTop: 5, fontWeight: 800, fontSize: 11 }}>Bengaluru</div>
                </div>
            </div>
            <div style={{ marginTop: 8, marginBottom: 8, fontSize: 13, fontWeight: 300 }}>Estimated Salary : ₹10 - 14 LPA</div>
            <div style={{}}>About Company:</div>
            <div style={{ marginTop: 8, marginBottom: 8, fontSize: 13, fontWeight: 300 }}>
                Zuma makes an automated sales agent that converses with 100% of inbound leads, ultimately improving the way
                consumers interact with businesses and organizations. We’ve built this from the ground up using AI, ML, and
                human support which helps increase sales conversion and support capacity for businesses of all kinds. Zuma
                is one of the fastest-growing startups in San Francisco, and is well-funded and backed by world-class investors
                such as Y-Combinator, Joe Montana’s fund (Liquid 2 Ventures), Day One Ventures, Soma Capital, and other notable
                angel investors including Austen Allred (from Lambda School), YC’s ex-COO Qasar Younis, among others.
            </div>
            <div className='blurred-div opacity-800' style={{ position: "absolute", bottom: 190 }}>

            </div>
            <div style={{ color: Color.PrimaryBlue1, position: "relative", zIndex: "2", bottom: 30, left: 100, cursor: "pointer",  }}>
                View Job
            </div>
            <div>
                <div style={{ color: Color.Midgrey, fontSize: 13, fontWeight: 600 }}>Minimum Experience</div>
                <div style={{ marginTop: 8, marginBottom: 8, fontSize: 13, fontWeight: 300 }}>1 year</div>
            </div>
            <div style={{ position: "absolute", bottom: 10 }}>
                <Button variant="contained" color="success" style={{ textTransform: "none", padding: "8px 18px", width: 310, backgroundColor:Color.PrimaryTheme }} >
                    Easy Apply
                </Button>
                <Button variant="contained" color="success" style={{ textTransform: "none", padding: "8px 18px", width: 310 , marginTop:10}} >
                    Unlock Referral Asks
                </Button>

            </div>
        </div>
    )
}

export default JobCard