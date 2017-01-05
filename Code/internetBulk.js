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
    }

    UI._showContextMenu = showMenuItem;
})();

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
}

/* OLD Internet Window HTML
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
    $('#social').show();
    $('#socialSITE').show()
}

//NOT SURE YET Website
internetMod.createXYZWebsite = function() {
    $('#navBar').removeClass('plusSocial');
    $('#navBar').addClass('plusXYZ');
    $('#forum').show();
    $('#forumSITE').show();
}

// Email Notifications
internetMod.countNotifs = function(notifNumber) {
    var notifCount = $("#emailMSGList").find('.forGenl').length + notifNumber;

    $("#iNotifs").html(notifCount);
}

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
}

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
    }

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
            var iRandomAD = imagesForADS[Math.floor(Math.random() * imagesForADS.length)];
            $('.newsAD').attr('src', iRandomAD);

            $('#headerInArticle').html(newsArticle.header);
            $('#dateInArticle').text(newsArticle.date);
            $('#imageForArticle').attr('src', newsArticle.imageURL);
            $('#textInArticle').html(newsArticle.text);
            $("#newsArticlesOnDeck").fadeIn();
        });
    }

    // News Articles
    var Article_riseOfG64 = function() {
        internetMod.AddNewsArticle({
            id: "riseOfG64", // must be unique
            category: "platforms",
            header: "The Rise of the Govodore G64",
            text: "The on-going battle for gaming platform dominance has a clear victor: according to recent market studies, the Govodore <i>G64</i> is steadily outselling competitors in the PC sector, and there are a few reasons why the <i>G64</i> is doing so well:<br><br><h2>1. Consumers Prefer the Lower Price</h2><br>With a selling price of just $595, the <i>G64</i> is a computer that does not exclusively cater to the rich; many middle-class families are able to buy and use the <i>G64</i>. <b>Greater availability</b> is a signifcant reason the <i>G64</i> thrives, but it's certainly not the only reason.<br><br><h2>2. The <i>G64</i>'s Hardware</h2><br>Compared to other computers, the <i>G64</i> allows for easy configuration of hardware. With various motherboard ports, a cartridge port is left wide-open for any kind of use. Experts even say that this might spell the end of competing hardware manufacturers.<br><br>Right now, Godovore is clearly leading with around 30% of the computer marketshare. Will the PC be able to survive?",
            date: "1/1/3",
            imageURL: "./images/platforms/G64.png"
        });
    }
    Article_riseOfG64();

    var Article_dinkeyKingSuccess = function() {
        internetMod.AddNewsArticle({
            id: "dinkeyKingSuccess", // must be unique
            category: "games",
            header: "Ninvento's Arcade Aggressor",
            text: 'Previously a nobody game development company, Ninvento is currently the talk of various arcades around the United States. In fact, their new arcade game <i>Dinkey King</i> has reached an impressive milestone: <b>over 60,000 machines have been sold!</b><br><br>Repeatedly trying to beat their high-score, many are glued to screen. To explore this love for the game, we asked certain players what they thought and received various responses:<br>- "I used to love the arcade game Tac-Man, and while <i>Dinkey King</i> is like Tac-Man, it offers a little more. You just run and hide in Tac-Man, but in <i>Dinkey King</i> it is not just about the high score; there is a goal: save the princess!"<br>- "I guess I just like the motions more than other games: run, jump, stop, RUN! Its a simple way to relax but still engaging."<br>- "Plain and simple, I love monkeys; ever since I saw King Kong, I have loved monkeys. <i>Dinkey King</i> gets that side of me, haha!"<br><br> A certain money maker, <i>Dinkey King</i> paves the way for the future of Ninvento.',
            date: "1/1/4",
            imageURL: "./images/platforms/G64.png"
        });
    }
    Article_dinkeyKingSuccess();

    var Article_ninventoAnnounceTES = function() {
        internetMod.AddNewsArticle({
            id: "ninventoAnnounceTES", // must be unique
            category: "platforms",
            header: "Ninvento's Own Console in the Works!",
            text: 'Ninvento has wowed us before with hits like <i>Nario Bruhs</i> and <i>Dinkey King</i>, but after months of various rumours, the Japanese company just confirmed something even bigger: its very own home gaming console! The console will feature cartridge based games and a uniquely designed controller. While it would be a truly remarkable feat, many industry experts doubt that home gaming consoles will take off. A console or two have faired well, but various others have crashed and burned, which sets a bad precedent for consoles down the road.<br><br>What will come of future consoles? How can this problem be solved? To answer these questions, we contacted Market Analyst Richard Bryers.<br<br>According to Bryers, "consoles are steadily performaning worse in the market. Something drastic needs to come along if this downward trend is to change." <img class="imageInArticle" src="./mods/The_Internet_Mod/Img/consoleMarketBar.png" style="float: right !important; width: 300px; margin: 10px 0 0 10px;"></img> Additionally, Bryers said that consoles just "lack the whole," meaning all fail to fully deliver in every area: "Whether it be Afary struggling with controllers or other companies struggling with pricing, there is always something wrong with the console." We are eager to see what Ninvento will deliver and how it will perform in a genrally unstable market.',
            date: "1/1/4",
            imageURL: "./images/platforms/TES.png"
        });
    }
    Article_ninventoAnnounceTES();

    var Article_venaAnnounceMasterV = function() {
        internetMod.AddNewsArticle({
            id: "venaAnnounceMasterV", // must be unique
            category: "platforms",
            header: "Another Day, Another Console!",
            text: "The gaming industry is on the up-and-up after the massive success of Ninvento's console TES; moreover, another japanese company called Vena announced a home gaming console on their own.<br><br>We contacted a Vena developer who wished to remain anonymous, and after some persistence, the developer stated, “Vena does not wanna say too much, but our console will be technically superior to the massively successful TES by Ninvento.”<br><br>Considering that Vena's last console, the Matt III, was released just last year, some industry experts expect this new console will be a simple rebranding for United States distribution.<br><br>We and others were previously skeptical of the console market, but after the prodigious success of the TES, Vena and other developers certainly have a chance to achieve something big! ",
            date: "1/2/1",
            imageURL: "./images/platforms/Master V.png"
        });
    }
    Article_venaAnnounceMasterV();

    var Article_announceGameling = function() {
        internetMod.AddNewsArticle({
            id: "announceGameling", // must be unique
            category: "platforms",
            header: "One Small Device, One Big Dream",
            text: "Today, Ninvento has announced that they will introduce a portable gaming device called <i>Gameling</i>. The device comes with changeable game cartridges, a monochrome screen on a green background, built-in speakers, and even multiplayer support via a connection cable.<br><br>Compared to PCs and other gaming consoles, the Gameling is underpowered, but given the lower cost and excellent portability, it might find a huge following.<br><br>Interestingly enough, <i>Gameling</i> was initially called 'Bot Maxis Game' and was advertised as 'BMG-01'; however, the device was released to poor reception. In fact, even the Ninvento employees would refer to the device as 'LameGame.'<br><br>The <i>Gameling</i> is said to hit shelves soon. Hopefully, it will live up to expectations.",
            date: "1/2/2",
            imageURL: "./images/platforms/Gameling.png"
        });
    }
    Article_announceGameling();

    var Article_endOfG64 = function() {
        internetMod.AddNewsArticle({
            id: "endOfG64", // must be unique
            category: "platforms",
            header: "Govodore Says Goodbye, PC Says Hello!",
            text: "Hardware manufacturers around the world were surprised today as Govodore, the creator of the popular <i>G64</i>, has filed for bankruptcy. Govodore simply failed to introduce a higher priced alternative and was forced to shut down production of the <i>G64</i>. Previous market data shows that the Govodore <i>G64</i> was slowly selling less and less.<img class='imageInArticle' src='./mods/The_Internet_Mod/Img/govodoreDyingGraph.png' style='float: right !important; width: 280px; margin: 10px 0 0 10px;'></img> In an unofficial statement, a <i>G64</i> employee said that the company has been unsuccessful in introducing higher priced computers to compete against newer and more advanced PCs. The platform will retire from the market in the coming months",
            date: "1/2/3",
            imageURL: "./images/platforms/G64.png" // change this to red x over it
        });
    }
    Article_endOfG64();

    var Article_announceVenaWar = function() {
        internetMod.AddNewsArticle({
            id: "announceVenaWar", // must be unique
            category: "platforms",
            header: "Vena Incites a New Gaming War!",
            text: "Vena, creator of the <i>Master V</i> console, has announced the <i>Vena Gear</i>, a portable console to directly compete against the <i>Gameling</i> from Ninvento. A spokesperson for the company said, 'Unlike similar devices on the market, which don't come close to gaming consoles, the <i>Vena Gear</i> has basically the full power of the Master V, except that you can take it with you. The <i>Vena Gear</i> also has a full color screen'. The <i>Vena Gear</i> certainly has much to offer. Will this device topple the <i>Gameling</i>? We will see. The <i>Vena Gear</i> will debut in the coming months, but that's not all from Vena!<br><br>According to various rumours, Vena has early concepts for an entirely new home gaming console. Not much is known yet, but Ninvento certainly has a lot to respond to. With the <i>Vena Gear</i> and another new console, will Ninvento be able to handle the heat? Only time will tell.",
            date: "1/2/4",
            imageURL: "./images/platforms/superb/Vena Gear.png"
        });
    }
    Article_announceVenaWar();

    var Article_announceVenaOasis = function() {
        internetMod.AddNewsArticle({
            id: "announceVenaOasis", // must be unique
            category: "platforms",
            header: "Vena's Announces the Sibling Console!",
            text: "Vena has announced that they will release a new gaming console. The <i>Vena Oasis</i> comes with 16-bit graphics and sound which promises a new kind of gaming experience. Vena said at the announcement, 'The Oasis is a new start, it will be the genesis of a new generation of gaming consoles and we believe it will do very well in the market'. Hopefully, this console won't be overshadowed like previous Vena consoles have been by Ninvento products. Presumably in an effort to counter this, some of the games already announced for the <i>Vena Oasis</i> suggest that it will appeal to more mature audiences. Maybe this move will prove well for the <i>Vena Oasis</i>.",
            date: "1/3/1",
            imageURL: "./images/platforms/superb/Vena Oasis.png"
        });
    }
    Article_announceVenaOasis();

    var Article_announceSuperTES = function() {
        internetMod.AddNewsArticle({
            id: "announceSuperTES", // must be unique
            category: "platforms",
            header: "Ninvento Is Not Done with the TES!",
            text: "Today, Ninvento announced the much anticipated successor to the popular TES console. Ninvento Creative Director Akemi Cho was eager to give some details: 'This is the greatest console we have ever built. It comes with state of the art 16-bit graphics and sound. It is simply super, and that's why we decided to call it the <i>Super TES</i>!'. Additionally, the sequel console will come with a sequel game: <i>Super Nario Bruhs</i>! Considering how well the original <i>Nario Bruhs</i> sold on the TES, the follow-up title should prove to be just as succesful.<br><br>The <i>Super NES</i> isn't completely new. In fact, it is just a redesigned version of the <i>Super Vanicom</i>, which dominated the Japanese console market. If the <i>Super TES</i> performs just as well as the <i>Super Vanicom</i>, Ninvento will grow immensely.<br><br>Fans around the world have been waiting for this moment, and if Ninvento's excitement proves to be legit, they will not be disappointed.",
            date: "1/3/1",
            imageURL: "./images/platforms/superb/Super TES.png"
        });
    }
    Article_announceSuperTES();

    var Article_deadPlaySystem = function() {
        internetMod.AddNewsArticle({
            id: "deadPlaySystem", // must be unique
            category: "platforms",
            header: "A Gaming Dream Already Canceled",
            text: "The media is abuzz with the latest news from this year's Entertainment Conference. In a surprise announcement yesterday, Vonny, a company known for general electronics, presented a prototype console called the <i>Play System</i>.<br><br>Apparently, Vonny was collaborating with Ninvento, creators of the beloved and successful <i>TES</i> and <i>Super TES</i> consoles, to develop what is basically a <i>Super TES</i> with a CD drive.<br><br>However, journalists around the world are baffled as only one day after Vonny and Ninvento jointly announced the <i>Play System</i> at the Entertainment Conference, things have turned sour. Ninvento announced today that they will cancel the project and instead seek to develop a new console with a different partner.<br><br>Rumour has it that the distribution deal the companies had worked out was unfavorable to Ninvento handing over much of the control to Vonny.<br><br>This seems to be the end of the <i>Play System</i>.",
            date: "1/3/2",
            imageURL: "./images/platforms/superb/PlaysystemA.png" // change this to red x over it
        });
    }
    Article_deadPlaySystem();

    var Article_announcePlaySystem = function() {
        internetMod.AddNewsArticle({
            id: "announcePlaySystem", // must be unique
            category: "platforms",
            header: "The PlaySystem is Back!",
            text: "Today, Vonny has announced their very own console called the <i>PlaySystem</i>. Apparently the company has completely reworked their earlier prototype after Ninvento cancelled the project. We concated Ninvento about the news, but the company had nothing to say on the matter.<br><br>The new <i>PlaySystem</i> comes with a CD-ROM drive and 32-bit processors; moreover, it is wholly owned by Vonny. Various Vonny developers said that they have immensly struggled to get this thing on the road, with a Vena director claiming that Vonny has no clue how to develop hardware or software and that the console is 'a ridiculous idea.' However, industry professionals say that this might be the beginning of a new generation of consoles, paving the way for a bright gaming future.<br><br>The <i>Playsystem</i> will enter the market in a few months.",
            date: "1/3/3",
            imageURL: "./images/platforms/superb/Playsystem.png"
        });
    }
    Article_announcePlaySystem();

    var Article_announceTES64 = function() {
        internetMod.AddNewsArticle({
            id: "announceTES64", // must be unique
            category: "platforms",
            header: "Ninvento Ready to WOW Again!",
            text: "Ninvento announced their next generation console called <i>TES 64</i> today. Expected to be released relatively soon, it is the world's first gaming console to support 64-bit processors for graphics and audio. Ninvento said this will allow never-before-seen 3D realism.<br><br>Apparently, a graphics company known as Vilicon Graphics, Inc. was looking for a video game partner in order to showcase new graphics technology. This technology is what Ninvento will be using for their new and improved graphics.<br><br>In recent years, the <i>Super TES</i> has lost much of the market share to more modern consoles. Market experts said that the hardware of the <i>TES 64</i> is surely impressive, but expressed their surprise that it still uses ROM cartridges instead of the much cheaper and higher capacity CD-ROM format. Nevertheless, the <i>TES 64</i> seems like an impressive console, and Ninvento has said that it plans to aggressively price it against Vonny's <i>Playsystem</i>.",
            date: "1/3/3",
            imageURL: "./images/platforms/superb/TES 64.png"
        });
    }
    Article_announceTES64();

    var Article_announceDreamVast = function() {
        internetMod.AddNewsArticle({
            id: "announceDreamVast", // must be unique
            category: "platforms",
            header: "Vena's DreamVast is a Dream Console",
            text: "The day Vena fans have waited a long time for has arrived, for Vena has announced their next generation console, the <i>DreamVast</i>. A company spokesperson said, 'The <i>DreamVast</i> is a dream come true. This console is the most advanced gaming console in history!'<br><br>The new console supports powerful graphics hardware promising graphic quality rivaling those on high-end PCs. The <i>DreamVast</i> is also the first console to ship with a modem out-of-the-box, making it ready for online play.<br><br>There is a lot riding on this console. With the bomb that was the <i>Vena Oasis</i>, Vena is in the middle of a serious financial predicament. If the <i>DreamVast</i> also fails to deliver, it could be the end for Vena.<br><br>With Vena and fans crossing their fingers and hoping for the best, the console will be available in coming months.",
            date: "1/3/3",
            imageURL: "./images/platforms/superb/DreamVast.png"
        });
    }
    Article_announceDreamVast();

    var Article_announcePlaysystem2 = function() {
        internetMod.AddNewsArticle({
            id: "announcePlaysystem2", // must be unique
            category: "platforms",
            header: "Vonny Announces a Playsystem Successor",
            text: "Today, Vonny has announced the much anticipated successor to their popular <i>Playsystem</i> console. The <i>Playsystem 2</i> will have upgraded hardware to compete with newer generation consoles such as the <i>DreamVast</i>. Unlike the <i>DreamVast</i>, the <i>Playsystem 2</i> does not focus much on online play but instead seems to focus on the strengths of the previous <i>Playsystem</i>. A solid upgraded controller including vibration function, upgraded graphics, support for DVD titles and even backwards compatibility with <i>Playsystem 1</i> games.<br><br>Sparking excitement in the gaming industry, demo titles like <i>Great Turismo 200</i> and <i>Teggen Tag Tourney</i> certainly demonstrate the capabilites of the coming console. Many are dying to see any other games this new generation of gaming brings forth.<br><br>The <i>Playsystem 2</i> will be released in several months.",
            date: "1/3/3",
            imageURL: "./images/platforms/superb/Playsystem 2.png"
        });
    }
    Article_announcePlaysystem2();


    // DreamVast slowing down story add to Flutter

    var Article_announcemBox = function() {
        internetMod.AddNewsArticle({
            id: "announcemBox", // must be unique
            category: "platforms",
            header: "A New Player Enters the Console Competition",
            text: "PC software juggernaut Mirconoft has announced today that they will enter the game console market with their very own gaming console called the <i>mBox</i>. This newbie in the console industry was conjured up by Micronoft's 'DefectX' team. The 4 members reassembled and configured a Dill laptop to work as a prototype for a video game console.<br><br>First demonstrations have been impressive, but we will have to wait and see how it fares against the popular DreamVast, as well as against the recently announced and much anticipated <i>Playsystem 2</i>2. The new console is said to debut relatively soon.",
            date: "1/3/3",
            imageURL: "./images/platforms/superb/mBox.png"
        });
    }
    Article_announcemBox();

    var Article_launchPlaysystem2 = function() {
        internetMod.AddNewsArticle({
            id: "Article_launchPlaysystem2", // must be unique
            category: "platforms",
            header: "Vonny's Playsystem 2 Makes Gaming History",
            text: "The launch of the <i>Playsystem 2</i> has been a phenomenal success. Stores everywhere are out of stock as manufacturing can barely keep up. Fans have resorted to buying the console on internet auction sites for as much as five times the normal price.<br><br>With exceedingly excellent hardware (possibly the best console hardware yet), appropriately varying accessories, simply perfect controllers, and astonishingly entertaining games, Vonny's innovative machine has raised the bar for console competitors. In fact, Vonny's immensely succesful console could be responsible for <i>DreamVast</i> sales plummeting.<br><br>Possibly considering the effect the <i>Playsystem 2</i> has had on sales, Micronoft has delayed their upcoming console, the <i>mBox</i> . One can assume they want to ensure quaility after Vonny's historic launch.",
            date: "1/3/3",
            imageURL: "./images/platforms/superb/Playsystem 2.png"
        });
    }
    Article_launchPlaysystem2();
    // add playsystem DRE disc error dealio article about DreamVast discontinuation

    //mBox delayed add to Flutter

    // News Slideshow
    internetMod.animateSlideBarLoop = function() {
        $("#actualSlideBar").stop();
        $("#actualSlideBar").css("width", '0%');
        $("#actualSlideBar").animate({
            width: "100%"
        }, 5000, internetMod.animateSlideBarLoop);
    }

    internetMod.moveRight = function() {
        internetMod.animateSlideBarLoop();

        $('#newsArticleSlideshow ul').animate({
            left: -slideWidth
        }, 900, function() {
            $('#newsArticleSlideshow ul li:first-child').appendTo('#newsArticleSlideshow ul');
            $('#newsArticleSlideshow ul').css('left', '');
        });
    }

    internetMod.moveLeft = function() {
        internetMod.animateSlideBarLoop();

        $('#newsArticleSlideshow ul').animate({
            left: +slideWidth
        }, 900, function() {
            $('#newsArticleSlideshow ul li:last-child').prependTo('#newsArticleSlideshow ul');
            $('#newsArticleSlideshow ul').css('left', '');
        });
    }


    //    internetModSlideshowInterval();

    internetMod.disableSlideshow = function() {
        $("#actualSlideBar").stop();
        $("#actualSlideBar").css("width", '0%');
        clearInterval(internetModSlideshowInterval);
    }

    internetMod.resetSlideshow = function() {
        internetMod.disableSlideshow();
        internetMod.animateSlideBarLoop();
    }

    $('#newsArticleSlideshow ul li:last-child').prependTo('#newsArticleSlideshow ul');

    internetMod.hideAllPages = function() {
        $("#newsHome").fadeOut();
        $("#newsGames").fadeOut();
        $("#newsPlatforms").fadeOut();
        $("#newsAbout").fadeOut();
        $("#newsArticlesOnDeck").fadeOut();
    }

    internetMod.showNewsPage = function(newsPage) {
        $("#newsHome").fadeOut();
        $("#newsGames").fadeOut();
        $("#newsPlatforms").fadeOut();
        $("#newsAbout").fadeOut();
        $("#newsArticlesOnDeck").fadeOut();
        $("#" + newsPage + "").fadeIn();
    }

    internetMod.goNewsHome = function() {
        internetMod.showNewsPage("newsHome");
    }

    internetMod.goNewsGames = function() {
        internetMod.showNewsPage("newsGames");
    }

    internetMod.goNewsPlatforms = function() {
        internetMod.showNewsPage("newsPlatforms");
    }

    internetMod.goNewsAbout = function() {
        internetMod.showNewsPage("newsAbout");
    }
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
}

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
    }

    internetMod.UI_showNewMSG = function() {
        $('#newMsgUI').fadeIn(100);
    }

    internetMod.clickTest = function() {
        UI._showNotification(new Notification("{GameDefinition}"));
    }

    $('.announceChild').hide();
    $('.announceChild2').hide();
    $('.announceChild3').hide();

    internetMod.clearMessageBox = function() {
        $('#msgPrt1').empty();
        $('#msgPrt2').empty();
        $('#msgPrt3').empty();
    }

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
    }

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
    }

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
    }

    internetMod.startNewGame = function() {
        internetMod.reset();
    }

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
    }

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
    }

    internetMod.showUI = function() {
        $("#internetNotifs").show();
        $('#iCompanyName').html('' + GameManager.company.name + '');
    }

    internetMod.checkForReply = function(email) {
        internetMod.addResponse = function(emailNumber, emailMessage, emailVersionOption1, emailVersionOption2) {
            var d = GameManager.company.getDate(GameManager.company.currentWeek);
            var iA = emailNumber - 1;
            var iB = iA.toString();

            if ($('#emailOptions_' + email.id + '-1').hasClass('disableElement') && $('#otherResponses_' + email.id + '').hasClass('forGen')) {
                console.log("Option 1 or 2 has been clicked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                var addReplyBulk = new Timer(function() {
                    console.log('This being repeated?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????');
                    $('#trashEmail_' + email.id + '').remove();
                    $('#otherResponses_' + email.id + '').removeClass('forGen');
                    $('#otherResponses_' + email.id + '').append('<div id="Email_' + email.id + '-' + emailNumber + '" class="emailInfo forGen">' +
                        '<hr>' +
                        '<div id="subjectE">Response ' + emailNumber + ' (' + d.year + '/' + d.month + '/' + d.week + '):</div>' +
                        '<p id="emailENTRY" class="emailENTRY">' + emailMessage + '</p> <hr>' +
                        '<table id="emailOptions_' + email.id + '-' + emailNumber + '" class="emailOptions" cellspacing="20px"> <tr>' +
                        '<td id="Option1_' + email.id + '-' + emailNumber + '" class="emailOption forGenl">' + emailVersionOption1 + '</td>' +
                        '<td id="Option2_' + email.id + '-' + emailNumber + '" class="emailOption forGenl">' + emailVersionOption2 + '</td> </tr> </table>' +
                        '<table id="trashEmail_' + email.id + '" class="trashEmail"> <tr> <td id="trashTD">Trash Email (Double Click)</td> </tr> </table>');
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
                }, 1 + 2 * GameManager.company.getRandom() * GameManager.SECONDS_PER_WEEK * 1E3);

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
                }
            }

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
    }

    internetMod.isEmailAdded = function(email) {
        return internetMod.emailList.first(function(item) {
            return item.id == email.id
        }) !== null;
    }

    internetMod.emailPushDefaults = function(email) {
        internetMod.emailList.push(email);
        internetMod.AddEmailToHTMLPage(email);
        internetMod.countNotifs(0);
        Sound.playSoundOnce("bugDecrease", 0.2);
    }

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
        // email.pushDate = undefined;
        //            email.option1Selected = false;
        //          email.option2Selected = false;
    }

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
        }

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
            $('#emailMain').children().remove();
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
    }

    // Example internet email message
    var internetMod_tutorialEmail = function() {
        internetMod.AddEmail({
            id: 'testEmail', // must be unique
            isRandomEvent: true,
            trigger: function(email) {
                return GameManager.company.currentLevel == 1;
            },
            category: 'Media', // must be playerCompany, Media, Fans, or Companies
            date: '', // When it comes to date and trigger, I want to be able to remove one or the other without there being a GDT event handler issue.
            from: 'Jimmy Dean',
            address: 'jdean@zmail.com',
            subject: 'Your Game; Our Movie',
            message: 'Hello, <br><br>I recently played your new game: so well balanced, great gameplay, just beautiful. The story was riventing, and that is where I come in... :) <br><br>I am an upincoming movie director with 8+ years of experience. Many video games turned into movies have been financial successes but tend to fall apart with bad plot and little effort. <br><br><b>Well, I would like to have the best of both worlds.</b><br><br>I guarntee if you license me your movie rights, I will make your gaming sensation a flim sensation. What do ya say?', // Like in html, use <br> to make a line break
            option1: 'Yes',
            option1_ifSelected: function() {},
            option2: 'No',
            option2_ifSelected: function() {},
            // Email received based on option
            // Message 2
            // Possible Outcome 1 (v1 = version1, v2 = version2. There has to be two versions since there are two options for each response)
            v1_message2: "Sweet! You'll not regret this. I'll get back to you with an update ASAP. Have a good one!",
            v1_message2_option1: 'Sounds good!',
            v1_message2_option1_ifSelected: function() {},
            v1_message2_option2: 'Actually, nevermind',
            v1_message2_option2_ifSelected: function() {},
            // Possible Outcome 2
            v2_message2: 'I would seriously think about this. I have talked to a number of your fans, and all of them would be stoked to have a movie about their favorite game. If you really feel indifferent, then I will leave you be; however, I promise you that my movie will benefit you, your company, and your fans.',
            v2_message2_option1: 'Alright, fine',
            v2_message2_option1_ifSelected: function() {},
            v2_message2_option2: 'Sorry, no',
            v2_message2_option2_ifSelected: function() {},
            // Message 3
            // Possible Outcome 1
            v1_message3: 'Awesome! I knew you would make the right decision. Lets get started right away. The less time we waste, the better.<br><br>Do you think we should use top-notch actors/actresses? Be warned, it will cost a bit to get the best.',
            v1_message3_option1: 'Yeah, I think so (40M).',
            v1_message3_option1_ifSelected: function() {
                internetMod.addMoney(-50000000, 'Movie Actors/Actress');
            },
            v1_message3_option2: "No, we can use other actors/actresses (150K).",
            v1_message3_option2_ifSelected: function() {
                internetMod.addMoney(-150000, 'Movie Actors/Actress');
            },
            // Possible Outcome 2
            v2_message3: 'Alright.. Was really looking foward to making something special. :/',
            v2_message3_option1: 'Fine',
            v2_message3_option1_ifSelected: function() {
                internetMod.addMoney(1000, 'Zloo');
            },
            v2_message3_option2: 'Still no',
            v2_message3_option2_ifSelected: function() {
                internetMod.addMoney(1000, 'Zlah');
            },
            // Message 4
            // Possible Outcome 1
            v1_message4: 'Message 4 Version NUMBER ONEEEEEEEEEEEEEEEEEEEEEEE',
            v1_message4_option1: 'Fine',
            v1_message4_option1_ifSelected: function() {
                internetMod.addMoney(1000, 'Kloo');
            },
            v1_message4_option2: 'Still no',
            v1_message4_option2_ifSelected: function() {
                internetMod.addMoney(1000, 'KLAH');
            },
            // Possible Outcome 2
            v2_message4: 'Message 4 Version NUMBER TWOOOOOOOO',
            v2_message4_option1: 'Fine',
            v2_message4_option1_ifSelected: function() {
                internetMod.addMoney(1000, 'Zloo');
            },
            v2_message4_option2: 'Still no',
            v2_message4_option2_ifSelected: function() {
                internetMod.addMoney(1000, 'Zlah');
            },
            // Message 5
            // Possible Outcome 1
            v1_message5: 'Message 5 Version NUMBER ONEEEEEEEEEEEEEEEEEEEEEEE',
            v1_message5_option1: 'Fine',
            v1_message5_option1_ifSelected: function() {
                internetMod.addMoney(1000, 'Kloo');
            },
            v1_message5_option2: 'Still no',
            v1_message5_option2_ifSelected: function() {
                internetMod.addMoney(1000, 'KLAH');
            },
            // Possible Outcome 2
            v2_message5: 'Message 5 Version NUMBER TWOOOOOOOO',
            v2_message5_option1: 'Fine',
            v2_message5_option1_ifSelected: function() {
                internetMod.addMoney(1000, 'Zloo');
            },
            v2_message5_option2: 'Still no',
            v2_message5_option2_ifSelected: function() {
                internetMod.addMoney(1000, 'Zlah');
            }
        });
    }
    internetMod_tutorialEmail();
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
    }
    internetMod.checkForReply(email);
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
            /*   $("#newsArticleSlideshow ul li").sort(internetMod.sortSlideshow).appendTo('#newsArticleSlideshow ul');

                var testYo = parseInt($('#newsArticleSlideshow ul li:nth-child(1)').attr('data-position')) + 1;
                $('#newsArticleSlideshow ul li:nth-child(1)').attr('data-position', '' + testYo + '');

                var testYo = parseInt($('#newsArticleSlideshow ul li:nth-child(2)').attr('data-position')) + 1;
                $('#newsArticleSlideshow ul li:nth-child(2)').attr('data-position', '' + testYo + '');

                var testYo = parseInt($('#newsArticleSlideshow ul li:nth-child(3)').attr('data-position')) + 1;
                $('#newsArticleSlideshow ul li:nth-child(3)').attr('data-position', '' + testYo + '');

                var testYo = parseInt($('#newsArticleSlideshow ul li:nth-child(4)').attr('data-position')) + 1;
                $('#newsArticleSlideshow ul li:nth-child(4)').attr('data-position', '' + testYo + '');*/

            $("#newsArticleSlideshow ul li:gt(3)").remove();
        }
    }
    /*if (newsArticle.date.charAt(0) == d.year && newsArticle.date.charAt(2) == d.month && newsArticle.date.charAt(4) == d.week) {
        newsArticlesArray.push(newsArticle);
     } */

    //News Website
}


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

// Opens the Email website
internetMod.openEmail = function() {
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
        $("#emailSITE").show();
    }, 1000);
};

// Open a website that I haven't made up my mind about :P
internetMod.openNews = function() {
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
        $("#newsSITE").show();
    }, 1000);
};

// Opens the Social Network website
internetMod.openSocial = function() {
    Sound.click();
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").html('LOADING...');
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
    $("#newsSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").html('LOADING...');
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
    $("#internetContainer").hide();
    internetMod.disableSlideshow();
    GameManager.resume(true);
    // addReplyBulk.Resume();
};
