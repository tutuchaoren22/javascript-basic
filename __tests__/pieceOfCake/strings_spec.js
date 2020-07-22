describe('for strings', () => {
    it('should get character at certain position', () => {
        const string = 'Hello';
        const characterWithinRange = string[1];
        const characterOutOfRange = string[10];
        const expectedCharWithinRange = 'e';
        const expectedCharOutOfRange = undefined;

        expect(characterWithinRange).toEqual(expectedCharWithinRange);
        expect(characterOutOfRange).toEqual(expectedCharOutOfRange);
    });

    it('should use template string to create strings', () => {
        const variable = 'World';
        const template = `Hello ${variable}`;
        const expected = 'Hello World';

        expect(template).toEqual(expected);
    });

    it('should get substring', () => {
        const string = 'coconuts';
        const expected = 'nut';

        expect(string.slice(4, 7)).toEqual(expected);
    });

    it('should get first index of a string', () => {
        const string = 'coconuts';
        const expected = 5;

        expect(string.indexOf('ut')).toEqual(expected);
    });

    it('should be able to trim string', () => {
        const string = ' coconuts \n';
        const expected = 'coconuts';

        expect(string.trim()).toEqual(expected);
    });

    it('should split string', () => {
        const words = 'what a beautiful    day';
        const splitted = words.split(' ');
        const expected = ['what', 'a', 'beautiful', '', '', '', 'day'];

        expect(splitted).toEqual(expected);
    });

    it('should join strings', () => {
        const splitted = ['what', 'a', 'beautiful', 'day'];
        const expected = 'what->a->beautiful->day';

        expect(splitted.join('->')).toEqual(expected);
    });

    it('should be aware to the codepoint larger than 16-bit', () => {
        const emoji = '🐴👟';
        const expected = 4;

        expect(emoji.length).toEqual(expected);
    });
});