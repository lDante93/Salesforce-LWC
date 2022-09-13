import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ToastNotificationComponent extends LightningElement {

    successHandler(){
            const event = new ShowToastEvent({
                title: 'Success',
                message: 'Success message',
                variant: 'success'
            });
            this.dispatchEvent(event);
    }

    errorHandler(){
        const event = new ShowToastEvent({
            title: 'Errpr',
            message: 'Error message',
            variant: 'error'
        });
        this.dispatchEvent(event);
    }
    warningHandler(){
            const event = new ShowToastEvent({
                title: 'Warning',
                message: 'Warning message',
                variant: 'warning'
            });
            this.dispatchEvent(event);
    }
    infoHandler(){
            const event = new ShowToastEvent({
                title: 'Info',
                message: 'Info message',
                variant: 'info'
            });
            this.dispatchEvent(event);
    }

}