import './screen-gallery.css'

export default function ScreenGallery(props) {
    return(
        <div className= "screen-gallery screen" style = {props.screenStyle}>
            <div className= "header header-gallery"></div>
            <div className= "flex-box photo-container">
                <div className="top-photo-row">
                </div>
                <div className="main-photo-row">
                </div>
                <div className="bottom-photo-row">
                </div>
            </div>

        </div>
    )
}