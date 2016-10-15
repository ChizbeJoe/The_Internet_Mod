internetMod.createContractUI = function() {
    $("#internetModTopicChooser").hide();
    $("#internetModGenreChooser").hide();
    $("#internetModPlatformChooser").hide();
    $("#internetModCompetitorChooser").hide();

    var iContent = $(".announceChild3");
    iContent.html("<div class='contractName centeredButtonWrapper'> <input id='contractNameInput' type='text' maxlength='35' value='Contract Name' style='width:500px;font-size: 22pt; text-align:center'/> </div>");

    var iTemplate = $("#gameDefinitionContentTemplate").clone();
    iTemplate.find("#gameTitle").remove();

    iTemplate.find(".pickTopicButton").clickExcl(function() {
        internetMod.pickTopicClick();
    });
    iTemplate.find("#pickGenreButton").clickExcl(function() {
        internetMod.pickGenreClick();
    });
    iTemplate.find("#pickSecondGenreButton").clickExcl(function() {
        UI.pickSecondGenreClick()
    });
    iTemplate.find(".pickPlatformButton").clickExcl(function() {
        internetMod.pickPlatformClick($(this))
    });
    if (GameManager.company.canDevelopMediumGames()) {
        if (!GameManager.company.canDevelopLargeGames())
            iTemplate.find(".gameSizeLarge").hide();
        if (!GameManager.company.canDevelopAAAGames())
            iTemplate.find(".gameSizeAAA").hide()
    } else
        iTemplate.find("#gameSizeGroup").hide();
    if (!GameManager.company.canDevelopMMOGames())
        iTemplate.find(".gameGenreMMO").hide();
    //if (!GameManager.company.canUseMultiGenre())
    iTemplate.find("#pickSecondGenreButton").hide();
    /*else {
    	iTemplate.find("#pickSecondGenreButton").css("margin-left", "2.5px").css("margin-right", "2.5px").css("width", "145px");
    	iTemplate.find("#pickGenreButton").css("margin-left",
    		"2.5px").css("margin-right", "2.5px").css("width", "145px")
    }*/
    if (GameManager.company.canDevelopMultiPlatform())
        iTemplate.find(".pickPlatformButton").css("margin-left", "2.5px").css("margin-right", "2.5px").css("width", "145px");
    else
        iTemplate.find(".pickPlatformButton").slice(1).hide();
    if (!GameManager.company.canSetTargetAudience())
        iTemplate.find("#targetRating").hide();


    iTemplate.find(".pickEngineButtonWrapper").hide();
    iTemplate.find(".ratingLabel").hide();

    iTemplate.find(".gameDefSelection").clickExcl(function() {
        Sound.click();
        var e = $(this);
        e.parent().find(".gameDefSelection").removeClass("selected");
        e.addClass("selected");
    });

    $("#gameDefinition").find(".dialogNextButton").clickExcl(function() {
        $("#gameDefinition").find(".dialogNextButton").effect("shake", {
            times: 2,
            distance: 5
        }, 50)
    });
    var allGraphicTypeIds = Research.getAllItems().filter(function(f) {
        return f.group ===
            "graphic-type"
    }).map(function(f) {
        return f.id
    });
    $("#gameDefinition").find(".dialogBackButton").clickExcl(function() {
        Sound.click();
        UI._saveSelectedGameFeatureSettings(function(id) {
            return allGraphicTypeIds.indexOf(id) != -1
        });
        $("#gameDefinition").find(".dialogScreen1").transition({
            "margin-left": 0
        });
        $("#gameDefinition").find(".dialogScreen2").transition({
            "margin-left": "100%"
        })
    });


    //Create Publisher Contract
    iTemplate.append("<div style='width:302px;margin:auto;'><div id='internetModOKButton' class=' baseButton orangeButton windowLargeOkButton'>Create Publisher Contract</div></div>");
    iTemplate.find("#internetModOKButton").clickExcl(function() {
        Sound.click();
        var succes = internetMod.createContract();
        if (succes == true) {
            $("#internetModContainer").dialog("close");
        } else {
            $("#internetModOKButton").effect("shake", {
                times: 2,
                distance: 5
            }, 50)
        }

    });

    okClicked = false;
    PlatformShim.execUnsafeLocalFunction(function() {
        iContent.append(iTemplate);
        $("#internetModContent").show();
        $("#internetModTitle").show();
    })
}

