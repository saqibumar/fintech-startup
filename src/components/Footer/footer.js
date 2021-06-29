import React, { Component } from 'react'; 
import "./footer.css";

function TimeX(){
    var d = new Date();
    return d.getFullYear()-1 + " - " + d.getFullYear();
}
class Footer extends Component {
	render() {
        return(
            
            <div className="footerBG">
                {/* <div className="content" 
                    style={{position:'absolute', bottom:'0px', width: '100%', height:'100%', paddingTop:'60px'}}>
                    <div className="row">
                        <div className="col-6">
                            <img alt="" src="../images/logo/logo-for-footer.png"></img>
                        </div>
                        <div className="col-6">
                        Sr.Preston @Copyright(<TimeX />)
                        </div>
                    </div>

                </div> */}
                <div style={{position:'absolute', bottom:'0px', width: '100%'}}>
                    <div className="container">
                        <div className="row">

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-4 col-xs-4">
                                <img alt="" src="/images/logo/logo-for-footer.png"></img>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-4 col-xs-4" style={{color:"#FFFFFF", padding:'10px'}}>
                            Señor Preston - Copyright (<TimeX />)
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-4 col-xs-4">                                
                                <img alt="" className="social-icon" src="/images/social-icons/facebook-white.png" />
                                <img alt="" className="social-icon" src="/images/social-icons/Instagram.png" />
                                <img alt="" className="social-icon" src="/images/social-icons/twitter-white.png" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Footer;