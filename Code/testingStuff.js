Media.allScheduledStories = [];
var se = SalesEvents;
var m = Media;

// Maybe change some of these to Flutter once Flutter is fleshed out

Media.createFirstGameStory = function(company) {
    var d = company.getDate(company.currentWeek);
    var game = company.currentGame;
    var newsDate = '' + d.year + '/' + d.month + '/' + d.week + '';
    if (game.score <= 3) {
        var msg = "{0}, a newcomer in the game industry, has just released their first game '{1}'. The game got generally low scores from reviewers but with a bit of experience we are sure that we will see better games from {0} in the future.".localize("fragment, continue with firstGameStoryRatingFragments").format(company.name, game.title);
    } else if (game.score <= 5.6) {
        var msg = "{0}, a newcomer in the game industry, has just released their first game '{1}'. The game had a moderate response from reviewers. We are curious what {0} will deliver in the future.".localize("fragment, continue with firstGameStoryRatingFragments").format(company.name, game.title);
    } else {
        var msg = "{0}, a newcomer in the game industry, has just released their first game '{1}'. The game received favorable reviews. With such a good start {0} are sure to gain fans quickly.".localize("fragment, continue with firstGameStoryRatingFragments").format(company.name, game.title);
    }

    internetMod.AddNewsArticle({
        id: "companyFirstGame", // must be unique
        category: "games",
        header: "A New Player in the Gaming Industry",
        text: msg,
        date: newsDate,
        imageURL: "./images/platforms/superb/GameSphere.png" // CHANGE THIS IMAGE
    });
    console.log('First Game Story Intialized');
};

Media.createSequelStory = function(company, game) {
    var d = company.getDate(company.currentWeek);
    var newsDate = '' + d.year + '/' + d.month + '/' + d.week + '';
    var sequelTo = company.getGameById(game.sequelTo);
    var responseVerb = game.score > 9 ? "outstanding".localize() : game.score > 7 ? "great".localize() : game.score > 5 ? "moderate".localize() : game.score > 3 ? "below average".localize() : "pretty bad".localize();
    var msg = "{0} has recently released a sequel to their game {1}. The newest game in the series titled {2} was met with {3} responses.".localize().format(company.name, sequelTo.title, game.title, responseVerb);
    if (game.score > 6 && game.flags.hasBetterEngineThanSequel)
        msg += " " + "Critics praised that {0} had a newer engine than the original, really driving technical innovation.".localize().format(game.title);
    if (game.flags.sequelsTooClose) {
        var weekDiff = Math.floor(game.releaseWeek - sequelTo.releaseWeek);
        msg += "A major negative reaction came from fans who felt that with the original coming out just {0} weeks before, the company is trying to milk the franchise for more money without delivering much new for players to enjoy.".localize().format(weekDiff);
        var newsHeader = "The Sequel is Already Here?";
    }
    internetMod.AddNewsArticle({
        id: "companySequelGame-" + randomFoo + "", // must be unique
        category: "games",
        header: newsHeader,
        text: msg,
        date: newsDate,
        imageURL: "./images/platforms/superb/GameSphere.png" // CHANGE THIS IMAGE
    });
    console.log('Sequel Story Intialized');
};

/*
Media.createExtensionPackStory = function(company, game) {
    var d = GameManager.company.getDate(GameManager.company.currentWeek);
    var newsDate = '' + d.year + '/' + d.month + '/' + d.week + '';
    var sequelTo = company.getGameById(game.sequelTo);
    var responseVerb = game.score > 9 ? "outstanding".localize() : game.score > 7 ? "great".localize() : game.score > 5 ? "moderate".localize() : game.score > 3 ? "below average".localize() : "pretty bad".localize();
    var msg = "{0} has recently released an expansion pack to their game {1}. The expansion pack titled {2} was met with {3} responses.".localize().format(company.name, sequelTo.title,
        game.title, responseVerb);
    if (game.flags.sequelsTooClose) {
        var weekDiff = Math.floor(game.releaseWeek - sequelTo.releaseWeek);
        msg += "A major negative reaction came from fans who felt that with the main game coming out just {0} weeks before, the company is trying to milk the franchise for more money without delivering much new for players to enjoy.".localize().format(weekDiff)
        var newsHeader = "" + company.name + " Abusing Previous Success?'"
    }
    internetMod.AddNewsArticle({
        id: "companyExpansionPack", // must be unique
        category: "games",
        header: newsHeader,
        text: msg,
        date: newsDate,
        imageURL: "./images/platforms/superb/GameSphere.png" // CHANGE THIS IMAGE
    });
    console.log('Expansion Pack Story Intialized');
};

// Maybe just make this on flutter
m.generateAudienceMismatchStory = function(company, game) {
    var d = company.getDate(company.currentWeek);
    var newsDate = '' + d.year + '/' + d.month + '/' + d.week + '';
    var descr = game.score > 8 ? "outstanding".localize() : game.score > 6 ? "good".localize() : "moderate".localize();
    var newsHeader = game.score > 8 ? "A Great Game, But An Odd Mixture".localize() : game.score > 6 ? "A Good Game, But Curious Marketing".localize() : "moderate".localize();
    var msg = "It seems that the initial sales for {0} have fallen way below expected numbers. The game received {1} reviews but it seems that the chosen platform isn't very popular with the target audience.".localize("{1} is adjective like good, moderate, outstanding").format(game.title, descr);
    internetMod.AddNewsArticle({
        id: "companyAudienceMismatch", // must be unique
        category: "games",
        header: newsHeader,
        text: msg,
        date: newsDate,
        imageURL: "./images/platforms/superb/GameSphere.png" // CHANGE THIS IMAGE
    });
    console.log('Audience Mismatch Story Intialized');
};
*/