internetMod.pickTopicClick = function(element) {
    Sound.click();
    var container = $("#internetModTopicChooser");

    if (element) {
        var pickTopicButton = $("#internetModContent").find(".pickTopicButton");
        var names = element.innerText.split("\n");
        pickTopicButton.get(0).innerText = names[0];
        pickTopicButton.removeClass("selectorButtonEmpty");

        $("#internetModContent").show();
        $("#internetModTitle").show();
        $("#internetModTopicChooser").hide();
        return;
    }
    PlatformShim.execUnsafeLocalFunction(function() {
        var iModal = $(".simplemodal-data");
        iModal.find(".overlayTitle").text("Pick Topic".localize("heading"));
        container.empty();
        var activeTopiciTemplate = '<div class="selectorButton whiteButton" onclick="internetMod.pickTopicClick(this)">{{name}}</div>';
        var lockedTopiciTemplate = '<div class="selectorButton disabledButton">{{name}}</div>';
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
            var isInResearch = GameManager.currentResearches.filter(function(f) {
                return f.topicId === topic.id
            }).length > 0;
            var isEnabled = isAvailable;
            var iTemplate = isEnabled ? activeTopiciTemplate :
                lockedTopiciTemplate;
            var isNameHidden = (!isEnabled && (!isAvailable && !isInResearch)) || !isEnabled;
            if (!isNameHidden)
                if (GameManager.areHintsEnabled() && Knowledge.hasTopicAudienceWeightingKnowledge(GameManager.company, topic)) {
                    var enabledDisabledContent = !isEnabled ? " disabledButton" : '" onclick="internetMod.pickTopicClick(this)';
                    var whiteButton = !isEnabled ? " " : " whiteButton ";
                    var t = '<div class="selectorButton' + whiteButton + "pickTopicButtonAudienceHintVisible" + enabledDisabledContent + '"><span style="position:relative;top:5px;">{0}<span style="font-size:11pt;"><br/>{1}</span></span></div>';
                    iTemplate = t.format(topic.name, Knowledge.getTopicAudienceHtml(GameManager.company, topic))
                } else
                    iTemplate = iTemplate.replace("{{name}}", topic.name);
            else
                iTemplate = iTemplate.replace("{{name}}", "?");
            var element = $(iTemplate);
            element.css("position", "absolute");
            element.css("top", 50 * row + row * 10);
            element.css("left", (currentCount - 1) * 190 + 10);
            element.css("font-size", UI.pickTopicFontSize + "pt");
            container.append(element);
            if (!isAvailable && !isInResearch)
                researchVisibleCount++
        }
        iModal.find(".selectionOverlayContainer").fadeIn("fast")

        $("#internetModContent").hide();
        $("#internetModTitle").hide();
        $("#internetModTopicChooser").show();
    })
};

