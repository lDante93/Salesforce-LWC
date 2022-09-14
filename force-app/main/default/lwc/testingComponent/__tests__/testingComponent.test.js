 import { createElement } from 'lwc';
import TestingComponent from 'c/testingComponent';

describe('c-testing-component', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('First Test', () => {
        // Arrange
        const element = createElement('c-testing-component', {
            is: TestingComponent
        });

        // Act
        document.body.appendChild(element);

        // Assert
         const lightningCard = element.shadowRoot.querySelector('lightning-card');
        expect(lightningCard.textContent).toBe('Hello World!');
    });

    
    it('Second Test', () => {
        // Arrange
        const element = createElement('c-testing-component', {
            is: TestingComponent
        });

        // Act
        element.person='Luki';
        document.body.appendChild(element);

        // Assert
         const lightningCard = element.shadowRoot.querySelector('lightning-card');
        expect(lightningCard.textContent).toBe('Hello Luki!');
    });
});