se.getHypedGameEvent = function(company, game) {
    /*  var d = company.getDate(company.currentWeek);
      var newsDate = '' + d.year + '/' + d.month + '/' + d.week + '';
      var effect = 0;
      var hyped = game.flags.interviewHyped.decision;
      var source = game.flags.interviewHyped.source;
      var msg = "In an exclusive interview a while ago, {0} from {1}".localize("followed by sentence fragment (hypgfr1 or hypgfr2)").format(company.staff[0].name, company.name);
      if (hyped)
          msg +=
          " made very bold remarks about their then-in-development game {0} predicting that it will be \u00fcber successful.".localize("fragment: hypgfr1").format(game.title);
      else
          msg += " was holding back when discussing their expections for {0}.".localize("fragment: hypgfr2").format(game.title);
      var descr;
      if (game.score > 8)
          if (hyped) {
              effect = 0.5;
              descr = "was spot on as the game has received very positive reviews.".localize("fragment")
          } else {
              effect = 0.2;
              descr = "was just humble as the game received critical acclaim.".localize("fragment")
          }
      else if (game.score > 6)
          if (hyped) {
              effect = -0.2;
              descr = "should've been more careful as the final product doesn't match the hyped expectations.".localize("fragment");
              var newsHeader = "" + company.name + "'s Hyped Game Falls Flat";
          } else {
              effect = 0.4;
              descr = "was right to stay realistic as the game is good but nothing too out of the ordinary.".localize("fragment");
              var newsHeader = "" + company.name + "'s Long-Awaited Game Stops at the Finsh Line";
          }
      else if (hyped) {
          effect = -0.5;
          descr = "needs a lesson in how to be humble as the game received mediocre reviews.".localize("fragment")
          var newsHeader = "The Gaming Disapointment of the Year";
      }
      msg += "{n}" + "Now, that the game is out on the market the consensus is that {0} {1}".localize("{0} is player name, {1} is description").format(company.staff[0].name,
          descr);
      if (effect > 0)
          msg += "Overall, this had a positive effect on sales.".localize();
      else
          msg += "Overall, this had a negative effect on sales.".localize();
      if (effect != 0)
          internetMod.AddNewsArticle({
              id: "companyGameInterview-" + Math.random().toString() + "", // must be unique
              category: "games",
              header: newsHeader,
              text: msg,
              date: newsDate,
              imageURL: "./images/platforms/superb/GameSphere.png" // CHANGE THIS IMAGE
          }); */
    console.log('Hyped Game Story Intialized');
    //  return effect
};

