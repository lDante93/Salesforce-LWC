import { LightningElement, wire, track } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import BIKE_ASSETS from '@salesforce/resourceUrl/bike_assets';

export default class BikeDetailComponent extends LightningElement {
  @wire(CurrentPageReference) pageRef;
  @track bike;
  image = BIKE_ASSETS + '/logo.svg';

  handleEvent(selectedBike) {
    this.bike = selectedBike;
  }

  get hasBike() {
    if (this.bike) {
      return true;
    }
    return false;
  }

  connectedCallback() {
    registerListener('selectedbikeevent', this.handleEvent, this);
  }
  disconnectedCallback() {
    unregisterAllListeners(this);
  }
}
