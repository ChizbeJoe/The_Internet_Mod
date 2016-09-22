var internetMod = {};

(function() {
    internetMod.modPath = GDT.getRelativePath();

    // Currently, the fonts are installed over the internet; however, I will eventually make it so it is in the mod folder.
    $("head").append('<link rel="stylesheet" type="text/css" href="./mods/The_Internet_Mod/css/internetMod.css">' +
        '<link href="https: //fonts.googleapis.com/css?family=Open+Sans:400,300,700,600,400italic,800" rel="stylesheet" type="text/css">' +
        '<link href="https://fonts.googleapis.com/css?family=Lato:400,300,100,700,900,400italic" rel="stylesheet" type="text/css">' +
        '<link href="https://fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">');

    // Internet Window and Email
    $("body").append('<div id="internet">' +
        '<table class="navBar justEmail"> <tr id="tabBar">' +
        '<td id="refresh" onclick="internetMod.refresh()"><img class="refresh" src="./mods/The_Internet_Mod/img/refresh.png"></td>' +
        '<td id="email" class="tab" onclick="internetMod.openEmail()">Email</td>' +
        '<td id="bug" class="tab" onclick="internetMod.openBug()">Bug Center</td>' +
        '<td id="social" class="tab" onclick="internetMod.openSocial()">Social Network</td>' +
        '<td id="exit" class="tabX" onclick="internetMod.exit()"> </td> </tr> </table>' +
        '<div id="content" class="content">' +
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
        // Loading Div
        '<div id="loaders"></div> </div></div>' +
        // Email Notifications
        '<div id="internetNotifs" onclick="internetMod.emailNotifOPEN()">' +
        '<img class="iNotifs" src="./mods/The_Internet_Mod/img/mail-Icon.png"><div id="iNotifs">0</div></img></div>' +
        '</div>');
        $("#internetNotifs").hide();

    // Social Website
    $('#content').append('<div id="socialSITE">' +
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
        '<textarea class="postBox" maxlength="140" id="message" style="resize: none;">Say something... (140 Character Limit)</textarea> <div id="postButton" onclick="internetMod.postFlutterMessage()">Post</div> </div> <div class="widget-conversation">' +
        '<ul id="conversation"> </ul> </div> </div> </div> </div> </div>');
    $("#socialSITE").hide();
    $("#social").hide();

    // Bug Website
    $('#content').append('<div id="bugSITE"> Sorry <br> Not Available </div>');
    $("#bugSITE").hide();
    $("#bug").hide();

     // Not sure yet Website
    /*
       $('#content').append('<div id="forumSITE"> Sorry <br> Not Available </div>');
       $("#forumSITE").hide();
       $("#forum").hide();
    */

    $("#internet").hide();

    var ready = function() {
        console.log("The Internet Mod has succesfully loaded");
    };

    var error = function() {
        alert("Failed to load The Internet Mod");
        console.log("The Internet Mod has failed to load");
    };

    GDT.loadJs([
        'Code/internetBulk.js',
    ], ready, error);

})();
