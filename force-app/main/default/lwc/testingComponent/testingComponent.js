import { LightningElement, api } from 'lwc';

export default class TestingComponent extends LightningElement {

    @api person = 'World';
}