var queryInfo = {
	// active  
	//[optional boolean] whether the tabs are active in their windows
	// pinned  
	//[optional boolean] whether the tabs are pinned 
	// highlighted  
	//[optional boolean] whether the tabs are highlighted 
	currentWindow:true, 
	//[optional boolean] Whether the tabs are in the current window
	// lastFocusedWindow 
	//[optional boolean] Whether the tabs are in the last focused window
	// status 
	//[optional enumerated string["loading","complete"] Whether the last tabs have completed loading
	title:"Open Main", 
	//[optional string] Match page titles against a pattern
	//url:"main.html" 
	//[optional string] Match tabs against a URL pattern
	//windowId 
	//[optional integer] The ID of the parent window or chrome.windows.WINDOW_ID_CURRENT
	//for the current window
	//windowType  
	//The type of window the tabs are in
	//index
	//The position of the tabs within their windows
}
var highlightInfo = {
	//windowId:chrome.windows.WINDOW_ID_CURRENT,
	//[optional inter] The window that contains the tabs
	tabs:0
	//[array of integer or integer](TAB INDEX) One or more tab indices to highlight
}

var createobj ={
	url:"main.html",
	active:false
}
function openTab(){
	//var getInfo={populate:false};
	/*chrome.windows.getCurrent(getInfo,function(window){
		console.log("windowId:"+highlightInfo.windowId);
		highlightInfo.windowId = window.id;
		console.log("windowId:"+highlightInfo.windowId);
	});
	*/
	chrome.tabs.query(queryInfo,function(tabs){
		console.log(tabs);
		if(0==tabs.length){
			console.log("open main");	
			chrome.tabs.create(createobj,function(tab){
				console.log("create Execute");
				highlightInfo.tabs = tab.index;
				//Tab highlight = tab focused
				chrome.tabs.highlight(highlightInfo,function(window){
					console.log("highlight"+tab.index);
				});
			})	
		}else{
			highlightInfo.tabs = tabs[0].index;
			chrome.tabs.highlight(highlightInfo,function(window){
				console.log("highlight"+tabs[0].index);
			});
			console.log("Main is opened");
		}	
	});
}
chrome.browserAction.onClicked.addListener(openTab);


