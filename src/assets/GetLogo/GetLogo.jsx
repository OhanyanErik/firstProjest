 import Apple from "../Logos/apple-logo.png";
 import Chrome from"../Logos/chrome.png";
 import Facebook from"../Logos/communication.png";
 import Instagram from "../Logos/instagram.png";
 import Microsoft from"../Logos/microsoft.png";
 import Amazon from "../Logos/social.png";
 import YouTube from "../Logos/youtube.png"
 import OfficeLogo from"../Logos/office-building.png";

 export default function  getCompanyLogo (companyName){
  const logos = {
    Google: <img src={Chrome} alt="GoogleChrome" style={{ width: "45px", height: "45px", }} /> ,
    Facebook: <img src={Facebook} alt="Facebook" style={{ width: "45px", height: "45px", }}/>,
    YouTube: <img src={YouTube} alt="Youtube" style={{ width: "45px", height: "45px", }}/>,
    Apple: <img src={Apple} alt="Apple" style={{ width: "45px", height: "45px", }}/>,
    Microsoft: <img src={Microsoft} alt="Microsoft"style={{ width: "45px", height: "45px", }} />,
    Amazon: <img src={Amazon} alt="Amazon" style={{ width: "45px", height: "45px", }}/>,
    Instagram: <img src={Instagram} alt="Instagram" style={{ width: "45px", height: "45px", }} />,
  };
  
  return logos[companyName] || <img src={OfficeLogo} alt="OfficeLogo" style={{ width: "45px", height: "45px", }} />;
};