import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class SubscriberCommunicationComponent extends LightningElement {
    @track color;
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        registerListener('mycolorevent', this.handleEvent, this);
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleEvent(selectedColor) {
        this.color = selectedColor;
    }

    get colorStyle(){
        return 'background-color:'+this.color;
    }

}