
export function getImagePaths(directory) {
    let images = [];
    directory.keys().map((item, index) => images.push(item.replace("./", "")));
    return images;
}

export function importImages(url,callBack) {
    
    const directory = require.context("../images/portada/", false, /\.(png|jpe?g|svg)$/);
    let imagePaths = getImagePaths(directory);

    let images = [];
    let dictImages ={}
    imagePaths.map((path) => {
        dictImages[path]= require("../images/portada/" + path);
        return images.push(require("../images/portada/" + path))});
    
    return [images,dictImages]
}

export function importIcons(url,callBack) {
    
    const directory = require.context("../icons/", false, /\.(png|jpe?g|svg)$/);
    let imagePaths = getImagePaths(directory);

    let images = [];
    let dictImages ={}
    imagePaths.map((path) => {
        dictImages[path]= require("../icons/" + path);
        return images.push(require("../icons/" + path))});
    
    
    return [images,dictImages]
}