internetMod.pickGenreClick = function(element) {
    Sound.click();
    var container = $("#internetModGenreChooser");

    if (element) {
        var pickGenreButton = $("#internetModContent").find("#pickGenreButton");
        pickGenreButton.get(0).innerText = element.innerText;
        pickGenreButton.removeClass("selectorButtonEmpty");

        $("#internetModContent").show();
        $("#internetModTitle").show();
        $("#internetModGenreChooser").hide();
        return
    }
    PlatformShim.execUnsafeLocalFunction(function() {
        var iModal = $(".simplemodal-data");
        iModal.find(".overlayTitle").text("Pick Genre".localize("heading"));
        container.empty();
        var iTemplate = '<div class="selectorButton" onclick="internetMod.pickGenreClick(this)">{{name}}</div>';
        var genres = General.getAvailableGenres(GameManager.company);
        //var second = iModal.find("#pickSecondGenreButton").get(0).innerText;
        var topMarginAdded = false;
        for (var i = 0; i < genres.length; i++) {
            //if (second == genres[i].name)
            //	continue;
            var genre = genres[i];
            var element = $(iTemplate.replace("{{name}}", genre.name));
            element.css("margin-left", 210);
            if (!topMarginAdded) {
                element.css("margin-top", 90);
                topMarginAdded = true
            }
            element.addClass("whiteButton");
            container.append(element)
        }
        iModal.find(".selectionOverlayContainer").fadeIn("fast")

        $("#internetModContent").hide();
        $("#internetModTitle").hide();
        $("#internetModGenreChooser").show();
    })
};

internetMod.pickPlatformClick = function(platformName, platformId) {
    Sound.click();
    var container = $("#internetModPlatformChooser");


    if (platformName && platformId) {
        var pickplatformButton = $("#internetModContent").find(".pickPlatformButton");
        pickplatformButton.get(0).innerText = platformName;
        pickplatformButton.removeClass("selectorButtonEmpty");

        $("#internetModContent").show();
        $("#internetModTitle").show();
        $("#internetModPlatformChooser").hide();
        return;
    }


    PlatformShim.execUnsafeLocalFunction(function() {
        var iModal = $(".simplemodal-data");
        iModal.find(".overlayTitle").text("Pick Platform".localize("heading"));

        container.empty();
        var platforms = Platforms.getPlatformsOnMarket(GameManager.company);
        var game = GameManager.company.currentGame;

        platforms = platforms.slice().sort(function(a, b) {
            return Platforms.getTotalMarketSizePercent(b, GameManager.company) - Platforms.getTotalMarketSizePercent(a,
                GameManager.company)
        });

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
                var iContent = Knowledge.getPlatformAudienceHintHtml(GameManager.company, platform);
                if (iContent)
                    element.find(".audienceHints").html(iContent);
                var iContent = Knowledge.getPlatformGenreHintHtml(GameManager.company, platform);
                if (iContent)
                    element.find(".genreHints").html(iContent)
            }
            (function(element) {
                if (isEnabled) {
                    element.addClass("whiteButton");
                    element.on("click", function() {
                        internetMod.pickPlatformClick(element.platformName, element.platformId)
                    })
                } else if (platform.licencePrize <= GameManager.company.cash) {
                    element.addClass("whiteButton");
                    element.on("click", function() {
                        var that = this;
                        UI.buyPlatform($(that).find(".platformTitle").get(0).innerText, function(e) {
                            if (e)
                                internetMod.pickPlatformClick(element.platformName, element.platformId)
                        })
                    })
                } else
                    element.addClass("disabledButton")
            })(element);
            container.append(element)
        }
        iModal.find(".selectionOverlayContainer").fadeIn("fast")

        $("#internetModContent").hide();
        $("#internetModTitle").hide();
        $("#internetModPlatformChooser").show();
    })
};

var getSelectedTopic = function() {
    var iModalContent = $("#internetModContent");
    var topicName = iModalContent.find(".pickTopicButton").text();
    var topic = GameManager.company.topics.first(function(t) {
        return t.name == topicName
    });
    return topic
};
var getSelectedGenre = function() {
    var iModalContent = $("#internetModContent");
    var genreName = iModalContent.find("#pickGenreButton").text();
    var genre = GameGenre.getAll().first(function(i) {
        return i.name == genreName
    });
    return genre
};
var getSelectedPlatform = function() {
    var iModalContent = $("#internetModContent");
    var platformName = iModalContent.find("#pickPlatformButton").text();
    var platform = GameManager.company.licencedPlatforms.first(function(i) {
        return i.name.trim() == platformName.trim()
    });
    return platform
};
// THIS IS FOR CRAP AND STUFF

