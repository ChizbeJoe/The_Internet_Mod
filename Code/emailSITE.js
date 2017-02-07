var dataStore = GDT.getDataStore("InternetMod");

internetMod.resetEmailsToAdd = function() {
internetMod.emailListToAdd = [];
// Example internet email message
var internetMod_testEmail = function() {
    internetMod.AddEmail({
        id: 'testEmail', // must be unique
        isRandomEvent: false,
        trigger: function(email) {
            return GameManager.company.currentLevel == 1;
        },
        // I might not even need to use category
        category: 'Media', // must be playerCompany, Media, Fans, or Companies
        date: '1/1/4', // When it comes to date and trigger, I want to be able to remove one or the other without there being a GDT event handler issue.
        from: 'Jimmy Dean',
        address: 'jdean@zmail.com',
        subject: 'Test Email',
        message: 'Message 1', // Like in html, use <br> to make a line break
        option1: 'Yes',
        option1_ifSelected: function() {},
        option2: 'No',
        option2_ifSelected: function() {},
        // Email received based on option
        // Message 2
        // Possible Outcome 1 (v1 = version1, v2 = version2. There has to be two versions since there are two options for each response)
        v1_message2: "Message 2 - Version 1",
        v1_message2_option1: 'Sounds good!',
        v1_message2_option1_ifSelected: function() {},
        v1_message2_option2: 'Actually, nevermind',
        v1_message2_option2_ifSelected: function() {
            console.log('version 1 option 2  clicked');
        },
        // Possible Outcome 2
        v2_message2: 'Message 2 - Version 2',
        v2_message2_option1: 'Alright, fine',
        v2_message2_option1_ifSelected: function() {
            console.log('version 2 option 1 clicked');
        },
        v2_message2_option2: 'Sorry, no',
        v2_message2_option2_ifSelected: function() {
            console.log('version 2 option 2 clicked');
        },
        // Message 3
        // Possible Outcome 1
        v1_message3: 'Message 3 - Version 1',
        v1_message3_option1: 'Yeah, I think so (40M).',
        v1_message3_option1_ifSelected: function() {
            internetMod.addMoney(-50000000, 'Movie Actors/Actress');
        },
        v1_message3_option2: "No, we can use other actors/actresses (150K).",
        v1_message3_option2_ifSelected: function() {
            internetMod.addMoney(-150000, 'Movie Actors/Actress');
        },
        // Possible Outcome 2
        v2_message3: 'Message 3 - Version 2',
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
        v1_message4: 'Message 4 - Version 1',
        v1_message4_option1: 'Fine',
        v1_message4_option1_ifSelected: function() {
            internetMod.addMoney(1000, 'Kloo');
        },
        v1_message4_option2: 'Still no',
        v1_message4_option2_ifSelected: function() {
            internetMod.addMoney(1000, 'KLAH');
        },
        // Possible Outcome 2
        v2_message4: 'Message 4 - Version 2',
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
        v1_message5: 'Message 5 - Version 1',
        v1_message5_option1: 'Fine',
        v1_message5_option1_ifSelected: function() {
            internetMod.addMoney(1000, 'Kloo');
        },
        v1_message5_option2: 'Still no',
        v1_message5_option2_ifSelected: function() {
            internetMod.addMoney(1000, 'KLAH');
        },
        // Possible Outcome 2
        v2_message5: 'Message 5 - Version 2',
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
internetMod_testEmail();

// Example internet email message
var Email_greenfartGamesProblem = function() {
  var emailSbj = ["This Game-Dev Game", "Your Game-Dev Sim"].pickRandom();
  var msgPart1 = ["Hello", "Hi"].pickRandom();

  var msgIAmSyn = ["My name's Katrick Plug", "I'm Katrick Plug", "Katrick Plug here"].pickRandom();
  var msgJobSyn = ["founder of Greenfart Games", "Greenfart Games's founder and lead developer"].pickRandom();
  var msgPart2 = "{0}, {1}.".format(msgIAmSyn, msgJobSyn);

  var msgHeardPart = ["Recently, I overheard that", "I recently heard that", "According to the rumor mill,", "I just heard that", "I am aware that"].pickRandom();
  var msgYouSyn = ["you are", "your company is"/*, GameManager.company.name + " is"*/].pickRandom();
  var msgMakingSyn = ["making", "developing", "currently developing", "currently making"].pickRandom();
  var msgGameDevSyn = ["a Game-Dev Sim", "a Game-Dev simulator", "Game-Dev/Simulation game"].pickRandom();
  var msgPart3 = "{0} {1} {2} {3}.".format(msgHeardPart, msgYouSyn, msgMakingSyn, msgGameDevSyn);

  var msgMayKnowPart = ["If you weren't already aware", "As you may know"].pickRandom();
  var msgWeDevPart = ["Greenfart Games has already released a Game-Dev Simulator called 'Game Dev Tycoon'", "Greenfart Games is the creator of the widely praised 'Game Dev Tycoon'", "Greenfart Games created a famous game dev tycoon called, you guessed it, 'Game Dev Tycoon'"].pickRandom();
  var msgPart4 = "{0}, {1}.".format(msgMayKnowPart, msgWeDevPart);

  var msgManySyn = ["Many", "Numerous"].pickRandom();
  var msgCriticsSyn = ["critics", "gamers", "people"].pickRandom();
  var msgPraiseSyn = ["praise", "laud", "commend"].pickRandom();
  var msgGameGoodPart = ["the game's unique gameplay", "the game's unique game mechanics"].pickRandom();
  var msgPart5 = "{0} {1} {2} {3}.".format(msgManySyn, msgCriticsSyn, msgPraiseSyn, msgGameGoodPart);

  var msgAnywaySyn = ["Anyways", "Getting back to the point", "Point is,"].pickRandom();
  var msgIThoughtPart = ["I just feel like your game is kinda similar to my game... too similar", "I just hope you're aware that your game is a bit similar to 'Game Dev Tycoon'", "I am just not open to people creating a copycat game", "I'm just not at ease about a Game-Dev ripoff"].pickRandom();
  var msgPart6 = "{0}, {1}.".format(msgAnywaySyn, msgIThoughtPart);

  var msgPart7 = ["We here at Greenfart Games take unique game creation very seriously.", "Unique game creation is not a joke here at Greenfart Games.", "We here at Greenfart Games do not tolerate childish actions like stealing another's idea."].pickRandom();

  var msgPart8 = ["Do you see where I could be a tad worried about your Game-Dev Sim?", "So you see where I might be a little cautious about another game dev tycoon released so close to my own?"].pickRandom();

  var emailMsg = msgPart1 + ",<br><br>" + msgPart2 + "<br><br>" + msgPart3 + " " + msgPart4 + " " + msgPart5 + "<br><br>" + msgPart6 + "<br><br>" + msgPart7 + " " + msgPart8;

  var msg2_v1_part1 = ["Great", "Awesome", "Sweet"].pickRandom();

  var msgStopGamePart = ["cease development on", "immediately stop developing", "immediately put to rest"].pickRandom();
  var msgGameRipoffSyn = ["this Game-Dev game", "this Game-Dev ripoff", "'Game Dev Tycoon: The Ripoff'"].pickRandom();
  var msg2_v1_part2 = "So if you could just {0} {1}, that'd be perfect. ;)".format(msgStopGamePart, msgGameRipoffSyn);

  var emailMsg2_v1 = msg2_v1_part1 + "! " + msg2_v1_part2;

    internetMod.AddEmail({
        id: 'greenfartGamesProblem' + internetMod.getRandomNumber(1E5), // must be unique
        trigger: function(email) {
            return GameManager.company.currentLevel == 1;//GameManager.company.isGameProgressBetween(0.2, 0.8) && GameManager.company.currentGame.genre.id === GameGenre.Simulation.id && (GameManager.company.currentGame.topic.id === "Game Dev");
        },
        date: '1/1/4',
        category: 'Companies', // must be playerCompany, Media, Fans, or Companies
        from: 'Katrick Plug',
        address: 'support@greenfartgames.com',
        subject: emailSbj,
        message: emailMsg, // Like in html, use <br> to make a line break
        option1: 'Yeah, I get it.',
        option1_ifSelected: function() {},
        option2: 'Not really, no',
        option2_ifSelected: function() {},
        // Email received based on option
        // Message 2
        // Possible Outcome 1 (v1 = version1, v2 = version2. There has to be two versions since there are two options for each response)
        v1_message2: emailMsg2_v1,
        v1_message2_option1: 'Umm... No, I am definitely doing this game.',
        v1_message2_option1_ifSelected: function() {
          dataStore.data.willNotReleaseGameDevSim = false;
        },
        v1_message2_option2: "Fine. I won't release the game.",
        v1_message2_option2_ifSelected: function() {
            dataStore.data.willNotReleaseGameDevSim = true;
        },
        // Possible Outcome 2
        v2_message2: 'Message 2 - Version 2',
        v2_message2_option1: 'Alright, fine',
        v2_message2_option1_ifSelected: function() {
            console.log('version 2 option 1 clicked');
        },
        v2_message2_option2: 'Sorry, no',
        v2_message2_option2_ifSelected: function() {
            console.log('version 2 option 2 clicked');
        },
        // Message 3
        // Possible Outcome 1
        v1_message3: 'Message 3 - Version 1',
        v1_message3_option1: 'Yeah, I think so (40M).',
        v1_message3_option1_ifSelected: function() {
            internetMod.addMoney(-50000000, 'Movie Actors/Actress');
        },
        v1_message3_option2: "No, we can use other actors/actresses (150K).",
        v1_message3_option2_ifSelected: function() {
            internetMod.addMoney(-150000, 'Movie Actors/Actress');
        },
        // Possible Outcome 2
        v2_message3: 'Message 3 - Version 2',

        // Message 4
        // Possible Outcome 1
        v1_message4: 'Message 4 - Version 1',
        v1_message4_option1: 'Fine',
        v1_message4_option1_ifSelected: function() {
            internetMod.addMoney(1000, 'Kloo');
        },
        v1_message4_option2: 'Still no',
        v1_message4_option2_ifSelected: function() {
            internetMod.addMoney(1000, 'KLAH');
        },
        // Possible Outcome 2
        v2_message4: 'Message 4 - Version 2',
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
        v1_message5: 'Message 5 - Version 1',
        v1_message5_option1: 'Fine',
        v1_message5_option1_ifSelected: function() {
            internetMod.addMoney(1000, 'Kloo');
        },
        v1_message5_option2: 'Still no',
        v1_message5_option2_ifSelected: function() {
            internetMod.addMoney(1000, 'KLAH');
        },
        // Possible Outcome 2
        v2_message5: 'Message 5 - Version 2',
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
Email_greenfartGamesProblem();

// This email is pushed through the mod tick
var Email_gameLinkInterview = function() {
    var yourPlayerName = GameManager.company.staff.first().name;
    var currentGame = GameManager.company.currentGame;
    var recentGame = GameManager.company.gameLog.last();
    if (recentGame.secondGenre = undefined) {
        var recentGameGenre = recentGame.genre.id + "/" + recentGame.secondGenre.id;
    } else {
        var recentGameGenre = recentGame.genre.id;
    }

    // Randomly generated email details
    var emailFirstName = internetMod.firstNames.pickRandom();
    var emailLastName = internetMod.lastNames.pickRandom();
    var emailFrom = emailFirstName + ' ' + emailLastName;
    var emailAddress = emailFirstName.substr(0, 1) + emailLastName.substr(0, 4) + internetMod.getRandomNumber(1E3) + '@gamelink.com';
    var emailSubject = ["A Simple Interview", "Your Next Game", "What's Lined Up?", "Gamelink Exclusive Interview", "Just A Few Questions", "Your Game, My Questions", "Questions About Your Game", "Up For An Interview?", "An Interview For Gamelink", "Fans Want The Details", "Some Questions, Many Benefits", "What Else Ya Got?", "What's In The Works?", "Interview Time!"].pickRandom();

    // Randomly generated email interview message
    var msgPart1 = ["Hey", "Hi", "Howdy", "Hello", "Hiya", "Yo"].pickRandom() + ",";
    var msgPart2 = ["My name is " + emailFrom + ". I'm a journalist for Game Link News", "I'm an eager journalist working for Game Link News", "Being a journalist for Game Link News, I am hoping you could help me out a little", "I, " + emailFrom + ", am a journalist for a gaming newspaper", "I work for a gaming newspaper. You can call me " + emailFirstName + ""].pickRandom();
    var msgPart3 = ["Your last game, '" + recentGame.title + "', was", "'" + recentGame.title + "', the last game you released, was", "I played '" + recentGame.title + "', and it was", "I wrote an article about your last game, '" + recentGame.title + "', and felt that it was"].pickRandom();

    if (recentGame.score >= 10) {
        var msgPart4 = ["one of the best games I have played to date", "a pure masterpiece", "nothing short of absolutely perfect", "a game-changing, life-changing, bar-raising work of art"].pickRandom();
        dataStore.data.recentGamePerfect = true;
        dataStore.data.recentGameGood = false;
        dataStore.data.recentGameDecent = false;
        dataStore.data.recentGameBad = false;
    } else if (recentGame.score >= 7) {
        var msgPart4 = ["very well-made", "one of those games that just got it right", "one of my favorite " + recentGameGenre + "s out there"].pickRandom();
        dataStore.data.recentGamePerfect = false;
        dataStore.data.recentGameGood = true;
        dataStore.data.recentGameDecent = false;
        dataStore.data.recentGameBad = false;
    } else if (recentGame.score > 5) {
        var msgPart4 = ["alright for the most part", "pretty decent overall", "not that bad", "one of those games I enjoyed but soon forgot about, haha", "a decent experience for what it was", "something that had the potential to be good"].pickRandom();
        dataStore.data.recentGamePerfect = false;
        dataStore.data.recentGameGood = false;
        dataStore.data.recentGameDecent = true;
        dataStore.data.recentGameBad = false;
    } else {
        var msgPart4 = ["not that great... I mean... yeah, not great", "something that could've used a little more work :/", "ultimately forgettable", "something that, in the end, fell flat"].pickRandom();
        dataStore.data.recentGamePerfect = false;
        dataStore.data.recentGameGood = false;
        dataStore.data.recentGameDecent = false;
        dataStore.data.recentGameBad = true;
    }

    var executedDevMissions = recentGame.featureLog.filter(function(m) {
        return m.missionType === "mission"
    });

    var optimalMissionFocus = executedDevMissions.filter(function(m) {
        var percentage = m.duration / General.getGameSizeDurationFactor(recentGame.gameSize) / General.getMultiPlatformDurationFactor(recentGame) / (Missions.BASE_DURATION * 3);
        return Missions.getGenreWeighting(m, recentGame) >= 0.9 && percentage >= 0.4
    });

    var focusedOnThings = optimalMissionFocus.map(function(m) {
        return Missions.getMissionWithId(m.id)
    }).pickRandom().name;

    if (optimalMissionFocus.length >= 1) {
        var msgPart5 = ["Your focus on {0} worked really well for the game".format(focusedOnThings), "The {0} in the game worked quite well".format(focusedOnThings)].pickRandom();
    }

    var msgPart6 = ["Anyways", "Well", "Now", "Keeping that in mind"].pickRandom();
    var msgPart7 = ["I think that", "I feel like", "I can assure you that", "it is apparent that", "I can confidently say that"].pickRandom();
    if (recentGame.score < 7) {
        var msgIfPrevGameBad = [", even with your last game not turning out so great, ", ", even with your previous game not being the best, ", ", even with your last game falling a bit short, ", ", even with your previous game not being <i>incredible</i>, "].pickRandom();
        var msgIfPrevGameBad2 = ["I did like ", "I can say that ", "One aspect I enjoyed was "].pickRandom();
        var msgPart5 = msgPart5.toLowerCase();
    } else {
        var msgIfPrevGameBad = "";
        var msgIfPrevGameBad2 = "";
        msgPart7 += " ";
    }
    var msgPart8 = ["everyone is", "your fans are", "fans and gamers alike are", "the gaming world is", "the gaming indsutry is", "many people are", "numerous gamers are", "a large sum of gamers out there are", "a respectable amount of people are", "various fans who played your last game are", "fans of your previous game are", "a respectable amount of people are"].pickRandom();
    var msgPart9 = ["hoping for", "dying for", "wishing for", "looking for", "eagerly waiting for", "still curious as they wait for", "searching high and low for", "in need of"].pickRandom();
    var msgPart10 = ["any information", "any details", "some kind of hint", "info", "some information"].pickRandom();
    var msgPart11 = ["regarding", "that has to do with", "related to", "that is related to", "with regards to", "that you could relay about"].pickRandom();
    var msgPart12 = ["your", "" + GameManager.company.name + "'s", ""].pickRandom();

    if (msgPart12 != "") {
        var msgPart13 = ["next game", "up and coming game", "currently in-dev game", "next project", "upincoming game"].pickRandom();
    } else {
        var msgPart13 = ["what's currently in development", "what's next on the agenda", "what else you have in store", "what you're currently working on", "what's next in line"].pickRandom();
    }

    var msgPart14 = ["So ", ""].pickRandom();
    if (msgPart14 !== "So ") {
        var msgPart15 = ["Would you be willing to", "Maybe you could", "If you're cool with it, could you", "To please your fans, you could always just", "To answer those calls, all you would have to do is"].pickRandom();
    } else {
        var msgPart15 = ["would you be willing to", "maybe you could", "if you're cool with it, could you", "to please your fans, you could always just", "to answer those calls, all you would have to do is"].pickRandom();
    }

    var msgQuestionSyn = ["some questions", "a few questions"].pickRandom();
    var msgGameSyn = ["it", "the coming game", "the game", "this game"].pickRandom();
    var msgPart16 = ["answer " + msgQuestionSyn + " about " + msgGameSyn + "", "simply answer " + msgQuestionSyn + " about " + msgGameSyn + "", "conduct a short interview about " + msgGameSyn + ""].pickRandom();
    if (msgPart15 == "would you be willing" || msgPart15 == "if you're cool with it, could you") {
        var msgIfQues = "?";
    } else {
        var msgIfQues = "."
    }

    var emailMessage = msgPart1 + "<br><br>" + msgPart2 + ".<br><br>" + msgPart3 + " " + msgPart4 + ". " + msgIfPrevGameBad2 + msgPart5 + ".<br><br>" + msgPart6 + ", " + msgPart7 + msgIfPrevGameBad + msgPart8 + " " + msgPart9 + " " + msgPart10 + " " + msgPart11 + " " + msgPart12 + " " + msgPart13 + ".<br><br>" + msgPart14 + msgPart15 + " " + msgPart16 + msgIfQues;

    var ifOption1_msg2_part1 = ["Awesome", "I'm glad to hear", "Sweet", "Good choice", "That's great", "I appriciate it"].pickRandom();
    if (Math.random() < 0.35) {
        var ifOption1_msg2_part2 = [", thanks", ", thanks a million", ", thank you"].pickRandom();
    } else {
        var ifOption1_msg2_part2 = "";
    }


    var ifOption1_msg2_part3 = ["Firstly", "First, I'd just like to ask you", "To start off", "To start us off", "So"].pickRandom();

        internetMod.interviewRdmQuestion = [];
        // Question_gameName
        var companyNameSyn = ["your company", "the company", "{0}".format(GameManager.company.name)].pickRandom();
        var Question_gameName = ["do you have a name for {0} yet?".format(msgGameSyn), "what's {0} called?".format(msgGameSyn), "what is the codename for {0}?".format(msgGameSyn), "what should I call {0}?".format(msgGameSyn), "how should I refer to {0}?".format(msgGameSyn), "has {0} landed on a name for {1}".format(companyNameSyn, msgGameSyn), "have you figured out a name yet for {0}".format(msgGameSyn)].pickRandom();
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Question_gameTopicGenre
        var kindOfGamePart = ["what kind of game are we talking about?", "what is {0} about?".format(msgGameSyn)].pickRandom();
        var topicGenrePart = ["What is the topic/genre of the game?", "What is the game's topic/genre?"].pickRandom();
        var Question_gameTopicGenre = "{0} {1}".format(kindOfGamePart, topicGenrePart);
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Question_expectationForGame
        var msgConfidentSyn = ["confident", "sure", "convinced"].pickRandom();
        var msgThinkSyn = ["Do you think", "Do you think that", "Do you feel like", "Do you believe", "Do you believe that", "Are you {0} that".format(msgConfidentSyn), "Do you feel {0} that".format(msgConfidentSyn), "How {0} are you that".format(msgConfidentSyn)].pickRandom();
        var msgExpectationQuestion = ["what is your expectation regarding the success of '{0}'?".format(currentGame.title), "how do you feel about '{0}'?".format(currentGame.title), "how do you think '{0}' is going to fair in the gaming world?".format(currentGame.title)].pickRandom();

        var Question_expectationForGame = ["{0} {1} {2} will be well received?".format(msgExpectationQuestion, msgThinkSyn, msgGameSyn), "{0} {1} {2} will do well?".format(msgExpectationQuestion, msgThinkSyn, msgGameSyn)].pickRandom();
        // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

internetMod.interviewRdmQuestion = [Question_gameName, Question_gameTopicGenre, Question_expectationForGame];

internetMod.interviewQuestionOperations = function(questionNumber) {
  if (questionNumber == Question_gameName) {
      var currentlySyn = ["Currently", "At the moment", "Well", "Presently"].pickRandom();
      var gameWillBeCalledPart = ["{0} is called '{1}'".format(msgGameSyn, currentGame.title), "we are calling {0} '{1}'".format(msgGameSyn, currentGame.title), "{0} is under the codename '{1}'".format(msgGameSyn, currentGame.title), "we are refering to {0} as '{1}'".format(msgGameSyn, currentGame.title), "the name for {0} is '{1}'".format(msgGameSyn, currentGame.title)];
      internetMod.interviewQuestion_opt1 = gameWillBeCalledPart.pickRandom() + ".";
      internetMod.interviewQuestion_opt2 = ["I do not wish to disclose that information quite yet.", "I am not ready to announce a name for the game yet."].pickRandom();

      internetMod.interviewQuestion_opt1_ifSelected = function() {
          dataStore.data.gameNameGiven = true;
      };

      internetMod.interviewQuestion_opt2_ifSelected = function() {
        GameManager.company.flags.secrecy += 0.75;
          dataStore.data.gameNameGiven = false;
      };

      internetMod.interviewRdmQuestion.remove(Question_gameName);
      dataStore.data.Question_gameName = true;
  } else if (questionNumber == Question_gameTopicGenre) {
    if (currrentGame.secondGenre.id) {
      var questionGenre = currentGame.genre.id + "/" + currentGame.secondGenre.id;
    } else {
      var questionGenre = currentGame.genre.id;
    }
      internetMod.interviewQuestion_opt1 = ["It's a {0} game about {1}.".format(questionGenre, currentGame.topic.id), "It's a {0} involving {1}.".format(questionGenre, currentGame.topic.id)].pickRandom();
      internetMod.interviewQuestion_opt2 = ["I do not wish to say quite yet.", "For now, I'd like to keep it private."].pickRandom();

      internetMod.interviewQuestion_opt1_ifSelected = function() {
        console.log('gamegeneretopic');
      };

      internetMod.interviewQuestion_opt2_ifSelected = function() {
          GameManager.company.flags.secrecy += 0.75;
          console.log('gamegeneretopic');
      };

      internetMod.interviewRdmQuestion.remove(Question_gameTopicGenre);
      dataStore.data.Question_gameTopicGenre = true;
  } else if (questionNumber == Question_expectationForGame) {
      if (dataStore.data.gameNameGiven = true) {
          var msgGameSyn2 = ["It", "This game", "The game", "'{0}'".format(currentGame.title)].pickRandom();
      } else {
          var msgGameSyn2 = ["It", "This game", "The game"].pickRandom();
      }
      var msgWillBeSyn = ["is going to be", "will be", "is looking to be"].pickRandom();
      var msgExtentLySyn = ["absolutely", "categorically", "110%", "undeniably"]
      var msgAmazingSyn = ["amazing", "incredible", "awesome", "astounding", "spectacular", "remarkable", "phenomenal", "stunning", "fantastic"].pickRandom();
      internetMod.interviewQuestion_opt1 = "{0} {1} {2}!".format(msgGameSyn2, msgWillBeSyn, msgAmazingSyn);
      internetMod.interviewQuestion_opt2 = ["I love it myself, but the fans could always feel otherwise.", "I mean, I love it, but that doesn't mean it's going to be a hit.", "It might be a hit, it might not be a hit. I just know that I'm excited for the game.", "You'll just have to wait and see."].pickRandom();

      internetMod.interviewQuestion_opt1_ifSelected = function(decision) {
          currentGame.flags.interviewHyped = {
              decision: true,
              source: $.extend({}, GameManager.company.flags.interviewSource)
          };
          currentGame.hypePoints += Math.round(60 + 40 * GameManager.company.getRandom());
      };

      internetMod.interviewQuestion_opt2_ifSelected = function(decision) {
          currentGame.hypePoints += Math.round(20 + 20 * company.getRandom());
      };

      internetMod.interviewRdmQuestion.remove(Question_expectationForGame);
      dataStore.data.Question_expectationForGame = true;
  }
};

internetMod.getInterviewQuestion1 = function() {
  internetMod.interviewRdmQuestion1 = internetMod.interviewRdmQuestion.pickRandom();
  internetMod.emailMessage_q1 = internetMod.interviewRdmQuestion1;

  internetMod.interviewQuestionOperations(internetMod.interviewRdmQuestion1);

  internetMod.emailMessage_q1_opt1 = internetMod.interviewQuestion_opt1;
  internetMod.emailMessage_q1_opt1_ifSelected = internetMod.interviewQuestion_opt1_ifSelected;
  internetMod.emailMessage_q1_opt2 = internetMod.interviewQuestion_opt2;
  internetMod.emailMessage_q1_opt2_ifSelected = internetMod.interviewQuestion_opt2_ifSelected;
};

internetMod.getInterviewQuestion2 = function() {
  internetMod.interviewRdmQuestion2 = internetMod.interviewRdmQuestion.pickRandom();

  internetMod.interviewQuestionOperations(internetMod.interviewRdmQuestion2);

  internetMod.emailMessage_q2 = internetMod.interviewRdmQuestion2;
  internetMod.emailMessage_q2_opt1 = internetMod.interviewQuestion_opt1;
  internetMod.emailMessage_q2_opt1_ifSelected = internetMod.interviewQuestion_opt1_ifSelected;
  internetMod.emailMessage_q2_opt2 = internetMod.interviewQuestion_opt2;
  internetMod.emailMessage_q2_opt2_ifSelected = internetMod.interviewQuestion_opt2_ifSelected;
};

internetMod.getInterviewQuestion3 = function() {
  internetMod.interviewRdmQuestion3 = internetMod.interviewRdmQuestion.pickRandom();

  internetMod.interviewQuestionOperations(internetMod.interviewRdmQuestion3);

  internetMod.emailMessage_q3 = internetMod.interviewRdmQuestion3;
  internetMod.emailMessage_q3_opt1 = internetMod.interviewQuestion_opt1;
  internetMod.emailMessage_q3_opt1_ifSelected = internetMod.interviewQuestion_opt1_ifSelected;
  internetMod.emailMessage_q3_opt2 = internetMod.interviewQuestion_opt2;
  internetMod.emailMessage_q3_opt2_ifSelected = internetMod.interviewQuestion_opt2_ifSelected;
};

internetMod.getInterviewQuestion1();
internetMod.getInterviewQuestion2();
internetMod.getInterviewQuestion3();

        //    internetMod.interviewRdmQuestion.pickRandom();

        //      internetMod.checkInterviewQuestion();


    var emailMessage_ifYesToInterview = ifOption1_msg2_part1 + ifOption1_msg2_part2 + "! " + ifOption1_msg2_part3 + ", " + internetMod.emailMessage_q1;
    var secondQuestionUnderstandSyn = ["Gotcha!", "Gotcha, gotcha.", "Alright, alright, alright!", "I see ;)"].pickRandom();
    var secondQuestionAlsoSyn = ["Also", "Additionaly", "In addition"].pickRandom()
    var secondQuestionStarter = ["{0}, I'd just like ask you ".format(secondQuestionAlsoSyn), "{0}, I would like to know ".format(secondQuestionAlsoSyn), "{0}, I was just wondering ".format(secondQuestionAlsoSyn), "I was also just wondering ", "I would also like to know ", "{0}, ".format(secondQuestionAlsoSyn)].pickRandom();
    var thirdQuestionLastSyn = ["Lastly", "Last", "And last", "And lastly", "And for my final question", "Finally", "And for my last question", "For my final question"].pickRandom();
    var thirdQuestionStarter = ["{0}, I would like to know ", "And now for my final question: ", "One more question, and then I'll be out of your way:", "Just one last question before we finish: "].pickRandom();
    var emailMessage_ifNoToInterview = [];

    internetMod.AddEmail({
        id: 'gameLinkGameInterview-' + internetMod.getRandomNumber(1E5), // must be unique. Gotta add a random number to it so it is unique
        isRandomEvent: false,
        trigger: function(email) {
            return GameManager.company.currentLevel == 1; // change this
            /*&& GameManager.company.isGameProgressBetween(0.1,
                            0.4) && GameManager.company.fans > 1E4;*/
        },
        category: 'Media', // must be playerCompany, Media, Fans, or Companies
        date: '1/2/1', // change this
        from: emailFrom,
        address: emailAddress.toLowerCase(),
        subject: emailSubject,
        message: emailMessage,
        option1: 'I suppose so',
        option1_ifSelected: function() {},
        // Ends interview opportunity (might make it so that the dude comes back asking one more time if say no)
        option2: 'No thanks',
        option2_ifSelected: function() {
            GameManager.company.flags.secrecy++;
            // finish this
            if (GameManager.company.getRandom() >= 0.5) {
                var hypeChange = 0;

                hypeChange *= General.getGameSizePointsFactor(currentGame);
                if (GameManager.company.flags.secrecy > 2)
                    hypeChange *= 2;
                hypeChange = Math.round(hypeChange);

                internetMod.addHype(hypeChange);
            }
        },
        // Email received based on option
        // Message 2
        // Possible Outcome 1 (v1 = version1, v2 = version2. There has to be two versions since there are two options for each response)
        v1_message2: emailMessage_ifYesToInterview, // Question
        v1_message2_option1: internetMod.emailMessage_q1_opt1,
        v1_message2_option1_ifSelected: function() {
            internetMod.emailMessage_q1_opt1_ifSelected();
        },
        v1_message2_option2: internetMod.emailMessage_q1_opt2,
        v1_message2_option2_ifSelected: function() {
            // this might not work, fix it
            internetMod.emailMessage_q1_opt2_ifSelected();
        },
        // Dude says some crap about how he wish i woulda said yes but whatevs
        v2_message2: emailMessage_ifNoToInterview + "Fine okee",
        // Message 3
        // Possible Outcome 1
        v1_message3: secondQuestionStarter + internetMod.emailMessage_q2, // Question
        v1_message3_option1: internetMod.emailMessage_q2_opt1,
        v1_message3_option1_ifSelected: function() {
            internetMod.emailMessage_q2_opt1_ifSelected();
        },
        v1_message3_option2: internetMod.emailMessage_q2_opt2,
        v1_message3_option2_ifSelected: function() {
            internetMod.emailMessage_q2_opt2_ifSelected();
        },
        // Message 4
        // Possible Outcome 1
        v1_message4: thirdQuestionStarter + internetMod.emailMessage_q3, // Last Question Here
        v1_message4_option1: internetMod.emailMessage_q3_opt1,
        v1_message4_option1_ifSelected: function() {
            internetMod.emailMessage_q3_opt1_ifSelected();
            dataStore.data.gameLinkInterviewFinished = true;
        },
        v1_message4_option2: internetMod.emailMessage_q3_opt2,
        v1_message4_option2_ifSelected: function() {
            internetMod.emailMessage_q3_opt2_ifSelected();
            dataStore.data.gameLinkInterviewFinished = true;
        },
        // Message 5
        // Possible Outcome 1
        v1_message5: 'INTERVIEW OVER', // Say some shmeal about how the player's time is much appriciated
    });
};
};
internetMod.resetEmailsToAdd();
