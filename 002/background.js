// TOPIC：chrome.tabs
// EMAIL：dannylsl@sina.com
// DATE ：2013-02-06

// Almost all chrome.tabs methods require 
// you to declare the "tabs" permission in the extension manifest. 
// Three methods (create,update and remove) and one event(onRemoved)
// require the "tabs" permission

var time = 0;

// [Methods]get
// chrome.tabs.get(integer tabId, function callback)
//		Retrieves details about the specified tab
// callback function should looks like 
//		function(Tab tab)
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	console.log("tabs onUpdated executed!");

	chrome.tabs.getCurrent(function(tab){
		time += 1;
		console.log("GetCurrent return" + time);
		console.log(tab);	
	});

	chrome.tabs.get(tab.id, function(tab){
		alert("chrome.tabs.get function"+tabId);
		time += 1;
		console.log("Get return"+time);
		console.log(tab);	
	});

});



//
//
//
chrome.tabs.getSelected(null,function(tab){
	lastTabId = tab.id;
//	alert("chrome tabs selected id=" + lastTabId);
//	console.log(tab.url);
	chrome.pageAction.show(lastTabId);
});
// In Manifest V2,chrome API chrome.tabs.getSelected is deprecated
chrome.tabs.getCurrent(function(tab){
//	alert("Hello Chrome get Current");	
});


chrome.tabs.onSelectionChanged.addListener(function(tab){
	lastTabId = tab.id;
//	alert(tab.url);
//	alert("chrome tabs selected id=" + lastTabId);
	chrome.pageAction.show(lastTabId);

//	var url = document.location.href;
//	alert(url);

//	chrome.tabs.duplicate(lastTabId);
});

// chrome.tabs.onUpdated
// Fired when a tab is updated
//chrome.tabs.onUpdated.addListener()
//chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
//	alert(tab.url);
//	console.log("Current tab Updated to URL:"+tab.url);
//})

