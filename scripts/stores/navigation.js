var Reflux = require('reflux');
var React = require('react');
var $ = require('jquery');

var navigationActions = require('actions/navigation');

// Export the Reflux Store
module.exports = Reflux.createStore({
    namespace: 'navigation',

    data: {
        active: undefined,
        activeData: undefined
    },

    pages: [

        // User
        {name: "SignIn", title: "",                                 url: "/user/signin"},
        {name: "Login", title: "",                                  url: "/user/login"},
        {name: "Join", title: "",                                   url: "/user/join"},
        {name: "ResetPassword", title: "",                          url: "/user/resetpassword"},
        {name: "NewPassword", title: "",                            url: "/user/newpassword"},
        {name: "JoinConfirmation", title: "",                       url: "/user/joinconfirm"},
        {name: "ResetPasswordConfirmation", title: "",              url: "/user/resetpasswordconfirm"},
        // Play
        {name: "Profile",   title: "", url: "/play/profile"},
        {name: "FAQs",      title: "", url: "/play/faqs"},
        {name: "Teams",     title: "", url: "/play/teams"},
        {name: "Fixtures",  title: "", url: "/play/fixtures"}
    ],

    defaultPages: {
        play: "Teams",
        user: "SignIn"
    },

    init: function() {

        var that = this;

        this.listenTo(navigationActions.changePage, 'changePage');
        this.listenTo(navigationActions.getPageLoadPathAndSetLandingPage, 'getPageLoadPathAndSetLandingPage');

        window.onpopstate = function (event) {
            if(event.state) {
                that.changePage(event.state.name, event.state.ventureId, false);
            }
        }
    },

    getPageLoadPathAndSetLandingPage: function(defaultpage){

        var pathname   = window.location.pathname;
        var that = this;
        var page = "";

        for (var i=0; i<this.pages.length; i++) {

            page = this.pages[i];

            if (page.url.toLowerCase() === pathname.toLowerCase()){
                that.changePage(page.name, null, true, true);
                return;
            }

            if (page.regex){
                var match = pathname.match(page.regex);
                if (match) {
                    that.changePage(page.name, match[1], true, true);
                    //projectsActions.loadProject(match[1]);
                    return;
                }
            }
        }

        this.setDefaultPage(defaultpage)
    },

    setDefaultPage: function(page){
        this.changePage(this.defaultPages[page]);
    },

    changePage: function(newPage, ventureId, shouldStoreState, maintainQuerystring){

        var prevPage = this.data.active;

        var newPage = this.pages.filter(function(page){
            return newPage.toLowerCase() === page.name.toLowerCase();
        })[0];

        var querystring = maintainQuerystring ? window.location.search : ""  ;

        if (prevPage !== newPage) {

            this.data.active = newPage;
            $("main").scrollTop(0);

            shouldStoreState = shouldStoreState !== undefined ? shouldStoreState : true;

            if (shouldStoreState) {

                history.pushState({
                    ventureId: ventureId,
                    name: newPage.name
                }, newPage.title, newPage.url.replace(/ *\([^)]*\) */g, ventureId) + querystring);
            }

            this.data.activeData = ventureId;
            this.done();

        }
    },

    // Trigger this when finished manipulating the data
    done: function() {
        this.trigger(this.data);
    },

    getInitialState: function() {
        return this.data;
    }


})