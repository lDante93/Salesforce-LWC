import { LightningElement, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class BikeFilterComponent extends LightningElement {
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
  
  handleSearchInput(event) {
    this.searchValue = event.target.value;
    fireEvent(this.pageRef, 'searchvalueevent', this.searchValue);
  }
  handleSliderInput(event) {
    this.sliderValue = event.target.value;
    fireEvent(this.pageRef, 'slidervalueevent', this.sliderValue);
  }
  handleCategoryChange(event) {
    this.category = event.detail.value;
    fireEvent(this.pageRef, 'categoryvalueevent', this.category);
  }
  handleMaterialChange(event) {
    this.material = event.detail.value;
    fireEvent(this.pageRef, 'materialvalueevent', this.material);
  }
  handleLevelChange(event) {
    this.level = event.detail.value;
    fireEvent(this.pageRef, 'levelvalueevent', this.level);
  }
}
