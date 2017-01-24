var internetMod = {};

(function() {
    internetMod.modPath = GDT.getRelativePath();

    // Currently, the fonts are installed over the internet; however, I will eventually make it so it is in the mod folder.
    $("head").append('<link rel="stylesheet" type="text/css" href="./mods/The_Internet_Mod/css/internetMod.css">' +
        '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600,400italic,800" rel="stylesheet" type="text/css">' +
        '<link href="https://fonts.googleapis.com/css?family=Lato:400,300,100,700,900,400italic" rel="stylesheet" type="text/css">' +
        '<link href="https://fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">' +
        '<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">' +
        '<link href="https://fonts.googleapis.com/css?family=Electrolize" rel="stylesheet">');

    // Internet Window
    $("body").append('<div id="internetContainer"><div id="internet">' +
    // eventually add class .justEmail on intial append
        '<table class="navBar" style="width: 100%;"> <tr id="tabBar">' +
        '<td id="refresh" onclick="internetMod.refresh()"><img class="refresh" src="./mods/The_Internet_Mod/Img/refresh.png"></td>' +
        '<td id="email" class="tab" onclick="internetMod.openEmail()">Email</td>' +
        '<td id="news" class="tab" onclick="internetMod.openNews()">Game Link News</td>' +
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
        // News Website
        '<div id="newsSITE">' +
        '<div id="newsNavBar">' +
        '<div style="margin: 0 auto; display: inline;">' +
        '<table id="newsTabBar" style="float: left;"> <tr> <td class="newsTAB" onclick="internetMod.goNewsHome()"> <div class="info"></div> <div class="navText">HOME</div> </td> <td class="newsTAB" onclick="internetMod.goNewsGames()"> <div class="info"></div> <div class="navText">GAMES</div> </td> </tr> </table> <div id="newsBanner" style="float: left;"> <div style="float: left; padding: 10px; padding-left: 10px;">GAME</div> <div id="gSpotButt"><img id="gSpotImg" src="./mods/The_Internet_Mod/Img/gSpot.png"></img> </div> <div style="float: left; padding: 10px;">LINK</div> </div> <table id="newsTabBar"> <tr> <td class="newsTAB" onclick="internetMod.goNewsPlatforms()"> <div class="info"></div> <div class="navText">PLATFORMS</div> </td> <td class="newsTAB" onclick="internetMod.goNewsAbout()"> <div class="info"></div> <div class="navText">ABOUT</div> </td> </tr> </table> </div> </div>' +
        '<div id="newsContent">' +
        // News Home Page
        '<div id="newsHome" class="newsPage" style="overflow: hidden !important;"> <div class="innerContentContainer">' +
        '<div class="nextSlideBar"><div id="actualSlideBar"></div></div>' +
        '<div id="newsArticleSlideshow">' +
        '<div id="slideRight" class="control_next">>></div>' +
        '<div id="slideLeft" class="control_prev"><<</div>' +
        '<ul style="display: inline-block;">' +
        '<li>' +
        '<img id="slideContents" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301">' +
        '<div id="slideDetails">' +
        '<span class="articleHeader">The PlaySystem is coming off Shelves!</span>' +
        '<p id="articleText">After five years of stealing the console spotlight, the PlaySystem is finally being taken off the market. Experts say that the cause for this is the release of Venas upincoming console.</p>' +
        '</div> </img> </li>' +
        '<li><img id="slideContents" src="http://vignette4.wikia.nocookie.net/gamedevtycoon/images/5/58/CustomPlatform1V3.png/revision/latest?cb=20140903185221"> <div id="slideDetails"> <span class="articleHeader">Ninvento Taking Over?</span> <p id="articleText">With the PlaySystem gone, Ninvento may very well make a gaming monopoly. How will Vonny respond?</p> </div> </img></li>' +
        '<li><img id="slideContents" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/8/89/PC.png/revision/latest?cb=20130116021423"> <div id="slideDetails"> <span class="articleHeader">The PC Slowly Dying Out</span> <p id="articleText">The Godovore 64 has nearly eclipse the PC. Experts wonder if this is the end for PCs.</p> </div> </img></li>' +
        '</ul> </div>' +
        '<div id="newsCateStoryBlock">' +
        '<div id="articleGameBlock" class="articleNewsBlock"><div> <img class="articleBlockImage" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301"> <div class="articleBlockDetails"> <span class="articleHeader" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">The PlaySystem is coming off Shelves</span> </div> </img> </div></div>' +
        '<div id="articlePlatformBlock" class="articleNewsBlock"><div> <img class="articleBlockImage" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301"> <div class="articleBlockDetails"> <span class="articleHeader" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">The PlaySystem is coming off Shelves</span> </div> </img> </div></div>' +
        '</div> </div> </div>' +
        // News Games Articles Page
        ' <div id="newsGames" class="newsPage"> <div class="innerContentContainer"> <div class="articleListContainer">' +'<div><span class="articleHeader" style="padding: 10px;">Games Articles</span></div> <hr> <ul id="gamesArticleList" class="articlesList"> <li> <div style="padding-left: 20px; padding-top: 10px;"> <img class="articleListImage" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301"></img> <div class="articleInfoBlock"> <span class="articleHeader" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">PlaySystem Coming Off Shelves!</span> <span id="articleListDate">1/1/3</span> <p class="articleListText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> </div> </li> <li> <div style="padding-left: 20px; padding-top: 10px;"> <img class="articleListImage" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301"></img> <div class="articleInfoBlock"> <span class="articleHeader" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">PlaySystem Coming Off Shelves!</span> <span id="articleListDate">1/1/3</span> <p class="articleListText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> </div> </li> </ul> </div> </div> </div>' +
        // News Platforms Articles Page
        '<div id="newsPlatforms" class="newsPage"> <div class="innerContentContainer"> <div class="articleListContainer"> <div><span class="articleHeader" style="padding: 10px;">Platforms Articles</span></div> <hr> <ul id="platformsArticleList" class="articlesList"> <li> <div style="padding-left: 20px; padding-top: 10px;"> <img class="articleListImage" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301"></img> <div class="articleInfoBlock"> <span class="articleHeader" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">PlaySystem Coming Off Shelves!</span> <span id="articleListDate">1/1/3</span> <p class="articleListText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> </div> </li> <li> <div style="padding-left: 20px; padding-top: 10px;"> <img class="articleListImage" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301"></img> <div class="articleInfoBlock"> <span class="articleHeader" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">PlaySystem Coming Off Shelves!</span> <span id="articleListDate">1/1/3</span> <p class="articleListText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> </div> </li> </ul> </div> </div> </div>' +
        // News About Page
        '<div id="newsAbout" class="newsPage"></div>' +
        // Article Being Read Page
        '<div id="newsArticlesOnDeck" class="newsPage"> <div style="width: 850px; height: auto; background: grey; margin: 35px auto; padding-bottom: 70px;"> <div id="newsSideBar"> <div id="randomPageButt">Random Page</div> <div class="newsAD">THIS IS AN AD PLACEHOLDER</div> <div class="newsAD">THIS IS AN AD PLACEHOLDER</div> </div> <div id="newsArticlesALL"> <div id="newsArticleID" class="newsArticleReading"> <div><span class="headerInArticle">PlaySystem is Coming Off Shelves!</span></div> <hr> <img class="imageInArticle" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301"></img><p class="textInArticle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.<br><br>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p> </div> </div> <div id="newsCateStoryBlock" style="width: 640px;"> <div id="articleGameBlock" class="articleNewsBlock"> <div> <img class="articleBlockImage" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301"> <div class="articleBlockDetails"> <span class="articleHeader">The PlaySystem is coming off Shelves</span> </div> </img> </div> </div> <div id="articlePlatformBlock" class="articleNewsBlock"> <div> <img class="articleBlockImage" src="http://vignette2.wikia.nocookie.net/gamedevtycoon/images/2/21/Playsystem.png/revision/latest?cb=20130115235301"> <div class="articleBlockDetails"> <span class="articleHeader">The PlaySystem is coming off Shelves</span> </div> </img> </div> </div> </div> </div> </div>' +
        '</div>' +
        '</div>' +
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
        '<div id="loaders"></div> </div></div></div>' +
        // Email Notifications
        '<div id="internetNotifs" onclick="internetMod.emailNotifOPEN()">' +
        '<img class="iNotifs" src="./mods/The_Internet_Mod/img/mail-Icon.png"><div id="iNotifs">0</div></img></div>' +
        '</div>');
    $("#internetContainer").hide();
    $("#internetNotifs").hide();
    $("#emailSITE").hide();
    $("#newsSITE").hide();
    $("#newsGames").hide();
    $("#newsPlatforms").hide();
    $("#newsAbout").hide();
    $("#newsArticlesOnDeck").hide();
  //  $("#news").hide();
    $("#bugSITE").hide();
    $("#bug").hide();
    $("#socialSITE").hide();
    //  $("#social").hide();
    $('#newMsgUI').hide();
    $("#loaders").hide();

    var ready = function() {
        console.log("The Internet Mod has succesfully loaded");
    };

    var error = function() {
        alert("Failed to load The Internet Mod");
        console.log("The Internet Mod has failed to load");
    };

    GDT.loadJs([
        'Code/internetBulk.js',
        'Code/testingStuff.js',
    ], ready, error);

})();