m.createMMOEndStory = function(game) {
    var randomBlah = Math.floor(Math.random());
    var randomFoo = randomBlah.toString();
    var duration = GameManager.company.currentWeek - game.releaseWeek;
    var months = Math.roundToDecimals(duration / 4, 1);
    var company = GameManager.company;
    var d = company.getDate(company.currentWeek);
    var newsDate = '' + d.year + '/' + d.month + '/' + d.week + '';
    var msg = "We just got word that {0} is retiring its MMO game '{1}' from the market. The game has been on the market for {2} months and racked up over {3} in sales.<br><br>".localize();
    if (!game.flags.isProfitable) {
        msg += " " + "{1} was likely not profitable anymore as the maintenance costs were likely larger than the income.".localize();
        var newsHeader = "'" + game.title + "' is Coming Off the Market";
    } else {
        msg += " " + "We are not quite sure why {0} has decided to take '{1}' off the market as the game likely still generated income for the company.".localize();
        var newsHeader = "'" + game.title + "' is Already Out The Door?";
        var fanLoss = 0;
        var anotherMMO = GameManager.company.gameLog.first(function(g) {
            return g.id != game.id && (g.flags.mmo && g.isOnSale())
        });
    }
    if (anotherMMO) {
        msg += "<br><br>While fans of '{0}' weren't happy about the news many of them also play {1} which is still on the market.".localize().format(company.name, anotherMMO.title);
    } else {
        msg += "<br><br>Fans of '{1}' have voiced complaints with one fan saying: 'I love '{0}' and played '{1}' a lot, but now that they took it off the market I don't know what MMO I should play. If only {0} had released a new MMO I wouldn't be so upset.'".localize();
        fanLoss = Math.floor(game.fansChanged * 0.1 * company.getRandom())
    }
    var articleMsg = msg.format(company.name, game.title, months, UI.getLongNumberString(game.unitsSold));
    if (fanLoss)
        internetMod.addFans(-fanLoss);
    internetMod.AddNewsArticle({
        id: "companyGameMMO-" + randomFoo + "", // must be unique
        category: "games",
        header: newsHeader,
        text: articleMsg,
        date: newsDate,
        imageURL: "./images/platforms/superb/GameSphere.png" // CHANGE THIS IMAGE
    });
    console.log('MMO Story Intialized');
};

//Add header
m.createConsoleStartStory = function(console) {
    var company = GameManager.company;
    var isGoodTech = console.isGoodTech;
    var featureFactor = console.featureFactor;
    var success = console.successFactor;
    var quality = console.qF;
    var msg = "{0} has released their game console {1} today.".localize().format(company.name, console.name);
    if (isGoodTech) {
        msg += " " + "The console seems to really push the limits of technology and is the most modern console ever to hit shelves.".localize();
    } else {
        msg += " " + "The console does not seem quite on par with the high tech competitors but we will see what players think.".localize();
        msg += " Looking at the features of {0}, it seems that the ".localize().format(console.name);
    }
    if (featureFactor >= 0.8) {
        msg += "list is extensive which is a good sign and could lead to a wide variety of games becoming available.".localize();
    } else {
        msg += " " + "list is a bit slim. Don't expect too many gadgets and controllers to be available for this console.".localize();
        msg += "First tests indicate that {0}".localize().format(console.name);
    }
    if (quality >= 0.8) {
        msg += "'s build quality is excellent and will likely run for decades without issues.".localize();
        var newsHeader = ["" + GameManager.company.name + "'s Releases a Groundbreaking Console'", "A Game-Changing Console Hits the Shelves!", "A New Gaming Platform Raises the Stakes"].pickRandom();
    } else if (quality >= 0.5) {
        msg += " " + "is of average build quality. Don't expect it to last forever but in general you should not see many issues.".localize();
        var newsHeader = ["" + GameManager.company.name + "'s New Console Releases to Mixed Responses'", "A New Console, A Decent Experience", "The New " + console.name + ", A Solid 'Okay'"].pickRandom();
    } else {
        msg += " " + "is a bit fragile. We wouldn't be surprised if you need to make use of the warranty sooner or later.".localize();
        var newsHeader = ["" + GameManager.company.name + " Tries and Fails", "The '" + console.name + "' Is A Total Bust", "A New Console Releases With Many Shortcomings"].pickRandom();
        msg += "All in all ".localize("fragment continues with 'we think that the console...'");
    }
    if (success >= 1) {
        msg += " " + "we think that the console will stir up the market and prove to be very successful.".localize("fragment, started with 'All in all'").format(console.name);
    } else if (success >= 0.8) {
        msg += " " + "we think that the console will do reasonably well in the market and it is a welcome addition.".localize("fragment, started with 'All in all'").format(console.name);
    } else {
        msg += " " + "it's hard to say whether the console will do well as there are so many other good products on the market.".localize("fragment, started with 'All in all'").format(console.name);
        internetMod.AddNewsArticle({
            id: "companyConsoleStart-" + randomFoo + "", // must be unique
            category: "platforms",
            header: newsHeader,
            text: msg,
            date: newsDate,
            imageURL: console.iconUri
        });
    }
};
