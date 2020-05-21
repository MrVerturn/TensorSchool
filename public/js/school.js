import {SchoolPersonFactory} from './personLib.js';


export class School{

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