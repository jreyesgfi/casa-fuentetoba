export default function deviceUsed(){
    const ua = navigator.userAgent;
    var device= "desktop";
    
    //tablet
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        device= "tablet";
    }
    //mobile
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        device= "mobile";
    }
    return device;
    
};