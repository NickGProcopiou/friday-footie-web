var $ = require("jquery"),
    devPath = "http://127.0.0.1:8000",
    userProdPath = "http://127.0.0.1:8000",
    passwordProdPath = "/passwordreset";

var userPath = window.location.href.indexOf("dev") > -1 ? devPath : userProdPath;
var passwordPath = window.location.href.indexOf("dev") > -1 ? devPath + passwordProdPath: userProdPath + passwordProdPath;


module.exports = {
    register: function(user) {
        return $.ajax({
            dataType: "json",
            url: userPath + "/register",
            type: "POST",
            data: JSON.stringify(user),
            contentType: 'application/json'
        });
    },

    verify: function(token) {
        return $.ajax({
            url: userPath + "/verify",
            type: "POST",
            data: JSON.stringify({token: token}),
            contentType: 'application/json'
        });
    },

    resendVerificationEmail: function(token) {
        return $.ajax({
            url: userPath + "/verify/resend",
            type: "POST",
            data: JSON.stringify({token: token}),
            contentType: 'application/json'
        });
    },

    authenticate: function(user) {
        return $.ajax({
            dataType: "json",
            url: userPath + "/authenticate",
            type: "POST",
            data: JSON.stringify(user),
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        });
    },

    getUserProfile: function(){
        return $.ajax({
            dataType: "json",
            url: userPath + "/profile",
            type: "GET",
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        });
    },

    saveUserProfile: function(profile){
        return $.ajax({
            url: userPath + "/profile/"+profile.id,
            type: "POST",
            data: JSON.stringify(profile),
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        });
    },

    getUserDirectory: function(){
        return $.ajax({
            dataType: "json",
            url: userPath + "/directory",
            type: "GET",
            xhrFields: {
                withCredentials: true
            }
        })
    },

    sendPasswordReminder: function(email) {
        return $.ajax({
            url: passwordPath + "/send",
            type: "POST",
            data: JSON.stringify({email: email}),
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        });
    },
    
    resetPassword: function(password, token) {
        return $.ajax({
            url: passwordPath + "/update",
            type: "POST",
            data: JSON.stringify({password: password, token: token}),
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        });
    }
};