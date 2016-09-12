var internetMod = {};

// Thanks kristof!
internetMod.addMoney = function(money, text) {
    GameManager.company.adjustCash(money, "" + text + "");
}

internetMod.addResearchPoints = function() {
    GameManager.company.researchPoints += 100;
    VisualsManager.researchPoints.updatePoints(GameManager.company.researchPoints);
}

internetMod.addFans = function(fans) {
    GameManager.company.fans += fans;
}

internetMod.addHype = function(hype) {
    GameManager.company.adjustHype(hype);
}
// kristof1104 is the best ---------------------------------------------------------------------------------------------------




function emailNotifOPEN() {
    $("#internet").show();
    $("#emailSITE").show();
    GameManager.pause(true);
}

/* Internet Window HTML
internetMod.originalWindow_Email = function() {
    $("body").append('<div id="internet">' +
        '<table class="navBar"> <tr id="tabBar">' +
        '<td id="refresh" onclick="refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i></td>' +
        '<td id="email" class="tab" onclick="openEmail()">Email</td>' +
        '<td id="forum" class="tab" onclick="openForum()"><s>Forum</s></td>' +
        '<td id="social" class="tab" onclick="openSocial()">Social Network</td>' +
        '<td id="bug" class="tab" onclick="openBug()"><s>Bug Center</s></td>' +
        '<td id="exit" class="tabX" onclick="exit()"> </td> </tr> </table>' +
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
        '<div id="internetNotifs" onclick="emailNotifOPEN()">' +
        '<div id="iNotifs" class="iNotifs"></div>' +
        '</div>');
    $("#internet").hide();
}
*/

// Bug Site
function createBugWebsite() {
    $('#content').append('<div id="bugSITE"> Sorry <br> Not Available </div>');
}

// Social Site
function createSocialWebsite() {
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
        '<textarea class="postBox" maxlength="140" id="message" style="resize: none;">Say something... (140 Character Limit)</textarea> <div id="postButton" onclick="postFlutterMessage()">Post</div> </div> <div class="widget-conversation">' +
        '<ul id="conversation"> </ul> </div> </div> </div> </div> </div>');
}

//NOT SURE YET Website
function createXYZWebsite() {
    $('#content').append('<div id="forumSITE">Sorry <br> Not Available</div>');
}

// Email Notifications
function countNotifs() {
    var notifCount = $("#emailMSGList").children().length;

    $("#iNotifs").empty();
    $("#iNotifs").append(notifCount);
}

// not yet working
$("#iNotifs").bind("DOMSubtreeModified", function() {
    $("#iNotifs").animate({
        margin: '-10px',
        width: '40px',
        height: '40px'
    }, 500, function(e) {
        $("#iNotifs").animate({
            margin: '-5px',
            width: '30px',
            height: '30px'
        }, 500)
    });
});


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
        Sound.playSoundOnce("tack", 0.2);
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
/*
internetMod.addInternetToMenu = function() {
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
}
*/

