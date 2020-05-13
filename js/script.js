class Person{

	constructor(name, birthDate, photoURL, university){
		this.name = name;
		this.birthDate = birthDate;
		this.photoUrl = photoURL;
		this.university = university;

		console.log( this.name +"_"+ this.birthDate);

	}

	get birthDateStr() {
		let str = this.birthDate.getDate();

		switch(this.birthDate.getMonth()){
			case 0: str += " января"; break;
			case 1: str += " февраля"; break;
			case 2: str += " марта"; break;
			case 3: str += " апреля"; break;
			case 4: str += " мая"; break;
			case 5: str += " июня"; break;
			case 6: str += " июля"; break;
			case 7: str += " августа"; break;
			case 8: str += " сентября"; break;
			case 9: str += " октября"; break;
			case 10: str += " ноября"; break;
			case 11: str += " декабря"; break;
			default: str += " NaN"; break;
		}

		return  str + ", " + this.age;
	}

	get age() {
		let now = Date.now();
		let ageTS = now - this.birthDate.getTime();
		let age = (new Date(ageTS).getFullYear()) - 1970;
		switch (age % 100){
			case 11: 
			case 12:
			case 13:
			case 14: age += " лет"; break;
			default: switch( age % 10 ){
				case 1: age += " год"; break;
				case 2:	
				case 3:
				case 4: age += " года"; break;
				default: age += " лет"; break;
			}
		}
		return age;
	}

	appendToDOM(html, DOMElement){
		let element = DOMElement.appendChild(html);	
		let that = this;
		element.addEventListener("click", (event) => { that.openCard(that.renderInfo()); }  );
	}

	openCard(html){
		let body = document.getElementsByTagName("body")[0];
		body.style.overflow = "hidden";
		if( window.innerHeight < body.offsetHeight  ){
			body.style.marginRight = "17px";
		}
		body.appendChild(html);
		html.style.top = pageYOffset  + "px";
		(html.getElementsByClassName("close_btn")[0]).addEventListener("click", (event) => { html.remove(); body.style.overflow = "auto"; body.style.marginRight = "0px";}  );
	}
}

class Teacher extends Person{
	constructor(item){
		super(item.fullName, item.birthDate, item.photoUrl, item.university);
		this.workFrom = item.workFrom;
	}

	renderInfo(){
		let absoluteCont = document.createElement("div");
		absoluteCont.className = "absolute_cont";

		let mainDiv = document.createElement("div");
		mainDiv.className = "info_cont";		

		let close = document.createElement("div");
		close.className = "close_btn";

		let img = document.createElement("div");
		img.className = "avatar";
		img.style.backgroundImage =  "url('" + this.photoUrl + "')";

		let nameP = document.createElement("p");
		nameP.appendChild(document.createTextNode(this.name));
		nameP.className = "info_cont-title";


		let titleBD = document.createElement("span");
		titleBD.appendChild(document.createTextNode("День рождения"));
		titleBD.className = "info_cont-cart_title";


		let birthDate = document.createElement("p");
		birthDate.appendChild(document.createTextNode(this.birthDateStr));

		let studentP = document.createElement("p");
		studentP.appendChild(document.createTextNode("Работаю в " + this.university + " с " + this.workFrom.getFullYear() + " года"));
		studentP.className = "info_cont-work-from";

		mainDiv.appendChild(nameP);
		mainDiv.appendChild(titleBD);
		mainDiv.appendChild(birthDate);

		mainDiv.appendChild(studentP);

		mainDiv.appendChild(close);
		mainDiv.appendChild(img);

		absoluteCont.appendChild(mainDiv);

		return absoluteCont;
	}

	renderCard(){
		let mainDiv = document.createElement("div");
		mainDiv.className = "card";

		let img = document.createElement("img");
		img.src = this.photoUrl;

		let nameP = document.createElement("p");
		nameP.appendChild(document.createTextNode(this.name));
		nameP.className = "name";

		let studentP = document.createElement("p");
		studentP.appendChild(document.createTextNode(this.university));
		studentP.className = "subname";

		mainDiv.appendChild(img);
		mainDiv.appendChild(nameP);
		mainDiv.appendChild(studentP);
		return mainDiv;
	}
}

class Student extends Person{


	constructor(item){	
		super(item.fullName, item.birthDate, item.photoUrl, item.university);
		
		this.course = item.course;	
	}	

	renderInfo(){
		let absoluteCont = document.createElement("div");
		absoluteCont.className = "absolute_cont";

		let mainDiv = document.createElement("div");
		mainDiv.className = "info_cont";		

		let close = document.createElement("div");
		close.className = "close_btn";

		let img = document.createElement("div");
		img.className = "avatar";
		img.style.backgroundImage =  "url('" + this.photoUrl + "')";

		let nameP = document.createElement("p");
		nameP.appendChild(document.createTextNode(this.name));
		nameP.className = "info_cont-title";


		let titleBD = document.createElement("span");
		titleBD.appendChild(document.createTextNode("День рождения"));
		titleBD.className = "info_cont-cart_title";


		let birthDate = document.createElement("p");
		birthDate.appendChild(document.createTextNode(this.birthDateStr));

		let titleStudent = document.createElement("span");
		titleStudent.appendChild(document.createTextNode("Учится"));
		titleStudent.className = "info_cont-cart_title";

		let studentP = document.createElement("p");
		studentP.appendChild(document.createTextNode(this.university + ", " + this.course + " курс"));

		mainDiv.appendChild(nameP);
		mainDiv.appendChild(titleBD);
		mainDiv.appendChild(birthDate);

		mainDiv.appendChild(titleStudent);
		mainDiv.appendChild(studentP);

		mainDiv.appendChild(close);
		mainDiv.appendChild(img);

		absoluteCont.appendChild(mainDiv);

		return absoluteCont;
	}

	renderCard(){
		let mainDiv = document.createElement("div");
		mainDiv.className = "card";

		let img = document.createElement("img");
		img.src = this.photoUrl;

		let nameP = document.createElement("p");
		nameP.appendChild(document.createTextNode(this.name));
		nameP.className = "name";

		let studentP = document.createElement("p");
		studentP.appendChild(document.createTextNode(this.university + ", " + this.course + " курс"));
		studentP.className = "subname";

		mainDiv.appendChild(img);
		mainDiv.appendChild(nameP);
		mainDiv.appendChild(studentP);
		return mainDiv;
	}
}

class SchoolPersonFactory{
	create(item){
		if( item.hasOwnProperty("course") ){
			return new Student(item);
		}
		else
		if( item.hasOwnProperty("workFrom") ){
			return new Teacher(item);
		}
		else
		{
			return new Person(item);
		}
	}
}

class School{

	_humans = [];

	constructor( schoolTitle ){
		this._factory = new SchoolPersonFactory();
		this.title = schoolTitle;
	}

	addHuman(item){
		let new_human = this._factory.create(item);
		this._humans[new_human.name] = new_human;
		return this._humans[new_human.name];
	}

	search(name){
		return this._humans[name];
	}

	delete(name){
		delete this._humans[name];
	}

	renderHuman(cont, name = null){
		if(name){
			this._humans[name].appendToDOM(this._humans[name].renderCard(), cont);
		}
		else{
			Object.keys(this._humans).forEach( (human) => { this._humans[human].appendToDOM(this._humans[human].renderCard(), cont);  } );
		}
	}

	renderByType(cont, type){
		Object.keys(this._humans).forEach( (human) => { 
			if( this._humans[human] instanceof type ){
				this._humans[human].appendToDOM(this._humans[human].renderCard(), cont);
			}  
		} );
	}
}