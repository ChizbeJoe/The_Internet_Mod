var internetMod = {};

(function() {
    internetMod.modPath = GDT.getRelativePath();

    // Currently, the fonts are installed over the internet; however, I will eventually make it so it is in the mod folder.
    $("head").append('<link rel="stylesheet" type="text/css" href="./mods/The_Internet_Mod/css/internetMod.css"><link href="https: //fonts.googleapis.com/css?family=Open+Sans:400,300,700,600,400italic,800" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Lato:400,300,100,700,900,400italic" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">');


    var ready = function() {
        console.log("The Internet Mod has succesfully loaded");
    };

    var error = function() {
        alert("Failed to load The Internet Mod");
        console.log("The Internet Mod has failed to load");
    };


    GDT.loadJs([
        'Code/internetBulk.js',
    ], ready, error);

})();