//Email website ------------------------------------------------------------------------------------------------------
// Creates the template for adding an email message
(function internetMod_Email_init() {
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
                countNotifs();
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
        emailMessageList.append('<li id="List_' + email.id + '" class="priListItem"> <div class="rndPrItem"><img id="checkmark_' + email.id + '" class="checkmark_Email" " src="./mods/The_Internet_Mod/img/checkmark.png" style="display: none;"></img><img class="iconE" src="./mods/The_Internet_Mod/img/profileIcon_Email.png">' +
            '<div id="nameE">' + email.from + '</div>' +
            '<div id="usernameE">' + email.address + '</div><hr style="margin-top: 0px;">' +
            '<div id="subjectE">' + email.subject + '</div>' +
            '<div id="messageE">' + email.message + '</div>' +
            '<div id="optionDisplay_' + email.id + '" class="optionDisplay" style="display: none;"> <hr> <div id="optionActual" class="optionActual"><b>Response:</b><span id="response1_' + email.id + '" style="display: none;"> ' + email.option1 + '</span><span id="response2_' + email.id + '" style="display: none;"> ' + email.option2 + '</span></div> </div></div> </li>');

        /*
                '' + email.id + '_' + email.option1 + '' = function() {
                    email.option1_ifSelected;
                }
        */

        var emailOpened = $("#emailMain");
        emailOpened.append('<div id="Email_' + email.id + '" class="emailInfo">' +
            'Category: ' + email.category + ' <br>' +
            'From: ' + email.from + ' <br>' +
            'Date: ' + email.date + ' <br> <br>' +
            '<div class="emailSubj">Subject: ' + email.subject + ' </div> <hr>' +
            '<p class="emailENTRY">' + email.message + '</p> <hr>' +
            '<table id="emailOptions_' + email.id + '" class="emailOptions" cellspacing="20px"> <tr>' +
            '<td id="Option1_' + email.id + '" class="emailOption">' + email.option1 + '</td>' +
            '<td id="Option2_' + email.id + '" class="emailOption">' + email.option2 + '</td> </tr> </table>' +
            '<table id="trashEmail_' + email.id + '" class="trashEmail"> <tr> <td id="trashTD">Trash Email (Double Click)</td> </tr> </table>' +
            '</div>');

        $("#Option1_" + email.id + "").on("click", function(event) {
			$("#List_" + email.id + "").addClass("emailResponded");
            $("#Option1_" + email.id + "").addClass("optionDisplay");
            $("#checkmark_" + email.id + "").show();
            $("#optionDisplay_" + email.id + "").show();
            $("#response1_" + email.id + "").show();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            // use .typewrite() when in later versions with new features
=======
>>>>>>> parent of 1576065... stuff
=======
>>>>>>> parent of 1576065... stuff
            email.option1_ifSelected;
        });

        $("#Option2_" + email.id + "").on("click", function() {
<<<<<<< HEAD
<<<<<<< HEAD
            $("#emailOptions_" + email.id + "").addClass("disableElement");
            $("#List_" + email.id + "").addClass("emailResponded");
            $("#Option2_" + email.id + "").addClass("optionDisplay");
            $("#checkmark_" + email.id + "").show();
            $("#optionDisplay_" + email.id + "").show();
            $("#response2_" + email.id + "").show();
            // use .typewrite({ stuff: foo }) when in later versions with new features
            email.option2_ifSelected;
=======
			
			//Because you are setting pointer-events: none; The update code for refreshing the UIisn't updated 
			$("#emailOptions_" + email.id + "").addClass("disableElement");
			//Call this to force a repaint. Suggest to use a button and put the disabled attribute on it. This way this workaround is not needed.
			$("#List_" + email.id + "").toggle().toggle();
			
            email.option1_ifSelected && email.option1_ifSelected();
		});	

        $("#Option2_" + email.id + "").on("click", function(event) {
=======
          $("#emailOptions_" + email.id + "").addClass("disableElement");
>>>>>>> parent of 1576065... stuff
=======
          $("#emailOptions_" + email.id + "").addClass("disableElement");
>>>>>>> parent of 1576065... stuff
          $("#List_" + email.id + "").addClass("emailResponded");
          $("#Option2_" + email.id + "").addClass("optionDisplay");
          $("#checkmark_" + email.id + "").show();
          $("#optionDisplay_" + email.id + "").show();
          $("#response2_" + email.id + "").show();
<<<<<<< HEAD
<<<<<<< HEAD
		  
		  //Because you are setting pointer-events: none; The update code for refreshing the UIisn't updated 
		  $("#emailOptions_" + email.id + "").addClass("disableElement");
		  //Call this to force a repaint. Suggest to use a button and put the disabled attribute on it. This way this workaround is not needed.
		  $("#List_" + email.id + "").toggle().toggle();
			
		  email.option2_ifSelected && email.option2_ifSelected();
>>>>>>> origin/master
=======
          email.option2_ifSelected;
>>>>>>> parent of 1576065... stuff
=======
          email.option2_ifSelected;
>>>>>>> parent of 1576065... stuff
        });

        $("#trashEmail_" + email.id + "").dblclick(function() {
            $('#Email_' + email.id + '').remove();
            $('#List_' + email.id + '').remove();
        });

        // Allows for switch between emails
        $("#Email_" + email.id + "").hide();

        $("#List_" + email.id + "").click(function() {
            $("#Email_" + email.id + "").show();
            $("#Email_" + email.id + "").siblings().hide();
        });
    }

    // Example internet email message
    var internetMod_tutorialEmail = function() {
        internetMod.AddEmail({
            id: "introduction_internetMod", // must be unique
            category: "Media", // must be internetCompany, Media, Fans, or Companies
            date: "1/1/3",
            from: "Jimmy Dean",
            address: "jdean@zmail.com",
            subject: "Welcome to Email!",
            message: "Hello, and welcome to Email! <br> Huzzah!",
            option1: "Sure",
            option1_ifSelected: function () {internetMod.addMoney(1000, "Bloo");},
            option2: "No",
            option2_ifSelected: function () {internetMod.addMoney(-1000, "BLAH");}
        });
    }
    internetMod_tutorialEmail();

    var internetMod_exampleEmail2 = function() {
        internetMod.AddEmail({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            id: "emailTest", // must be unique
            category: "Media", // must be internetCompany, Media, Fans, or Companies
            date: "1/1/3",
            from: "Jimmy Dean",
            address: "jdean@zmail.com",
            subject: "Welcome to Email!",
            message: "Test email! Test! Test! TEST!!",
            option1: "Sure",
            option1_ifSelected: 'addMoney(1000, "Floo")',
            option2: "No",
            option2_ifSelected: 'addMoney(-1000, "FLAH")'
=======
=======
>>>>>>> parent of 1576065... stuff
=======
>>>>>>> parent of 1576065... stuff
          id: "emailTest", // must be unique
          category: "Media", // must be internetCompany, Media, Fans, or Companies
          date: "1/1/3",
          from: "Jimmy Dean",
          address: "jdean@zmail.com",
          subject: "Welcome to Email!",
          message: "Test email! Test! Test! TEST!!",
          option1: "Sure",
<<<<<<< HEAD
<<<<<<< HEAD
          option1_ifSelected: function () {internetMod.addMoney(1000, "Floo");},
          option2: "No",
          option2_ifSelected: function () {internetMod.addMoney(-1000, "FLAH");}
>>>>>>> origin/master
=======
          option1_ifSelected: 'addMoney(1000, "Floo")',
          option2: "No",
          option2_ifSelected: 'addMoney(-1000, "FLAH")'
>>>>>>> parent of 1576065... stuff
=======
          option1_ifSelected: 'addMoney(1000, "Floo")',
          option2: "No",
          option2_ifSelected: 'addMoney(-1000, "FLAH")'
>>>>>>> parent of 1576065... stuff
        });
    }
    internetMod_exampleEmail2();
})();


