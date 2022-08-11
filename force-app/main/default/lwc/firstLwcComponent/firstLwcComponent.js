import { LightningElement, track } from 'lwc';

export default class FirstLwcComponent extends LightningElement {

@track greeting = 'World'
changeHandler(event)
{
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);
    this.greeting=event.target.value;
}


}