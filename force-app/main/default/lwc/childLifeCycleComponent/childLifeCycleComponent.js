import { LightningElement } from 'lwc';

export default class ChildLifeCycleComponent extends LightningElement {
    
    constructor(){
        super();
        console.log('Child Constructor');
    }
    connectedCallback(){
        console.log('Child Connected');
    }
    renderedCallback(){
        console.log('Child Rendered');
    }
    disconnectedCallback(){
        console.log('Child Disconnected');
    }

}