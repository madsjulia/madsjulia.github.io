$(document).ready(function(){
	consolelog('main-end ready');
	$.history.init(function (hash) {
		consolelog('main-end history');
		if( hash == "" )
		{
			consolelog('main-end history init (no hash) = '+ window.location.href);
			$("#slideshow").show('slow', function() {$("#contentholder").hide('slow');});	
		}
		else
		{
			consolelog('main-end history restore = ' + window.location.href + ' hash ' + hash);
			loadpage(hash);
		}
    },
    { unescape: ",/" });
});