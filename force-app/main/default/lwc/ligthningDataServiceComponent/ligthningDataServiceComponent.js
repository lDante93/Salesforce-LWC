import { LightningElement, track, wire } from 'lwc';
import {createRecord,getRecord} from 'lightning/uiRecordApi';
const fieldArray=['Contact.LastName', 'Contact.Phone', 'Contact.Email'];


export default class LigthningDataServiceComponent extends LightningElement {


@track recordId;
@track name;
@track phone;
@track email;
@wire(getRecord, {recordId:'$recordId', fields:fieldArray}) contactRecord;

nameHandler(event){
    this.name=event.target.value;
}

phoneHandler(event){
    this.phone=event.target.value;

}
emailHandler(event){
    this.email=event.target.value;

}
handleClick(event){
    const fields ={'LastName':this.name, 'Phone':this.phone, 'Email':this.email};
    const recordInput={'apiName':'Contact', fields};

    createRecord(recordInput).then(response=>{
        this.recordId=response.id;
        console.log('Contact has been created.');
    }).catch(error=>{
        console.log('Error: '+error.body.message);
    })
    console.log('click');
}

get returnName(){
    if(this.contactRecord.data){
        return this.contactRecord.data.fields.LastName.value;
    }else{
        return undefined;
    }
}
get returnPhone(){
    if(this.contactRecord.data){
        return this.contactRecord.data.fields.Phone.value;
    }else{
        return undefined;
    }
}
get returnEmail(){
    if(this.contactRecord.data){
        return this.contactRecord.data.fields.Email.value;
    }else{
        return undefined;
    }
}
}