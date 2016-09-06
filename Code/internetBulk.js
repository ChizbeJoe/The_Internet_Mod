var internetMod = {};
var company = GameManager.company;

// Internet Window HTML
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
        // Loading Div
        '<div id="loaders"></div> </div></div>' +
       // Email notifications
        '<div id="internetNotifs">' +
        '<div id="iNotifs" class="iNotifs"></div>' +
        '</div>');
    $("#internet").hide();
}

function countNotifs() {
var notifCount = $("#emailMSGList").children().length;

  $("#iNotifs").empty();
  $("#iNotifs").append(notifCount);
}

// Appends the internet window
GDT.on(GDT.eventKeys.saves.newGame, CreateWindow());

// Shows the internet window
ShowWindow = function() {
    $("#internet").show();
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").hide();
}

// Internet tabs -----------------------------------------------------------------------------------------------------------
// Refreshes a page (Currenly not working 100% correctly)
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

// Opens the Email website
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

// Open a website that I haven't made up my mind about :P
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

// Opens the Social Network website
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

// Opens the Bug Center website
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

// Closes (hides) the entire div
function exit() {
    Sound.click();
    $("#internet").hide();
    GameManager.resume(!0);
};

// Social Netowrk ------------------------------------------------------------------------------------------------------
// Allows posting on the Social Network website
function postFlutterMessage() {
    //  var fLikes = $('').();

    var text = $('#message').val();

    if (text.length > 0) {
        Sound.playSoundOnce("tack", 0.2)
        $('#message').css('border', '1px solid #00cc00');
        $('#conversation').append("<li class='flutterPost'><div class='message-text'>" +
            "<div class='messageTop'>" +
            "<img class='postPic' src='http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'></img>" +
            "<div class='postInfo'> <div class='postName'>John Smith (You)</div> <div class='postUsername'>@jsmith12</div></div>" +
            "<div id='postReception'> <div class='postReceptionHeader'>" +
            "<span style='margin-left: 20px; font-size: 12pt;'>Likes</span>" +
            "<span style='margin-left: 20px; font-size: 12pt;'>Dislikes</span></div>" +
            "<div id='postDislikes' class='dislikes'>349</div>" +
            "<div id='postLikes' class='likes'>4981</div>" +
            "</div></div>" +
            "<div class='messageBottom'>" + text + "</div></div></li>");
        // $('#message').val('');
        $('.widget-conversation').scrollTop($('ul li').last().position().top + $('ul li').last().height());
    } else {
        $('#message').css('border', '1px solid #eb9f9f');
        $('#message').animate({
            opacity: '0.1'
        }, 'slow');
        $('#message').animate({
            opacity: '1'
        }, 'slow');
        $('#message').animate({
            opacity: '0.1'
        }, 'slow');
        $('#message').animate({
            opacity: '1'
        }, 'slow');
    }
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


//Email website ------------------------------------------------------------------------------------------------------
// Creates the template for adding an email message
(function() {
    console.log("Internet emails have intialized!");
    internetMod.emailList = [];
    internetMod.emailListToAdd = [];

    internetMod.startNewGame = function() {
        internetMod.reset();
    }

    internetMod.load = function() {
        internetMod.reset();
    }

    internetMod.reset = function() {
        internetMod.emailList = [];
        $("#emailMSGList").html("");
    }

    internetMod.emailModTick = function() {
        for (var i = 0; i < internetMod.emailListToAdd.length; i++) {
            var email = internetMod.emailListToAdd[i];
            var date = email.date.split('/');
            if (GameManager.company.isLaterOrEqualThan(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])) && internetMod.emailList.indexOf(email) == -1) {
                internetMod.emailList.push(email);
                internetMod.AddEmailToHTMLPage(email);
            }
        }
    }

    GDT.on(GDT.eventKeys.gameplay.weekProceeded, internetMod.emailModTick);
    GDT.on(GDT.eventKeys.saves.loading, internetMod.load);
    GDT.on(GDT.eventKeys.saves.newGame, internetMod.startNewGame);


    internetMod.AddEmail = function(email) {
        internetMod.emailListToAdd.push(email);
    }

    internetMod.AddEmailToHTMLPage = function(email) {

        var emailMessageList = $("#emailMSGList");
        emailMessageList.append('<li id="' + email.LISTid + '" class="priListItem"> <div class="rndPrItem"><img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png">' +
            '<div id="nameE">' + email.from + '</div>' +
            '<div id="usernameE">' + email.address + '</div><hr style="margin-top: 0px;">' +
            '<div id="subjectE">' + email.subject + '</div>' +
            '<div id="messageE">' + email.message + '</div> </li>');

        //  function option1_clicked() {
        //    email.option1_ifSelected;
        //  }

        var emailOpened = $("#emailMain");
        emailOpened.append('<div id="' + email.EMAILid + '" class="emailInfo">' +
            'Category: ' + email.category + ' <br>' +
            'From: ' + email.from + ' <br>' +
            'Date: ' + email.date + ' <br> <br>' +
            '<div class="emailSubj">Subject: ' + email.subject + ' </div> <hr>' +
            '<p class="emailENTRY">' + email.message + '</p> <hr>' +
            '<table id="emailOptions" cellspacing="20px"> <tr>' +
            '<td id="emailOption1" class="emailOption" onclick="option1_clicked()">' + email.option1 + '</td>' +
            '<td id="emailOption2" class="emailOption">' + email.option2 + '</td> </tr> </table>' +
            '<table id="trashEmail"> <tr> <td id="trashTD" ondblclick="deleteEmail()">Trash Email</td> </tr> </table>' +
            '</div>');


        /*
                    $("#" + email.EMAILid + " #emailOption2").click(function() {
                        email.option2;
                    });
        */

        // Allows for switch between emails
        $("#" + email.EMAILid + "").hide();

        $("#" + email.LISTid + "").click(function() {
            $("#" + email.EMAILid + "").show();
            $("#" + email.EMAILid + "").siblings().hide();
        });
    }

    // Example internet email message
    var internetMod_exampleEmail = function() {
        internetMod.AddEmail({
            LISTid: "list_001", // must be unique
            EMAILid: "email_001", // must be unique
            category: "Media", // must be internetCompany, Media, Fans, or Companies
            date: "1/1/2",
            from: "Jimmy Dean",
            address: "jdean@zmail.com",
            subject: "A Short Interview",
            message: "Hello! It's Jimmy dean, reporter for Zoom Magazine. Would you be interested in doing a short interview that would reap BIG rewards? I'm telling ya, you and fans will love you for it. Think about it.",
            option1: "Sure!",
            option1_ifSelected: "company.adjustCash(100000, 'Option 1 Was Selected')",
            option2: "No"
        });
    }
    internetMod_exampleEmail();

    var internetMod_exampleEmail2 = function() {
        internetMod.AddEmail({
            LISTid: "list_002", // must be unique
            EMAILid: "email_002", // must be unique
            category: "Media", // must be internetCompany, Media, Fans, or Companies
            date: "1/1/4",
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
