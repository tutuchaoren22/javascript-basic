describe('for function', () => {
    it('should be able to define function in function scope', () => {
        function outerFunction() {
            const myName = 'World';

            function innerFunction() {
                return `Hello ${myName}`;
            }

            return innerFunction();
        }

        const expected = 'Hello World';
        expect(outerFunction()).toEqual(expected);
    });

    it('should pass function as value', () => {
        const sayHello = () => 'Hello';

        function greeting(prefixGenerator, name) {
            return `${prefixGenerator()} ${name}`;
        }

        const expected = 'Hello World';
        expect(greeting(sayHello, 'World')).toEqual(expected);
    });

    it('should allow optional arguments for any function', () => {
        function square(x) { return x * x; }

        const expected = 36;
        expect(square(6, 'Hello', 4)).toEqual(expected);
    });

    it('should be undefined for not specified parameter', () => {
        function minus(left, right) {
            if (right === undefined) { return -left; }
            return left - right;
        }

        const expectedForSingleArgument = -5;
        const expectedForTwoArguments = 2;
        expect(minus(5)).toEqual(expectedForSingleArgument);
        expect(minus(5, 3)).toEqual(expectedForTwoArguments);
    });

    it('should specify default parameters', () => {
        function power(base, exponent = 2) {
            let result = 1;
            for (let count = 0; count < exponent; count += 1) {
                result *= base;
            }
            return result;
        }

        const expected = 16;
        expect(power(4)).toEqual(expected);
    });

    it('should not modify the original variable', () => {
        let guessIfIAmChanged = 'Origin';

        function transferToAnotherWord(word) {
            word = 'Changed';
            return word;
        }

        const returnValue = transferToAnotherWord(guessIfIAmChanged);
        const expectedReturnValue = 'Changed';
        const expectedWord = 'Origin';
        expect(returnValue).toEqual(expectedReturnValue);
        expect(guessIfIAmChanged).toEqual(expectedWord);
    });

    it('should modify the content of the variable', () => {
        const person = {};

        function addName(person, name) {
            person.name = name;
            return person;
        }

        const returnValue = addName(person, 'Bob');
        const expectedName = 'Bob';
        const expectedReturnValueName = 'Bob';

        expect(person.name).toEqual(expectedName);
        expect(returnValue.name).toEqual(expectedReturnValueName);
    });

    it('should capture local variables', () => {
        function wrapValue() {
            const localVariable = 'Hello';
            return () => localVariable;
        }

        const actual = wrapValue()();
        const expected = 'Hello';
        expect(actual).toEqual(expected);
    });

    it('should change captured variable', () => {
        let guessIfIAmChanged = 'Origin';

        function wrapValue() {
            return () => { guessIfIAmChanged = 'Changed'; };
        }

        wrapValue()();
        const expected = 'Changed';
        expect(guessIfIAmChanged).toEqual(expected);
    });

    it('should create some recursion trick', () => {
        function findSolution(target) {
            function find(current, history) {
                if (current == target) { return history; }
                if (current > target) { return null; }
                return find(current + 5, `(${history} + 5)`) ||
                    find(current * 3, `(${history} * 3)`);
            }

            return find(1, '1');
        }

        const expected = '(((1 * 3) + 5) * 3)';
        expect(findSolution(24)).toEqual(expected);
    });

    it('should accept any number of parameters', () => {
        function sum(...numbers) {
            let result = 0;
            for (let i = 0; i < numbers.length; i += 1) {
                result += numbers[i];
            }
            return result;
        }

        const expected = 6;
        expect(sum(1, 2, 3)).toEqual(expected);
    });

    it('should also use 3 dot notation to call function with rest parameters', () => {
        function sum(...numbers) {
            let result = 0;
            for (let i = 0; i < numbers.length; i += 1) {
                result += numbers[i];
            }
            return result;
        }

        const expected = 6;
        const parameters = [1, 2, 3];
        const actual = sum(...parameters);

        expect(actual).toEqual(expected);
    });

    it('should be able to passing parameters in mixed way', () => {
        function sum(...numbers) {
            let result = 0;
            for (let i = 0; i < numbers.length; i += 1) {
                result += numbers[i];
            }
            return result;
        }

        const parameters = [1, 2, 3];
        const actual = sum(9, ...parameters, 10);
        const expected = 25;

        expect(actual).toEqual(expected);
    });

    it('should pass pre-defined function as callback', () => {
        function repeat(n, action) {
            for (let i = 0; i < n; i += 1) { action(i); }
        }
        const labels = [];
        repeat(3, index => labels.push(index * 3));

        const expected = [0, 3, 6];
        expect(labels).toEqual(expected);
    });

    it('should create higher order function', () => {
        function greaterThan(n) {
            return value => value > n;
        }

        const greaterThan10 = greaterThan(10);
        const expected = false;

        expect(greaterThan10(3)).toEqual(expected);
    });

    it('should not make you crazy with high order function', () => {
        function noisy(f) {
            return (...args) => f(...args);
        }

        const array = [20, 160, 11];
        const actual = noisy(Math.min)(...array);

        const expected = 11;

        expect(actual).toEqual(expected);
    });

    it('should not make you crazy even we change the control flow', () => {
        function unless(test, then) { if (!test) then(); }

        function repeat(n, action) {
            for (let i = 0; i < n; i += 1) { action(i); }
        }

        const logs = [];

        repeat(5, (n) => {
            unless(n % 2 === 1, () => logs.push(n));
        });
        const expected = [0, 2, 4];
        expect(logs).toEqual(expected);
    });
});