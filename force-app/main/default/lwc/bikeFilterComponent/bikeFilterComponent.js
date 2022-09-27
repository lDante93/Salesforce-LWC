import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { publish, MessageContext } from 'lightning/messageService';
import filterMessageChannel from '@salesforce/messageChannel/BikeFilterMessageChannel__c';

export default class BikeFilterComponent extends LightningElement {
  @wire(MessageContext)
  messageContext;

  @wire(CurrentPageReference) pageRef;

  category = [];
  material = [];
  level = [];
  searchValue;
  sliderValue = 0;


  get categoryOptions() {
    return [
      { label: 'Mountain', value: 'Mountain' },
      { label: 'Commuter', value: 'Commuter' }
    ];
  }
  get materialOptions() {
    return [
      { label: 'Aluminum', value: 'Aluminum' },
      { label: 'Carbon', value: 'Carbon' }
    ];
  }
  get levelOptions() {
    return [
      { label: 'Beginner', value: 'Beginner' },
      { label: 'Enthusiast', value: 'Enthusiast' },
      { label: 'Racer', value: 'Racer' }
    ];
  }
  
  handleFilter(event) {
    this.searchValue = event.target.value;
    const type = event.currentTarget.dataset.type;
    publish(this.messageContext, filterMessageChannel, {type: type, value: this.searchValue});
  }
}
