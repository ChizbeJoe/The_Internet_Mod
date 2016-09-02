var internetMod = {};

(function() {
    console.log("Internet emails have loaded!");
    var emailList = [];

    internetMod.AddCustomEmail = function(email) {
        var emailMessages = $("#emailMSGList");
        emailMessages.append('<li id="' + email.id + '" class="priListItem"> <div class="rndPrItem"><img class="iconE" src="http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png">' +
            '<div id="nameE">' + email.personName + '</div>' +
            '<div id="usernameE">' + email.address + '</div><hr style="margin-top: 0px;">' +
            '<div id="subjectE">' + email.subject + '</div>' +
            '<div id="messageE">' + email.message + '</div> </li>');
        emailList.push(email);
    }

    // Example internet email message
    var internetMod_exampleEmail = function() {
        internetMod.AddCustomEmail({
            id: "email_001", // must be unique
            personName: "Jimmy Dean",
            address: "jdean@zmail.com",
            subject: "A Short Interview",
            message: "Hello! It's Jimmy dean, reporter for Zoom Magazine. Would be interested in doing a short interview that would reap BIG rewards? I'm telling ya, you and fans will love you for it. Think about it.",
            category: "Media", // must be internetCompany, Media, Fans, or Companies
            onclick: function () {
              internetMod_exampleEmail.toggle();
            }
        });
    }
    internetMod_exampleEmail();
})();
