import Component from "./component.js"; 
import Popup from "./popup.js"; 

class Person extends Component{
    constructor(options){
        super();
        this.options = options;
        this.container = null;
        this.popup = null;
        this.parent = options.parent;
    }

    render(){
        let container = document.createElement("div");
        container.className = "person_card";

        let content = document.createElement("div");
        content.className = "person_card_cont"

        let name = document.createElement("p");
        name.textContent = this.options.title;

        let info_cont = document.createElement("p");
        info_cont.className = "person_card-info_cont";

        if(this.options.study){
            let study = document.createElement("p");
            study.textContent = this.options.study;
            info_cont.insertAdjacentElement('beforeend',study);
        }

        if(this.options.course){
            let course = document.createElement("p");
            course.textContent = this.options.course;
            info_cont.insertAdjacentElement('beforeend',course);
        }

        let img = document.createElement("img");
        img.src = this.options.photo;
        img.className = "person_cont-img";

        content.insertAdjacentElement('beforeend',img);
        content.insertAdjacentElement('beforeend',name);
        content.insertAdjacentElement('beforeend',info_cont);
        content.onclick = this.openCard.bind(this);

        container.insertAdjacentElement('beforeend',content);

        this.container = container;
        return this.container;
    }

    renderCard(){
        let container = document.createElement("div");
        container.className = "person_card_popup";

        let name = document.createElement("p");
        name.textContent = this.options.title;
        let info_cont = document.createElement("p");
        info_cont.className = "person_card-info_cont";
        info_cont.insertAdjacentElement('beforeend',name);

        if(this.options.study){
            let study = document.createElement("p");
            study.textContent = this.options.study;
            info_cont.insertAdjacentElement('beforeend',study);
        }

        if(this.options.course){
            let course = document.createElement("p");
            course.textContent = this.options.course;
            info_cont.insertAdjacentElement('beforeend',course);
        }

        let img = document.createElement("img");
        img.src = this.options.photo;
        img.className = "person_cont-img";

        let r_img = document.createElement("p");
        r_img.textContent = "удалить";
        r_img.className = "remove";
        r_img.dataset.id = this.options.id;

        r_img.addEventListener("click", (event) => { this.parent.removeItem(event); });

        info_cont.insertAdjacentElement('beforeend',r_img);

        container.insertAdjacentElement('beforeend',img);
        container.insertAdjacentElement('beforeend',info_cont);


        return container;
    }

    openCard(){
        if(this.popup){
            this.popup.unmount();
        }
        let popup = new Popup( { content: this.renderCard(), classes: "in_card"});
        this.popup = popup;
        this.popup.mount(this.container);
    }
}

export default Person;