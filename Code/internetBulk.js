/*
TO-DO List (Not Done is "-". Done is "+"):
- Clean up and organize code
+ Make functions in mod scope
- Make Internet Mod data save to a specfic save file (probably need to use dataStore or something)
- Maybe have news and trends be on a website
- Start News Website
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
var internetImages = './mods/The_Internet_Mod/Img/';


function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.Pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.Resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.Resume();
}


// Implements Context Menu Button
(function() {
    var showMenuUI = UI._showContextMenu;
    var showMenuItem = function(type, menuItems, x, y) {
        var item = {
            label: "Internet...".localize("menu item"),
            action: function() {
                Sound.click();
                internetMod.ShowWindow();
                GameManager.resume(false);
                // addReplyBulk.Pause();
            }
        };

        if (internetMod.UIInitialized) {
            menuItems.push(item);
        }

        showMenuUI(type, menuItems, x, y);
    };

    UI._showContextMenu = showMenuItem;
})();

// Thanks kristof!
internetMod.addMoney = function(money, text) {
    GameManager.company.adjustCash(money, "" + text + "");
};

internetMod.addResearchPoints = function() {
    GameManager.company.researchPoints += 100;
    VisualsManager.researchPoints.updatePoints(GameManager.company.researchPoints);
};

internetMod.addFans = function(fans) {
    GameManager.company.fans += fans;
};

internetMod.addHype = function(hype) {
    GameManager.company.adjustHype(hype);
};
// kristof1104 is the best --------------------------------------------------------------------------------------------------- (Thx :-) )


internetMod.emailNotifOPEN = function() {
    internetMod.startSlideshow();
    $("#loaders").hide();
    $("#newsSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#emailSITE").show();
    $("#internetContainer").show();
    GameManager.pause(true);
    // addReplyBulk.Pause();
};

// Bug Site
internetMod.createBugWebsite = function() {
    $('#navBar').removeClass('justEmail');
    $('#navBar').addClass('plusBug');
    $('#tabBar').append('<td id="bug" class="tab" onclick="internetMod.openBug()">Bug Center</td>');
    $('#content').append('<div id="bugSITE"> Sorry <br> Not Available </div>');
};

// Social Site
internetMod.createSocialWebsite = function() {
    $('#navBar').removeClass('plusBug');
    $('#navBar').addClass('plusSocial');
    $('#social').show();
    $('#socialSITE').show()
};

//NOT SURE YET Website
internetMod.createXYZWebsite = function() {
    $('#navBar').removeClass('plusSocial');
    $('#navBar').addClass('plusXYZ');
    $('#forum').show();
    $('#forumSITE').show();
};

// Email Notifications
internetMod.countNotifs = function(notifNumber) {
    var notifCount = $("#emailMSGList").find('.forGenl').length + notifNumber;

    $("#iNotifs").html(notifCount);
};

// not yet working
$("#iNotifs").bind("DOMSubtreeModified", function() {
    $("#iNotifs").animate({
        margin: '-45px 28px',
        width: '30px',
        height: '30px',
        fontSize: '18pt'
    }, 200, function(e) {
        $("#iNotifs").animate({
            margin: '-45px 28px',
            width: '20px',
            height: '20px',
            fontSize: '12pt'
        }, 200)
    });
});


// Shows the internet window
internetMod.ShowWindow = function() {
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").hide();
    $("#internetContainer").show();
    internetMod.startSlideshow();
};


// News Website
(function() {
    imagesForADS = ['./mods/The_Internet_Mod/Img/refresh.png', './mods/The_Internet_Mod/Img/refresh.png', './mods/The_Internet_Mod/Img/refresh.png', './mods/The_Internet_Mod/Img/refresh.png'];
    var slideCount = $('#newsArticleSlideshow ul li').length;
    var slideWidth = $('#newsArticleSlideshow ul li').width();
    var slideHeight = $('#newsArticleSlideshow ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#newsArticleSlideshow ul').css('width', sliderUlWidth);
    $('#newsArticleSlideshow ul').css('margin-left', -slideWidth);


    // Article Template
    internetMod.articleStuff = [];
    internetMod.articleToAdd = [];

    internetMod.AddNewsArticle = function(newsArticle) {
        internetMod.articleToAdd.push(newsArticle);
    };

    internetMod.AddArticleToHTMLPage = function(newsArticle) {
        var newsSlideshowDiv = $('#newsArticleSlideshow ul');
        var recentGamesNews = $('.articleGameBlock');
        var recentPlatformNews = $('.articlePlatformBlock');
        var gamesNewsList = $('#gamesArticleList');
        var platformsNewsList = $('#platformsArticleList');
        var textPreviewFormat = newsArticle.text.replace(/<|b>|br>|i>|h2>|u>|s>/g, "").replace(/\//g, "");
        var textForSlideshow = textPreviewFormat.substr(0, 80) + '...';
        var textForListItem = textPreviewFormat.substr(0, 240) + '...';
        var newsListItemTemplate = '<li id="ArticleList_' + newsArticle.id + '" class="Article_' + newsArticle.id + ' ' + newsArticle.category + '"> <div style="padding-left: 20px; padding-top: 10px;"> <img class="articleListImage" src="' + newsArticle.imageURL + '"></img> <div class="articleInfoBlock"> <span class="articleHeader" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + newsArticle.header + '</span> <span class="articleListDate">' + newsArticle.date + '</span> <p class="articleListText">' + textForListItem + '</p> </div> </div> </li>';
        var recentNewsItemTemplate = '<div id="ArticleRecent_' + newsArticle.id + '" class="Article_' + newsArticle.id + ' ' + newsArticle.category + '"><img class="articleBlockImage" src="' + newsArticle.imageURL + '"> <div class="articleBlockDetails"><span class="articleHeader">' + newsArticle.header + '</span> </div> </img></div>';

        newsSlideshowDiv.prepend('<li id="ArticleSlideshow_' + newsArticle.id + '" class="Article_' + newsArticle.id + ' ' + newsArticle.category + '" data-position="1">' +
            '<img class="slideContents" src="' + newsArticle.imageURL + '"><div class="slideDetails">' +
            '<span class="articleHeader">' + newsArticle.header + '</span>' +
            '<span class="articleListDate">' + newsArticle.date + '</span>' +
            '<p id="articleText">' + textForSlideshow + '</p></div> </img></li>');

        if (newsArticle.category == 'games') {
            recentGamesNews.html(recentNewsItemTemplate);
            gamesNewsList.prepend(newsListItemTemplate);
        } else if (newsArticle.category == 'platforms') {
            recentPlatformNews.html(recentNewsItemTemplate);
            platformsNewsList.prepend(newsListItemTemplate);
        }



        // For some reason, it only works as a class
        $('.Article_' + newsArticle.id + '').click(function() {
            internetMod.hideAllPages();
            // For fictional ads
            var iRandomAD = imagesForADS.pickRandom();
            $('.newsAD').attr('src', iRandomAD);

            $('#headerInArticle').html(newsArticle.header);
            $('#dateInArticle').text(newsArticle.date);
            $('#imageForArticle').attr('src', newsArticle.imageURL);
            $('#textInArticle').html(newsArticle.text);
            $("#newsArticlesOnDeck").fadeIn();
        });
    };


    // News Slideshow
    internetMod.animateSlideBarLoop = function() {
        $("#actualSlideBar").stop();
        $("#actualSlideBar").css("width", '0%');
        $("#actualSlideBar").animate({
            width: "100%"
        }, 5000, internetMod.animateSlideBarLoop);
    };

    internetMod.moveRight = function() {
        var slideWidth = $('#newsArticleSlideshow ul li').width();
        internetMod.animateSlideBarLoop();

        $('#newsArticleSlideshow ul').animate({
            left: -slideWidth
        }, 900, function() {
            $('#newsArticleSlideshow ul li:first-child').appendTo('#newsArticleSlideshow ul');
            $('#newsArticleSlideshow ul').css('left', '');
        });
    };

    internetMod.moveLeft = function() {
        var slideWidth = $('#newsArticleSlideshow ul li').width();
        internetMod.animateSlideBarLoop();

        $('#newsArticleSlideshow ul').animate({
            left: +slideWidth
        }, 900, function() {
            $('#newsArticleSlideshow ul li:last-child').prependTo('#newsArticleSlideshow ul');
            $('#newsArticleSlideshow ul').css('left', '');
        });
    };


    //    internetModSlideshowInterval();

    internetMod.disableSlideshow = function() {
        $("#actualSlideBar").stop();
        $("#actualSlideBar").css("width", '0%');
        clearInterval(internetModSlideshowInterval);
    };

    internetMod.resetSlideshow = function() {
        internetMod.disableSlideshow();
        internetMod.animateSlideBarLoop();
    };

    $('#newsArticleSlideshow ul li:last-child').prependTo('#newsArticleSlideshow ul');

    internetMod.hideAllPages = function() {
        $("#newsHome").fadeOut();
        $("#newsGames").fadeOut();
        $("#newsPlatforms").fadeOut();
        $("#newsAbout").fadeOut();
        $("#newsArticlesOnDeck").fadeOut();
    };

    internetMod.showNewsPage = function(newsPage) {
        $("#newsHome").fadeOut();
        $("#newsGames").fadeOut();
        $("#newsPlatforms").fadeOut();
        $("#newsAbout").fadeOut();
        $("#newsArticlesOnDeck").fadeOut();
        $("#" + newsPage + "").fadeIn();
    };

    internetMod.goNewsHome = function() {
        internetMod.showNewsPage("newsHome");
    };

    internetMod.goNewsGames = function() {
        internetMod.showNewsPage("newsGames");
    };

    internetMod.goNewsPlatforms = function() {
        internetMod.showNewsPage("newsPlatforms");
    };

    internetMod.goNewsAbout = function() {
        internetMod.showNewsPage("newsAbout");
    };
})();


internetMod.startSlideshow = function() {
    internetModSlideshowInterval = setInterval(function() {
        var slideWidth = $('#newsArticleSlideshow ul li').width();
        $("#actualSlideBar").stop();
        internetMod.animateSlideBarLoop();

        $('#newsArticleSlideshow ul').animate({
            left: -slideWidth
        }, 900, function() {
            $('#newsArticleSlideshow ul li:first-child').appendTo('#newsArticleSlideshow ul');
            $('#newsArticleSlideshow ul').css('left', '');
        });
    }, 5000);
};

$('#slideRight').click(function(e) {
    e.stopPropagation();
    internetMod.moveRight();
    clearInterval(internetModSlideshowInterval);
    internetModSlideshowInterval = setInterval(function() {
        var slideWidth = $('#newsArticleSlideshow ul li').width();
        $("#actualSlideBar").stop();
        internetMod.animateSlideBarLoop();

        $('#newsArticleSlideshow ul').animate({
            left: -slideWidth
        }, 900, function() {
            $('#newsArticleSlideshow ul li:first-child').appendTo('#newsArticleSlideshow ul');
            $('#newsArticleSlideshow ul').css('left', '');
        });
    }, 5000);
});

$('#slideLeft').click(function(e) {
    e.stopPropagation();
    internetMod.moveLeft();
    clearInterval(internetModSlideshowInterval);
    internetModSlideshowInterval = setInterval(function() {
        var slideWidth = $('#newsArticleSlideshow ul li').width();
        $("#actualSlideBar").stop();
        internetMod.animateSlideBarLoop();

        $('#newsArticleSlideshow ul').animate({
            left: -slideWidth
        }, 900, function() {
            $('#newsArticleSlideshow ul li:first-child').appendTo('#newsArticleSlideshow ul');
            $('#newsArticleSlideshow ul').css('left', '');
        });
    }, 5000);
});


// GDT.on(GDT.eventKeys.saves.newGame, internetMod.newsSite);

// Social Network ------------------------------------------------------------------------------------------------------
(function() {
    // Allows for a timeline on social media
    internetMod.yearChecker = function() {
        var d = GameManager.company.getDate(GameManager.company.currentWeek);
        var a = d.year - 1; // I do minus one because I want it to be the header of the previous year
        var g = a.toString();
        if (d.year !== 1 && d.month == 1 && d.week == 1) {
            $('#conversation').prepend('Year ' + g + ''); // eventually add style to this
        }
    };

    internetMod.UI_showNewMSG = function() {
        $('#newMsgUI').fadeIn(100);
    };

    internetMod.clickTest = function() {
        UI._showNotification(new Notification("{GameDefinition}"));
    };

    $('.announceChild').hide();
    $('.announceChild2').hide();
    $('.announceChild3').hide();

    internetMod.clearMessageBox = function() {
        $('#msgPrt1').empty();
        $('#msgPrt2').empty();
        $('#msgPrt3').empty();
    };

    internetMod.msgOption_Announce = function() {
        if (!$('#announce').hasClass('msgOptionSelected') && !$('#announce').hasClass('disableElement')) {
            $('#announce').addClass('msgOptionSelected').addClass('disableElement');
            $(this).siblings().removeClass('msgOptionSelected').removeClass('disableElement');
            $('.announceChild').slideToggle(200);
        } else {
            $('#announce').removeClass('msgOptionSelected');
            $('.announceChild').slideToggle(200);
            internetMod.clearMessageBox();
        }

        if ($('#announce').hasClass('msgOptionSelected') && $('.announceChild').hasClass('msgOptionSelected')) {
            $('.announceChild2').slideToggle(200);
        }
    };

    $('.announceChild').click(function() {
        var msgPart1 = $(this).html().replace(/"/g, '');
        $(this).addClass('msgOptionSelected');
        $(this).siblings('.announceChild').removeClass('msgOptionSelected');
        $('#msgPrt1').text('' + msgPart1 + '');
        if (!$(this).hasClass('msgOptionSelected') && $('.announceChild2').show()) {
            $('.announceChild2').slideToggle(200);
        } else {
            $('.announceChild2').show();
        }
    });

    // When this is clicked, the game definition window should be displayed (or a version of a game defintion window). I don't need certain buttons, like Medium, Large, AAA, etc, but I can just take care of that with .remove(), so don't worry about it.
    // All the HTML can be found in "Main.js".
    $('.announceChild2').click(function() {
        //  var msgPart2 = (this).innerHTML.replace('"', '').replace('"', '');
        $(this).siblings('.announceChild2').removeClass('msgOptionSelected');
        $(this).addClass('msgOptionSelected');
        if ($(this).text() == 'Game') {
            // I just wanted to vary the messages a bit. I'd like to use this for other parts of the message
            if (Math.random() > 0.5) {
                $('#msgPrt2').text('game');
            } else {
                $('#msgPrt2').text('video game');
            }
        }
createGameDevUI();
        /* Currently, the code below opens up a div where I had a version of the game defintion window.
         If it's simple enough, I'd like to have the game definition dialog displayed inside ".announceChild3".
        I just don't want players to feel like they are about to make a game when the same game definition window pops up.
        So if a slightly different version is in .announceChild3, there won't be much confusion.
        I can probably just use .css() to make the Social Website's game def dialog a little different.
        */
        if (!$(this).hasClass('msgOptionSelected') && $('.announceChild3').show()) {
            $('.announceChild3').slideToggle(200);
        } else {
            $('.announceChild3').show();
        }

    });

    // Closes/Resets the new message window on pressing Trash button
    internetMod.clearFlutterMessage = function() {
        $('#newMsgUI').hide();
        $('.msgOption').removeClass('msgOptionSelected').removeClass('disableElement');
        $('.announceChild').removeClass('msgOptionSelected').removeClass('disableElement').hide();
        $('.announceChild2').removeClass('msgOptionSelected').removeClass('disableElement').hide();
        $('#newMsgPreview').css('border', '1px solid #f4f5f9');
        internetMod.clearMessageBox();
    };

    // Allows posting on the Social Network website
    internetMod.postFlutterMessage = function() {
        var d = GameManager.company.getDate(GameManager.company.currentWeek);
        var MsgText = $('#newMSGString').text();
        //  var MsgLikes = internetMod.flutterFans;

        if (MsgText.length > 5) {
            Sound.playSoundOnce("tack", 0.2);
            $('#conversation').prepend("<li class='flutterPost'><div class='message-text'>" +
                "<div class='messageTop'>" +
                "<img class='postPic' src='./mods/The_Internet_Mod/Img/profileIcon_Email.png'></img>" +
                "<div class='postInfo'> <div class='postName'>John Smith (You)<span id='postDate'> - " + d.year + "/" + d.month + "/" + d.week + "</span></div> <div class='postUsername'>@jsmith12</div></div>" +
                "<div id='postReception'> <div class='postReceptionHeader'>" +
                "<span style='margin-left: 20px; font-size: 12pt;'>Likes</span>" +
                "<span style='margin-left: 20px; font-size: 12pt;'>Dislikes</span></div>" +
                "<div id='postDislikes' class='dislikes'>0</div>" +
                "<div id='postLikes' class='likes'>0</div>" +
                "</div></div>" +
                "<div class='messageBottom'>" + MsgText + "</div></div></li>");
            //    $('.widget-conversation').scrollTop($('ul li').last().position().top + $('ul li').last().height());

            // Closes/Resets the new message window on post
            internetMod.clearFlutterMessage();
        } else {
            $('#newMsgPreview').css('border', '1px solid #eb9f9f');
            $('#newMsgPreview').animate({
                opacity: '0.7'
            }, 'slow');
            $('#newMsgPreview').animate({
                opacity: '1'
            }, 'slow');
            $('#newMsgPreview').animate({
                opacity: '0.7'
            }, 'slow');
            $('#newMsgPreview').animate({
                opacity: '1'
            }, 'slow');
        }
    };
})();

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
(function() {
    console.log("Internet emails have intialized!");
    internetMod.UIInitialized = false;
    internetMod.emailList = [];
    internetMod.emailListToAdd = [];

    internetMod.reset = function() {
        internetMod.emailList = [];
        $('#internetNotifs').hide();
        $("#emailMSGList").html("");
    };

    internetMod.startNewGame = function() {
        internetMod.reset();
    };

    internetMod.load = function(e) {
        var data = e.data;
        var internetModData = data['internetModData'];
        if (!internetModData) {
            internetMod.startNewGame();
        } else if (internetModData["added_emails"]) {
            internetMod.emailList = internetModData["added_emails"].map(
                function(o) {
                    return internetMod.emailListToAdd.first(function(item) {
                        return item.id == o.id
                    });
                }
            );
            internetMod.UIInitialized = internetModData["UIInitialized"];
            if (internetMod.UIInitialized) internetMod.showUI();
        }
    };

    internetMod.save = function(e) {
        var data = e.data;
        var internetModData = data['internetModData'];
        if (!internetModData) {
            internetModData = data.internetModData = {};
        }
        internetModData["added_emails"] = internetMod.emailList.map(function(n) {
            return {
                id: n.id
            };
        });
        internetModData["UIInitialized"] = internetMod.UIInitialized;
    };

    internetMod.showUI = function() {
        $("#internetNotifs").show();
        $('#iCompanyName').html('' + GameManager.company.name + '');
    };

    internetMod.checkForReply = function(email) {
        internetMod.addResponse = function(emailNumber, emailMessage, emailVersionOption1, emailVersionOption2) {
            var d = GameManager.company.getDate(GameManager.company.currentWeek);
            var iA = emailNumber - 1;
            var iB = iA.toString();

            if ($('#emailOptions_' + email.id + '-1').hasClass('disableElement') && $('#otherResponses_' + email.id + '').hasClass('forGen')) {
                console.log("Option 1 or 2 has been clicked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                email.replyTime = GameManager.gameTime + (1 + 2 * GameManager.company.getRandom() * GameManager.SECONDS_PER_WEEK * 1E3);
                $('#otherResponses_' + email.id + '').removeClass('forGen');
                $('#otherResponses_' + email.id + '').append('<div id="Email_' + email.id + '-' + emailNumber + '" class="emailInfo forGen">' +
                    '<hr>' +
                    '<div id="subjectE">Response ' + emailNumber + ' (' + d.year + '/' + d.month + '/' + d.week + '):</div>' +
                    '<p id="emailENTRY" class="emailENTRY">' + emailMessage + '</p> <hr>' +
                    '<table id="emailOptions_' + email.id + '-' + emailNumber + '" class="emailOptions" cellspacing="20px"> <tr>' +
                    '<td id="Option1_' + email.id + '-' + emailNumber + '" class="emailOption forGenl">' + emailVersionOption1 + '</td>' +
                    '<td id="Option2_' + email.id + '-' + emailNumber + '" class="emailOption forGenl">' + emailVersionOption2 + '</td> </tr> </table>');
                $('#otherResponses_' + email.id + '').show();

                $('#Option1_' + email.id + '-2').on('click', function(event) {
                    internetMod.optionDefaults('2', 'Option1');

                    email.v1_message2_option1_ifSelected && email.v1_message2_option1_ifSelected();
                });

                $('#Option2_' + email.id + '-2').on('click', function(event) {
                    internetMod.optionDefaults('2', 'Option2');

                    email.v1_message2_option2_ifSelected && email.v1_message2_option2_ifSelected();
                });

                $('#Option1_' + email.id + '-3').on('click', function(event) {
                    internetMod.optionDefaults('3', 'Option1');

                    email.v1_message3_option1_ifSelected && email.v1_message3_option1_ifSelected();
                });

                $('#Option2_' + email.id + '-3').on('click', function(event) {
                    internetMod.optionDefaults('3', 'Option2');

                    email.v1_message3_option2_ifSelected && email.v1_message3_option2_ifSelected();
                });
                $('#Option1_' + email.id + '-4').on('click', function(event) {
                    internetMod.optionDefaults('4', 'Option1');

                    email.v1_message4_option1_ifSelected && email.v1_message4_option1_ifSelected();
                });

                $('#Option2_' + email.id + '-4').on('click', function(event) {
                    internetMod.optionDefaults('4', 'Option2');

                    email.v1_message4_option2_ifSelected && email.v1_message4_option2_ifSelected();
                });
                $('#Option1_' + email.id + '-5').on('click', function(event) {
                    internetMod.optionDefaults('5', 'Option1');

                    email.v1_message5_option1_ifSelected && email.v1_message5_option1_ifSelected();
                });

                $('#Option2_' + email.id + '-5').on('click', function(event) {
                    internetMod.optionDefaults('5', 'Option2');

                    email.v1_message5_option2_ifSelected && email.v1_message5_option2_ifSelected();
                });
                internetMod.countNotifs(1);

                internetMod.optionDefaults = function(emailNumber, option) {
                    $('#List_' + email.id + '').removeClass('haveMSGborder');
                    $('#List_' + email.id + '').removeClass('forGenl');
                    $('#List_' + email.id + '').addClass('emailResponded');
                    $('#' + option + '_' + email.id + '-' + emailNumber + '').addClass('optionSelected');
                    $('#' + option + '_' + email.id + '-' + emailNumber + '').addClass('forGen');
                    $('#emailOptions_' + email.id + '-' + emailNumber + '').addClass('disableElement');
                    $('#haveMSG_' + email.id + '').hide();
                    $('#checkmark_' + email.id + '').show();
                    Sound.click();
                    internetMod.countNotifs(0);
                    //      $('#optionSelected_' + email.id + '').show();
                    $('#List_' + email.id + '').toggle().toggle();
                };


                // Notifies user when/if he or she has a new message
                if ($('#emailOptions_' + email.id + '-' + iB + '').hasClass('disableElement') && !$('#emailOptions_' + email.id + '-' + emailNumber + '').hasClass('disableElement')) {
                    $('#checkmark_' + email.id + '').hide();
                    $('#haveMSG_' + email.id + '').show();
                    $('#List_' + email.id + '').addClass('haveMSGborder');
                } else {
                    $('#haveMSG_' + email.id + '').hide();
                    $('#List_' + email.id + '').removeClass('haveMSGborder');
                }
            }
        };

        // Displays version 1 of email (might condense this as well)
        if ($('#Option1_' + email.id + '-1').hasClass('forGen') && !$('#Option2_' + email.id + '-1').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option1_' + email.id + '-1').removeClass('forGen');
            internetMod.addResponse('2', email.v1_message2, email.v1_message2_option1, email.v1_message2_option2);
        }

        // Displays version 2 of email (might condense this as well)
        if ($('#Option2_' + email.id + '-1').hasClass('forGen') && !$('#Option1_' + email.id + '-1').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option2_' + email.id + '-1').removeClass('forGen');
            internetMod.addResponse('2', email.v2_message2, email.v2_message2_option1, email.v1_message2_option2);
        }

        // Thrid message
        // Displays version 1 of email (might condense this as well)
        if ($('#Option1_' + email.id + '-2').hasClass('forGen') && !$('#Option2_' + email.id + '-2').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option1_' + email.id + '-2').removeClass('forGen');
            internetMod.addResponse('3', email.v1_message3, email.v1_message3_option1, email.v1_message3_option2);
        }

        // Displays version 2 of email (might condense this as well)
        if ($('#Option2_' + email.id + '-2').hasClass('forGen') && !$('#Option1_' + email.id + '-2').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option2_' + email.id + '-2').removeClass('forGen');
            internetMod.addResponse('3', email.v2_message3, email.v2_message3_option1, email.v1_message3_option2);
        }

        // Fourth message
        // Displays version 1 of email (might condense this as well)
        if ($('#Option1_' + email.id + '-3').hasClass('forGen') && !$('#Option2_' + email.id + '-3').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option1_' + email.id + '-3').removeClass('forGen');
            internetMod.addResponse('4', email.v1_message4, email.v1_message4_option1, email.v1_message4_option2);
        }

        // Displays version 2 of email (might condense this as well)
        if ($('#Option2_' + email.id + '-3').hasClass('forGen') && !$('#Option1_' + email.id + '-3').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option2_' + email.id + '-3').removeClass('forGen');
            internetMod.addResponse('4', email.v2_message4, email.v2_message4_option1, email.v1_message4_option2);
        }

        // Fifth message
        // Displays version 1 of email (might condense this as well)
        if ($('#Option1_' + email.id + '-4').hasClass('forGen') && !$('#Option2_' + email.id + '-4').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option1_' + email.id + '-4').removeClass('forGen');
            internetMod.addResponse('5', email.v1_message5, email.v1_message5_option1, email.v1_message5_option2);
        }

        // Displays version 2 of email (might condense this as well)
        if ($('#Option2_' + email.id + '-4').hasClass('forGen') && !$('#Option1_' + email.id + '-4').hasClass('forGen')) {
            $('#otherResponses_' + email.id + '').addClass('forGen');
            $('#Option2_' + email.id + '-4').removeClass('forGen');
            internetMod.addResponse('5', email.v2_message5, email.v2_message5_option1, email.v1_message5_option2);
        }
        // --------------------------------------------------------------------------------------------------------------------------------


        $('#trashEmail_' + email.id + '').dblclick(function() {
            $('#emailMain').children().remove();
            $('#List_' + email.id + '').remove();
        });
    };

    internetMod.isEmailAdded = function(email) {
        return internetMod.emailList.first(function(item) {
            return item.id == email.id
        }) !== null;
    };

    internetMod.emailPushDefaults = function(email) {
        internetMod.emailList.push(email);
        internetMod.AddEmailToHTMLPage(email);
        internetMod.countNotifs(0);
        Sound.playSoundOnce("bugDecrease", 0.2);
    };

    GDT.on(GDT.eventKeys.saves.loading, internetMod.load);
    GDT.on(GDT.eventKeys.saves.saving, internetMod.save);
    GDT.on(GDT.eventKeys.saves.newGame, internetMod.startNewGame);


    internetMod.getStringDateFormatForWeekNumber = function(weekNumber) {
        var week = Math.floor(weekNumber) % 4 + 1;
        var month = Math.floor(weekNumber) / 4;
        var year = month / 12 + 1;
        month = month % 12 + 1;
        return Math.floor(year) + "/" + Math.floor(month) + "/" + Math.floor(week);
    };

    internetMod.AddEmail = function(email) {
        internetMod.emailListToAdd.push(email);
        email.replyTime = undefined;
        // email.pushDate = undefined;
        //            email.option1Selected = false;
        //          email.option2Selected = false;
    };

    /*
            var Email = function(email) {
                this.id = email.id;
                this.category = email.category;
                this.date = email.date;
                this.from = email.from;
                this.address = email.address;
                this.subject = email.subject;
                this.message = email.message;
                this.option1 = email.option1;
                this.option1_ifSelected = email.option1_ifSelected;
                this.option2 = email.option2;
                this.option2_ifSelected = email.option2_ifSelected;
                this.v1_message2 = email.v1_message2;
                this.v1_message2_option1 = email.v1_message2_option1;
                this.v1_message2_option2 = email.v1_message2_option2;
                this.v1_message2_option1_ifSelected = email.v1_message2_option1_ifSelected;
                this.v1_message2_option2_ifSelected = email.v1_message2_option2_ifSelected;
                this.v2_message2 = email.v2_message2;
                this.v2_message2_option1 = email.v2_message2_option1;
                this.v2_message2_option2 = email.v2_message2_option2;
                this.v2_message2_option1_ifSelected = email.v2_message2_option1_ifSelected;
                this.v2_message2_option2_ifSelected = email.v2_message2_option2_ifSelected;
                this.save = function() {
                    var data = {};
                    data["id"] = this.id;
                    data["category"] = this.category;
                    data["date"] = this.date;
                    data["from"] = this.from;
                    data["address"] = this.address;
                    data["subject"] = this.subject;
                    data["message"] = this.message;
                    data["option1"] = this.option1;
                    data["option1_ifSelected"] = this.option1_ifSelected;
                    data["option2"] = this.option2;
                    data["option2_ifSelected"] = this.option2_ifSelected;
                    data["v1_message3"] = this.v1_message2;
                    data["v1_option1"] = this.v1_message2_option1;
                    data["v1_option1_ifSelected"] = this.v1_message2_option1_ifSelected;
                    data["v1_option2"] = this.v1_option2;
                    data["v1_option2_ifSelected"] = this.v1_message2_option2_ifSelected;
                    return data;
                }
                internetModData["added_emails"] = internetMod.emailList.map(function (n) {return new Email(n).save()});
                this.load = function() {
                  // Message 1
                  if (this.message1_option1Selected = true && !$('#Option1_' + email.id + '-1').hasClass('optionSelected')) {
                    $('#Option1_' + email.id + '-1').addClass('optionSelected');
                  }
                  if (this.message1_option2Selected = true && !$('#Option2_' + email.id + '-1').hasClass('optionSelected')) {
                    $('#Option2_' + email.id + '-1').addClass('optionSelected');
                  }
                  // Message 2 | Version 1
                  if (this.v1_message2_option1Selected = true && !$('#Option1_' + email.id + '-2').hasClass('optionSelected')) {
                    $('#Option1_' + email.id + '-2').addClass('optionSelected');
                  }
                  if (this.v1_message2_option2Selected = true && !$('#Option2_' + email.id + '-2').hasClass('optionSelected')) {
                    $('#Option2_' + email.id + '-2').addClass('optionSelected');
                  }
                  // Message 2 | Version 2
                  if (this.v2_message2_option1Selected = true && !$('#Option1_' + email.id + '-2').hasClass('optionSelected')) {
                    $('#Option1_' + email.id + '-2').addClass('optionSelected');
                  }
                  if (this.v2_message2_option2Selected = true && !$('#Option2_' + email.id + '-2').hasClass('optionSelected')) {
                    $('#Option2_' + email.id + '-2').addClass('optionSelected');
                  }
                  // Message 3 | Version 1
                  if (this.v1_message3_option1Selected = true && !$('#Option1_' + email.id + '-3').hasClass('optionSelected')) {
                    $('#Option1_' + email.id + '-3').addClass('optionSelected');
                  }
                  if (this.v1_message3_option2Selected = true && !$('#Option2_' + email.id + '-3').hasClass('optionSelected')) {
                    $('#Option2_' + email.id + '-3').addClass('optionSelected');
                  }
                  // Message 3 | Version 2
                  if (this.v2_message3_option1Selected = true && !$('#Option1_' + email.id + '-3').hasClass('optionSelected')) {
                    $('#Option1_' + email.id + '-3').addClass('optionSelected');
                  }
                  if (this.v2_message3_option2Selected = true && !$('#Option2_' + email.id + '-3').hasClass('optionSelected')) {
                    $('#Option2_' + email.id + '-3').addClass('optionSelected');
                  }
                  // Message 4 | Version 1
                  if (this.v1_message4_option1Selected = true && !$('#Option1_' + email.id + '-4').hasClass('optionSelected')) {
                    $('#Option1_' + email.id + '-4').addClass('optionSelected');
                  }
                  if (this.v1_message4_option2Selected = true && !$('#Option2_' + email.id + '-4').hasClass('optionSelected')) {
                    $('#Option2_' + email.id + '-4').addClass('optionSelected');
                  }
                  // Message 4 | Version 2
                  if (this.v2_message4_option1Selected = true && !$('#Option1_' + email.id + '-4').hasClass('optionSelected')) {
                    $('#Option1_' + email.id + '-4').addClass('optionSelected');
                  }
                  if (this.v2_message4_option2Selected = true && !$('#Option2_' + email.id + '-4').hasClass('optionSelected')) {
                    $('#Option2_' + email.id + '-4').addClass('optionSelected');
                  }
                  // Message 4 | Version 1
                  if (this.v1_message5_option1Selected = true && !$('#Option1_' + email.id + '-5').hasClass('optionSelected')) {
                    $('#Option1_' + email.id + '-5').addClass('optionSelected');
                  }
                  if (this.v1_message5_option2Selected = true && !$('#Option2_' + email.id + '-5').hasClass('optionSelected')) {
                    $('#Option2_' + email.id + '-5').addClass('optionSelected');
                  }
                  // Message 4 | Version 2
                  if (this.v2_message4_option1Selected = true && !$('#Option1_' + email.id + '-5').hasClass('optionSelected')) {
                    $('#Option1_' + email.id + '-5').addClass('optionSelected');
                  }
                  if (this.v2_message4_option2Selected = true && !$('#Option2_' + email.id + '-5').hasClass('optionSelected')) {
                    $('#Option2_' + email.id + '-5').addClass('optionSelected');
                  }
                }
              }
              */



    internetMod.AddEmailToHTMLPage = function(email) {
        var emailMessageList = $('#emailMSGList');
        var messageFOREmailList = email.message.replace(/<|b>|br>|h2>|u>/g, "").replace(/\//g, "");
        var messageInEmailList = messageFOREmailList.substr(0, 80) + '...';
        emailMessageList.prepend('<li id="List_' + email.id + '" class="forGenl priListItem"> <div class="rndPrItem"><div id="haveMSG_' + email.id + '" class="haveMSG">!</div><img id="checkmark_' + email.id + '" class="checkmark_Email" " src="./mods/The_Internet_Mod/img/checkmark.png" style="display: none;"></img><img class="iconE" src="./mods/The_Internet_Mod/img/profileIcon_Email.png">' +
            '<div id="nameE">' + email.from + '</div>' +
            '<div id="usernameE">' + email.address + '</div><hr style="margin-top: 0px;">' +
            '<div id="subjectE">' + email.subject + '</div>' +
            '<div id="messageE">' + messageInEmailList + '</div>' +
            //'<div id="optionSelected_' + email.id + '" class="optionSelected" style="display: none;"> <hr> <div id="optionActual" class="optionActual"><b>Response:</b><span id="response1_' + email.id + '" style="display: none;"> ' + email.option1 + '</span><span id="response2_' + email.id + '" style="display: none;"> ' + email.option2 + '</span></div> </div></div>' +
            '</li>');

        var emailViewingArea = $('#emailMain');
        emailViewingArea.prepend('<div id="Email_' + email.id + '" class="emailInfo">' +
            'Category: ' + email.category + ' <br>' +
            'From: ' + email.from + ' (' + email.address + ')<br>' +
            'Date: <span id="emailDate"></span>' +
            '<br>' +
            '<br>' +
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
            $('#' + option + '_' + email.id + '-' + emailNumber + '').addClass('optionSelected');
            $('#' + option + '_' + email.id + '-' + emailNumber + '').addClass('forGen');
            $('#emailOptions_' + email.id + '-' + emailNumber + '').addClass('disableElement');
            $('#haveMSG_' + email.id + '').hide();
            $('#checkmark_' + email.id + '').show();
            Sound.click();
            internetMod.countNotifs(0);
            //      $('#optionSelected_' + email.id + '').show();
            $('#List_' + email.id + '').toggle().toggle();
        };

        // Option Stuff (probably will optimize this later and make it shorter)
        // I'd like to make it so I can just do internetMod.onOptionClick(option1, 2);
        $('#Option1_' + email.id + '-1').on('click', function(event) {
            //        $('#response1_' + email.id + '').show();
            internetMod.optionDefaults(1, 'Option1');
            //  email.message1_option1Selected = true;
            email.option1_ifSelected && email.option1_ifSelected();
        });

        $('#Option2_' + email.id + '-1').on('click', function(event) {
            //      $('#response2_' + email.id + '').show();
            internetMod.optionDefaults(1, 'Option2');
            //      email.message1_option2Selected = true;
            email.option2_ifSelected && email.option2_ifSelected();
        });
        //----------------------------------------------------------------------

        $('#trashEmail_' + email.id + '').dblclick(function() {
            $('#Email_' + email.id + '').remove();
            $('#otherResponses_' + email.id + '').remove();
            $('#List_' + email.id + '').remove();
        });

        // Allows for switch between emails
        $('#Email_' + email.id + '').hide();

        $('#List_' + email.id + '').click(function() {
            $('#Email_' + email.id + '').siblings().hide();
            $('#Email_' + email.id + '').show();
            $('#otherResponses_' + email.id + '').show();
            Sound.playSoundOnce("reviewTack", 0.2);
        });
    };
})();

// Mod Tick that checks for various things every week
internetMod.modTick = function() {
    // Email Website
    if (internetMod.UIInitialized == false) return;
    for (var i = 0; i < internetMod.emailListToAdd.length; i++) {
        var email = internetMod.emailListToAdd[i];
        var d = GameManager.company.getDate(GameManager.company.currentWeek);
        var date = email.date.split('/');
        if (internetMod.isEmailAdded(email) == false) {
            if (email.date.length < 3 && email.isRandomEvent && email.trigger && email.trigger(GameManager.company)) {
                //add random offset date to email date
                var weekNumber = General.getWeekFromDateString(email.date, true);
                weekNumber += Math.floor((GameManager.gameTime / 1000) + 36 * GameManager.company.getRandom() * GameManager.SECONDS_PER_WEEK); //moves the initial add date with a random week offset between 1-10
                email.date = internetMod.getStringDateFormatForWeekNumber(weekNumber);
                console.log('The event triggered randomly');
            } else if (!email.isRandomEvent && email.trigger && email.trigger(GameManager.company)) {
                internetMod.emailPushDefaults(email);
                $('#emailDate').text('' + d.year + '/' + d.month + '/' + d.week + '');
                console.log('The event just triggered');
            } else if (email.date && GameManager.company.isLaterOrEqualThan(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]))) {
                internetMod.emailPushDefaults(email);
                $('#emailDate').text('' + email.date + '');
                console.log('The event was pushed by date');
            }
        }
        /*  if (internetMod.isEmailAdded(email) == false) {
              if (email.isRandomEvent && email.isRandomEvent == true && email.trigger && email.trigger(GameManager.company)) {
                  internetMod.emailPushDefaults(email);
                  $('#emailDate').text('' + d.year + '/' + d.month + '/' + d.week + '');
                  console.log('The event triggered randomly');
              } else if (email.isRandomEvent !== true && email.trigger && email.trigger(GameManager.company)) {
                  internetMod.emailPushDefaults(email);
                  $('#emailDate').text('' + d.year + '/' + d.month + '/' + d.week + '');
                  console.log('The event just triggered');
              } else if (email.isRandomEvent !== true && email.date && GameManager.company.isLaterOrEqualThan(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]))) {
                  internetMod.emailPushDefaults(email);
                  $('#emailDate').text('' + email.date + '');
                  console.log('The event was pushed by date');
              }
          } */
		internetMod.checkForReply(email);
	}
    
    internetMod.yearChecker();

    for (var k = 0; k < internetMod.articleToAdd.length; k++) {
        var newsArticle = internetMod.articleToAdd[k];
        var nDate = newsArticle.date.split('/');
        var slideCount = $('#newsArticleSlideshow ul li').length;
        var slideWidth = $('#newsArticleSlideshow ul li').width();
        var sliderUlWidth = slideCount * slideWidth;
        $('#newsArticleSlideshow ul').css('width', sliderUlWidth);
        $('#newsArticleSlideshow ul').css('margin-left', -slideWidth);
        if (GameManager.company.isLaterOrEqualThan(parseInt(nDate[0]), parseInt(nDate[1]), parseInt(nDate[2])) && internetMod.articleStuff.indexOf(newsArticle) == -1) {
            internetMod.articleStuff.push(newsArticle);
            internetMod.AddArticleToHTMLPage(newsArticle);
        }
        if ($('#newsArticleSlideshow ul li').length > 4) {
            $("#newsArticleSlideshow ul li:gt(3)").remove();
        }
        if (d.year == 25 && d.month == 9 && d.week == 2) {
          GameManaer.company.flags.visoriusAnnounced = true;
        }
    }
    /*if (newsArticle.date.charAt(0) == d.year && newsArticle.date.charAt(2) == d.month && newsArticle.date.charAt(4) == d.week) {
        newsArticlesArray.push(newsArticle);
     } */

    //News Website
};


