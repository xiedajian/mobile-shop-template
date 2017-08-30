$(document).on('tap','.link',function(){
	var linkFile=$(this).attr('data-link');
	goToPage(linkFile);
//	window.location.href=linkFile;
})
