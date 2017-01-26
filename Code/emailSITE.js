// Example internet email message
var internetMod_tutorialEmail = function() {
    internetMod.AddEmail({
        id: 'testEmail', // must be unique
        isRandomEvent: false,
        trigger: function(email) {
            return GameManager.company.currentLevel == 1;
        },
        category: 'Media', // must be playerCompany, Media, Fans, or Companies
        date: '1/1/4', // When it comes to date and trigger, I want to be able to remove one or the other without there being a GDT event handler issue.
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

// Example internet email message
var internetMod_testEmail = function() {
    internetMod.AddEmail({
        id: 'testEmail', // must be unique
        isRandomEvent: false,
        trigger: function(email) {
            return GameManager.company.currentLevel == 1;
        },
        category: 'Media', // must be playerCompany, Media, Fans, or Companies
        date: '1/2/1', // When it comes to date and trigger, I want to be able to remove one or the other without there being a GDT event handler issue.
        from: 'Jimmy Dean',
        address: 'jdean@zmail.com',
        subject: 'Test Email',
        message: 'Test', // Like in html, use <br> to make a line break
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
internetMod_testEmail();
