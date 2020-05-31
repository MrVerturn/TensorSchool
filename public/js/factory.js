import Person from "./person.js";
import Button from "./button.js";
import Popup from "./popup.js"; 

export class Factory{
    create(option, type){
        
        switch(type){
            case "person": return new Person(option);
            case "button": return new Button(option);
            case "popup": return new Popup(option);
        }
    }
}

export default Factory;