import EventEmitter from 'events';

describe('for event', () => {
    function waitForEvents() {
        return new Promise(resolve => setTimeout(() => resolve(), 0));
    }

    it('should capture event', (done) => {
        const element = new EventEmitter();
        const logs = [];

        function onClick() {
            logs.push('I have been clicked.');
            done();
        }

        element.addListener('click', () => {
            onClick();
        });
        element.emit('click');
    }, 1000 /* 1 second to timeout */ );

    it('should invoke multiple times', (done) => {
        const element = new EventEmitter();
        const logs = [];

        element.addListener('click', () => logs.push('I have been clicked'));
        element.emit('click');
        element.emit('click');

        waitForEvents()
            .then(() => {
                const expected = ['I have been clicked', 'I have been clicked'];
                expect(logs).toEqual(expected);
                done();
            });
    });

    it('should remove event listener', (done) => {
        const element = new EventEmitter();
        const logs = [];

        element.addListener('click', () => {
            logs.push('I have been clicked');
            element.removeAllListeners('click');
        });
        element.emit('click');
        element.emit('click');

        waitForEvents()
            .then(() => {
                const expected = ['I have been clicked'];
                expect(logs).toEqual(expected);
                done();
            });
    });
});