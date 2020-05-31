import Component from "./component.js"; 

export class Button extends Component{

    constructor(options){
        super();
        this.text = options.text;
        this.clicked = options.clicked;
        this.classNames = options.class;
    }

    render(){
        if(!this.container){
            this.container = document.createElement("div");
        }
    
        this.container.className = "my_btn " + this.classNames;
        if(this.clicked){
            this.container.className += " clicked";
        }
        this.container.textContent = this.text;

        return this.container;
    }

    bind(handler){
        this.render();
        this.container.onclick = handler;
    }

}

export default Button;