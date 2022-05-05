import './screen1-front.css';
import main_title from '../../../elements/main_title/main_title.svg'
import Screen from '../Screen/Screen';
import React from 'react';


export default function ScreenFront(props) {

    const cache = {};

    function importAll(r) {
        r.keys().forEach((key) => (cache[key] = r(key)));
    }
    // Note from the docs -> Warning: The arguments passed to require.context must be literals!
    importAll(require.context("./media", false, /\.(png|jpe?g|svg)$/));

    const images = Object.entries(cache).map(module => module[1].default);


    const MediaPage = () => {
        return (
            <>
                <p>Media Page..</p>

                {images.map(image => (
                    <img style={{ width: 100 }} src={image} />
                ))}
            </>
        );
    }
    return (
        <div className="screen1 screen" style={props.screenStyle}>
            <div className="main-image-container">
                <div className="image-cut"></div>
                <img src='/images/main_image/pueblo-vista-general.png' className='img_fondo_galeria'></img>
            </div>

            <div className='contenedor-titulo-pantalla'>
                <img src={main_title}
                    alt={"LA CASA DE FUENTETOBA"}
                    className="main_title" />
            </div>





        </div>
    )
}
