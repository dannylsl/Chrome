// TOPIC：chrome.tabs
// EMAIL：dannylsl@sina.com
// DATE ：2013-02-06
// NOTE: FOR MORE UP-TO-DATE  INFORMATION
// CHECK FOR http://developer.chrome.com/extensions/tabs.html#type-Tab


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

	// [Method]getCurrent
	// chrome.tabs.getCurrent(function callback)
	//		Gets the tab that this script call is being made from.May be 
	//		undefined if called from a none-tab context
	//		(for example:a backgroud page or popup view)
	chrome.tabs.getCurrent(function(tab){
		time += 1;
		console.log("GetCurrent return" + time);
		console.log(tab);	
		// Here it returns "undefined"
	});
    
});



//In Manifest V2,chrome API chrome.tabs.getSelected is deprecated
//chrome.tabs.getSelected(null,function(tab){
//	lastTabId = tab.id;
//	chrome.pageAction.show(lastTabId);
//});


// Event chrome.tabs.onActivated and chrome.tabs.onSelectionChanged has 
// the same function. However I have not find any change log about them,
// and you can not find onSelectionChanged in chrome* API
// I recommand onActivated
var i = 0;
chrome.tabs.onActivated.addListener(function(activeInfo){
	console.log("onActived Event: tabId:"+activeInfo.tabId+"   WindowId:"+activeInfo.windowId);	

	chrome.tabs.get(activeInfo.tabId, function(tab){
		console.log("Get return");
		console.log("tab url:"+tab.url);	
	});

	if(i <= 0){
		//ATTENTION THE SYNTAX OF JAVASCRIPT OBJECT DEFINITION
		var createObj = {
			//windowId = (optional:current window as default)	
			//index = (optional:the position the tab should take in the window)
			//url =(optional: the URL to navigate the tab to initially)
			url:"http://www.baidu.com",
			//active = (optional Boolean: whether the tab should become the active 
			//			tab in the window) 

			active:false	// ATTENTION: if you set active TRUE,chrome will create so many tabs (endless)
							// until your computer memory is use up.you have to close it

			//pinned = (optional Boolean: whether the tab should be pinned. Defaults to false)
			//openerTabId = (optional integer: The ID of the tab that opened this tab)

		};
		chrome.tabs.create(createObj,function(tab){
			console.log("create Execute");			
		});

		// [method] duplicate
		// chrome.tabs.duplicate(integer tabId, function callback){}
		//		Duplicates a tab
		// We duplicated the Actived tab here
		chrome.tabs.duplicate(activeInfo.tabId,function(tab){
			console.log("Duplicate the Actived Tab, tabId:"+activeInfo.tabId+" i="+i);	
			i++;
		});
	}

	// [method] highlight
	// chrome.tabs.highlight(object highlightInfo, function callback)
	//		Highlights the given tabs
	var highlightInfo={
		// windowId: [optional integer]   The window that contains the tabs
		windowId: WINDOW_ID_CURRENT,
		// tabs: [array of integer or integer array] One or more tab indices to highlight
		tabs:activeInfo.tabId
	}

});

chrome.tabs.onSelectionChanged.addListener(function(tabId){
	console.log("onSelectionChanged Event tabId:"+tabId);
	lastTabId = tabId;
});

// chrome.tabs.onUpdated
// Fired when a tab is updated
//chrome.tabs.onUpdated.addListener()
//chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
//	alert(tab.url);
//	console.log("Current tab Updated to URL:"+tab.url);
//})

