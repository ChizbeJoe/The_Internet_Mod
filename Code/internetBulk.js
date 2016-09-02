var internetMod = {};
var company = GameManager.company;


// $("body").append('<div id="internet"> <table class="navBar"> <tr id="tabBar"> <td id="refresh" onclick="refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i> <td id="email" class="tab" onclick="openEmail()">Email</td> <td id="forum" class="tab" onclick="openForum()"><s>Forum</s></td> <td id="social" class="tab" onclick="openSocial()">Social Network</td> <td id="bug" class="tab" onclick="openBug()"><s>Bug Center</s></td> <td id="exit" class="tabX" onclick="exit()"> </td> </tr> </table> <div class="content"> <div id="emailSITE"> <div class="overview"> <div id="notifs">All Messages</div> <hr> <ul class="priList"> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> </ul> </div> <div class="viewport"> <table class="inNav"> <tr> <td>Phoenix Games</td> <td>Media</td> <td>Companies</td> <td>Fans</td> </tr> </table> <div class="emailMain"> <div class="emailInfo"> Category: Fans <br> From: John Smith <br> <!-- The date below is how Game Dev Tycoon keeps track of time and dates --> Date: yy/mm/dd <br> <br> <div class="emailSubj">Subject: Your amazing game! </div> <hr> <p class="emailENTRY">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. <br><br> Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you!</p> <hr> </div> </div> <div class="inNew"> Compose A New Email </div> </div> </div> <div id="forumSITE"> Sorry <br> Not Available </div> <div id="socialSITE"> <div id="socialNav"> <div id="home" class="flutterBanner">FLUTTER</div> <!-- Insert icons when compiling and organizing --> <div id="navButts"> <div id="home" class="butt">HOME</div> <div id="notifications" class="butt">NOTIFS</div> <div id="trends" class="butt">TRENDS</div> <div id="profile" class="butt">PROFILE</div> </div> </div> <div id="socialContent"> <div id="socialProfile"> <div class="profileInfo"> <img class="profilePic" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"></img> <div class="profileIdenity"> <div class="profileName">John Smith</div> <div class="profileUsername">@jsmith12</div> <textarea maxlength="90" class="profileDesc">Enter a description...</textarea> </div> <div class="profileStats"> <div><b>Followers:</b> <div id="followers" class="proifileStatsEntry">79K</div> </div> <div><b>Likes:</b> <div id="likes" class="proifileStatsEntry">459K</div> </div> <div><b>Dislikes:</b> <div id="dislikes" class="proifileStatsEntry">2331</div> </div> </div> <div class="profileSOMETHING">PUT SOMETHING HERE. Maybe a like/dislike ratio meter.</div> </div> <div class="widget"> <div class="widget-form"> <textarea class="postBox" maxlength="140" id="message" style="resize: none;">Say something... (140 Character Limit)</textarea> <div id="postButton" onclick="postFlutterMessage()">Post</div> </div> <div class="widget-conversation"> <ul id="conversation"> </ul> </div> </div> </div> </div> </div> <div id="bugSITE"> Sorry <br> Not Available </div> <div id="loaders"></div> </div></div>');

// var INcompanyName = GameManager.company.name.localize();