// $("body").append('<div id="internet"> <table class="navBar"> <tr id="tabBar"> <td id="refresh" onclick="refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i> <td id="email" class="tab" onclick="openEmail()">Email</td> <td id="forum" class="tab" onclick="openForum()"><s>Forum</s></td> <td id="social" class="tab" onclick="openSocial()">Social Network</td> <td id="bug" class="tab" onclick="openBug()"><s>Bug Center</s></td> <td id="exit" class="tabX" onclick="exit()"> </td> </tr> </table> <div class="iContent"> <div id="emailSITE"> <div class="overview"> <div id="notifs">All Messages</div> <hr> <ul class="priList"> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> <li class="priListItem"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"> <div id="nameE">John Smith </div> <div id="usernameE">jsmith145@zmail.com </div> <hr style="margin-top: 0px;"> <div id="subjectE">Your amazing game!</div> <div id="messageE">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you! </div> </li> </ul> </div> <div class="viewport"> <table class="inNav"> <tr> <td>Phoenix Games</td> <td>Media</td> <td>Companies</td> <td>Fans</td> </tr> </table> <div class="emailMain"> <div class="emailInfo"> Category: Fans <br> From: John Smith <br> <!-- The date below is how Game Dev Tycoon keeps track of time and dates --> Date: yy/mm/dd <br> <br> <div class="emailSubj">Subject: Your amazing game! </div> <hr> <p class="emailENTRY">Hello, I just wanted to thank you for your amazing that changed my life. Words cannot express how grateful I am for this present. Probably the only downside is that it is all I can think about. With tremendous gratitude, I ask that you continue making games. Your masterpiece has driven me to continue in my dreams. All that I do from now on leads back to the moment I popped that CD into my computer. <br><br> Please take this donation as a token of my thankfulness. Even though it cannot come even close to what I want to express, it is the only way I know how to show graditude in my current financial situation. Keep making great games! Thank you!</p> <hr> </div> </div> <div class="inNew"> Compose A New Email </div> </div> </div> <div id="forumSITE"> Sorry <br> Not Available </div> <div id="socialSITE"> <div id="socialNav"> <div id="home" class="flutterBanner">FLUTTER</div> <!-- Insert icons when compiling and organizing --> <div id="navButts"> <div id="home" class="butt">HOME</div> <div id="notifications" class="butt">NOTIFS</div> <div id="trends" class="butt">TRENDS</div> <div id="profile" class="butt">PROFILE</div> </div> </div> <div id="socialContent"> <div id="socialProfile"> <div class="profileInfo"> <img class="profilePic" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"></img> <div class="profileIdenity"> <div class="profileName">John Smith</div> <div class="profileUsername">@jsmith12</div> <textarea maxlength="90" class="profileDesc">Enter a description...</textarea> </div> <div class="profileStats"> <div><b>Followers:</b> <div id="followers" class="proifileStatsEntry">79K</div> </div> <div><b>Likes:</b> <div id="likes" class="proifileStatsEntry">459K</div> </div> <div><b>Dislikes:</b> <div id="dislikes" class="proifileStatsEntry">2331</div> </div> </div> <div class="profileSOMETHING">PUT SOMETHING HERE. Maybe a like/dislike ratio meter.</div> </div> <div class="widget"> <div class="widget-form"> <textarea class="postBox" maxlength="140" id="message" style="resize: none;">Say something... (140 Character Limit)</textarea> <div id="postButton" onclick="postFlutterMessage()">Post</div> </div> <div class="widget-conversation"> <ul id="conversation"> </ul> </div> </div> </div> </div> </div> <div id="bugSITE"> Sorry <br> Not Available </div> <div id="loaders"></div> </div></div>');

// var INcompanyName = GameManager.company.name.localize();

