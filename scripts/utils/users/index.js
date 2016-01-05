

module.exports = {

    isUserProfileIncomplete: function(user) {

        return (
            ( user.first_name === undefined || user.first_name === "")  ||
            ( user.last_name  === undefined || user.last_name === "")
        )

    },

    lookUpTeamMember: function(id, directory) {

        var that = this;

        for (var i = 0; i < directory.length; i++) {

            if (directory[i].id === id){

                return that.deepClone(directory[i]);
            }
        }
        
    },

    deepClone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },


    createCookie: function(name,value,days) {

        var expires = "";

        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }

        document.cookie = name+"="+value+expires+"; path=/";

    },


    isEmailValid: function(email){
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    },

    isPasswordValid: function(password){
        var re = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{7,}$/;
        return re.test(password);
    }


};