// $("body").append('<div id="internet"> <table class="navBar"> <tr id="tabBar"> <td id="refresh" onclick="refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i> <td id="email" class="tab" onclick="openEmail()">Email</td> <td id="forum" class="tab" onclick="openForum()"><s>Forum</s></td> <td id="social" class="tab" onclick="openSocial()">Social Network</td> <td id="bug" class="tab" onclick="openBug()"><s>Bug Center</s></td> <td id="exit" class="tabX" onclick="exit()"> </td> </tr> </table> <div class="content"> <div id="emailSITE"> <div class="overview"> <div id="notifs">All Messages</div> <hr> <ul id="priList" class="priList"> </ul> </div> <div class="viewport"> <table class="inNav"> <tr> <td>Company Name</td> <td>Media</td> <td>Companies</td> <td>Fans</td> </tr> </table> <div id="emailMain" class="emailMain"> <script id="email-template" type="text/x-handlebars-template"> {{#emailAll}} <div id="emailInfo" class="emailInfo"> Category: {{emailCategory}} <br> From: {{emailFrom}} <br> Date: {{emailDate}} <br> <br> <div class="emailSubj">Subject: {{emailSubject}} </div> <hr> <p class="emailENTRY">{{emailMessage}}</p> <hr> </div> </div> <table id="emailOptions" cellspacing="20px"> <tr> <td id="emailOption1" onclick="{{option1_ifSelected}}"> {{emailOption1}} </td> <td id="emailOption2" onclick="{{option2_ifSelected}}"> {{emailOption2}} </td> </tr> </table> {{/emailAll}} </script> </div> </div> <div id="forumSITE"> Sorry <br> Not Available </div> <div id="socialSITE"> <div id="socialNav"> <div id="home" class="flutterBanner">FLUTTER</div> <!-- Insert icons when compiling and organizing --> <div id="navButts"> <div id="home" class="butt">HOME</div> <div id="notifications" class="butt">NOTIFS</div> <div id="trends" class="butt">TRENDS</div> <div id="profile" class="butt">PROFILE</div> </div> </div> <div id="socialContent"> <div id="socialProfile"> <div class="profileInfo"> <img class="profilePic" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"></img> <div class="profileIdenity"> <div class="profileName">John Smith</div> <div class="profileUsername">@jsmith12</div> <textarea maxlength="90" class="profileDesc">Enter a description...</textarea> </div> <div class="profileStats"> <div><b>Followers:</b> <div id="followers" class="proifileStatsEntry">79K</div> </div> <div><b>Likes:</b> <div id="likes" class="proifileStatsEntry">459K</div> </div> <div><b>Dislikes:</b> <div id="dislikes" class="proifileStatsEntry">2331</div> </div> </div> <div class="profileSOMETHING">PUT SOMETHING HERE. Maybe a like/dislike ratio meter.</div> </div> <div class="widget"> <div class="widget-form"> <textarea class="postBox" maxlength="140" id="message" style="resize: none;">Say something... (140 Character Limit)</textarea> <div id="postButton" onclick="postFlutterMessage()">Post</div> </div> <div class="widget-conversation"> <ul id="conversation"> </ul> </div> </div> </div> </div> </div> <div id="bugSITE"> Sorry <br> Not Available </div> <div id="loaders"></div> </div></div> ');


/*
var a = function() {
    return UI.isMenuOpen() ? (Sound.click(), GameManager.resume(!0), UI.closeContextMenu(), !1) : VisualsManager.isAnimatingScroll ? !1 : !0
};


-1 != a.researchCompleted.indexOf(Research.opportunityInternet) && b.push({
    label: "Internet...".localize("menu item"),
    action: function() {
        Sound.click();
        CreateWindow();
        GameManager.resume(true);
    }
})
*/
/*
      var a = Research;
      var b = 2;
        var oldInternetPush = b.researchCompleted.push(a.opportunityInternet);
        var newInternetPush = function(b){
          var f = "TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST After careful examination we come to the conclusion that the internet is a huge opportunity in the gaming industry. We already see some small signs how successful multiplayer games can be but multiplayer is usually an additional feature to a game and not the main focus.{n}We think we could develop technologies to create a massively multiplayer online game (short MMO), a game where tens of thousands of players can play together. To create such an MMO more research is necessary.{n}The second discovery is that we could start developing an online distribution platform. Instead of players buying games in local stores they could download games directly from our servers. This would cut out the middle man and we could gain a large share of the market and additional income to fund our developments.".localize(),
              f = new Notification(c, f);
         oldInternetPush(); //if appropriate, call the original logic
        };

          b.researchCompleted.push(a.opportunityInternet) = newInternetPush; //assign your custom method over the original.
-1 != company.researchCompleted.indexOf(Research.opportunityInternet) && b.researchCompleted.indexOf("internetMod001")
*/

