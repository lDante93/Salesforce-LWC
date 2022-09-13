import { LightningElement,api, track } from 'lwc';

export default class BaseComponent extends LightningElement {

@api recordId;
@track recordIdCreated;


createHandler(event){
    this.recordIdCreated=event.detail.id;
}
}