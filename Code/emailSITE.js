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
        subject: 'Your Game, Our Movie',
        message: 'Hello,<br><br>I recently played your new game: so well balanced, great gameplay, just beautiful. The story was riventing, and that is where I come in... :) <br><br>I am an upincoming movie director with 8+ years of experience. Many video games turned into movies have been financial successes but tend to fall apart with bad plot and little effort. <br><br><b>Well, I would like to have the best of both worlds.</b><br><br>I guarntee if you license me your movie rights, I will make your gaming sensation a flim sensation. What do ya say?', // Like in html, use <br> to make a line break
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

// Example internet email message (maybe should use this for flutter)
var Email_gameLinkInterview = function() {
    var currentGame = GameManager.company.currentGame;
    var lastGame = GameManager.company.gameLog.last();
    if (lastGame.secondGenre) {
        var lastGameGenre = lastGame.genre.id + "/" + lastGame.secondGenre.id;
    } else {
        var lastGameGenre = lastGame.genre.id;
    }

    var randomIdNumber = Math.floor(1E4 * Math.random());
    var idNumberString = randomIdNumber.toString();

    // Randomly generated email details
    var emailFirstName = internetMod.firstNames.pickRandom();
    var emailLastName = internetMod.lastNames.pickRandom();
    var emailFrom = emailFirstName + ' ' + emailLastName;
    var emailAddress = emailFirstName.substr(0, 1) + emailLastName.substr(0, 4) + idNumberString + '@gamelink.com';
    var emailSubject = ["A Simple Interview", "Your Next Game", "What's Lined Up?", "Gamelink Exclusive Interview", "Just A Few Questions", "Your Game, My Questions", "Questions About Your Game", "Up For An Interview?", "An Interview For Gamelink", "Fans Want The Details", "Some Questions, Many Benefits", "What Else Ya Got?", "What's In The Works?", "Interview Time!"].pickRandom();

    // Randomly generated email interview message
    var msgPart1 = ["Hey", "Hi", "Howdy", "Hello", "Hiya", "Yo"].pickRandom() + ",";
    var msgPart2 = ["My name is " + emailFrom + ". I'm a journalist for Game Link News", "I'm an eager journalist working for Game Link News", "Being a journalist for Game Link News, I am hoping you could help me out a little", "I, " + emailFrom + ", am a journalist for a gaming newspaper", "I work for a gaming newspaper. You can call me " + emailFirstName + ""].pickRandom();
    var msgPart3 = ["Your last game, '" + lastGame.title + "', was", "'" + lastGame.title + "', the last game you released, was", "I played '" + lastGame.title + "', and it was", "I wrote an article about your last game, '" + lastGame.title + "', and felt that it was"].pickRandom();

    if (lastGame.score >= 10) {
        var msgPart4 = ["one of the best games I have played to date", "a pure masterpiece", "nothing short of absolutely perfect", "a game-changing, life-changing, bar-raising work of art"].pickRandom();
    } else if (lastGame.score >= 7) {
        var msgPart4 = ["very well-made", "one of those games that just got it right", "one of my favorite " + lastGameGenre + "s out there"].pickRandom();
    } else if (lastGame.score > 5) {
        var msgPart4 = ["alright for the most part", "pretty decent overall", "not that bad", "one of those games I enjoyed but soon forgot about, haha", "a decent experience for what it was", "something that had the potential to be good"].pickRandom();
    } else {
        var msgPart4 = ["not that great... I mean... yeah, not great", "something that could've used a little more work :/", "ultimately forgettable", "something that, in the end, fell flat"].pickRandom();
    }

    var executedDevMissions = lastGame.featureLog.filter(function(m) {
        return m.missionType === "mission"
    });

    var optimalMissionFocus = executedDevMissions.filter(function(m) {
        var percentage = m.duration / General.getGameSizeDurationFactor(lastGame.gameSize) / General.getMultiPlatformDurationFactor(lastGame) / (Missions.BASE_DURATION * 3);
        return Missions.getGenreWeighting(m, lastGame) >= 0.9 && percentage >= 0.4
    });

    var focusedOnThings = optimalMissionFocus.map(function(m) {
        return Missions.getMissionWithId(m.id)
    }).pickRandom().name;

    if (optimalMissionFocus.length >= 1) {
        var msgPart5 = ["Your focus on {0} worked really well for the game".format(focusedOnThings), "The {0} in the game worked quite well".format(focusedOnThings)].pickRandom();
    }

    var msgPart6 = ["Anyways", "Well", "Now", "Keeping that in mind"].pickRandom();
    var msgPart7 = ["I think that", "I feel like", "I can assure you that", "it is apparent that", "I can confidently say that"].pickRandom();
    if (lastGame.score < 7) {
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
    var msgGameSyn = ["it", "this next game you're working on", "the coming game"].pickRandom();
    var msgPart16 = ["answer " + msgQuestionSyn + " about " + msgGameSyn + "", "simply answer " + msgQuestionSyn + " about " + msgGameSyn + "", "conduct a short interview about " + msgGameSyn + ""].pickRandom();
    if (msgPart15 == "would you be willing" || msgPart15 == "if you're cool with it, could you") {
        var msgIfQues = "?";
    } else {
        var msgIfQues = "."
    }

    var emailMessage = msgPart1 + "<br><br>" + msgPart2 + ".<br><br>" + msgPart3 + " " + msgPart4 + ". " + msgIfPrevGameBad2 + msgPart5 + ".<br><br>" + msgPart6 + ", " + msgPart7 + msgIfPrevGameBad + msgPart8 + " " + msgPart9 + " " + msgPart10 + " " + msgPart11 + " " + msgPart12 + " " + msgPart13 + ".<br><br>" + msgPart14 + msgPart15 + " " + msgPart16 + msgIfQues;

    var msgRdmQuestion = [];

    var ifOption1_msg2_part1 = ["Awesome", "I'm glad to hear", "Sweet", "Good choice", "That's great", "I appriciate it"].pickRandom();
    if (Math.random() < 0.35) {
        var ifOption1_msg2_part2 = [", thanks", ", thanks a million", ", thank you"].pickRandom();
    } else {
        var ifOption1_msg2_part2 = "";
    }


    var ifOption1_msg2_part3 = ["Firstly", "First, I'd just like to ask you", "To start off", "To start us off", "So"].pickRandom();

    var msgConfidentSyn = ["confident", "sure", "convinced"].pickRandom();
    var msgThinkSyn = ["Do you think", "Do you think that", "Do you feel like", "Do you believe", "Do you believe that", "Are you {0} that".format(msgConfidentSyn), "Do you feel {0} that".format(msgConfidentSyn), "How {0} are you that".format(msgConfidentSyn)].pickRandom();
    var msgExpectationQuestion = ["what is your expectation regarding the success of '{0}'?".format(currentGame.title), "how do you feel about '{0}'?".format(currentGame.title), "how do you think '{0}' is going to fair in the gaming world?".format(currentGame.title)].pickRandom();

    // Add more
    var Question_expectationForGame = ["{0} {1} {2} will be well received?".format(msgExpectationQuestion, msgThinkSyn, msgGameSyn), "{0} {1} {2} will do well?".format(msgExpectationQuestion, msgThinkSyn, msgGameSyn)].pickRandom();

    if (internetMod.dataStore.data.expectationForGame != true) {
        msgRdmQuestion.push(Question_expectationForGame);
    }

    msgRdmQuestion.pickRandom();

    if (msgRdmQuestion = Question_expectationForGame) {
        // Option 1
        var msgGameSyn2 = ["It", "This game", "The game", "'{0}'".format(currentGame.title)].pickRandom();
        var msgWillBeSyn = ["is going to be", "will be", "is looking to be"].pickRandom();
        var msgAmazingSyn = ["amazing", "incredible", "awesome", "astounding", "spectacular", "remarkable", "phenomenal", "stunning", "fantastic"].pickRandom();
        var option1_ifYesToInterview_1 = "{0} {1} {2}!".format(msgGameSyn2, msgWillBeSyn, msgAmazingSyn);
        var option2_ifYesToInterview_1 = ["I love it myself, but the fans could always feel otherwise.", "I mean, I love it, but that doesn't mean it's going to be a hit.", "It might be a hit, it might not be a hit. I just know that I'm excited for the game."].pickRandom();
        var v1_interviewQuestion_opt1 = function(decision) {
            currentGame.flags.interviewHyped = {
                decision: true,
                source: $.extend({}, GameManager.company.flags.interviewSource)
            };
            currentGame.hypePoints += Math.round(60 + 40 * GameManager.company.getRandom());
        };

        // Option 2

        var v1_interviewQuestion_opt2 = function(decision) {
            currentGame.hypePoints += Math.round(20 + 20 * company.getRandom());
        };

        internetMod.dataStore.data.expectationForGame = true;
    }

    var emailMessage_ifYesToInterview = ifOption1_msg2_part1 + ifOption1_msg2_part2 + "! " + ifOption1_msg2_part3 + ", " + msgRdmQuestion;
    var emailMessage_ifNoToInterview = [];

    internetMod.AddEmail({
        id: 'gameLinkInterview-' + idNumberString, // must be unique. Gotta add a random number to it so it is unique
        isRandomEvent: false,
        trigger: function(email) {
            return GameManager.company.currentLevel >= 2 && GameManager.company.isGameProgressBetween(0.2,
                0.9) && GameManager.company.fans > 1E4;
        },
        category: 'Media', // must be playerCompany, Media, Fans, or Companies
        date: '',
        from: emailFrom,
        address: emailAddress.toLowerCase(),
        subject: emailSubject,
        message: emailMessage,
        option1: 'I suppose so',
        //    option1_ifSelected: function() {},
        option2: 'No thanks',
        //    option2_ifSelected: function() {},
        // Email received based on option
        // Message 2
        // Possible Outcome 1 (v1 = version1, v2 = version2. There has to be two versions since there are two options for each response)
        v1_message2: emailMessage_ifYesToInterview,
        v1_message2_option1: option1_ifYesToInterview_1,
        v1_message2_option1_ifSelected: function() {
            v1_interviewQuestion_opt1();
        },
        v1_message2_option2: option2_ifYesToInterview_1,
        v1_message2_option2_ifSelected: function() {
            v1_interviewQuestion_opt2();
        },
        // Possible Outcome 2
        v2_message2: emailMessage_ifNoToInterview,
        v2_message2_option1: 'Alright, fine',
        v2_message2_option1_ifSelected: function() {},
        v2_message2_option2: 'Sorry, no',
        v2_message2_option2_ifSelected: function() {},
        // Message 3
        // Possible Outcome 1
        v1_message3: emailMessage_ifYesToInterview,
        v1_message3_option1: option1_ifYesToInterview_1,
        v1_message3_option1_ifSelected: function() {
            internetMod.addMoney(-50000000, 'Movie Actors/Actress');
        },
        v1_message3_option2: option2_ifYesToInterview_1,
        v1_message3_option2_ifSelected: function() {
            internetMod.addMoney(-150000, 'Movie Actors/Actress');
        },
        // Possible Outcome 2
        v2_message3: emailMessage_ifYesToInterview,
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
};
GDT.on(GDT.eventKeys.gameplay.beforeReleaseGame, Email_gameLinkInterview);