/*
UltimateLib.Research.init();

RnDAdd = UltimateLib.Research.addLab;

RnDAdd({
    id: "internetMod001",
    name: "Internet Browser".localize(),
    pointsCost: 1200,
    canResearch: function(company) {
        return -1 != company.researchCompleted.indexOf(Research.opportunityInternet) && b.researchCompleted.indexOf("internetMod001")
    },
    iconUri: "./images/projectIcons/superb/internet.png",
    description: "This software will expand on global interaction like never before!",
    targetZone: 2,
    complete: function(company) {
        return new Notification("R&D Lab".localize(), "Boss, we have finished the development of the Internet Browser. Test it out and make sure it works.");
        $("body").append('<div id="internet"> <table class="navBar"> <tr id="tabBar"> <td id="refresh" onclick="refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i> <td id="email" class="tab" onclick="openEmail()">Email</td> <td id="exit" class="tabX" onclick="exit()"> </td> </tr> </table> <div id="content" class="content"> <div id="emailSITE"> <div class="overview"> <div id="notifs">All Messages</div> <hr> <ul class="priList"> <script id="emailMSGNav-template" type="text/x-handlebars-template"> {{#emailAll}} <li class="priListItem" onclick="{{onClick}}"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"> <div id="nameE">{{emailFrom}} </div> <div id="usernameE">{{emailAddress}} </div> <hr style="margin-top: 0px;"> <div id="subjectE">{{emailSubject}}</div> <div id="messageE">{{emailMessage}} </div> </li> {{/emailAll}} </script></ul> </div> <div class="viewport"> <table class="inNav"> <tr> <td>Phoenix Games</td> <td>Media</td> <td>Companies</td> <td>Fans</td> </tr> </table> <div class="emailMain"> <script id="email-template" type="text/x-handlebars-template"> {{#emailAll}} <div id="emailInfo" class="emailInfo"> Category: {{emailCategory}} <br> From: {{emailFrom}} <br> Date: {{emailDate}} <br> <br> <div class="emailSubj">Subject: {{emailSubject}} </div> <hr> <p class="emailENTRY">{{emailMessage}}</p> <hr> </div> </div> <table id="emailOptions" cellspacing="20px"> <tr> <td id="emailOption1" onclick="{{option1_ifSelected}}"> {{emailOption1}} </td> <td id="emailOption2" onclick="{{option2_ifSelected}}"> {{emailOption2}} </td> </tr> </table> {{/emailAll}} </script> </div> </div> <div id="loaders"></div> </div></div>');
    }
});

RnDAdd({
    id: "internetMod002",
    name: "Internet Browser (Bug Center)".localize(),
    pointsCost: 600,
    canResearch: function(company) {
        return -1 != company.researchCompleted.indexOf("internetMod001") && b.researchCompleted.indexOf("internetMod002")
    },
    iconUri: "./images/projectIcons/superb/internet.png",
    description: "This will allow us to specifically address any bugs found in our games.",
    targetZone: 2,
    complete: function(company) {
        return new Notification("R&D Lab".localize(), "Boss, we have added the Bug Center to the internet browser");
        $("#tabBar").append('<td id="bug" class="tab" onclick="openBug()">Bug Center</td>');
        $("#content").append('<div id="bugSITE"> Sorry <br> Not Available </div>')
    }
});

RnDAdd({
    id: "internetMod003",
    name: "Internet Browser (Social Opportunities)".localize(),
    pointsCost: 600,
    canResearch: function(company) {
        return -1 != company.researchCompleted.indexOf("internetMod002") && b.researchCompleted.indexOf("internetMod003")
    },
    iconUri: "./images/projectIcons/superb/internet.png",
    description: "This will allow us to interact with the world on social media and forums.",
    targetZone: 2,
    complete: function(company) {
        return new Notification("R&D Lab".localize(), "Boss, we have added the Social Network and Forum to the internet browser");
        $("#tabBar").append('<td id="social" class="tab" onclick="openSocial()">Social Network</td> <td id="forum" class="tab" onclick="openForum()"><s>Forum</s></td>');
        $("#content").append('<div id="forumSITE"> Sorry <br> Not Available </div> <div id="socialSITE"> <div id="socialNav"> <div id="home" class="flutterBanner">FLUTTER</div> <!-- Insert icons when compiling and organizing --> <div id="navButts"> <div id="home" class="butt">HOME</div> <div id="notifications" class="butt">NOTIFS</div> <div id="trends" class="butt">TRENDS</div> <div id="profile" class="butt">PROFILE</div> </div> </div> <div id="socialContent"> <div id="socialProfile"> <div class="profileInfo"> <img class="profilePic" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"></img> <div class="profileIdenity"> <div class="profileName">John Smith</div> <div class="profileUsername">@jsmith12</div> <textarea maxlength="90" class="profileDesc">Enter a description...</textarea> </div> <div class="profileStats"> <div><b>Followers:</b> <div id="followers" class="proifileStatsEntry">79K</div> </div> <div><b>Likes:</b> <div id="likes" class="proifileStatsEntry">459K</div> </div> <div><b>Dislikes:</b> <div id="dislikes" class="proifileStatsEntry">2331</div> </div> </div> <div class="profileSOMETHING">PUT SOMETHING HERE. Maybe a like/dislike ratio meter.</div> </div> <div class="widget"> <div class="widget-form"> <textarea class="postBox" maxlength="140" id="message" style="resize: none;">Say something... (140 Character Limit)</textarea> <div id="postButton" onclick="postFlutterMessage()">Post</div> </div> <div class="widget-conversation"> <ul id="conversation"> </ul> </div> </div> </div> </div> </div>');
    }
});
*/