// $("body").append('<div id="internet"> <table class="navBar"> <tr id="tabBar"> <td id="refresh" onclick="refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i> <td id="email" class="tab" onclick="openEmail()">Email</td> <td id="forum" class="tab" onclick="openForum()"><s>Forum</s></td> <td id="social" class="tab" onclick="openSocial()">Social Network</td> <td id="bug" class="tab" onclick="openBug()"><s>Bug Center</s></td> <td id="exit" class="tabX" onclick="exit()"> </td> </tr> </table> <div class="iContent"> <div id="emailSITE"> <div class="overview"> <div id="notifs">All Messages</div> <hr> <ul id="priList" class="priList"> </ul> </div> <div class="viewport"> <table class="inNav"> <tr> <td>Company Name</td> <td>Media</td> <td>Companies</td> <td>Fans</td> </tr> </table> <div id="emailMain" class="emailMain"> <script id="email-template" type="text/x-handlebars-template"> {{#emailAll}} <div id="emailInfo" class="emailInfo"> Category: {{emailCategory}} <br> From: {{emailFrom}} <br> Date: {{emailDate}} <br> <br> <div class="emailSubj">Subject: {{emailSubject}} </div> <hr> <p class="emailENTRY">{{emailMessage}}</p> <hr> </div> </div> <table id="emailOptions" cellspacing="20px"> <tr> <td id="emailOption1" onclick="{{option1_ifSelected}}"> {{emailOption1}} </td> <td id="emailOption2" onclick="{{option2_ifSelected}}"> {{emailOption2}} </td> </tr> </table> {{/emailAll}} </script> </div> </div> <div id="forumSITE"> Sorry <br> Not Available </div> <div id="socialSITE"> <div id="socialNav"> <div id="home" class="flutterBanner">FLUTTER</div> <!-- Insert icons when compiling and organizing --> <div id="navButts"> <div id="home" class="butt">HOME</div> <div id="notifications" class="butt">NOTIFS</div> <div id="trends" class="butt">TRENDS</div> <div id="profile" class="butt">PROFILE</div> </div> </div> <div id="socialContent"> <div id="socialProfile"> <div class="profileInfo"> <img class="profilePic" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"></img> <div class="profileIdenity"> <div class="profileName">John Smith</div> <div class="profileUsername">@jsmith12</div> <textarea maxlength="90" class="profileDesc">Enter a description...</textarea> </div> <div class="profileStats"> <div><b>Followers:</b> <div id="followers" class="proifileStatsEntry">79K</div> </div> <div><b>Likes:</b> <div id="likes" class="proifileStatsEntry">459K</div> </div> <div><b>Dislikes:</b> <div id="dislikes" class="proifileStatsEntry">2331</div> </div> </div> <div class="profileSOMETHING">PUT SOMETHING HERE. Maybe a like/dislike ratio meter.</div> </div> <div class="widget"> <div class="widget-form"> <textarea class="postBox" maxlength="140" id="message" style="resize: none;">Say something... (140 Character Limit)</textarea> <div id="postButton" onclick="postFlutterMessage()">Post</div> </div> <div class="widget-conversation"> <ul id="conversation"> </ul> </div> </div> </div> </div> </div> <div id="bugSITE"> Sorry <br> Not Available </div> <div id="loaders"></div> </div></div> ');


