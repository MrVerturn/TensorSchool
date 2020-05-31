import Component from "./component.js"; 

export class Popup extends Component{
    constructor(options){
        super();
        this.content = options.content;
        this.classes = options.classes;
    }

    render(){
        if(!this.container){
            this.container = document.createElement("div");
            this.container.className = "popup " + this.classes;
        }

        this.container.insertAdjacentElement( "beforeend", this.content);
        
        let close = document.createElement("div");
        close.className = "popup-close_btn";
        close.onclick = this.unmount.bind(this);
        this.container.insertAdjacentElement("beforeend", close);


        return this.container;
    }


    afterMount(){
        let coord = this.container.getBoundingClientRect();
 
        if( (coord.width + coord.x) > document.body.clientWidth ){
            this.container.style.left = (document.body.clientWidth - (coord.width + coord.x)) + "px";

        }
    }
}

export default Popup;