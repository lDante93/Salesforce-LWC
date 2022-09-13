import { LightningElement } from 'lwc';

export default class ChordMainComponent extends LightningElement {


chords = [
    {label: 'C', name:'C', third:'E',fifth:'G', value:'C'},
    {label: 'D', name:'D', third:'F',fifth:'A', value:'D'},
    {label: 'E', name:'E', third:'G',fifth:'B', value:'E'}
]

get returnChords(){
    return this.chords;
}

handleChange(event){
    console.log(event.target.value);
}

}