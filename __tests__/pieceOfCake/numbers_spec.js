describe('for numbers', () => {
    it('should use real number calculation rather than integer in some languages', () => {
        const dividingResult = 3 / 4;
        const expected = 0.75;

        expect(dividingResult).toEqual(expected);
    });

    it('should be able to check if the number is NaN', () => {
        const notNumber = 0 / 0;
        const isNan = isNaN(notNumber);

        expect(isNan).toBeTruthy();
    });
});