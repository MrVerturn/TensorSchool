export class Component{
    constructor(){
        this.container = null;
    }

    render(){
        return document.createElement('div');
    }

    mount(container, position){
        this.beforeMount();

        this.parent = container;
        this.container = this.render();
        container.insertAdjacentElement(position  || 'beforeend', this.container);

        this.afterMount();
    }

    unmount(){
        this.beforeUnmount();
        this.remove();
  
        this.afterUnmount();
    }

    update(){

    }

    remove(){
        if (this.container) {
            this.container.remove();
            this.container = undefined;
        }
    }

    beforeMount() {}

    afterMount() {}

    beforeUnmount() {}

    afterUnmount() {}

    beforeUpdate() {}

    afterUpdate() {}
}

export default Component;