GDT.on(GDT.eventKeys.gameplay.weekProceeded, internetMod.modTick);
// GDT.on(GDT.eventKeys.gameplay.weekProceeded, internetMod.newsTick);

// Events
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
        internetMod.UIInitialized = true;
        internetMod.showUI();
    }
});

// Internet tabs -----------------------------------------------------------------------------------------------------------

// Refreshes a page (Currenly not working 100% correctly)
internetMod.refresh = function() {
    Sound.click();
    $("#loaders").html('REFRESHING...');
    $("#loaders").show();
    GameManager.resume(true);
    setTimeout(function() {
        $("#loaders").hide();
        $("#loaders").empty();
        GameManager.pause(true);
    }, 1500);
};

internetMod.openTab = function(tabName) {
    Sound.click();
    $("#emailSITE").hide();
    $("#newsSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").html('LOADING...');
    $("#loaders").show();
    setTimeout(function() {
        $("#loaders").hide();
        $("#loaders").empty();
        $(tabName).show();
    }, 1000);
};

internetMod.openEmail = function() {
    internetMod.openTab("#emailSITE");
};

// Open a website that I haven't made up my mind about :P
internetMod.openNews = function() {
    internetMod.openTab("#newsSITE");
};

// Opens the Social Network website
internetMod.openSocial = function() {
    internetMod.openTab("#socialSITE");
};

