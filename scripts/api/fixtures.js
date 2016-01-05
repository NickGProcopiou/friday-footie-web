var $ = require("jquery");

var host = "http://football-api.com/api/";

var APIKey = "8d61eac9-aec2-a755-a56cf89319c4"

// &comp_id=1204&&from_date=19.12.2015&&to_date=22.12.2015

module.exports = {

    loadFixtures: function(from_date, to_date) {

        return $.ajax({
            // dataType: "jsonp",
            url: host + "?Action=fixtures" + "&APIKey=" + APIKey + "&comp_id=1204&from_date=" + from_date + "&to_date=" + to_date,
            //contentType: 'application/json',
            //contentType: 'application/x-www-form-urlencoded',
            xhrFields: {
                withCredentials: true
            }
        });
    }
};