import { LightningElement, wire, track } from 'lwc';
import { fireEvent, registerListener, unregisterAllListeners } from 'c/pubsub';
import fetchRecordsMethod from '@salesforce/apex/FetchBikes.fetchRecord';
import { CurrentPageReference } from 'lightning/navigation';
import BIKE_ASSETS from '@salesforce/resourceUrl/bike_assets';

export default class BikeListComponent extends LightningElement {
  @wire(CurrentPageReference) pageRef;
  @track bikes;
  image = BIKE_ASSETS + '/logo.svg';
  sliderValue;
  categoryValue;
  materialValue;
  levelValue;
  @track currentPageNumber = 1;

  get bikesPerPage(){
    const currentBikesSection = (this.currentPageNumber-1)*4;
    return this.bikes.slice(currentBikesSection, currentBikesSection+4);
  }

  get isFirstPage() {
    if (this.currentPageNumber === 1) {
      return true;
    }
    return false;
  }
  get isLastPage() {
    if (this.currentPageNumber === this.maxPageNumber) {
      return true;
    }
    return false;
  }
  get itemsSize() {
    return this.bikes.length;
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
    fireEvent(this.pageRef, 'selectedbikeevent', selectedBike);
  }

  connectedCallback() {
    registerListener('searchvalueevent', this.handleSearchEvent, this);
    registerListener('slidervalueevent', this.handleSliderEvent, this);
    registerListener('categoryvalueevent', this.handleCategoryEvent, this);
    registerListener('materialvalueevent', this.handleMaterialEvent, this);
    registerListener('levelvalueevent', this.handleLevelEvent, this);
  }
  handleSearchEvent(searchValue) {
    this.searchValue = searchValue.toString();
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
        console.log('Error1 ' + error.body.message);
      });
  }
  handleSliderEvent(sliderValue) {
    this.sliderValue = sliderValue;
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
        console.log('Error1 ' + error.body.message);
      });
  }
  handleCategoryEvent(categoryValue) {
    this.categoryValue = categoryValue;
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
        console.log('Error2 ' + error);
      });
  }
  handleMaterialEvent(materialValue) {
    this.materialValue = materialValue;
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
        console.log('Error3 ' + error);
      });
  }
  handleLevelEvent(levelValue) {
    this.levelValue = levelValue;
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
        console.log('Error4 ' + error.body.message);
      });
  }
  disconnectedCallback() {
    unregisterAllListeners(this);
  }
}
