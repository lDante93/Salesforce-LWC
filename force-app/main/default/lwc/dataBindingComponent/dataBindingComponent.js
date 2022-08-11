import { LightningElement, track } from 'lwc';

export default class DataBindingComponent extends LightningElement {

@track name;
@track age;
@track salary;

nameHandler(event){
    console.log(event.target.value);
    this.name=event.target.value;
}
ageHandler(event){
    console.log(event.target.value);
    this.age=event.target.value;
}
salaryHandler(event){
    console.log(event.target.value);
    this.salary=event.target.value;
}
}