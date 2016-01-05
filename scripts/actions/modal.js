/**
 * Created by procopiou_nick on 29/09/2015.
 */
var Reflux = require('reflux');

// Define the actions
var actions = Reflux.createActions([
    'open',
    'close'
]);

actions.open.listen(function () {
    var className = document.getElementsByTagName("body")[0].className;
    var newClassName = className.replace(/modalopen/g, "");
    document.getElementsByTagName("body")[0].className =  newClassName + " modalopen";
});

actions.close.listen(function () {
    var className = document.getElementsByTagName("body")[0].className;
    document.getElementsByTagName("body")[0].className =  className.replace(/modalopen/g, "");
});

module.exports = actions;