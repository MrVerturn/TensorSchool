import Component from "./component.js";
import Factory from "./factory.js";

export class Person_catalog extends Component{
    constructor(url, type, limit){
        super();
        this.url = url;
        this.persons = [];
        this.container = null;
        this.type = type;
        this.limit = limit;
        this.page = 1;
        this.sliderButtons = [];
    }

    clearComponents(mas){


        mas.forEach(element => {
            element.unmount();    
        });

        mas = [];
    }

    render(){
        let factory = new Factory();


        if(!this.container){
            let cont = document.createElement('div');
            cont.className = "slider_cont";
            this.container = cont;

            let p_cont = document.createElement('div');
            p_cont.className = "persons_cont";
            p_cont.id = "persons_cont";

            this.container.insertAdjacentElement('beforeend', p_cont);            

            if( this.type == "page" ){

                let b_cont = document.createElement('div');
                b_cont.className = "button_cont";
                b_cont.id = "button_cont";

                let next = document.createElement('div');
                next.className = "btn_next";
                next.textContent = ">";
                
                let prev = document.createElement('div');
                prev.className = "btn_prev";
                prev.textContent = "<";

                this.container.insertAdjacentElement('afterbegin', prev);  
                this.container.insertAdjacentElement('beforeend', next);   
                this.container.insertAdjacentElement('beforeend', b_cont);   

                next.onclick = this.nextPage.bind(this);            
                prev.onclick = this.prevPage.bind(this);      


                let all = factory.create({"text" : "показать все элементы", "class":"all" }, "button");
                all.mount(this.container);
                all.bind( function(){  
                    this.type="list"; 
                    this.unmount();
                    this.mount(this.parent); 
                    this.update();
                }.bind(this) );
            }
            
            if( this.type == "list" ){
                let all = factory.create({"text" : "свернуть список", "class":"all" }, "button");
                all.mount(this.container);
                all.bind( function(){  
                    this.type="page"; 
                    this.unmount();
                    this.mount(this.parent); 
                    this.update();
                }.bind(this) );
            }

            let add = factory.create({"text" : "добавить карточку", "class":"all" }, "button");
            add.mount(this.container);
            add.bind( function(){  
                this.openAddForm(); 
            }.bind(this) );
        }

        this.persons.forEach(element => {
            this.container.querySelector("#persons_cont").insertAdjacentElement('beforeend', element.render());            
        });

        if( this.type == "page" ){

            this.clearComponents(this.sliderButtons);

            this.sliderButtons = [];

            for(let i = 1; i <= this.pageCount; i++){
                let new_button = factory.create({"text" : "", "clicked" : (this.page == i)?1:0, "class":"slider" }, "button");
                this.container.querySelector("#button_cont").insertAdjacentElement('beforeend', new_button.render());
                new_button.bind( function(){  
                    if(this.page != i){
                        this.page=i; 
                        this.update(); 
                    }
                }.bind(this) );
                this.sliderButtons.push(new_button);
            } 
        }

        this.unfreez();
        return this.container;
    }

    update(){

        this.freez();

        let promis = null;

        switch(this.type){
            case 'list': promis = this.getList(); break;
            case 'page': promis = this.getPage(); break;
        }

        promis.then(
            res => {
                this.count = res.headers.get("x-total-count");
                this.pageCount = Math.ceil(this.count / this.limit);

                res.json().then(
                    data => {
                        let factory = new Factory();

                        this.clearComponents(this.persons);
                        this.persons = [];
                        
                        data.forEach( element => {element["parent"] = this; this.persons.push(factory.create(element, 'person'));});
                        this.render();
                    }
                );
            }
        );


    }

    getList(){
        return fetch( this.url+"person" );
    }

    getPage(){
        return fetch( this.url+`person?_page=${this.page}&_limit=${this.limit}` );
    }

    nextPage(){   
        if( this.page < this.pageCount){
            this.page += 1;
        }
        else{
            this.page = 1;
        }

        this.update();
    }
 
    prevPage(){
        if( this.page - 1 > 0 ){
            this.page -= 1;
        }
        else{
            this.page = this.pageCount;
        }

        this.update();
    }

    freez(){
        this.container.classList.add("slider_cont-update_freez");
    }

    unfreez(){
        this.container.classList.remove("slider_cont-update_freez");
    }

    removeItem(event){
        this.freez();
        fetch( this.url+`person/${event.target.dataset.id}`, {method: 'DELETE'} ).then(
            rez => {this.unfreez(); this.update();}
        );
        
    }

    formToJSON(form){

        let inputs = form.querySelectorAll("input");

        let data = {};

        for(let i = 0; i < inputs.length; i++){
            if( inputs[i].type != "submit" )
                if((data[inputs[i].name]) && (inputs[i].type == "radio")) {
                    if( inputs[i].checked ){
                        data[inputs[i].name] = inputs[i].value;
                    }
                }      
                else          
                    data[inputs[i].name] = inputs[i].value;
        }
        return data;
    }

