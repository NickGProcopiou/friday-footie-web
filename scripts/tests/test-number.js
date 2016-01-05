/**
 * Created by Procopiou Nick on 9/8/2015.
 */


var assert = require("assert");

describe('Number', function() {
    describe('#typeOf()', function () {
        it('should return "number" when its a number and not when its not', function () {

            assert.equal('number', typeof(9));
            assert.notEqual('number', typeof({}));

        });
    });
});
