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
var dataStore = GDT.getDataStore("InternetMod");
var internetImages = './mods/The_Internet_Mod/Img/';
internetMod.firstNames = ["Abigail", "Addison", "Alexa", "Alexis", "Alice", "Alicia", "Allison", "Alma", "Alyssa", "Amanda", "Amber", "Amelia", "Amy", "Ana", "Andrea", "Anita", "Ann", "Anna", "Anne", "Annette", "Annie", "April", "Arianna", "Arlene", "Ashley", "Aubree", "Aubrey", "Audrey", "Ava", "Avery", "Beatrice", "Becky", "Bella", "Bernice", "Bertha", "Bessie", "Beth", "Beverley", "Beverly", "Billie", "Bobbie", "Bonnie", "Brandie", "Brandy", "Brianna", "Brittany", "Brooklyn", "Bamila", "Candice", "Carla", "Carmen", "Carole", "Caroline", "Carolyn", "Carrie", "Cassandra", "Catherine", "Cathy", "Celina", "Charlene", "Charlotte", "Cherly", "Chloe", "Christina", "Christine", "Christy", "Cindy", "Claire", "Clara", "Claudia", "Colleen", "Connie", "Constance", "Courtney", "Crystal", "Daisy", "Dana", "Danielle", "Darlene", "Dawn", "Deann", "Deanna", "Debbie", "Debra", "Delores", "Denise", "Diana", "Diane", "Dianne", "Dolores", "Dora", "Doris", "Edith", "Edna", "Eileen", "Elaine", "Eleanor", "Elizabeth", "Ella", "Ellen", "Elsie", "Emily", "Emma", "Erica", "Erika", "Erin", "Esther", "Ethel", "Eva", "Evelyn", "Felecia", "Felicia", "Florence", "Frances", "Gabriella", "Gail", "Genesis", "Georgia", "Gertrude", "Gina", "Gladys", "Glenda", "Gloria", "Grace", "Gwendolyn", "Hailey", "Hannah", "Harper", "Hazel", "Heather", "Heidi", "Herminia", "Hilda", "Holly", "Ida", "Irene", "Irma", "Isabella", "Isobel", "Jackie", "Jacqueline", "Jamie", "Jane", "Janet", "Janice", "Jean", "Jeanette", "Jeanne", "Jennie", "Jennifer", "Jenny", "Jessica", "Jessie", "Jill", "Jo", "Joan", "Joann", "Joanne", "Josephine", "Joy", "Joyce", "Juanita", "Judith", "Judy", "Julia", "Julie", "June", "Katherine", "Kathryn", "Kathy", "Katie", "Katrina", "Kay", "Kaylee", "Kelly", "Kenzi", "Kim", "Kitty", "Krin", "Kristen", "Kristin", "Kristina", "Kylie", "Lauren", "Laurie", "Layla", "Leah", "Lena", "Leona", "Lesa", "Leslie", "Leta", "Letitia", "Lillian", "Lillie", "Lily", "Linda", "Lisa", "Lois", "Loretta", "Lori", "Lorraine", "Louella", "Louise", "Lucille", "Lucy", "Lydia", "Lynn", "Mabel", "Madison", "Mae", "Marcia", "Margie", "Marian", "Marie", "Marilyn", "Marion", "Marjorie", "Marlene", "Marsha", "Martha", "Mary", "Mattie", "Maureen", "Maxine", "Megan", "Meghan", "Melanie", "Melinda", "Melissa", "Mia", "Michele", "Michelle", "Mildred", "Minnie", "Miriam", "Misty", "Monica", "Myrtle", "Naomi", "Natalie", "Nellie", "Nevaeh", "Nicole", "Nina", "Noelle", "Nora", "Norma", "Olivia", "Pamela", "Patsy", "Paula", "Pauline", "Pearl", "Peggy", "Penny", "Peyton", "Phyllis", "Priscilla", "Rachel", "Ramona", "Rebecca", "Regina", "Renee", "Rhonda", "Riley", "Rita", "Roberta", "Robin", "Rosa", "Rose", "Rosemary", "Ruby", "Sally", "Samantha", "Sandra", "Sara", "Sarah", "Savannah", "Scarlett", "Serenity", "Shannon", "Sharlene", "Sheila", "Shelly", "Sherri", "Sherry", "Sofia", "Sonia", "Sophia", "Sophie", "Stacey", "Stacy", "Stella", "Stephanie", "Sue", "Susan", "Suzanne", "Sylvia", "Tamara", "Tammy", "Tanya", "Tara", "Taylor", "Teresa", "Terra", "Terri", "Terry", "Theresa", "Tiffany", "Tina", "Toni", "Tonya", "Tracey", "Tracy", "Valerie", "Vanessa", "Vera", "Veronica", "Vicki", "Vickie", "Victoria", "Violet", "Vivan", "Wanda", "Wendy", "Willie", "Wilma", "Yolanda", "Yvonne", "Zoe", "Zoey", "Aaron", "Adam", "Adrian", "Aiden", "Alan", "Albert", "Alberto", "Alex", "Alexander", "Alfred", "Alfredo", "Allan", "Allen", "Alvin", "Andre", "Andrew", "Andy", "Angel", "Anthony", "Antonio", "Armando", "Arnold", "Arron", "Arthur", "Austin", "Barry", "Ben", "Benjamin", "Bernard", "Bill", "Billy", "Bob", "Bobby", "Brad", "Bradley", "Brandon", "Brayden", "Brennan", "Brent", "Brett", "Brian", "Bruce", "Bryan", "Byron", "Caleb", "Calvin", "Cameron", "Carl", "Carlos", "Carter", "Chad", "Charles", "Charlie", "Chester", "Chris", "Christian", "Christopher", "Clarence", "Claude", "Clayton", "Clifford", "Clifton", "Clinton", "Clyde", "Cody", "Connor", "Corey", "Cory", "Craig", "Curtis", "Dale", "Dan", "Daniel", "Danny", "Darrell", "Darren", "Darryl", "Daryl", "Dave", "David", "Dean", "Dennis", "Derek", "Derrick", "Devon", "Don", "Donald", "Douglas", "Duane", "Dustin", "Dwayne", "Dwight", "Dylan", "Earl", "Eddie", "Edgar", "Eduardo", "Edward", "Edwin", "Eli", "Elijah", "Eric", "Erik", "Ernest", "Ethan", "Eugene", "Evan", "Everett", "Felix", "Fernando", "Flenn", "Floyd", "Francis", "Francisco", "Frank", "Franklin", "Fred", "Freddie", "Frederick", "Gabe", "Gabriel", "Gary", "Gavin", "Gene", "George", "Gerald", "Gilbert", "Glen", "Gordon", "Greg", "Gregory", "Harold", "Harry", "Harvey", "Hector", "Henry", "Herbert", "Herman", "Howard", "Hugh", "Hunter", "Ian", "Isaac", "Isaiah", "Ivan", "Jack", "Jackson", "Jacob", "James", "Jamie", "Jared", "Jason", "Jayden", "Jeff", "Jeffery", "Jeffrey", "Jeremiah", "Jeremy", "Jerome", "Jerry", "Jesse", "Jessie", "Jim", "Jimmie", "Jimmy", "Joe", "Joel", "John", "Johnni", "Johnny", "Jon", "Jonathan", "Jordan", "Jorge", "Jose", "Joseph", "Joshua", "Juan", "Judd", "Julian", "Julio", "Justin", "Karl", "Keith", "Kelly", "Ken", "Kenneth", "Kent", "Kevin", "Kirk", "Kurt", "Kyle", "Lance", "Landon", "Larry", "Lawrence", "Lee", "Leo", "Leon", "Leonard", "Leroy", "Leslie", "Lester", "Lewis", "Liam", "Lloyd", "Logan", "Lonnie", "Louis", "Lucas", "Luis", "Luke", "Manuel", "Marc", "Marcus", "Mario", "Marion", "Mark", "Marshall", "Martin", "Marvin", "Mason", "Mathew", "Matthew", "Maurice", "Max", "Melvin", "Michael", "Micheal", "Miguel", "Mike", "Milton", "Mitchell", "Morris", "Nathan", "Nathaniel", "Neil", "Nelson", "Nicholas", "Noah", "Norman", "Oscar", "Owen", "Pat", "Patrick", "Paul", "Pedro", "Perry", "Peter", "Philip", "Phillip", "Rafael", "Ralph", "Ramon", "Randall", "Randy", "Raul", "Ray", "Raymond", "Reginald", "Ricardo", "Richard", "Rick", "Ricky", "Robert", "Roberto", "Rodney", "Roger", "Roland", "Ron", "Ronald", "Ronnie", "Ross", "Roy", "Ruben", "Russell", "Ryan", "Salvador", "Samuel", "Scott", "Sean", "Sebastian", "Sergio", "Seth", "Shane", "Shawn", "Soham", "Stanley", "Stephen", "Steve", "Steven", "Ted", "Terrance", "Terrence", "Terry", "Theodore", "Thomas", "Tim", "Timmothy", "Todd", "Tom", "Tommy", "Tony", "Tracy", "Travis", "Tristan", "Troy", "Tyler", "Tyrone", "Vernon", "Victor", "Vincent", "Wade", "Wallace", "Walter", "Warren", "Wayne", "Wesley", "Willard", "William", "Willie", "Wyatt", "Zachary", "Zack"];
internetMod.lastNames = ["Adams", "Alexander", "Allen", "Alvarez", "Anderson", "Andrews", "Armstrong", "Arnold", "Austin", "Bailey", "Baker", "Banks", "Barnes", "Barnett", "Barrett", "Bates", "Beck", "Bell", "Bennett", "Berry", "Bishop", "Black", "Bowman", "Boyd", "Bradley", "Brewer", "Brooks", "Brown", "Bryant", "Burke", "Burns", "Burton", "Butler", "Byrd", "Caldwell", "Campbell", "Carlson", "Carpenter", "Carr", "Carroll", "Carter", "Castillo", "Castro", "Chambers", "Chapman", "Chavez", "Clark", "Cole", "Coleman", "Collins", "Cook", "Cooper", "Cox", "Craig", "Crawford", "Cruz", "Cunningham", "Curtis", "Daniels", "Davidson", "Davis", "Day", "Dean", "Diaz", "Dixon", "Douglas", "Duncan", "Dunn", "Edwards", "Elliott", "Ellis", "Evans", "Ferguson", "Fernandez", "Fields", "Fisher", "Fleming", "Fletcher", "Flores", "Ford", "Foster", "Fowler", "Fox", "Franklin", "Frazier", "Freeman", "Fuller", "Garcia", "Gardner", "Garrett", "Garza", "George", "Gibson", "Gilbert", "Gomez", "Gonzales", "Gonzalez", "Gordon", "Graham", "Grant", "Graves", "Gray", "Green", "Gregory", "Griffin", "Gutierrez", "Hale", "Hall", "Hamilton", "Hansen", "Hanson", "Harper", "Harris", "Harrison", "Hart", "Harvey", "Hawkins", "Hayes", "Henderson", "Henry", "Hernandez", "Herrera", "Hicks", "Hill", "Hoffman", "Holland", "Holmes", "Holt", "Hopkins", "Horton", "Howard", "Howell", "Hudson", "Hughes", "Hunt", "Hunter", "Jackson", "Jacobs", "James", "Jenkins", "Jennings", "Jensen", "Jimenez", "Johnson", "Johnston", "Jones", "Jordan", "Kelley", "Kelly", "Kennedy", "Kim", "King", "Knight", "Kuhn", "Lambert", "Lane", "Larson", "Lawrence", "Lawson", "Lee", "Lewis", "Little", "Long", "Lopez", "Lowe", "Lucas", "Lynch", "Marshall", "Martin", "Martinez", "Mason", "Matthews", "May", "Mccoy", "Mcdonalid", "Mckinney", "Medina", "Mendoza", "Meyer", "Miles", "Miller", "Mills", "Mitchell", "Mitchelle", "Montgomery", "Moore", "Morales", "Moreno", "Morgan", "Morris", "Morrison", "Murphy", "Murray", "Myers", "Neal", "Nelson", "Newman", "Nguyen", "Nichols", "Obrien", "Oliver", "Olson", "Ortiz", "Owens", "Palmer", "Parker", "Patterson", "Payne", "Pearson", "Peck", "Pena", "Perez", "Perkins", "Perry", "Peters", "Peterson", "Phillips", "Pierce", "Porter", "Powell", "Prescott", "Price", "Ramirez", "Ramos", "Ray", "Reed", "Reid", "Reyes", "Reynolds", "Rhodes", "Rice", "Richards", "Richardson", "Riley", "Rivera", "Roberts", "Robertson", "Robinson", "Rodriguez", "Rodriquez", "Rogers", "Romero", "Rose", "Ross", "Ruiz", "Russell", "Ryan", "Sanchez", "Sanders", "Schmidt", "Scott", "Shaw", "Shelton", "Silva", "Simmmons", "Simmons", "Simpson", "Sims", "Smith", "Snyder", "Soto", "Spencer", "Stanley", "Steeves", "Stephens", "Stevens", "Steward", "Stewart", "Stone", "Sullivan", "Sutton", "Taylor", "Terry", "Thomas", "Thompson", "Torres", "Tucker", "Turner", "Vargas", "Vasquez", "Wade", "Wagner", "Walker", "Wallace", "Walters", "Ward", "Warren", "Washington", "Watkins", "Watson", "Watts", "Weaver", "Webb", "Welch", "Wells", "West", "Wheeler", "White", "Williams", "Williamson", "Willis", "Wilson", "Wood", "Woods", "Wright", "Young"];
internetMod.emailAddressSites = ["@zmail.com", "@bizmail.com", "@mailout.com", "@xyzmail.com"];

