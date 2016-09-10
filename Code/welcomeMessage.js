/*
GDT.addEvent({
    id: "init_internet_Email",
    date: "1/1/2",
    getNotification: function(company) {
        return new Notification({
            header: "Email Service",
            text: 'There is a new service available called "Email" that allows users to communicate on a computer. {n}Technology is truly pushing the limits, and Email certainly expands on global interaction.',
            buttonText: "OK"
        })
    },
    complete: function(decision) {
        var company = GameManager.company;
        if (decision === 0) {
            company.activeNotifications.addRangeAt(0, new Notification("Email Service".localize("heading"), "Email will be implemented in a week or two.".localize()));
            company.notifications.push(new Notification({
                header: "Internet Service",
                text: "New internet service available: Email",
                weeksUntilFired: 1
            }));

        }
    }
});
*/
