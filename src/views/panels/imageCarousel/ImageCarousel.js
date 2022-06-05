import "./image-carousel.css";
import { globalFolder } from "../../../operators/photoImporter/GalleryPhotoImporter";
import { useState } from "react";

export default function ImageCarousel(props) {
    // return the main photo of the gallery
    //react state to track the current room clicked
    var images = props?.images;

    //react state to keep the id of the current main photo
    const [mainPhotoNum, setMainPhotoNum] = useState(0);

    //
    const photoFullScreen = false;
    const setPhotoFullScreen = () => { };

    const numTotalPhotos = images.length;

    if (numTotalPhotos === 0) { return }

    var currentPhotoPos = mainPhotoNum % numTotalPhotos;

    if (mainPhotoNum < 0) {
        currentPhotoPos = (numTotalPhotos - 1);
        setMainPhotoNum(numTotalPhotos - 1);
    }



    return (
        <div className={`${!photoFullScreen ? 'carousel-container' : 'full-screen-photo'} flex-box`}>
            
            <div className='prev-photo-button change-photo'
                 onClick={() => { setMainPhotoNum(mainPhotoNum - 1) }}>
                <img 
                    src={images[(currentPhotoPos+numTotalPhotos-1)%numTotalPhotos]['imgUrl']}>
                </img>
                <div className="mask">
                </div>
            </div>
            <img
                className='main-image'
                src={images[currentPhotoPos]['imgUrl']}
                onClick={() => { setPhotoFullScreen(!photoFullScreen) }}
            >
            </img>

            <div className='next-photo-button change-photo'
                onClick={() => { setMainPhotoNum(mainPhotoNum + 1) }}>                
                <img 
                    src={images[(currentPhotoPos+numTotalPhotos+1)%numTotalPhotos]['imgUrl']}>
                </img>
                <div className="mask">
                </div>
            </div>
        </div>
    )
}