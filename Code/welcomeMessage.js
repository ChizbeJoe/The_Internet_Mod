var internetMod = {};

var internetLogo = [GDT.getRelativePath() + '/../../Icon/internetLogo.png']

GDT.addEvent({
	id: "welcomeMessage",
	date: "1/1/2",
	getNotification: function(company){ 
	    return new Notification({
	        header: "The Internet Mod",
	        text: "Many thanks for using The Internet Mod! Please be aware that the mod is still a work-in-progress and has a long way to go. If you have any questions, visit the GHG Forum thread: https://forum.greenheartgames.com/t/an-unfinished-project-take-a-look/21222",
	        image : internetLogo,
			buttonText: ":)",
	        
	    })
	}
})