/*
// Email Website
// Messages List
var msgNav_source = $("#emailMSGNav-template").html();
var newListEmail = Handlebars.compile(msgNav_source);
var emailMessages = "#emailMessages";

// Email (View) Opened
var email_source = $("#email-template").html();
var newEmail = Handlebars.compile(email_source);
var emailView = "#emailMain";

// Email Template Example
emailExampleName = {
    emailAll: [{
        onClick: "openEmailExampleName()",
        emailCategory: "Media",
        emailFrom: "Jimmy Fly",
        emailAddress: "jfly709@zmail.com",
        emailDate: "1/9/12",
        emailSubject: "A Simple Interview",
        emailMessage: "Hello! I am a fairly popular reporter for Zoom Magazine, and some of your fans are just dying for information about your new game. Would you be willing to share anything?",
        emailOption1: "Yes",
        option1_ifSelected: "jFly_interview_yes()",
        emailOption2: "No",
        option2_ifSelected: "jFly_interview_no()"
    }]
};

function openEmailExampleName() {
    $(emailView).show(newEmail(emailExampleName));
}

function jFly_interview_yes() {
    company.adjustHype(30);
}

function jFly_interview_no() {
    company.adjustHype(-30);
}

$(emailMessages).append(newListEmail(emailExampleName));
$(emailView).append(newEmail(emailExampleName));
$(emailView).hide(newEmail(emailExampleName));

*/

CreateWindow = function() {
    $("body").append('<div id="internet">' +
        '<table class="navBar"> <tr id="tabBar">' +
        '<td id="refresh" onclick="refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i></td>' +
        '<td id="email" class="tab" onclick="openEmail()">Email</td>' +
        '<td id="forum" class="tab" onclick="openForum()"><s>Forum</s></td>' +
        '<td id="social" class="tab" onclick="openSocial()">Social Network</td>' +
        '<td id="bug" class="tab" onclick="openBug()"><s>Bug Center</s></td>' +
        '<td id="exit" class="tabX" onclick="exit()"> </td> </tr> </table>' +
        '<div class="content">' +
        //Email Website
        '<div id="emailSITE">' +
        '<div class="overview">' +
        '<div id="notifs">All Messages</div>' +
        '<hr>' +
        '<ul id="emailMSGList" class="priList"></ul></div>' +
        '<div class="viewport">' +
        '<table class="inNav">' +
        '<tr>' +
        '<td>Company Name</td> <td>Media</td> <td>Companies</td> <td>Fans</td>' +
        '</tr> </table>' +
        '<div id="emailMain" class="emailMain"></div> </div> </div>' +
        //NOT SURE YET Website
        '<div id="forumSITE">Sorry <br> Not Available</div>' +
        // Social Network Website
        '<div id="socialSITE">' +
        '<div id="socialNav">' +
        '<div id="home" class="flutterBanner">FLUTTER</div>' +
        '<!-- Insert icons when compiling and organizing -->' +
        '<div id="navButts">' +
        '<div id="home" class="butt">HOME</div>' +
        '<div id="notifications" class="butt">NOTIFS</div>' +
        '<div id="trends" class="butt">TRENDS</div>' +
        '<div id="profile" class="butt">PROFILE</div> </div> </div>' +
        '<div id="socialContent">' +
        '<div id="socialProfile"> <div class="profileInfo"> <img class="profilePic" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png"></img><div class="profileIdenity"> <div class="profileName">John Smith</div> <div class="profileUsername">@jsmith12</div> <textarea maxlength="90" class="profileDesc">Enter a description...</textarea> </div>' +
        '<div class="profileStats">' +
        '<div><b>Followers:</b> <div id="followers" class="proifileStatsEntry">79K</div> </div>' +
        '<div><b>Likes:</b> <div id="likes" class="proifileStatsEntry">459K</div> </div>' +
        '<div><b>Dislikes:</b> <div id="dislikes" class="proifileStatsEntry">2331</div> </div> </div>' +
        '<div class="profileSOMETHING">PUT SOMETHING HERE. Maybe a like/dislike ratio meter.</div> </div>' +
        '<div class="widget">' +
        '<div class="widget-form">' +
        '<textarea class="postBox" maxlength="140" id="message" style="resize: none;">Say something... (140 Character Limit)</textarea> <div id="postButton" onclick="postFlutterMessage()">Post</div> </div> <div class="widget-conversation">' +
        '<ul id="conversation"> </ul> </div> </div> </div> </div> </div>' +
        // Bug Site
        '<div id="bugSITE"> Sorry <br> Not Available </div>' +
        // Loaders
        '<div id="loaders"></div> </div></div> ');
    $("#internet").hide();
}

