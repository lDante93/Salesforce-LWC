import { LightningElement, track } from 'lwc';

export default class ParentCommunicationComponent extends LightningElement {

@track messageHTML;
@track messageJS;

//1 Parent to Child Communication
handleInput(event){
    this.template.querySelector('c-child-communication-component').methodUsedByParent(event.target.value);
}

//2 Child to Parent Communication


parentHandlerHTML(event){
    this.messageHTML = event.detail;
}

constructor(){
    super();
    this.template.addEventListener('mycustomeventjs', this.parentHandlerJS.bind(this));
}
parentHandlerJS(event){
    this.messageJS = event.detail;
}
}