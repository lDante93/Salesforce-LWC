import { LightningElement } from 'lwc';

export default class IteratorComponent extends LightningElement {

    contacts = [{
        id: 1,
        name: 'Lukasz',
        age: 29
    },
    {
        id: 2,
        name: 'Iza',
        age: 28
    },
    {
        id: 3,
        name: 'Michal',
        age: 30
    }, 
    {
        id: 4,
        name: 'Adam',
        age: 33
    }]

}