/*

<li class="announceChild3" style="display: list-item;">
  <input id="msgGameTitle" type="text" value="Game Name" maxlength="35" style="font-size: 22pt; border-radius: 5px;" required=""><table cellspacing="15">
    <tbody><tr>
  <td id="msgPickGameTopic" class="msgGameOption">Pick Topic</td>
  <td id="msgPickGameGenre" class="msgGameOption">Pick Genre</td>
</tr>
<tr>
  <td id="msgPickGamePlatform" class="msgGameOption">Pick Platform</td>
  <td id="msgPickGamePlatform" class="msgGameOption">Pick Platform</td>
  <td id="msgPickGamePlatform" class="msgGameOption">Pick Platform</td>
</tr>

  </tbody></table>
</li>


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
        $("body").append('<div id="internet"> <table class="navBar"> <tr id="tabBar"> <td id="refresh" onclick="refresh()"><i class="fa fa-refresh" aria-hidden="true" style="background: #000000;"></i> <td id="email" class="tab" onclick="openEmail()">Email</td> <td id="exit" class="tabX" onclick="exit()"> </td> </tr> </table> <div id="iContent" class="iContent"> <div id="emailSITE"> <div class="overview"> <div id="notifs">All Messages</div> <hr> <ul class="priList"> <script id="emailMSGNav-template" type="text/x-handlebars-template"> {{#emailAll}} <li class="priListItem" onclick="{{onClick}}"> <div class="rndPrItem"> <img class="iconE" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"> <div id="nameE">{{emailFrom}} </div> <div id="usernameE">{{emailAddress}} </div> <hr style="margin-top: 0px;"> <div id="subjectE">{{emailSubject}}</div> <div id="messageE">{{emailMessage}} </div> </li> {{/emailAll}} </script></ul> </div> <div class="viewport"> <table class="inNav"> <tr> <td>Phoenix Games</td> <td>Media</td> <td>Companies</td> <td>Fans</td> </tr> </table> <div class="emailMain"> <script id="email-template" type="text/x-handlebars-template"> {{#emailAll}} <div id="emailInfo" class="emailInfo"> Category: {{emailCategory}} <br> From: {{emailFrom}} <br> Date: {{emailDate}} <br> <br> <div class="emailSubj">Subject: {{emailSubject}} </div> <hr> <p class="emailENTRY">{{emailMessage}}</p> <hr> </div> </div> <table id="emailOptions" cellspacing="20px"> <tr> <td id="emailOption1" onclick="{{option1_ifSelected}}"> {{emailOption1}} </td> <td id="emailOption2" onclick="{{option2_ifSelected}}"> {{emailOption2}} </td> </tr> </table> {{/emailAll}} </script> </div> </div> <div id="loaders"></div> </div></div>');
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
        $("#iContent").append('<div id="bugSITE"> Sorry <br> Not Available </div>')
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
        $("#iContent").append('<div id="forumSITE"> Sorry <br> Not Available </div> <div id="socialSITE"> <div id="socialNav"> <div id="home" class="flutterBanner">FLUTTER</div> <!-- Insert icons when compiling and organizing --> <div id="navButts"> <div id="home" class="butt">HOME</div> <div id="notifications" class="butt">NOTIFS</div> <div id="trends" class="butt">TRENDS</div> <div id="profile" class="butt">PROFILE</div> </div> </div> <div id="socialContent"> <div id="socialProfile"> <div class="profileInfo"> <img class="profilePic" src="http://bonniesomerville.nz/wp-iContent/uploads/2015/08/profile-icon.png"></img> <div class="profileIdenity"> <div class="profileName">John Smith</div> <div class="profileUsername">@jsmith12</div> <textarea maxlength="90" class="profileDesc">Enter a description...</textarea> </div> <div class="profileStats"> <div><b>Followers:</b> <div id="followers" class="proifileStatsEntry">79K</div> </div> <div><b>Likes:</b> <div id="likes" class="proifileStatsEntry">459K</div> </div> <div><b>Dislikes:</b> <div id="dislikes" class="proifileStatsEntry">2331</div> </div> </div> <div class="profileSOMETHING">PUT SOMETHING HERE. Maybe a like/dislike ratio meter.</div> </div> <div class="widget"> <div class="widget-form"> <textarea class="postBox" maxlength="140" id="message" style="resize: none;">Say something... (140 Character Limit)</textarea> <div id="postButton" onclick="postFlutterMessage()">Post</div> </div> <div class="widget-conversation"> <ul id="conversation"> </ul> </div> </div> </div> </div> </div>');
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

var UI._showNotification = internetMod.newsCheese;
var internetMod.showNews = function() {
    //add your custom code
    UI._showNotification(); //if appropriate, call the original logic
};

internetMod.newsCheese = internetMod.showNews; //assign your custom method over the original.
