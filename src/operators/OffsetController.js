

export function offsetEventListener (scrollCallBack){
    window.addEventListener("scroll", scrollCallBack);
    return ()=> window.removeEventListener("scroll", scrollCallBack)
}

export function changeWindowOffset (offset=0,time=1000){
    window.scrollTo(0, offset);
}