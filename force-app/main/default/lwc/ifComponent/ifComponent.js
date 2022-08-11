import { LightningElement } from 'lwc';

export default class IfComponent extends LightningElement {
    flag = true;

handleClick(event){
    this.flag = !this.flag;
}


}