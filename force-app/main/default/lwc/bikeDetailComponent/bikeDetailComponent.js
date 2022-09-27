import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import BIKE_ASSETS from '@salesforce/resourceUrl/bike_assets';
import bikeMessageChannel from '@salesforce/messageChannel/BikeDetailMessageChannel__c';
import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext,
} from 'lightning/messageService';

export default class BikeDetailComponent extends LightningElement {
  @wire(MessageContext)
  messageContext;

  @wire(CurrentPageReference) pageRef;
  @track bike;
  image = BIKE_ASSETS + '/logo.svg';

  handleMessage(selectedBike) {
    this.bike = selectedBike;
  }

  get hasBike() {
    return !!this.bike;
  }

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        bikeMessageChannel,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE }
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }
  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }
}
