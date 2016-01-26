/* redirection */
if(parent.location.href == self.location.href)
{
	var url = parent.location.href;
	consolelog('href='+url);
	var file = url.substring(url.lastIndexOf('/')+1);
	consolelog('file='+file);
	if( file.length > 0 )
	{
		var hrefsearch = file.search(/index/i);
		consolelog('hrefsearch='+hrefsearch);
		if( hrefsearch == -1 )
		{
			var hash = file.substring(0,file.lastIndexOf('\.'));
			consolelog('hash='+hash);
			if( hash.length > 0 )
			{
				var url = 'index.html#' + hash;
				if( window.location.replace )
					window.location.replace(url);
				else
					window.location.href = url; // causes problems with back button, but works
			}
		}
	}
}
$(document).ready(function(){
	$(".divlink").click(function(){
		var filename = $(this).attr("ref");
		if( filename != "#" ) {
			var response = jQuery.ajax({
				url: filename,
				type: 'HEAD',
				async: false,
				success: function(){
					/* alert('Page found ' + filename ); */
					$("#contentholder").load(filename);
					$("#contentholder").show('slow');
					consolelog('Page found='+filename); },  
				error: function(){
					/* alert('Page not found ' + filename ); */
					consolelog('Page not found='+filename); }
			});
		}
	});
});