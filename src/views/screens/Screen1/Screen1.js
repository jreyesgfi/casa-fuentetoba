import './screen1.css';
import Screen from '../Screen/Screen';

export default class Screen1 extends Screen {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className= "screen1 screen" style = {this.screenStyle}>
                <div className='contenedor-titulo-pantalla'>
                    <h2> La Casa de Fuentetoba </h2>
                    <p> orem Ipsum is simply dummy text of the printing a.</p>
                </div>
            </div>
        )
    }



}