    sendNewPerson(json){
        this.freez();


        json["active"] = Date.now();

        fetch( this.url+`person`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(json) } ).then(this.update.bind(this));

    }

    renderAddForm(){
        let input_mas = [
            {
                "id": "name",
                "class": "my_input",
                "placeholder": "Имя Фамилия",
                "type": "text",
                "name":"title",
                "label": "Имя Фамилия"
            },
            {
                "id": "study",
                "class": "my_input",
                "placeholder": "Учебное заведение",
                "name":"study",
                "label": "Учебное заведение",
                "type": "text"
            },
            {
                "id": "bdate",
                "class": "my_input",
                "placeholder": "Дата рождения",
                "name":"bdate",
                "label": "Дата рождения",
                "type": "date"
            },
            {
                "id": "phone",
                "class": "my_input",
                "placeholder": "Телефон",
                "name":"phone",
                "label": "Телефон",
                "type": "phone"
            },
            {
                "id": "photo",
                "class": "my_input",
                "placeholder": "Выберите изображение",
                "name":"photo",
                "label": "Изображение",
                "type": "custom",
                "sub_type": "select_img",
                "options": {
                    "/img/ava1.jpg" : "Ава1" ,
                    "/img/ava0.jpg" : "Ава2",
                    "/img/ava2.jpg" : "Ава3",
                    "/img/ava4.jpg" : "Ава4",
                    "/img/ava5.jpg" : "Ава5",
                }
            }
        ]

        let form = document.createElement("form");
        form.method = "POST";
        form.action = "#";
        form.className = "addForm";

        input_mas.forEach(
            (value, index) => {
                let div  = document.createElement("div");
                div.className = "formRow";

                let label  = document.createElement("label");
                label.htmlFor  = value.name;
                label.textContent = value.label;
                div.insertAdjacentElement("beforeend", label);

                if(value.type != "custom"){

                    let input  = document.createElement("input");       

                    if(value.type == "select")
                        input  = document.createElement("select");   
                    else             
                        input.type = value.type;

                    input.name = value.name;
                    input.id = value.id;
                    input.placeholder = value.placeholder;
                    div.insertAdjacentElement("beforeend", input);

                    if( value.type == "select" ){
                        value.options.forEach(element => {
                            let option  = document.createElement("option");
                            option.value = element;
                            option.className = "option-photo";
                            option.style.backgroundImage = `url(${element})`;

                            option.insertAdjacentElement("beforeend", option_img);
                            input.insertAdjacentElement("beforeend", option);
                        });
                    }



                }
                else{
                    if(value.type = "select_img"){                        
                        let cont  = document.createElement("div");
                        cont.className = "custom_dropdown";

                        let show_cont  = document.createElement("div");
                        show_cont.className = "c_dd_input";
                        show_cont.onclick = function(e){
                            let ph = e.srcElement.parentNode;
                            let content = ph.parentNode.getElementsByClassName("c_dd_content")[0];
                            if(content.style.display == "none"){
                                content.style.display = "";
                                ph.classList.add("open");
                            }
                            else{
                                content.style.display = "none";
                                ph.classList.remove("open");

                            }
                        }

                        let content_cont  = document.createElement("div");
                        content_cont.className = "c_dd_content";
                        content_cont.style.display = "none";

                        let placeholder  = document.createElement("p");
                        placeholder.textContent = value.placeholder;

                        let dd_bnt  = document.createElement("div");
                        dd_bnt.className = "dropdown_btn";


                        for (const key in  value.options) {
                            let option  = document.createElement("input");
                            option.value = key;
                            option.type = "radio";
                            option.id = value.name + "_" + key;
                            option.name = value.name;
                            option.className = "dd_element";

                            let label  = document.createElement("label");
                            label.htmlFor  = value.name + "_" + key;
                            label.textContent = value.options[key];
                            label.style.backgroundImage = `url(${key})`;

                            label.onclick = function(e){
                                let ph = e.target.parentNode.parentNode.getElementsByClassName("c_dd_input")[0].getElementsByTagName("p")[0];
                                ph.textContent = e.target.textContent;
                            }
                            content_cont.insertAdjacentElement("beforeend", option);
                            content_cont.insertAdjacentElement("beforeend", label);
                        }

                      

                        show_cont.insertAdjacentElement("beforeend", placeholder);
                        show_cont.insertAdjacentElement("beforeend", dd_bnt);
                        cont.insertAdjacentElement("beforeend", show_cont);
                        cont.insertAdjacentElement("beforeend", content_cont);
                        div.insertAdjacentElement("beforeend", cont);

                    }
                }

                form.insertAdjacentElement("beforeend", div);

            }
        );

        let submit = document.createElement("input");
        submit.type = "submit";
        submit.textContent = "Сохранить";
        form.onsubmit = function(e){e.preventDefault();  this.sendNewPerson(this.formToJSON(e.srcElement));}.bind(this);
        form.insertAdjacentElement("beforeend", submit);



        return form;
    }

    openAddForm(){
        let factory = new Factory();
        let popup = factory.create( { content: this.renderAddForm(), classes: "popup addForm" }, "popup");
        popup.afterMount = function(){
            let coord = this.container.getBoundingClientRect();

            this.container.style.left =  (document.body.clientWidth - coord.width) / 2 + "px";
            this.container.style.top =  (document.body.clientHeight - coord.height) / 2 + "px";


        }
        popup.mount(document.getElementsByTagName("main")[0]);
    }
}
export default Person_catalog;
