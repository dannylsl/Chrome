var lastTabId = 0;

chrome.tabs.getSelected(null,function(tab){
	lastTabId = tab.id;
//	alert("chrome tabs selected id=" + lastTabId);
	chrome.pageAction.show(lastTabId);
});

chrome.tabs.onSelectionChanged.addListener(function(tabId){
	lastTabId = tabId;
//	alert("chrome tabs selected id=" + lastTabId);
	chrome.pageAction.show(lastTabId);
//	chrome.tabs.duplicate(lastTabId);
});

