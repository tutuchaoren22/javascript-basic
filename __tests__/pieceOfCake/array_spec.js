describe('for array', () => {
    it('should get element of an array', () => {
        const array = [1, 2, 3, 4, 5];
        const expected = array[2];
        expect(array[2]).toEqual(expected);
    });

    it('should be able to push elements into array', () => {
        const array = [1, 2, 3, 4, 5];
        var count = array.push(6, 7, 8);
        expect(array).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should be able to spread to array elements', () => {
        const array = [1, 2, 3, 4, 5];
        const newArray = [9, ...array, 10];
        const expected = [9, 1, 2, 3, 4, 5, 10];
        expect(newArray).toEqual(expected);
    });

    it('should destruct array', () => {
        const [row, column] = [2, 3];
        const expectedRow = 2;
        const expectedColumn = 3;
        expect(row).toEqual(expectedRow);
        expect(column).toEqual(expectedColumn);
    });

    it('should filter array', () => {
        const numbers = [1, 2, 3, 4, 5];
        const filtered = numbers.filter(n => n % 2 === 0);
        const expected = [2, 4];;
        expect(filtered).toEqual(expected);
    });

    it('should map array element to other value', () => {
        const numbers = [1, 2, 3, 4, 5];
        const mapped = numbers.map((n, i) => `Unit ${n} for element at index ${i}`);
        const expected = ['Unit 1 for element at index 0',
            'Unit 2 for element at index 1',
            'Unit 3 for element at index 2',
            'Unit 4 for element at index 3',
            'Unit 5 for element at index 4'
        ];
        expect(mapped).toEqual(expected);
    });

    it('should summarize with reduce', () => {
        const numbers = [1, 2, 3, 4, 5];
        const reduced = numbers.reduce((prev, current) => prev + current);
        const expected = 15;
        expect(reduced).toEqual(expected);
    });
});