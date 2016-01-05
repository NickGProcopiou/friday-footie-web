var Reflux = require('reflux');
var api = require('api/users.js');
var requestUtils = require('utils/request/index.js');

// Define the actions
var actions = Reflux.createActions({
	'setUser': {},
    'saveUserProfile': {
        children: [
            "success",
            "error"
        ]
    },
    'getUserProfile': {
        children: [
            "success",
            "error"
        ]
    },
    'signIn': {
        children: [
            "success",
            "error"
        ]
    },
    'signOut': {},
    'join': {
        children: [
            "success",
            "error"
        ]
    },
    'verify': {
        children: [
            "success",
            "error"
        ]
    },

    resendVerificationEmail: {
        children: [
            "success",
            "error"
        ]
    },

    'getUserDirectory': {
        children: [
            "success",
            "error"
        ]
    },

    'sendPasswordReminder': {
        children: [
            "success",
            "error"
        ]
    },
    'resetPassword': {
        children: [
            "success",
            "error"
        ]
    }

});

actions.join.listen(function(user) {
    api.register(user)
        .done(requestUtils.done(actions.join.success))
        .fail(requestUtils.fail(actions.join.error));
});

actions.verify.listen(function(token) {
    api.verify(token)
        .done(requestUtils.done(actions.verify.success))
        .fail(requestUtils.fail(function(){
            actions.verify.error(token);
        }));
});

actions.resendVerificationEmail.listen(function(token) {
    api.resendVerificationEmail(token)
        .done(requestUtils.done(actions.resendVerificationEmail.success))
        .fail(requestUtils.fail(function(){
            actions.resendVerificationEmail.error(token);
        }));
});

actions.signIn.listen(function(user) {
    api.authenticate(user)
        .done(requestUtils.done(actions.signIn.success))
        .fail(requestUtils.fail(actions.signIn.error));
});

actions.getUserProfile.listen(function() {
    api.getUserProfile()
        .done(requestUtils.done(actions.getUserProfile.success))
        .fail(requestUtils.fail(actions.getUserProfile.error));
});

actions.saveUserProfile.listen(function(user) {
    api.saveUserProfile(user)
        .done(function(){
            requestUtils.done(actions.saveUserProfile.success(user));
        })
        .fail(requestUtils.fail(actions.saveUserProfile.error));
});

actions.getUserDirectory.listen(function() {
    api.getUserDirectory()
        .done(requestUtils.done(actions.getUserDirectory.success))
        .fail(requestUtils.fail(actions.getUserDirectory.error));
});

actions.sendPasswordReminder.listen(function(email) {
    api.sendPasswordReminder(email)
        .done(requestUtils.done(actions.sendPasswordReminder.success))
        .fail(requestUtils.fail(actions.sendPasswordReminder.error));
});

actions.resetPassword.listen(function(password, token) {
    api.resetPassword(password, token)
        .done(requestUtils.done(actions.resetPassword.success))
        .fail(requestUtils.fail(actions.resetPassword.error));
});

module.exports = actions;