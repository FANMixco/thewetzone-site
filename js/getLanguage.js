function getLanguage()
{
	var validLanguages=new Array("","es", "en");	
	
	var language = window.navigator.userLanguage || window.navigator.language;
	language=language.substring(0,2);

	if (!validLanguages.includes(language))
		language="en";

	return "js/resources/resource."+language+".js";

}
