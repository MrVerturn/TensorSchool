import Person from "../js/person.js";
import Button from "../js/button.js";
import Popup from "../js/popup.js"; 
import Factory from "../js/factory.js"; 
import Person_catalog from "../js/persons_catalog.js"; 

describe("Test block", function() {
   'use strict';
    it('Test name and description', function() {
        // arrange
        let variable = 1;

        // act
        variable += 1;

        //assert
        assert.equal(variable, 2);
    })
});

describe("FormToJson", function() {
    'use strict';
     it('Test name and description', function() {
         // arrange
        let catalog = new Person_catalog();
        let cont = document.createElement("div");
        catalog.mount(cont);
         // act

        let data = document.createElement("form");
        let input = document.createElement("input");
        input.name = "test";
        input.value = "test";
        data.insertAdjacentElement("beforeend", input);

        let json = catalog.formToJSON(data);
        let ref_json = {"test": "test"};

         assert.equal(JSON.stringify(json), JSON.stringify(ref_json));
     })
 });

 describe("AddElement",   function() {
    'use strict';
     it('Test name and description', async function() {
         // arrange

         this.timeout(100000);
        let catalog = new Person_catalog( "http://localhost:3000/" );
        let cont = document.createElement("div");
        catalog.mount(cont);

        //let send_json = {"title": "title", "study" : "study"};

        //catalog.sendNewPerson(send_json);

        let promis = await catalog.getList();

        let res = promis.status;

        
        assert.equal(res, 200);
     })
 });


mocha.run();
