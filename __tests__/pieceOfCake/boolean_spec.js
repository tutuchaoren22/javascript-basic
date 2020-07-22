describe('for boolean type', () => {
    it('should convert to same type then compare for equality operator', () => {
        const objectLeft = { key: 'value' };
        const objectRight = { key: 'value' };

        const actual = [
            1 == 1, '1' == 1, 1 == '1', 0 == false, 0 == null, objectLeft == objectRight, 0 == undefined, null == undefined,
        ];
        const expected = [true, true, true, true, false, false, false, true];

        expect(actual).toEqual(expected);
    });

    it('should not perform type conversion for strict equal operator', () => {
        const objectLeft = { key: 'value' };
        const objectRight = { key: 'value' };

        const actual = [
            3 === 3, 3 === '3', objectLeft === objectRight, null === undefined,
        ];
        const expected = [true, false, false, false];

        expect(actual).toEqual(expected);
    });
});