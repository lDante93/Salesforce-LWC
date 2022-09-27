import { LightningElement, wire, track } from 'lwc';
import fetchRecordsMethod from '@salesforce/apex/FetchBikes.fetchRecord';
import { CurrentPageReference } from 'lightning/navigation';
import BIKE_ASSETS from '@salesforce/resourceUrl/bike_assets';
import {
  publish,
  MessageContext,
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
} from 'lightning/messageService';
import bikeMessageChannel from '@salesforce/messageChannel/BikeDetailMessageChannel__c';
import filterMessageChannel from '@salesforce/messageChannel/BikeFilterMessageChannel__c';

export default class BikeListComponent extends LightningElement {
  @wire(MessageContext)
  messageContext;

  @wire(CurrentPageReference) pageRef;
  @track bikes;
  image = BIKE_ASSETS + '/logo.svg';
  sliderValue;
  categoryValue;
  materialValue;
  levelValue;
  currentPageNumber = 1;

  get bikesPerPage() {
    const currentBikesSection = (this.currentPageNumber - 1) * 4;
    return this.bikes.slice(currentBikesSection, currentBikesSection + 4);
  }

  get isFirstPage() {
    return this.currentPageNumber === 1;
  }
  get isLastPage() {
    return this.currentPageNumber === this.maxPageNumber;
  }
  get itemsSize() {
    return this.bikes ? this.bikes.length : 0;
  }
  get maxPageNumber() {
    return this.itemsSize / 4;
  }

  get hasBikes() {
    if (this.bikes && Array.isArray(this.bikes) && this.bikes.length > 0) {
      return true;
    }
    return false;
  }
  handleBackPage() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber -= 1;
    }
  }
  handleNextPage() {
    if (this.currentPageNumber < this.itemsSize / 4) {
      this.currentPageNumber += 1;
    }
  }

  handleListClick(event) {
    const selectedBike = this.bikes.find(
      (element) => element.Id === event.currentTarget.id.substring(0, 18)
    );
    publish(this.messageContext, bikeMessageChannel, selectedBike);
  }

  handleSearchEvent(searchValue) {
    this.searchValue = searchValue.toString();
    this.fetchData();
  }
  handleSliderEvent(sliderValue) {
    this.sliderValue = sliderValue;
    this.fetchData();
  }
  handleCategoryEvent(categoryValue) {
    this.categoryValue = categoryValue;
    this.fetchData();
  }
  handleMaterialEvent(materialValue) {
    this.materialValue = materialValue;
    this.fetchData();
  }
  handleLevelEvent(levelValue) {
    this.levelValue = levelValue;
    this.fetchData();
  }

  fetchData() {
    fetchRecordsMethod({
      searchValue: this.searchValue,
      sliderValue: this.sliderValue,
      categoryValue: this.categoryValue,
      materialValue: this.materialValue,
      levelValue: this.levelValue,
    })
      .then((response) => {
        this.bikes = response;
        this.currentPageNumber = 1;
      })
      .catch((error) => {
        console.log('Error ' + error.body.message);
      });
  }

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        filterMessageChannel,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE }
      );
    }
  }
  handleMessage(message) {
    if(message.type === 'search'){
      this.handleSearchEvent(message.value);
    }
    if(message.type === 'slider'){
      this.handleSliderEvent(message.value);
    }
    if(message.type === 'category'){
      this.handleCategoryEvent(message.value);
    }
    if(message.type === 'material'){
      this.handleMaterialEvent(message.value);
    }
    if(message.type === 'level'){
      this.handleLevelEvent(message.value);
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

