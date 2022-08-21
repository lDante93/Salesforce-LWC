import { LightningElement } from 'lwc';

export default class ParentLifeCycleComponent extends LightningElement {

    constructor(){
        super();
        console.log('Parent Constructor');
    }
    connectedCallback(){
        console.log('Parent Connected');
    }
    renderedCallback(){
        console.log('Parent Rendered');
    }
    disconnectedCallback(){
        console.log('Parent Disconnected');
    }
}