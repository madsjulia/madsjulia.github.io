if(parent.location.href == self.location.href)
{
	consolelog('main-start redirection: '+ parent.location.href );
	var url_new = "";
	var hash_split = "";
	var hash_1 = "", hash2 = "";
	var url = parent.location.href;
	consolelog('main-start href='+url);
	var file = url.substring(url.lastIndexOf('/')+1);
	consolelog('main-start file='+file);
	if( file.length > 0 )
	{
		var hrefsearch = file.search(/index/i);
		consolelog('main-start index (yes=0/no) = '+hrefsearch);				
		if( hrefsearch == 0 ) // there is index in the url
		{
			var pagesplit = file.split("#");
			var name = pagesplit[0];
			var hash = pagesplit[1];
			consolelog('main-start page split: filename = '+name+" hash = "+hash);
			if( hash != undefined && hash !="" )
			{
				hash_split = hash.split("_");
				hash1 = hash_split[0];
				hash2 = hash_split[1];
				consolelog('main-start hash split = (1) '+hash1+" (2) "+hash2);
				if( hash2 == undefined )
					url_new = 'index.html#' + hash1;
				else
					url_new = 'index.html#' + hash;
				loadpage(hash1);
			}
		}
		else if( hrefsearch == -1 ) // there is no index in the url
		{
			var hash = file.substring(0,file.lastIndexOf('\.')); // remove extension
			consolelog('main-start hash='+hash);
			if( hash.length > 0 )
				url_new = 'index.html#' + hash;
		}
		if( url_new != "" )
		{
			consolelog('main-start change url_new '+url_new);
			if( window.location.replace )
				window.location.replace(url_new);
			else
				window.location.href = url_new; // causes problems with back button, but works
		}
		else
			consolelog('main-start url_new is empty');
	}
}
else
	consolelog('main-start NO redirection: '+ parent.location.href+' '+self.location.href);