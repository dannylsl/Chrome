// chrome extension background.js
// EMAIL: dannylsl@sina.com
// DATE : 2013-03-01
// LOG  :
//		BASIC FUNCTION ADD 2013-03-01
//

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	var urlArr = localStorage.getItem('urlArr').split(',');
//	console.log(urlArr);
//	console.log(tab.url);	
	var currentUrl = tab.url;

	for(var i=0;i<urlArr.length;i++){
//		console.log(urlArr[i]);
		var urlData=localStorage.getItem(urlArr[i]).split(',');	

//		console.log(urlData);
		var updateProperties ={
			url:"http://www.baidu.com",
			active:true,
			highlighted:true
		};

		if(currentUrl.indexOf(urlData[1])!= -1){
			console.log(urlData[1]+' checked');
			chrome.tabs.update(tabId,updateProperties,function(tab){
				console.log("It's work time now");
			});
		}

	}
});









