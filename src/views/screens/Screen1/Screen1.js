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
                </div>
            </div>
        )
    }



}
