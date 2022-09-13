import { LightningElement, wire, track } from 'lwc';
import fetchRecordsMethod from '@salesforce/apex/FetchContact.fetchRecords';
export default class ApexRecordsComponent extends LightningElement {
    // used when wiring from start
    // @wire(fetchRecordsMethod) contacts;

    // invoking later in button handler so only track decorator
    @track contacts;

    @track numberOfRecords;

    inputHandler(event){
        this.numberOfRecords=event.target.value;
        console.log(this.numberOfRecords);
    }
    buttonHandler(event){
        fetchRecordsMethod({numberOfRecords:this.numberOfRecords}).then(response=>{
            this.contacts=response;
        }).catch(error=>{
            console.log('Error'+error.body.message);
        })
    }

    get hasContacts(){

        if(this.contacts){
            return true;
        }else{
            return false;
        }
    }

}