internetMod.createGameDevUI = function() {
var content = $(".announceChild3");
		content.empty();

		content.append('<div id="internetModAnnouncerContent"></div>');
		content.append('<div id="internetModTopicChooser"></div>');
		content.append('<div id="internetModGenreChooser"></div>');
		content.append('<div id="internetModPlatformChooser"></div>');
		$("#internetModTopicChooser").hide();
		$("#internetModGenreChooser").hide();
		$("#internetModPlatformChooser").hide();

		// prob shouldnt be global so i made it a var
		var content = $("#internetModAnnouncerContent");

		var template = $("#gameDefinitionContentTemplate").clone();
		template.find("#gameTitle").remove();

		template.find(".pickTopicButton").clickExcl(function () {
			internetMod.pickTopicClick();
		});
		template.find("#pickGenreButton").clickExcl(function () {
			internetMod.pickGenreClick();
		});
		template.find("#pickSecondGenreButton").clickExcl(function () {
			UI.pickSecondGenreClick()
		});
		template.find(".pickPlatformButton").clickExcl(function () {
			internetMod.pickPlatformClick($(this))
		});

		if (GameManager.company.canDevelopMediumGames()) {
			if (!GameManager.company.canDevelopLargeGames())
				template.find(".gameSizeLarge").hide();
			if (!GameManager.company.canDevelopAAAGames())
				template.find(".gameSizeAAA").hide()
		} else
			template.find("#gameSizeGroup").hide();
		if (!GameManager.company.canDevelopMMOGames())
			template.find(".gameGenreMMO").hide();
		//if (!GameManager.company.canUseMultiGenre())
			template.find("#pickSecondGenreButton").hide();
		/*else {
			template.find("#pickSecondGenreButton").css("margin-left", "2.5px").css("margin-right", "2.5px").css("width", "145px");
			template.find("#pickGenreButton").css("margin-left",
				"2.5px").css("margin-right", "2.5px").css("width", "145px")
		}*/
		if (GameManager.company.canDevelopMultiPlatform())
			template.find(".pickPlatformButton").css("margin-left", "2.5px").css("margin-right", "2.5px").css("width", "145px");
		else
			template.find(".pickPlatformButton").slice(1).hide();
		if (!GameManager.company.canSetTargetAudience())
			template.find("#targetRating").hide();


		template.find(".pickEngineButtonWrapper").hide();
		template.find(".ratingLabel").hide();

		template.find(".gameDefSelection").clickExcl(function () {
			Sound.click();
			var e = $(this);
				e.parent().find(".gameDefSelection").removeClass("selected");
				e.addClass("selected");
		});

		$("#gameDefinition").find(".dialogNextButton").clickExcl(function () {
			$("#gameDefinition").find(".dialogNextButton").effect("shake", {
				times : 2,
				distance : 5
			}, 50)
		});
		var allGraphicTypeIds = Research.getAllItems().filter(function (f) {
				return f.group ===
				"graphic-type"
			}).map(function (f) {
				return f.id
			});
		$("#gameDefinition").find(".dialogBackButton").clickExcl(function () {
			Sound.click();
			UI._saveSelectedGameFeatureSettings(function (id) {
				return allGraphicTypeIds.indexOf(id) != -1
			});
			$("#gameDefinition").find(".dialogScreen1").transition({
				"margin-left" : 0
			});
			$("#gameDefinition").find(".dialogScreen2").transition({
				"margin-left" : "100%"
			})
		});


		//Create Publisher Contract PROB DONT NEED THIS
		template.append("<div style='width:302px;margin:auto;'><div id='CompetitorModPublisherOKButton' class=' baseButton orangeButton windowLargeOkButton'>Create Publisher Contract</div></div>");
		template.find("#CompetitorModPublisherOKButton").clickExcl(function () {
			Sound.click();
			var succes = internetMod.createContract();
			if(succes == true){
				$("#CompetitorModPublisherContainer").dialog("close");
			}else{
				$("#CompetitorModPublisherOKButton").effect("shake", {
					times : 2,
					distance : 5
				}, 50)
			}

		});

		okClicked = false;
		PlatformShim.execUnsafeLocalFunction(function () {
			content.append(template);
			$("#internetModAnnouncerContent").show();
			$("#CompetitorModPublisherTitle").show();
		})

		internetMod.pickTopicClick = function (element) {
		Sound.click();
		var container = $("#internetModTopicChooser");

		if (element) {
			var pickTopicButton = $("#internetModAnnouncerContent").find(".pickTopicButton");
			var names = element.innerText.split("\n");
			pickTopicButton.get(0).innerText = names[0];
			pickTopicButton.removeClass("selectorButtonEmpty");

			$("#internetModAnnouncerContent").show();
			$("#CompetitorModPublisherTitle").show();
			$("#internetModTopicChooser").hide();
			return;
		}
		PlatformShim.execUnsafeLocalFunction(function () {
			var modal = $(".simplemodal-data");
			modal.find(".overlayTitle").text("Pick Topic".localize("heading"));
			container.empty();
			var activeTopictemplate = '<div class="selectorButton whiteButton" onclick="internetMod.pickTopicClick(this)">{{name}}</div>';
			var lockedTopicTemplate = '<div class="selectorButton disabledButton">{{name}}</div>';
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
				var isInResearch = GameManager.currentResearches.filter(function (f) {
						return f.topicId === topic.id
					}).length > 0;
				var isEnabled = isAvailable;
				var template = isEnabled ? activeTopictemplate :
					lockedTopicTemplate;
				var isNameHidden = (!isEnabled && (!isAvailable && !isInResearch)) || !isEnabled;
				if (!isNameHidden)
					if (GameManager.areHintsEnabled() && Knowledge.hasTopicAudienceWeightingKnowledge(GameManager.company, topic)) {
						var enabledDisabledContent = !isEnabled ? " disabledButton" : '" onclick="internetMod.pickTopicClick(this)';
						var whiteButton = !isEnabled ? " " : " whiteButton ";
						var t = '<div class="selectorButton' + whiteButton + "pickTopicButtonAudienceHintVisible" + enabledDisabledContent + '"><span style="position:relative;top:5px;">{0}<span style="font-size:11pt;"><br/>{1}</span></span></div>';
						template = t.format(topic.name, Knowledge.getTopicAudienceHtml(GameManager.company, topic))
					} else
						template = template.replace("{{name}}", topic.name);
				else
					template = template.replace("{{name}}", "?");
				var element = $(template);
				element.css("position", "relative");
				element.css("display", "inline-block");
				//element.css("top", 50 * row + row * 10);
				//element.css("left", (currentCount - 1) * 190 + 10);
				element.css("font-size", UI.pickTopicFontSize + "pt");
				container.append(element);
				if (!isAvailable && !isInResearch)
					researchVisibleCount++
			}
			modal.find(".selectionOverlayContainer").fadeIn("fast")

			$("#internetModAnnouncerContent").hide();
			$("#CompetitorModPublisherTitle").hide();
			$("#internetModTopicChooser").show();
		})
	};


	internetMod.pickGenreClick = function (element) {
		Sound.click();
		var container = $("#internetModGenreChooser");

		if (element) {
			var pickGenreButton = $("#internetModAnnouncerContent").find("#pickGenreButton");
			pickGenreButton.get(0).innerText = element.innerText;
			pickGenreButton.removeClass("selectorButtonEmpty");

			$("#internetModAnnouncerContent").show();
			$("#CompetitorModPublisherTitle").show();
			$("#internetModGenreChooser").hide();
			return
		}
		PlatformShim.execUnsafeLocalFunction(function () {
			var modal = $(".simplemodal-data");
			modal.find(".overlayTitle").text("Pick Genre".localize("heading"));
			container.empty();
			var template = '<div class="selectorButton" onclick="internetMod.pickGenreClick(this)">{{name}}</div>';
			var genres = General.getAvailableGenres(GameManager.company);
			//var second = modal.find("#pickSecondGenreButton").get(0).innerText;
			var topMarginAdded = false;
			for (var i = 0; i < genres.length; i++) {
				//if (second == genres[i].name)
				//	continue;
				var genre = genres[i];
				var element = $(template.replace("{{name}}", genre.name));
				element.css("margin-left", 210);
				if (!topMarginAdded) {
					element.css("margin-top", 90);
					topMarginAdded = true
				}
				element.addClass("whiteButton");
				container.append(element)
			}
			modal.find(".selectionOverlayContainer").fadeIn("fast")

			$("#internetModAnnouncerContent").hide();
			$("#CompetitorModPublisherTitle").hide();
			$("#internetModGenreChooser").show();
		})
	};

	internetMod.pickPlatformClick = function (platformName,platformId) {
		Sound.click();
		var container = $("#internetModPlatformChooser");


		if (platformName && platformId) {
			var pickplatformButton = $("#internetModAnnouncerContent").find(".pickPlatformButton");
			pickplatformButton.get(0).innerText = platformName;
			pickplatformButton.removeClass("selectorButtonEmpty");

			$("#internetModAnnouncerContent").show();
			// $("#CompetitorModPublisherTitle").show();
			 $("#internetModPlatformChooser").hide();
			 console.log('test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
			return;
		}


		PlatformShim.execUnsafeLocalFunction(function () {
			var modal =$(".simplemodal-data");
			modal.find(".overlayTitle").text("Pick Platform".localize("heading"));

			container.empty();
			var platforms = Platforms.getPlatformsOnMarket(GameManager.company);
			var game = GameManager.company.currentGame;

			platforms = platforms.slice().sort(function (a, b) {
					return Platforms.getTotalMarketSizePercent(b, GameManager.company) - Platforms.getTotalMarketSizePercent(a,
						GameManager.company)});

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
					var content = Knowledge.getPlatformAudienceHintHtml(GameManager.company, platform);
					if (content)
						element.find(".audienceHints").html(content);
					var content = Knowledge.getPlatformGenreHintHtml(GameManager.company, platform);
					if (content)
						element.find(".genreHints").html(content)
				}
				(function (element) {
					if (isEnabled) {
						element.addClass("whiteButton");
						element.on("click", function () {
							internetMod.pickPlatformClick(element.platformName,element.platformId)
						})
					} else if (platform.licencePrize <= GameManager.company.cash) {
						element.addClass("whiteButton");
						element.on("click", function () {
							var that = this;
							UI.buyPlatform($(that).find(".platformTitle").get(0).innerText, function (e) {
								if (e)
									internetMod.pickPlatformClick(element.platformName,element.platformId)
							})
						})
					} else
						element.addClass("disabledButton")
				})(element);
				container.append(element)
			}
			modal.find(".selectionOverlayContainer").fadeIn("fast")

			$("#internetModAnnouncerContent").hide();
			$("#CompetitorModPublisherTitle").hide();
			$("#internetModPlatformChooser").show();
		})
	};
};
