import { LightningElement, api} from 'lwc';

export default class ChildComponent extends LightningElement {

@api people =[
    {name:'Random',
    age:1}
]

@api text = 'Child Hello';
@api show = false;
}