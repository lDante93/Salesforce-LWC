import { LightningElement, api, track } from 'lwc';

export default class ChildCommunicationComponent extends LightningElement {

@track message;
//1 Parent to Child Communication
@api
methodUsedByParent(text){
    this.message = text.toUpperCase();
}

//2 Child to Parent Communication
childHandlerHTML(event){
    const nameHTML = event.target.value;
    const myEvent = new CustomEvent('mycustomeventhtml', {detail:nameHTML});
    this.dispatchEvent(myEvent);
}
childHandlerJS(event){
    const nameJS = event.target.value;
    const myEvent = new CustomEvent('mycustomeventjs', {detail:nameJS, bubbles:true});
    this.dispatchEvent(myEvent);
}
}