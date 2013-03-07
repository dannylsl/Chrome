// chrome extension background.js
// EMAIL: dannylsl@sina.com
// DATE : 2013-03-01
// LOG  :
//		BASIC FUNCTION ADD 2013-03-01
//



//CONVERT HOUR&MINUTE TO AN VALUE
function hm2val(hours,minutes){
	return (Number(hours)*60+Number(minutes));
}

//COMPARE TWO TIME STRING LIKE "8:30:00"
//IF timeStr1 >= timeStr2  
// RETURN TRUE
//ELSE
// RETURN FALSE
function timeStrCmp(timeStr1,timeStr2){
	var time1 = timeStr1.split(':'); 
	var time2 = timeStr2.split(':');
	var time1val = hm2val(time1[0],time1[1]);
	var time2val = hm2val(time2[0],time2[1]);
	console.log(timeStr1+"  "+timeStr2);
	return (time1val>=time2val)?true:false;
}

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	var urlArr = localStorage.getItem('urlArr').split(',');
	var currentUrl = tab.url;
	var periodArr = localStorage.getItem('periodArr').split(',');
	var curDate = new Date();
	var curTime = curDate.getHours()+":"+curDate.getMinutes()+":00";
	var furl = localStorage.getItem('furl');
	console.log(curTime);
	
	for(var i=0;i<periodArr.length;i++){
		var periodData = localStorage.getItem(periodArr[i]).split(',');	
		console.log(periodData);
		if(timeStrCmp(curTime,periodData[1]) && !timeStrCmp(curTime,periodData[2])){
			console.log(timeStrCmp(curTime,periodData[1])+"It is work Time "+timeStrCmp(curTime,periodData[2]));	
			for(i=0;i<urlArr.length;i++){

				var urlData=localStorage.getItem(urlArr[i]).split(',');	
				var updateProperties ={
					url:furl,
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
		}
	}

});









