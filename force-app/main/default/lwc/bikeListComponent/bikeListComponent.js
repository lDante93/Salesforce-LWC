import { LightningElement, wire } from "lwc";
import { fireEvent } from "c/pubsub";
import fetchRecordsMethod from "@salesforce/apex/FetchBikes.fetchRecord";
import { CurrentPageReference } from "lightning/navigation";

export default class BikeListComponent extends LightningElement {
  @wire(CurrentPageReference) pageRef;
  @wire(fetchRecordsMethod) bikes;
  get hasBikes() {
    console.log("hasBikes");
    if (this.bikes && Array.isArray(this.bikes.data)) {
      console.log("hasBikes " + this.bikes);
      return true;
    }
    return false;
  }
  handleListClick(event) {
    console.log(
      "handleListClick event.currentTarget.id " + event.currentTarget.id
    );
    console.log("handleListClick this.bikes " + this.bikes);
    console.log(
      "handleListClick JSON.stringify(this.bikes.data) " +
        JSON.stringify(this.bikes.data)
    );
    const selectedBike = this.bikes.data.find(
      (element) => element.Id === (event.currentTarget.id).substring(0,18)
      // (element) => element.Id === (event.currentTarget.id).substring(0,18)
    );
    console.log("handleListClick selectedBike " + JSON.stringify(selectedBike));
    fireEvent(this.pageRef, "selectedbikeevent", selectedBike);
  }
}
