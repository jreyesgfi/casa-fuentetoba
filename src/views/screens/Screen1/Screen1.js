import './screen1.css';
import main_title from '../../../elements/main_title.png'
import fondoGaleria from '../../../elements/pueblo-vista-general-saturada.png'
import Screen from '../Screen/Screen';



export default class Screen1 extends Screen {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className= "screen1 screen" style = {this.screenStyle}>
                <div className="main-image-container">
                    <div className="image-cut"></div>
                    <img src ={fondoGaleria} className ='img_fondo_galeria'></img>
                </div>
                
                <div className='contenedor-titulo-pantalla'>
                    <img src={main_title} 
                    alt={"LA CASA DE FUENTETOBA"}
                    className= "main_title"/>
                </div>
                
                
                
                
                
            </div>
        )
    }



}
