
export function LimitText(text, maxSize=10, placeToCut=4){
    const words = text.split(" ");
    const finalText = words.map((word) => {
        if (word.length > maxSize){
            return (text.slice(0,placeToCut)+".")
        }
        return word
    }).reduce((w1,w2)=>(w1+' '+w2));
    return finalText
}