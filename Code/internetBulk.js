/*
TO-DO List (Not Done is "-". Done is "+"):
+ Make functions in mod scope
- Make Internet Mod data save to a specfic save file (probably need to use dataStore or something)
- Maybe have news and trends be on a website
- Start Bug Website
- Finish Social Website
- Dynamic internet window design (changes over time)
- Fix new game bug (window stays open and non-functional after creating a new save)
- Instead of adding IDs to EVERYTHING, just identify like (#EmailID #EmailIDChild)
- Create more emails:
  -- Allow more in-depth email respones (right now, they are basically just events)
  -- Use typewrite({ delay: foo }) for email responses (l:12150)
  -- More stuff I don't feel like typing out
*/

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

internetMod.emailNotifOPEN = function() {
    $("#loaders").hide();
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
internetMod.createBugWebsite = function() {
    $('#navBar').removeClass('justEmail');
    $('#navBar').addClass('plusBug');
    $('#tabBar').append('<td id="bug" class="tab" onclick="internetMod.openBug()">Bug Center</td>');
    $('#content').append('<div id="bugSITE"> Sorry <br> Not Available </div>');
}

// Social Site
internetMod.createSocialWebsite = function() {
    $('#navBar').removeClass('plusBug');
    $('#navBar').addClass('plusSocial');
    $('#tabBar').append('<td id="social" class="tab" onclick="internetMod.openSocial()">Social Network</td>');
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
}

//NOT SURE YET Website
internetMod.createXYZWebsite = function() {
    $('#navBar').removeClass('plusSocial');
    $('#navBar').addClass('plusXYZ');
    $('#tabBar').append('<td id="forum" class="tab" onclick="internetMod.openXYZ()">Forum</td>');
    $('#content').append('<div id="forumSITE">Sorry <br> Not Available</div>');
}

// Email Notifications
internetMod.countNotifs = function(notifNumber) {
    var notifCount = $("#emailMSGList").find('.forGenl').length + notifNumber;

    $("#iNotifs").empty().append(notifCount);
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
internetMod.ShowWindow = function() {
    $("#internet").show();
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").hide();
}

// Internet tabs -----------------------------------------------------------------------------------------------------------
// Refreshes a page (Currenly not working 100% correctly)
internetMod.refresh = function() {
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
internetMod.openEmail = function() {
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
internetMod.openXYZ = function() {
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
internetMod.openSocial = function() {
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
internetMod.openBug = function() {
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
internetMod.exit = function() {
    Sound.click();
    $("#internet").hide();
    GameManager.resume(!0);
};

// Social Netowrk ------------------------------------------------------------------------------------------------------
// Allows posting on the Social Network website
internetMod.postFlutterMessage = function() {
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
(internetMod.initEmail = function() {
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

    internetMod.checkForReply = function(email) {
        internetMod.addResponse = function(emailNumber, emailMessage, emailVersionOption1, emailVersionOption2) {
            if ($('#emailOptions_' + email.id + '-1').hasClass('disableElement') && $('#otherResponses_' + email.id + '').hasClass('forGen')) {
                console.log("Option 1 or 2 has been clicked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                $('#trashEmail_' + email.id + '').remove();
                $('#otherResponses_' + email.id + '').removeClass('forGen');
                $('#otherResponses_' + email.id + '').append('<div id="Email_' + email.id + '-' + emailNumber + '" class="emailInfo forGen">' +
                    '<hr>' +
                    '<div id="subjectE">Response ' + emailNumber + ':</div>' +
                    '<p id="emailENTRY" class="emailENTRY">' + emailMessage + '</p> <hr>' +
                    '<table id="emailOptions_' + email.id + '-' + emailNumber + '" class="emailOptions" cellspacing="20px"> <tr>' +
                    '<td id="Option1_' + email.id + '-' + emailNumber + '" class="emailOption forGenl">' + emailVersionOption1 + '</td>' +
                    '<td id="Option2_' + email.id + '-' + emailNumber + '" class="emailOption forGenl">' + emailVersionOption2 + '</td> </tr> </table>' +
                    '<table id="trashEmail_' + email.id + '" class="trashEmail"> <tr> <td id="trashTD">Trash Email (Double Click)</td> </tr> </table>');
                $('#otherResponses_' + email.id + '').show();
                internetMod.countNotifs(1);
            }
        }

        // Notifies user when/if he or she has a new message
        if ($('#emailOptions_' + email.id + '-1').hasClass('disableElement') && !$('#emailOptions_' + email.id + '-2').hasClass('disableElement')) {
            $('#checkmark_' + email.id + '').hide();
            $('#haveMSG_' + email.id + '').show();
            $('#List_' + email.id + '').addClass('haveMSGborder');
        } else {
            $('#haveMSG_' + email.id + '').hide();
        }

        // Displays version 1 of email (might condense this as well)
        if ($('#Option1_' + email.id + '-1').hasClass('forGen') && !$('#Option2_' + email.id + '-1').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option1_' + email.id + '-1').removeClass('forGen');
            internetMod.addResponse(2, email.v1_message2, email.v1_m2_option1, email.v1_m2_option2);
        }

        // Displays version 2 of email (might condense this as well)
        if ($('#Option2_' + email.id + '-1').hasClass('forGen') && !$('#Option1_' + email.id + '-1').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option2_' + email.id + '-1').removeClass('forGen');
            internetMod.addResponse(2, email.v2_message2, email.v2_m2_option1, email.v2_m2_option2);
        }

        $('#Option1_' + email.id + '-2').on('click', function(event) {
            internetMod.optionDefaults(2, 'Option1');

            email.v1_m2_option1_ifSelected && email.v1_m2_option1_ifSelected();
        });

        $('#Option2_' + email.id + '-2').on('click', function(event) {
            internetMod.optionDefaults(2, 'Option2');

            email.v1_m2_option2_ifSelected && email.v1_m2_option2_ifSelected();
        });

        $('#trashEmail_' + email.id + '').dblclick(function() {
            $('#emailMain').children().remove();
            $('#List_' + email.id + '').remove();
        });
    }

    internetMod.emailModTick = function() {
        for (var i = 0; i < internetMod.emailListToAdd.length; i++) {
            var email = internetMod.emailListToAdd[i];
            var date = email.date.split('/');
            if (GameManager.company.isLaterOrEqualThan(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])) && internetMod.emailList.indexOf(email) == -1) {
                internetMod.emailList.push(email);
                internetMod.AddEmailToHTMLPage(email);
                internetMod.countNotifs(0);
                Sound.playSoundOnce("bugDecrease", 0.2);
            }
            /* Trigger thingy
            if (email.itrigger && email.itrigger()) {
              internetMod.emailList.push(email);
              internetMod.AddEmailToHTMLPage(email);
              internetMod.countNotifs(0);
            }
            */
        }
        internetMod.checkForReply(email);
    }


    GDT.on(GDT.eventKeys.gameplay.weekProceeded, internetMod.emailModTick);
    GDT.on(GDT.eventKeys.saves.loading, internetMod.load);
    GDT.on(GDT.eventKeys.saves.newGame, internetMod.startNewGame);


    internetMod.AddEmail = function(email) {
        internetMod.emailListToAdd.push(email);
    }

    internetMod.AddEmailToHTMLPage = function(email) {

        var emailMessageList = $("#emailMSGList");
        emailMessageList.append('<li id="List_' + email.id + '" class="forGenl priListItem"> <div class="rndPrItem"><div id="haveMSG_' + email.id + '" class="haveMSG">!</div><img id="checkmark_' + email.id + '" class="checkmark_Email" " src="./mods/The_Internet_Mod/img/checkmark.png" style="display: none;"></img><img class="iconE" src="./mods/The_Internet_Mod/img/profileIcon_Email.png">' +
            '<div id="nameE">' + email.from + '</div>' +
            '<div id="usernameE">' + email.address + '</div><hr style="margin-top: 0px;">' +
            '<div id="subjectE">' + email.subject + '</div>' +
            '<div id="messageE">' + email.message + '</div>' +
            //'<div id="optionDisplay_' + email.id + '" class="optionDisplay" style="display: none;"> <hr> <div id="optionActual" class="optionActual"><b>Response:</b><span id="response1_' + email.id + '" style="display: none;"> ' + email.option1 + '</span><span id="response2_' + email.id + '" style="display: none;"> ' + email.option2 + '</span></div> </div></div>' +
            '</li>');

        /*
                '' + email.id + '_' + email.option1 + '' = function() {
                    email.option1_ifSelected;
                }
        */

        var emailOpened = $("#emailMain");
        emailOpened.append('<div id="Email_' + email.id + '" class="emailInfo">' +
            'Category: ' + email.category + ' <br>' +
            'From: ' + email.from + ' (' + email.address + ')<br>' +
            'Date: ' + email.date + ' <br> <br>' +
            '<div class="emailSubj">Subject: ' + email.subject + ' </div> <hr>' +
            '<p class="emailENTRY">' + email.message + '</p> <hr>' +
            '<table id="emailOptions_' + email.id + '-1" class="emailOptions" cellspacing="20px"> <tr>' +
            '<td id="Option1_' + email.id + '-1" class="emailOption">' + email.option1 + '</td>' +
            '<td id="Option2_' + email.id + '-1" class="emailOption">' + email.option2 + '</td> </tr> </table>' +
            '<table id="trashEmail_' + email.id + '" class="trashEmail"> <tr> <td id="trashTD">Trash Email (Double Click)</td> </tr> </table>' +
            '</div>' +
            '<div id="otherResponses_' + email.id + '" class="forGen">' +
            // Message 2
            //    '<div id="Email_' + email.id + '-2" class="emailInfo forGen">' +
            '</div>' +
            '</div>');

        internetMod.optionDefaults = function(emailNumber, option) {
            $('#List_' + email.id + '').removeClass('haveMSGborder');
            $('#List_' + email.id + '').removeClass('forGenl');
            $('#List_' + email.id + '').addClass('emailResponded');
            $('#' + option + '_' + email.id + '-' + emailNumber + '').addClass('optionDisplay');
            $('#' + option + '_' + email.id + '-' + emailNumber + '').addClass('forGen');
            $('#emailOptions_' + email.id + '-' + emailNumber + '').addClass('disableElement');
            $('#haveMSG_' + email.id + '').hide();
            $('#checkmark_' + email.id + '').show();
            Sound.click();
            internetMod.countNotifs(0);
            //      $('#optionDisplay_' + email.id + '').show();
            //Because you are setting pointer-events: none; The update code for refreshing the UIisn't update;
            //Call this to force a repaint. Suggest to use a button and put the disabled attribute on it. This way this workaround is not needed.
            $('#List_' + email.id + '').toggle().toggle();
        }

        // Option Stuff (probably will optimize this later and make it shorter)
        // I'd like to make it so I can just do internetMod.onOptionClick(option1, 2);
        $('#Option1_' + email.id + '-1').on('click', function(event) {
            //        $('#response1_' + email.id + '').show();
            internetMod.optionDefaults(1, 'Option1');
            email.option1_ifSelected && email.option1_ifSelected();
        });

        $('#Option2_' + email.id + '-1').on('click', function(event) {
            //      $('#response2_' + email.id + '').show();
            internetMod.optionDefaults(1, 'Option2');

            email.option2_ifSelected && email.option2_ifSelected();
        });
        //----------------------------------------------------------------------

        $('#trashEmail_' + email.id + '').dblclick(function() {
            $('#emailMain').children().remove();
            $('#List_' + email.id + '').remove();
        });

        // Allows for switch between emails
        $('#Email_' + email.id + '').hide();

        $('#List_' + email.id + '').click(function() {
            $('#Email_' + email.id + '').siblings().hide();
            $('#Email_' + email.id + '').show();
            $('#Email_' + email.id + '-2').show();
            Sound.playSoundOnce("reviewTack", 0.2);
        });
    }

    // Example internet email message
    var internetMod_tutorialEmail = function() {
        internetMod.AddEmail({
            id: 'welcomeEmail', // must be unique
            /* itrigger: function(company) {
              GameManager.company.currentLevel == 1;
            }, */
            category: 'Media', // must be internetCompany, Media, Fans, or Companies
            date: '1/1/3',
            from: 'Jimmy Dean',
            address: 'jdean@zmail.com',
            subject: 'Welcome to Email!',
            message: 'Hello, and welcome to Email! Huzzah!', // Like in html, use <br> to make a line break
            option1: 'Sure',
            option1_ifSelected: function() {
                internetMod.addMoney(1000, 'Bloo');
            },
            option2: 'No',
            option2_ifSelected: function() {
                internetMod.addMoney(-1000, 'BLAH');
            },
            // Email received based on option
            // Possible Outcome 1
            v1_message2: 'Version NUMBER ONEEEEEEEEEEEEEEEEEEEEEEE',
            v1_m2_option1: 'Fine',
            v1_m2_option1_ifSelected: function() {
                internetMod.addMoney(1000, 'Kloo');
            },
            v1_m2_option2: 'Still no',
            v1_m2_option2_ifSelected: function() {
                internetMod.addMoney(1000, 'KLAH');
            },
            // Possible Outcome 2
            v2_message2: 'Version NUMBER TWOOOOOOOO',
            v2_m2_option1: 'Fine',
            v2_m2_option1_ifSelected: function() {
                internetMod.addMoney(1000, 'Zloo');
            },
            v2_m2_option2: 'Still no',
            v2_m2_option2_ifSelected: function() {
                internetMod.addMoney(1000, 'Zlah');
            }
        });
    }
    internetMod_tutorialEmail();
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

            sourceId: "internetCreationEmail"
        });
    },
    complete: function() {
        // Implements Email Window
        $("body").append('<div id="internet">' +
            '<table class="navBar justEmail"> <tr id="tabBar">' +
            '<td id="refresh" onclick="internetMod.refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i></td>' +
            '<td id="email" class="tab" onclick="internetMod.openEmail()">Email</td>' +
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
        $("#internet").hide();

        // Implements Context Menu Button
        var showMenuUI = UI._showContextMenu;
        var showMenuItem = function(type, menuItems, x, y) {
            menuItems.push({
                label: "Internet...".localize("menu item"),
                action: function() {
                    Sound.click();
                    internetMod.ShowWindow();
                    GameManager.resume(false);
                }
            })
            showMenuUI(type, menuItems, x, y);
        }

        UI._showContextMenu = showMenuItem;
    }
});
