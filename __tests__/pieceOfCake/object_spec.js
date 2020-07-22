describe('for object', () => {
    it('should access property via dot or bracket', () => {
        const person = { name: 'Bob' };

        const expectedName = 'Bob';

        expect(person.name).toEqual(expectedName);
        expect(person['name']).toEqual(expectedName);
    });

    it('should get undefined if property is not defined', () => {
        const person = { name: 'Bob' };
        const expected = undefined;

        expect(person.whatTheHellIsThat).toEqual(expected);
    });

    it('should remove object property using delete operator', () => {
        const person = { name: 'Bob' };
        delete person.name;
        expect(person.name).toBeUndefined();
    });

    it('should be able to find all the keys', () => {
        const person = {
            name: 'Bob',
            yearOfBirth: 2019,
        };

        const expected = ["name", "yearOfBirth"];
        expect(Object.keys(person)).toEqual(expected);
    });

    it('should create object with braces expression', () => {
        const person = {
            name: 'Bob',
            greeting: function() { return `Hello, I am ${this.name}`; },
        };

        person.name = 'John';
        const expected = 'Hello, I am John';
        expect(person.greeting()).toEqual(expected);
    });

    it('should destruct object', () => {
        const person = { name: 'Bob', yearOfBirth: 2019 };
        const { name } = person;

        const expected = 'Bob';
        expect(name).toEqual(expected);
    });

    it('should serialize object to JSON', () => {
        const person = { name: 'Bob', yearOfBirth: 2019 };
        const json = JSON.stringify(person);

        const expected = '{"name":"Bob","yearOfBirth":2019}';
        expect(json).toEqual(expected);
    });

    it('should parse JSON to object', () => {
        const json = '{"color":"Red","value":"#ff0000"}';
        const color = JSON.parse(json);

        const expected = { color: 'Red', value: '#ff0000' };
        expect(color).toEqual(expected);
    });

    it('should point to the object it was called on for "this" in a method', () => {
        function speak(line) {
            return `The ${this.type} rabbit says ${line}.`;
        }
        const rabbit = { type: 'white', speak };

        const expected = "The white rabbit says Hello.";
        expect(rabbit.speak('Hello')).toEqual(expected);
    });

    it('should explicitly specify this using call method', () => {
        function speak(line) {
            return `The ${this.type} rabbit says ${line}.`;
        }
        const rabbit = { type: 'white', speak };

        speak.call(rabbit, 'Hello');
        const expected = "The white rabbit says Hello.";
        expect(rabbit.speak('Hello')).toEqual(expected);
    });

    it('should capture this in the scope around it for arrow function', () => {
        function normalize() {
            return this.coords.map(n => n / this.length);
        }

        const actual = normalize.call({ coords: [0, 10, 15], length: 5 });

        const expected = [0, 2, 3];
        expect(actual).toEqual(expected);
    });

    it('should get object prototype for an object', () => {
        const emptyObject = {};

        const expected = emptyObject.__proto__;;
        expect(Object.getPrototypeOf(emptyObject)).toBe(expected);
    });

    it('should get null for object prototype\'s prototype', () => {
        const objectPrototype = Object.prototype;
        const expected = null;
        expect(Object.getPrototypeOf(objectPrototype)).toEqual(expected);
    });

    it('should be able to create object with specified prototype', () => {
        const rabbitPrototype = {
            speak(line) { return `The ${this.type} rabbit says ${line}.`; },
        };
        const killerRabbit = Object.create(rabbitPrototype);
        killerRabbit.type = 'killer';

        const words = killerRabbit.speak('SKREEEE');

        const expected = 'The killer rabbit says SKREEEE.';
        expect(words).toEqual(expected);
    });

    it('should simulate constructor using function, and use function\'s prototype as definition', () => {
        function Rabbit(type) { this.type = type; }
        // eslint-disable-next-line func-names
        Rabbit.prototype.speak = function(line) { return `The ${this.type} rabbit says ${line}.`; };

        const rabbit = new Rabbit('weird');

        const expected = 'The weird rabbit says ?_?.';
        expect(rabbit.speak('?_?')).toEqual(expected);

        const prototypeOfRabbitInstance = Object.getPrototypeOf(rabbit);
        const rabbitFunctionPrototype = Rabbit.prototype;
        const prototypeOfRabbitFunction = Object.getPrototypeOf(Rabbit);
        const functionPrototype = Function.prototype;

        const expectedPrototypeOfRabbitInstance = rabbitFunctionPrototype;
        const expectedPrototypeOfRabbitFunction = functionPrototype;

        expect(prototypeOfRabbitInstance).toBe(expectedPrototypeOfRabbitInstance);
        expect(prototypeOfRabbitFunction).toBe(expectedPrototypeOfRabbitFunction);
    });

    it('should use the class notation rather than the awkward function', () => {
        class Rabbit {
            constructor(type) { this.type = type; }

            speak(line) { return `The ${this.type} rabbit says ${line}.`; }
        }

        const rabbit = new Rabbit('white');
        const expected = 'The white rabbit says Hi.';

        expect(rabbit.speak('Hi')).toEqual(expected);
    });

    it('should overriding property of prototype for an instance', () => {
        class Rabbit {}
        const killerRabbit = new Rabbit();
        Rabbit.prototype.teeth = 'small';

        const expectedKillerRabbitTeeth = 'small';
        expect(killerRabbit.teeth).toEqual(expectedKillerRabbitTeeth);

        killerRabbit.teeth = 'sharp';

        const expectedOverrideKillerRabbitTeeth = 'sharp';
        const expectedRabbitPrototypeTeeth = 'small';
        expect(killerRabbit.teeth).toEqual(expectedOverrideKillerRabbitTeeth);
        expect(Rabbit.prototype.teeth).toEqual(expectedRabbitPrototypeTeeth);
    });

    it('should be the same for method overriding', () => {
        class Rabbit {}
        const killerRabbit = new Rabbit();
        Rabbit.prototype.speak = function() { return 'Hi'; };

        const expectedKillerRabbitSpeak = 'Hi';
        expect(killerRabbit.speak()).toEqual(expectedKillerRabbitSpeak);

        killerRabbit.speak = function() { return '@_@'; };
        const expectedOverrideKillerRabbitSpeak = '@_@';
        const expectedRabbitPrototypeSpeak = 'Hi';

        expect(killerRabbit.speak()).toEqual(expectedOverrideKillerRabbitSpeak);
        expect(Rabbit.prototype.speak()).toEqual(expectedRabbitPrototypeSpeak);
    });

    it('should be able to define getter and setter and static method', () => {
        class Temperature {
            constructor(celsius) { this.celsius = celsius; }

            get fahrenheit() { return this.celsius * 1.8 + 32; }

            set fahrenheit(value) { this.celsius = (value - 32) / 1.8; }

            static fromFahrenheit(value) { return new Temperature((value - 32) / 1.8); }
        }

        const expectedFahrenheit = 71.6;
        expect(new Temperature(22).fahrenheit).toEqual(expectedFahrenheit);
        const expectedCelsius = 30;
        expect(Temperature.fromFahrenheit(86).celsius).toEqual(expectedCelsius);
    });

    it('should inherit from existing class', () => {
        class Rabbit {
            constructor(type) { this.type = type; }

            speak() { return `I am ${this.type} rabbit`; }
        }

        class CrazyRabbit extends Rabbit {
            speak() { return `I am crazy ${this.type} rabbit`; }
        }

        const rabbit = new CrazyRabbit('white');
        const expectedSpeak = `I am crazy white rabbit`;

        expect(rabbit.speak()).toEqual(expectedSpeak);
    });

    it('should determine whether an instance is derived from certain class', () => {
        class Rabbit {
            constructor(type) { this.type = type; }

            speak() { return `I am ${this.type} rabbit`; }
        }

        class CrazyRabbit extends Rabbit {
            speak() { return `I am crazy ${this.type} rabbit`; }
        }

        const rabbit = new CrazyRabbit('white');

        const rabbitIsRabbit = true;
        expect(rabbit instanceof Rabbit).toEqual(rabbitIsRabbit);

        const rabbitIsCrazyRabbit = true;
        expect(rabbit instanceof CrazyRabbit).toEqual(rabbitIsCrazyRabbit);

        const rabbitIsObject = true;
        expect(rabbit instanceof Object).toEqual(rabbitIsObject);

        const rabbitIsNumber = false;
        expect(rabbit instanceof Number).toEqual(rabbitIsNumber);
    });
});