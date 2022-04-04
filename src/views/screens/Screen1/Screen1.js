import './screen1.css';
import main_title from '../../../elements/main_title/main_title.svg'
import Screen from '../Screen/Screen';



export default function Screen1(props) {

        return(
            <div className= "screen1 screen" style = {props.screenStyle}>
                <div className="main-image-container">
                    <div className="image-cut"></div>
                    <img src ='/images/main_image/pueblo-vista-general.png' className ='img_fondo_galeria'></img>
                </div>
                
                <div className='contenedor-titulo-pantalla'>
                    <img src={main_title} 
                    alt={"LA CASA DE FUENTETOBA"}
                    className= "main_title"/>
                </div>
                
                
                
                
                
            </div>
        )
}
