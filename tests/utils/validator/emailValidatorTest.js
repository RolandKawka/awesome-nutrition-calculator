const emailValidator = require('../../../utils/validator/emailVaildator');
const chai = require('chai');
const assert = chai.assert;

describe('isEmailValid', function() {
    const testCases = [
        {args: ['example@email.com'], expected: true},
        {args: ['example@email'], expected: false},
        {args: ['example@email@email.com'], expected: false},
        {args: ['example.com'], expected: false},
        {args: ['@email.com'], expected: false},
    ];

    testCases.forEach(function(testCase) {
        it('Correctly checks email', function() {
            const result = emailValidator.isEmailValid.apply(null, testCase.args)
            assert.equal(result, testCase.expected);
        });
    });
});
