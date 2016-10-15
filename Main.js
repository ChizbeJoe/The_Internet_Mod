var internetMod = {};

(function() {
    internetMod.modPath = GDT.getRelativePath();

    // Currently, the fonts are installed over the internet; however, I will eventually make it so it is in the mod folder.
    $("head").append('<link rel="stylesheet" type="text/css" href="./mods/The_Internet_Mod/css/internetMod.css">' +
        '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600,400italic,800" rel="stylesheet" type="text/css">' +
        '<link href="https://fonts.googleapis.com/css?family=Lato:400,300,100,700,900,400italic" rel="stylesheet" type="text/css">' +
        '<link href="https://fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">');

    // Internet Window
    $("body").append('<div id="internet">' +
        '<table class="navBar justEmail"> <tr id="tabBar">' +
        '<td id="refresh" onclick="internetMod.refresh()"><img class="refresh" src="./mods/The_Internet_Mod/img/refresh.png"></td>' +
        '<td id="email" class="tab" onclick="internetMod.openEmail()">Email</td>' +
        '<td id="bug" class="tab" onclick="internetMod.openBug()">Bug Center</td>' +
        '<td id="social" class="tab" onclick="internetMod.openSocial()">Social Network</td>' +
        '<td id="exit" class="tabX" onclick="internetMod.exit()"> </td> </tr> </table>' +
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
        '<td id="iCompanyName" class"forGenrl"></td> <td>Media</td> <td>Companies</td> <td>Fans</td>' +
        '</tr> </table>' +
        '<div id="emailMain" class="emailMain"></div> </div> </div>' +
        //NOT SURE YET Website
        //  '<div id="forumSITE">Sorry <br> Not Available</div>' +
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
        '<div id="socialProfile"> <div class="profileInfo"> <img class="profilePic" src="./mods/The_Internet_Mod/Img/profileIcon_Email.png"></img><div class="profileIdenity"> <div class="profileName">John Smith</div> <div class="profileUsername">@jsmith12</div> <textarea maxlength="90" class="profileDesc">Enter a description...</textarea> </div>' +
        '<div class="profileStats">' +
        '<div><b>Followers:</b> <div id="followers" class="proifileStatsEntry">79K</div> </div>' +
        '<div><b>Likes:</b> <div id="likes" class="proifileStatsEntry">459K</div> </div>' +
        '<div><b>Dislikes:</b> <div id="dislikes" class="proifileStatsEntry">2331</div> </div> </div>' +
        '<div class="profileSOMETHING">PUT SOMETHING HERE. Maybe a like/dislike ratio meter.</div> </div>' +
        '<div class="widget">' +
        '<div class="widget-form">' +
        '<div class="postNewMSG" id="postNewMSG" onclick="internetMod.UI_showNewMSG()">Post a New Message</div> </div> <div class="widget-conversation">' +
        '<ul id="conversation"> </ul> </div> </div> </div> </div>' +
        '<div id="newMsgUI">' +
        '<div id="newMsgBulk">' +
        '<div id="msgPreviewBulk">' +
        '<div id="msgPreviewHeader">New Message</div>' +
        '<div id="msgPostIt" class="msgIt" onclick="internetMod.postFlutterMessage()">Post</div>' +
        '<div id="msgTrashIt" class="msgIt" onclick="internetMod.clearFlutterMessage()">Trash</div>' +
        '</div>' +
        '<div id="newMsgPreview" class="postBox">' +
        '<div id="newMSGBlock"><span id="newMSGString"><span id="msgPrt1"></span> <span id="msgPrt2"></span> <span id="msgPrt3"></span></span></div>' +
        '</div>' +
        '<div id="newMsgOptions">' +
        '<li id="announce" class="msgOption" onclick="internetMod.msgOption_Announce()">Announce' +
        '<li class="announceChild">"Totally stoked to announce a brand new"</li>' +
        '<li class="announceChild">"Announcement time! It is official: work has started on a brand new"</li>' +
        '<li class="announceChild">"Working away at a brand new"' +
        '<li class="announceChild">"Guess what. We got something coming your way: a new"' +
        '<li class="announceChild2">Game' +
        '<li class="announceChild3" style="display: list-item;">' +
        '<input id="msgGameTitle" type="text" value="Game Name" maxlength="35" style="font-size: 22pt; border-radius: 5px;" required="">' +
        '<table cellspacing="15"><tbody>' +
        '<tr>' +
        '<td id="msgPickGameTopic" class="msgGameOption">Pick Topic</td>' +
        '<td id="msgPickGameGenre" class="msgGameOption">Pick Genre</td>' +
        '</tr>' +
        '<tr>' +
        '<td id="msgPickGamePlatform" class="msgGameOption">Pick Platform</td>' +
        '<td id="msgPickGamePlatform" class="msgGameOption">Pick Platform</td>' +
        '<td id="msgPickGamePlatform" class="msgGameOption">Pick Platform</td>' +
        '</tr>' +
        '</tbody></table>' +
        '</li>' +
        '</li>' +
        '</li>' +
        '</li>' +
        '<li class="msgOption">Update</li>' +
        '<li class="msgOption">Ask</li> </div> </div> </div>' +
        '</div>' +
        // Bug Site
        '<div id="bugSITE"> Sorry <br> Not Available </div>' +
        // Loading Div
        '<div id="loaders"></div> </div></div>' +
        // Email Notifications
        '<div id="internetNotifs" onclick="internetMod.emailNotifOPEN()">' +
        '<img class="iNotifs" src="./mods/The_Internet_Mod/img/mail-Icon.png"><div id="iNotifs">0</div></img></div>' +
        '</div>');
    $("#internet").hide();
    $("#internetNotifs").hide();
    $("#bugSITE").hide();
    $("#bug").hide();
    $("#socialSITE").hide();
  //  $("#social").hide();
    $('#newMsgUI').hide();

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
