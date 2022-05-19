

export function offsetEventListener (scrollCallBack){
    window.addEventListener("scroll", scrollCallBack);
    return ()=> window.removeEventListener("scroll", scrollCallBack)
}

export function changeWindowOffset (offset=0, currentOffset=1000,time=1000,fps=500){
    // if (Math.abs(offset-currentOffset)<10 || time<0){
    //     return ;
    // }
    // await new Promise(()=>{
    //     setTimeout(function() {
    //         const newCurrentOffset = (offset-currentOffset)*time/fps+currentOffset;
    //         changeWindowOffset(offset,newCurrentOffset,time-fps);
    //         window.scrollTo(0,newCurrentOffset);
    //     }, fps);
    // });
    console.log(offset)
    window.scrollTo(0,0);
    window.scrollTo(0,offset);

}