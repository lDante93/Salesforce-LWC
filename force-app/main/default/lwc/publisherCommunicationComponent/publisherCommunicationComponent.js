import { LightningElement, track, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class PublisherCommunicationComponent extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @track color;
    options = [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' }
    ]

    onChangeHandler(event) {
        this.color = event.detail.value;
        fireEvent(this.pageRef, 'mycolorevent', this.color);
    }

}