// Opens the Bug Center website
internetMod.openBug = function() {
    internetMod.openTab("#bugSITE");
};

// Closes (hides) the entire div
internetMod.exit = function() {
    Sound.click();
    $("#internetContainer").hide();
    internetMod.disableSlideshow();
    GameManager.resume(true);
    // addReplyBulk.Resume();
};
var createGameDevUI = function(){
var content = $(".announceChild3");
		content.empty();

		content.append('<div id="internetModAnnouncerContent"></div>');
		content.append('<div id="internetModTopicChooser"></div>');
		content.append('<div id="internetModGenreChooser"></div>');
		content.append('<div id="internetModPlatformChooser"></div>');
		$("#internetModTopicChooser").hide();
		$("#internetModGenreChooser").hide();
		$("#internetModPlatformChooser").hide();

		content = $("#internetModAnnouncerContent");

		var template = $("#gameDefinitionContentTemplate").clone();
		template.find("#gameTitle").remove();

		template.find(".pickTopicButton").clickExcl(function () {
			internetMod.pickTopicClick();
		});
		template.find("#pickGenreButton").clickExcl(function () {
			internetMod.pickGenreClick();
		});
		template.find("#pickSecondGenreButton").clickExcl(function () {
			UI.pickSecondGenreClick()
		});
		template.find(".pickPlatformButton").clickExcl(function () {
			internetMod.pickPlatformClick($(this))
		});
		
		if (GameManager.company.canDevelopMediumGames()) {
			if (!GameManager.company.canDevelopLargeGames())
				template.find(".gameSizeLarge").hide();
			if (!GameManager.company.canDevelopAAAGames())
				template.find(".gameSizeAAA").hide()
		} else
			template.find("#gameSizeGroup").hide();
		if (!GameManager.company.canDevelopMMOGames())
			template.find(".gameGenreMMO").hide();
		//if (!GameManager.company.canUseMultiGenre())
			template.find("#pickSecondGenreButton").hide();
		/*else {
			template.find("#pickSecondGenreButton").css("margin-left", "2.5px").css("margin-right", "2.5px").css("width", "145px");
			template.find("#pickGenreButton").css("margin-left",
				"2.5px").css("margin-right", "2.5px").css("width", "145px")
		}*/
		if (GameManager.company.canDevelopMultiPlatform())
			template.find(".pickPlatformButton").css("margin-left", "2.5px").css("margin-right", "2.5px").css("width", "145px");
		else
			template.find(".pickPlatformButton").slice(1).hide();
		if (!GameManager.company.canSetTargetAudience())
			template.find("#targetRating").hide();


		template.find(".pickEngineButtonWrapper").hide();
		template.find(".ratingLabel").hide();

		template.find(".gameDefSelection").clickExcl(function () {
			Sound.click();
			var e = $(this);
				e.parent().find(".gameDefSelection").removeClass("selected");
				e.addClass("selected");
		});

		$("#gameDefinition").find(".dialogNextButton").clickExcl(function () {
			$("#gameDefinition").find(".dialogNextButton").effect("shake", {
				times : 2,
				distance : 5
			}, 50)
		});
		var allGraphicTypeIds = Research.getAllItems().filter(function (f) {
				return f.group ===
				"graphic-type"
			}).map(function (f) {
				return f.id
			});
		$("#gameDefinition").find(".dialogBackButton").clickExcl(function () {
			Sound.click();
			UI._saveSelectedGameFeatureSettings(function (id) {
				return allGraphicTypeIds.indexOf(id) != -1
			});
			$("#gameDefinition").find(".dialogScreen1").transition({
				"margin-left" : 0
			});
			$("#gameDefinition").find(".dialogScreen2").transition({
				"margin-left" : "100%"
			})
		});


		//Create Publisher Contract
		template.append("<div style='width:302px;margin:auto;'><div id='CompetitorModPublisherOKButton' class=' baseButton orangeButton windowLargeOkButton'>Create Publisher Contract</div></div>");
		template.find("#CompetitorModPublisherOKButton").clickExcl(function () {
			Sound.click();
			var succes = CompetitorModPublisher.createContract();
			if(succes == true){
				$("#CompetitorModPublisherContainer").dialog("close");
			}else{
				$("#CompetitorModPublisherOKButton").effect("shake", {
					times : 2,
					distance : 5
				}, 50)
			}

		});

		okClicked = false;
		PlatformShim.execUnsafeLocalFunction(function () {
			content.append(template);
			$("#internetModAnnouncerContent").show();
			$("#CompetitorModPublisherTitle").show();
		})

		internetMod.pickTopicClick = function (element) {
		Sound.click();
		var container = $("#internetModTopicChooser");

		if (element) {
			var pickTopicButton = $("#internetModAnnouncerContent").find(".pickTopicButton");
			var names = element.innerText.split("\n");
			pickTopicButton.get(0).innerText = names[0];
			pickTopicButton.removeClass("selectorButtonEmpty");

			$("#internetModAnnouncerContent").show();
			$("#CompetitorModPublisherTitle").show();
			$("#internetModTopicChooser").hide();
			return;
		}
		PlatformShim.execUnsafeLocalFunction(function () {
			var modal = $(".simplemodal-data");
			modal.find(".overlayTitle").text("Pick Topic".localize("heading"));
			container.empty();
			var activeTopictemplate = '<div class="selectorButton whiteButton" onclick="CompetitorModPublisher.pickTopicClick(this)">{{name}}</div>';
			var lockedTopicTemplate = '<div class="selectorButton disabledButton">{{name}}</div>';
			var itemsPerRow = 3;
			var currentCount = 0;
			var row = 0;
			var researchVisibleCount = 0;
			var topics = General.getTopicOrder(GameManager.company);
			for (var i = 0; i < topics.length; i++) {
				var topic = topics[i];
				currentCount++;
				if (currentCount > itemsPerRow) {
					row++;
					currentCount = 1
				}
				var isAvailable = GameManager.company.topics.indexOf(topic) != -1;
				var isInResearch = GameManager.currentResearches.filter(function (f) {
						return f.topicId === topic.id
					}).length > 0;
				var isEnabled = isAvailable;
				var template = isEnabled ? activeTopictemplate :
					lockedTopicTemplate;
				var isNameHidden = (!isEnabled && (!isAvailable && !isInResearch)) || !isEnabled;
				if (!isNameHidden)
					if (GameManager.areHintsEnabled() && Knowledge.hasTopicAudienceWeightingKnowledge(GameManager.company, topic)) {
						var enabledDisabledContent = !isEnabled ? " disabledButton" : '" onclick="internetMod.pickTopicClick(this)';
						var whiteButton = !isEnabled ? " " : " whiteButton ";
						var t = '<div class="selectorButton' + whiteButton + "pickTopicButtonAudienceHintVisible" + enabledDisabledContent + '"><span style="position:relative;top:5px;">{0}<span style="font-size:11pt;"><br/>{1}</span></span></div>';
						template = t.format(topic.name, Knowledge.getTopicAudienceHtml(GameManager.company, topic))
					} else
						template = template.replace("{{name}}", topic.name);
				else
					template = template.replace("{{name}}", "?");
				var element = $(template);
				element.css("position", "relative");
				element.css("display", "inline-block");
				//element.css("top", 50 * row + row * 10);
				//element.css("left", (currentCount - 1) * 190 + 10);
				element.css("font-size", UI.pickTopicFontSize + "pt");
				container.append(element);
				if (!isAvailable && !isInResearch)
					researchVisibleCount++
			}
			modal.find(".selectionOverlayContainer").fadeIn("fast")

			$("#internetModAnnouncerContent").hide();
			$("#CompetitorModPublisherTitle").hide();
			$("#internetModTopicChooser").show();
		})
	};


	internetMod.pickGenreClick = function (element) {
		Sound.click();
		var container = $("#internetModGenreChooser");

		if (element) {
			var pickGenreButton = $("#internetModAnnouncerContent").find("#pickGenreButton");
			pickGenreButton.get(0).innerText = element.innerText;
			pickGenreButton.removeClass("selectorButtonEmpty");

			$("#internetModAnnouncerContent").show();
			$("#CompetitorModPublisherTitle").show();
			$("#internetModGenreChooser").hide();
			return
		}
		PlatformShim.execUnsafeLocalFunction(function () {
			var modal = $(".simplemodal-data");
			modal.find(".overlayTitle").text("Pick Genre".localize("heading"));
			container.empty();
			var template = '<div class="selectorButton" onclick="internetMod.pickGenreClick(this)">{{name}}</div>';
			var genres = General.getAvailableGenres(GameManager.company);
			//var second = modal.find("#pickSecondGenreButton").get(0).innerText;
			var topMarginAdded = false;
			for (var i = 0; i < genres.length; i++) {
				//if (second == genres[i].name)
				//	continue;
				var genre = genres[i];
				var element = $(template.replace("{{name}}", genre.name));
				element.css("margin-left", 210);
				if (!topMarginAdded) {
					element.css("margin-top", 90);
					topMarginAdded = true
				}
				element.addClass("whiteButton");
				container.append(element)
			}
			modal.find(".selectionOverlayContainer").fadeIn("fast")

			$("#internetModAnnouncerContent").hide();
			$("#CompetitorModPublisherTitle").hide();
			$("#internetModGenreChooser").show();
		})
	};

	internetMod.pickPlatformClick = function (platformName,platformId) {
		Sound.click();
		var container = $("#CompetitorModPublisherPlatformChooser");


		if (platformName && platformId) {
			var pickplatformButton = $("#internetModAnnouncerContent").find(".pickPlatformButton");
			pickplatformButton.get(0).innerText = platformName;
			pickplatformButton.removeClass("selectorButtonEmpty");

			$("#internetModAnnouncerContent").show();
			$("#CompetitorModPublisherTitle").show();
			$("#CompetitorModPublisherPlatformChooser").hide();
			return;
		}


		PlatformShim.execUnsafeLocalFunction(function () {
			var modal =$(".simplemodal-data");
			modal.find(".overlayTitle").text("Pick Platform".localize("heading"));

			container.empty();
			var platforms = Platforms.getPlatformsOnMarket(GameManager.company);
			var game = GameManager.company.currentGame;

			platforms = platforms.slice().sort(function (a, b) {
					return Platforms.getTotalMarketSizePercent(b, GameManager.company) - Platforms.getTotalMarketSizePercent(a,
						GameManager.company)});

			for (var i = 0; i < platforms.length; i++) {
				var element =
					$("#platformButtonTemplate").clone();
				element.removeAttr("id");
				var platform = platforms[i];
				element.platformId = platform.id;
				element.platformName = platform.name;
				var isEnabled = GameManager.company.licencedPlatforms.indexOf(platform) != -1;
				element.find(".platformButtonImage").attr("src", Platforms.getPlatformImage(platform, GameManager.company.currentWeek));
				element.find(".platformTitle").text(platform.name);
				element.find(".cost").text("Dev. cost: ".localize() + UI.getShortNumberString(platform.developmentCosts));
				if (!isEnabled) {
					element.find(".licenseCost").text("License cost: ".localize() +
						UI.getShortNumberString(platform.licencePrize));
					if (GameManager.company.cash < platform.licencePrize)
						element.find(".licenseCost").addClass("red")
				} else
					element.find(".licenseCost").hide();
				element.find(".marketShare").text("Marketshare: ".localize() + UI.getPercentNumberString(Platforms.getTotalMarketSizePercent(platform, GameManager.company)));
				if (GameManager.areHintsEnabled()) {
					var content = Knowledge.getPlatformAudienceHintHtml(GameManager.company, platform);
					if (content)
						element.find(".audienceHints").html(content);
					var content = Knowledge.getPlatformGenreHintHtml(GameManager.company, platform);
					if (content)
						element.find(".genreHints").html(content)
				}
				(function (element) {
					if (isEnabled) {
						element.addClass("whiteButton");
						element.on("click", function () {
							CompetitorModPublisher.pickPlatformClick(element.platformName,element.platformId)
						})
					} else if (platform.licencePrize <= GameManager.company.cash) {
						element.addClass("whiteButton");
						element.on("click", function () {
							var that = this;
							UI.buyPlatform($(that).find(".platformTitle").get(0).innerText, function (e) {
								if (e)
									CompetitorModPublisher.pickPlatformClick(element.platformName,element.platformId)
							})
						})
					} else
						element.addClass("disabledButton")
				})(element);
				container.append(element)
			}
			modal.find(".selectionOverlayContainer").fadeIn("fast")

			$("#internetModAnnouncerContent").hide();
			$("#CompetitorModPublisherTitle").hide();
			$("#CompetitorModPublisherPlatformChooser").show();
		})
	};
};