CreateWindow();

ShowWindow = function() {
    $("#internet").show();
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").hide();
}

function refresh() {
    Sound.click();
    $("#loaders").append('REFRESHING...');
    $("#loaders").show();
    GameManager.resume(!0);
    setTimeout(function() {
        $("#loaders").hide();
        $("#loaders").empty();
        GameManager.pause(!0);
    }, 1500);
};

function openEmail() {
    Sound.click();
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").append('LOADING...');
    $("#loaders").show();
    setTimeout(function() {
        $("#loaders").hide();
        $("#loaders").empty();
        $("#emailSITE").show();
    }, 1000);
};

function openForum() {
    Sound.click();
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").append('LOADING...');
    $("#loaders").show();
    setTimeout(function() {
        $("#loaders").hide();
        $("#loaders").empty();
        $("#forumSITE").show();
    }, 1000);
};

function openSocial() {
    Sound.click();
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").append('LOADING...');
    $("#loaders").show();
    setTimeout(function() {
        $("#loaders").hide();
        $("#loaders").empty();
        $("#socialSITE").show();
    }, 1000);
};

function openBug() {
    Sound.click();
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").append('LOADING...');
    $("#loaders").show();
    setTimeout(function() {
        $("#loaders").hide();
        $("#loaders").empty();
        $("#bugSITE").show();
    }, 1000);
};

function postFlutterMessage() {
    //  var fLikes = $('').();

    var text = $('#message').val();

    if (text.length > 0) {
        Sound.playSoundOnce("tack", 0.2)
        $('#message').css("border", "1px solid #00cc00");
        $('#conversation').append("<li class='flutterPost'><div class='message-text'>" +
            "<div class='messageTop'>" +
            "<img class='postPic' src='http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'></img>" +
            "<div class='postInfo'> <div class='postName'>John Smith (You)</div> <div class='postUsername'>@jsmith12</div></div>" +
            "<div id='postReception'> <div class='postReceptionHeader'>" +
            "<span style='margin-left: 20px; font-size: 12pt;'>Likes</span>" +
            "<span style='margin-left: 20px; font-size: 12pt;'>Dislikes</span></div>" +
            "<div id='dislikes' class='dislikes'>349</div>" +
            "<div id='likes'>4981</div> </div> </div>" +
            "<div class='messageBottom'>" + text + "</div></div></li>");
        // $('#message').val('');
        $('.widget-conversation').scrollTop($('ul li').last().position().top + $('ul li').last().height());
    } else {
        $('#message').css("border", "1px solid #eb9f9f");
        $('#message').animate({
            opacity: '0.1'
        }, "slow");
        $('#message').animate({
            opacity: '1'
        }, "slow");
        $('#message').animate({
            opacity: '0.1'
        }, "slow");
        $('#message').animate({
            opacity: '1'
        }, "slow");
    }
};

function exit() {
    Sound.click();
    $("#internet").hide();
    GameManager.resume(!0);
};