GDT.addEvent({
    id: "internetCreationEmail",
    date: "1/1/2",
    getNotification: function(company) {
     Sound.playSoundOnce("research", 0.2);
        return new Notification({
            header: "Email Service",
            text: 'There is a new service available called "Email" that allows users to communicate on a computer. People are raving about the new capabilites that expand on global interaction. {n}New internet service available: Email',
            // image: "",
            buttonText: "OK",

            sourceId : "internetCreationEmail"
        });
    },
    complete: function() {
        $("body").append('<div id="internet">' +
            '<table class="navBar"> <tr id="tabBar">' +
            '<td id="refresh" onclick="refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i></td>' +
            '<td id="email" class="tab" onclick="openEmail()">Email</td>' +
            '<td id="forum" class="tab" onclick="openForum()"><s>Forum</s></td>' +
            '<td id="social" class="tab" onclick="openSocial()">Social Network</td>' +
            '<td id="bug" class="tab" onclick="openBug()"><s>Bug Center</s></td>' +
            '<td id="exit" class="tabX" onclick="exit()"> </td> </tr> </table>' +
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
            '<div id="internetNotifs" onclick="emailNotifOPEN()">' +
            '<div id="iNotifs" class="iNotifs"></div>' +
            '</div>');
        $("#internet").hide();

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
}
});
