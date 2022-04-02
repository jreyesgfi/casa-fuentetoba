

export default function OffsetEventListener (scrollCallBack){
    window.addEventListener("scroll", scrollCallBack);
    return ()=> window.removeEventListener("scroll", scrollCallBack)
    
    
    
}