internetMod.produceRandomFullName = function() {
    return internetMod.firstNames.pickRandom() + ' ' + internetMod.lastNames.pickRandom();
};

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
        if (d.year == 25 && d.month == 9 && d.week == 2) {
            GameManager.company.flags.visoriusAnnounced = true;
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
        $("#iNotifs").html("0");
        $("#emailMSGList").html("");
    };

    internetMod.startNewGame = function() {
        internetMod.reset();
    };

    internetMod.save = function() {
        // internetMod.emailListToAdd is the one that has to be used because that is where the random date is made, and different saves get different dates
        GDT.getDataStore("InternetMod").data["emailsToAdd"] = internetMod.emailListToAdd;
    };

    internetMod.load = function() {
        internetMod.emailList = []; // I cleared this cause internetMod.emailListToAdd should add it back; however, internetMod.emailListToAdd doesn't add the emails to internetMod.emailList after load for some reason
        internetMod.emailListToAdd = GDT.getDataStore("InternetMod").data["emailsToAdd"];
        // Need to figure out how to add email HTML on load
        // However, I got an error when trying to use internetMod.AddEmailToHTMLPage
    };

    GDT.on(GDT.eventKeys.saves.loading, internetMod.load);
    GDT.on(GDT.eventKeys.saves.saving, internetMod.save);


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


    //  GDT.on(GDT.eventKeys.gameplay.afterReleaseGame, internetMod.resetQuestionData);
    //GDT.on(GDT.eventKeys.saves.loading, internetMod.load);
    //  GDT.on(GDT.eventKeys.saves.saving, internetMod.save);
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
            } else if (email.trigger && email.trigger(GameManager.company) && email.date && GameManager.company.isLaterOrEqualThan(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]))) {
                internetMod.emailPushDefaults(email);
                $('#emailDate').text('' + email.date + '');
                console.log('The event was pushed by date');
            }
        }

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


// Opens Email Site from Notif Button
internetMod.emailNotifOPEN = function() {
    internetMod.startSlideshow();
    $("#loaders").hide();
    $("#newsSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#emailSITE").show();
    $("#internetContainer").show();
    GameManager.pause(true);
    internetMod.createGameDevUI();
    // addReplyBulk.Pause();
};

// Shows the internet window
internetMod.ShowWindow = function() {
    $("#emailSITE").hide();
    $("#forumSITE").hide();
    $("#socialSITE").hide();
    $("#bugSITE").hide();
    $("#loaders").hide();
    $("#internetContainer").show();
    internetMod.startSlideshow();
    internetMod.createGameDevUI();
};

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
    $(".announceChild3").empty();
};
