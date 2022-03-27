import './screen1.css';
import main_title from '../../../elements/main_title.png'
import Screen from '../Screen/Screen';



export default class Screen1 extends Screen {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className= "screen1 screen" style = {this.screenStyle}>
                <div className='contenedor-titulo-pantalla'>
                    <img src={main_title} alt={"LA CASA DE FUENTETOBA"}
                     className= "main_title"/>
                    <h2 className="title_galeria"> GALERIA </h2>
                </div>
            </div>
        )
    }



}