// Adds internet button to context menu
var showMenuUI = UI._showContextMenu;
var showMenuItem = function(type, menuItems, x, y) {
    menuItems.push({
        label: "Internet...".localize("menu item"),
        action: function() {
            Sound.click();
            ShowWindow();
            GameManager.resume(false);
        }
    })
    showMenuUI(type, menuItems, x, y);
}

UI._showContextMenu = showMenuItem;


//EMAIL --------------------------------------------------------------
// Creates the template for adding an email message
(function() {
    console.log("Internet emails have intialized!");
    var emailList = [];

    internetMod.AddEmail = function(email) {
        var emailMessageList = $("#emailMSGList");
        emailMessageList.append('<li id="' + email.LISTid + '" class="priListItem"> <div class="rndPrItem"><img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png">' +
            '<div id="nameE">' + email.from + '</div>' +
            '<div id="usernameE">' + email.address + '</div><hr style="margin-top: 0px;">' +
            '<div id="subjectE">' + email.subject + '</div>' +
            '<div id="messageE">' + email.message + '</div> </li>');


        var emailOpened = $("#emailMain");
        emailOpened.append('<div id="' + email.EMAILid + '" class="emailInfo">' +
            'Category: ' + email.category + ' <br>' +
            'From: ' + email.from + ' <br>' +
            'Date: ' + email.date + ' <br> <br>' +
            '<div class="emailSubj">Subject: ' + email.subject + ' </div> <hr>' +
            '<p class="emailENTRY">' + email.message + '</p> <hr>' +
            '<table id="emailOptions" cellspacing="20px"> <tr>' +
            '<td id="emailOption1" class="emailOption" onclick="' + email.option1_ifSelected + '">' + email.option1 + '</td>' +
            '<td id="emailOption2" class="emailOption" onclick="' + email.option2_ifSelected + '">' + email.option2 + '</td> </tr> </table>' +
            '<table id="trashEmail"> <tr> <td id="trashTD" ondblclick="deleteEmail()">Trash Email</td> </tr> </table>' +
            '</div>');



        /*
                var emailListToAdd = []

                GDT.on(GDT.eventKeys.gameplay.weekProceeded, emailModTick);

                var emailModTick = function() {
                    for (var i = 0; i < emailListToAdd.length; i++) {
                        var email = emailListToAdd[i];
                        if (GameManager.company.currentWeek == email.date) {
                            emailList.push(email);
                        }
                    }
                }
        */

      $("#" + email.EMAILid + "").hide();

        $("#" + email.LISTid + "").click(function() {
            $("#" + email.EMAILid + "").show();
            $("#" + email.EMAILid + "").siblings().hide();
        });


        emailList.push(email);
    }


    // Example internet email message
    var internetMod_exampleEmail = function() {
        internetMod.AddEmail({
            LISTid: "list_001", // must be unique
            EMAILid: "email_001", // must be unique
            category: "Media", // must be internetCompany, Media, Fans, or Companies
            date: "1/1/3",
            from: "Jimmy Dean",
            address: "jdean@zmail.com",
            subject: "A Short Interview",
            message: "Hello! It's Jimmy dean, reporter for Zoom Magazine. Would you be interested in doing a short interview that would reap BIG rewards? I'm telling ya, you and fans will love you for it. Think about it.",
            option1: "Sure!",
            option2: "No",
        });
    }
    internetMod_exampleEmail();

var internetMod_exampleEmail2 = function() {
    internetMod.AddEmail({
        LISTid: "list_002", // must be unique
        EMAILid: "email_002", // must be unique
        category: "Media", // must be internetCompany, Media, Fans, or Companies
        date: "1/1/2",
        from: "Zachary Florence",
        address: "jdean@zmail.com",
        subject: "TEST BLAHw",
        message: "Hello! It's Jimmy dean, reporter for Zoom Magazine. Would you be interested in doing a short interview that would reap BIG rewards? I'm telling ya, you and fans will love you for it. Think about it.",
        option1: "Sure!",
        option2: "No",
    });
}
internetMod_exampleEmail2();
})();

/*
$("#emailMessages > li").click(function(e) {
    var show = $(this).show();
    $('.active').removeClass('active');
    $(this).addClass('active');

    $('#emailMain').hide().eq(show).fadeIn();
});

// TEST TEST TEST
function addFans(fans) {
    GameManager.company.fans += fans;
}

function addHype(hype) {
    GameManager.company.adjustHype(hype);
}
*/
