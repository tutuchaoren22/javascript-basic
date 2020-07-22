describe('for variable', () => {
    it('should have function scope for var variable', () => {
        for (var i = 0; i <= 5; i += 1) {}
        const expected = 6;
        expect(i).toEqual(expected);
    });

    it('should have block scope for let and const variable', () => {
        let i = 1000;
        for (let i = 0; i <= 5; i += 1) {}
        const expected = 1000;
        expect(i).toEqual(expected);
    });

    it('should be able to change details of const variable', () => {
        const constVariable = { name: 'changeit' };
        constVariable.name = 'new name';
        const expected = 'new name';
        expect(constVariable.name).toEqual(expected);
    });
});