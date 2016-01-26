if( typeof consolelog != 'function' )
{
	function consolelog(str) {
		if(this.console && typeof console.log != "undefined")
			console.log(str);
	}
}

function loadpage(hash) {
	hash_split = hash.replace('#', '').split("_");	
	filename = hash_split[0] + ".html";
	consolelog('Function loadpage: filename='+filename);
	var response = jQuery.ajax({
		url: filename,
		type: 'HEAD',
		async: false,
		success: function(){
			$("#pagecontent").load(filename);
		},  
		error: function(){
			consolelog('Function loadpage: page not found='+filename);
		}
	});
	
}

function onload()
{
	if(window.location.hash) {
		var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
		consolelog('Function onload: hash='+hash);
		var hashsplit = hash.split("_");
		var filename = hashsplit[0];
		var hash2 = hashsplit[1];
		consolelog('Function onload: hash split: filename= '+filename+" hash= "+hash2);
		if( filename != "undefined" && filename != "index" && filename !="" )
		{
			loadpage(filename);
		}
	}
	else {
		loadpage("mads-overview");
		consolelog('Function onload: NO hash');
	}
}