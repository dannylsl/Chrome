var periodCnt; 
var periodArr = new Array();
var urlArr = new Array();
if(localStorage["periodCnt"]){
	console.log("localStorage['periodCnt'] exist");
	periodCnt = Number(localStorage["periodCnt"]);   
	periodArr = localStorage.getItem("periodArr").split(',');
}else{
	console.log("localStorage['periodCnt'] does not exist");
	periodCnt = 0;
}

if(localStorage.getItem('urlArr')){
	console.log("localStorage url checked");
	urlArr = localStorage.getItem("urlArr").split(',');
}else{
	console.log("localStorage url Array is not exist");
}

function Message(str){
	$('#msg').html(str);
	$('#msg').fadeIn(2000,function(){$('#msg').fadeOut(2000)});
}

function GethourSel(id,flag){
	var hourSelStr="<select id='hour"+id+"_"+flag+"'>"+
		"<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option></select>";
	return hourSelStr;
}

function GetminuteSel(id,flag){
	var minuteSelStr="<select id='minute"+id+"_"+flag+"'>"+
		"<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option><option>54</option><option>55</option><option>56</option><option>57</option><option>58</option><option>59</option></select>";
	return minuteSelStr;

}

function SavePeriod(){
	var periodData = new Array();
	//[0] period ID
	//[1] start time  
	//[2] end time
	var Count = periodArr.length;			
	var starttime,endtime;
	for(var i = 1; i <= Count;i++){
		var tagId = Number(periodArr[i-1].substring(periodArr[i-1].indexOf('_')+1,(periodArr[i-1].length)));

		starttime=$('#hour'+tagId+"_start option:selected").text()+":"+$('#minute'+tagId+"_start option:selected").text()+":00";	
		endtime=$('#hour'+tagId+"_end option:selected").text()+":"+$('#minute'+tagId+"_end option:selected").text()+":00";	
		periodData[0] = tagId;
		console.log(starttime+" && "+endtime);
		periodData[1] = starttime; 
		periodData[2] = endtime;
		localStorage.setItem(periodArr[i-1],periodData);
	}

	localStorage["periodCnt"] = periodCnt;		
	localStorage.setItem('periodArr',periodArr);
	Message("Data Saved");
}


function init(){
	periodCnt = Number(localStorage.getItem("periodCnt"));
	var periodData = new Array();	
	var urlData = new Array();
	
	for(var i=1;i <= periodArr.length;i++){
		periodData[i]= localStorage.getItem(periodArr[i-1]);	
		console.log(i+"___"+periodData[i]);
	}
	// INITIALIZE THE PERIOD
	for(i=1;i <= periodArr.length;i++){

		var period = periodData[i].split(',');
		var starttime = period[1].split(':');
		var endtime = period[2].split(':');

		if(i>=2){
			var tagPre = periodData[i-1].split(','); 
		}else{
			var tagPre=['0'];
		}
		var tagPreId = tagPre[0];
		var tagId = period[0];  
		console.log("tagId:"+tagId+"   tagPre:"+tagPre[0]);

		var hourSelStart = GethourSel(tagId,'start'); 
		var minuSelStart = GetminuteSel(tagId,'start');
		var hourSelEnd = GethourSel(tagId,'end'); 
		var minuSelEnd = GetminuteSel(tagId,'end');

		$('#period_'+tagPreId).after("<div id='period_"+tagId+"'>"+
				"<table border='1' width='60%' align='center'><tr align='center'>"+
				"<td width='20%'>"+tagId+"</td>"+
				"<td width='30%'>"+hourSelStart+"时"+minuSelStart+"分"+"</td>"+
				"<td width='30%'>"+hourSelEnd+"时"+minuSelEnd+"分"+"</td>"+
				"<td width='20%'>"+"<div class='delete' id='del_"+tagId+"'></div>"+"</td>"+
				"</tr></table></div>");
	
		$('#hour'+tagId+'_start').val(Number(starttime[0]));
		$('#minute'+tagId+'_start').val(Number(starttime[1]));
		$('#hour'+tagId+'_end').val(Number(endtime[0]));
		$('#minute'+tagId+'_end').val(Number(endtime[1]));
	}

	//INITIALIZE THE URL
	for(i=0;i<urlArr.length;i++){
		urlData = localStorage.getItem(urlArr[i]).split(',');	
		if(i>= 1)	
			var tagPre = urlArr[i-1];
		else
			var tagPre = 'url_0';
		
		var nextTagId = urlArr[i].substring(urlArr[i].indexOf('_')+1,urlArr[i].length);
		var tr="<tr id='"+urlArr[i]+"'>"+
				"<td height='25px' width='130px'><div id='itemname_"+nextTagId+"' class='item'>"+
					"<span id='itemname_text_"+nextTagId+"' style='display:inline-block'>"+urlData[0]+"</span>"+
					"<input type='text' id='itemname_edit_"+nextTagId+"' value='"+urlData[0]+"' style='display:none;width:100%;'>"+
				"</div></td>"+
				"<td width='430px'><div id='itemurl_"+nextTagId+"'>"+
					"<span id='itemurl_text_"+nextTagId+"' style='display:inline-block'>"+urlData[1]+"</span>"+
					"<input type='text' id='itemurl_edit_"+nextTagId+"' value='"+urlData[1]+"' style='display:none;width:100%;'>"+
				"</div></td>"+
				"<td><div class='delete' id='urldel_"+nextTagId+"'></div></td></tr>"; 		

		$('#'+tagPre).after(tr);
		$("#itemname_"+nextTagId).click(text2edit);
		$("#itemname_edit_"+nextTagId).focusout(edit2text);
		$("#itemurl_"+nextTagId).click(text2edit);
		$("#itemurl_edit_"+nextTagId).focusout(edit2text);
		$("#urldel_"+nextTagId).click(delurl);
	}	

}

function addTable(){ 		
	console.log("add Table");
	var lastTag = periodArr[periodArr.length-1];
	if(!lastTag){
		lastTag='period_0';
	}
	console.log(lastTag);
	console.log(lastTag.substring(lastTag.indexOf('_')+1,(lastTag.length)));
	var nextTagId = Number(lastTag.substring(lastTag.indexOf('_')+1,(lastTag.length)))+1;
	var nextTag = 'period_'+String(nextTagId);
	console.log(nextTagId+"_ _"+nextTag);
	periodCnt += 1;
	periodArr.push(nextTag);

	var hourSelStart = GethourSel(nextTagId,'start'); 
	var minuSelStart = GetminuteSel(nextTagId,'start');
	var hourSelEnd = GethourSel(nextTagId,'end'); 
	var minuSelEnd = GetminuteSel(nextTagId,'end');

	$('#'+lastTag).after("<div id='"+nextTag+"' style='display:none;'>"+
			"<table border='1' width='60%' align='center'><tr align='center'>"+
			"<td width='20%'>"+nextTagId+"</td>"+
			"<td width='30%'>"+hourSelStart+"时"+minuSelStart+"分"+"</td>"+
			"<td width='30%'>"+hourSelEnd+"时"+minuSelEnd+"分"+"</td>"+
			"<td width='20%'>"+"</td>"+
			"</tr></table></div>");
	$('#'+nextTag).slideDown('slow');
}


function text2edit(){
	var tag = $(this).attr('id');
	var tagPre = tag.substring(0,tag.indexOf('_'));	
	var tagId=tag.substring(tag.indexOf('_')+1,tag.length);
	console.log("tag:"+tag+"  tagId:"+tagId+" tagPre:"+tagPre);
	var content = $('#'+tagPre+'_text_'+tagId).html();
	console.log(content);
	$('#'+tagPre+'_text_'+tagId).hide();
	$('#'+tagPre+'_edit_'+tagId).val(content);
	$('#'+tagPre+'_edit_'+tagId).show();
	$('#'+tagPre+'_edit_'+tagId).focus();
}

function edit2text(){
	var tag = $(this).attr('id');
	var tagPre = tag.substring(0,tag.indexOf('_edit_'));	
	var tagId=tag.substring(tag.indexOf('_')+6,tag.length);
	console.log("tag:"+tag+"  tagId:"+tagId+" tagPre:"+tagPre);
	var content = $('#'+tagPre+'_edit_'+tagId).val();
	
	$('#'+tagPre+'_edit_'+tagId).hide();
	$('#'+tagPre+'_text_'+tagId).html(content);
	$('#'+tagPre+'_text_'+tagId).show();
}

function delurl(){
	var tag = $(this).parent().parent().attr('id');

	console.log(tag+"   "+urlArr);
	urlArr.splice(urlArr.indexOf(tag),1);
	localStorage.setItem('urlArr',urlArr);
	console.log(urlArr);
	localStorage.removeItem(tag);
	$(this).parent().parent().remove();		
}

function addUrl(){
	if(0==urlArr.length)
		var urlArrlast = "url_0"; 
	else
		var urlArrlast = urlArr[urlArr.length-1];
	console.log(urlArrlast);
	var suffixId  = Number(urlArrlast.substring(urlArrlast.indexOf('_')+1,urlArrlast.length));

	var nextTagId = suffixId + 1;
	var nextTag = "url_"+String(nextTagId); 	
	var tr="<tr id='"+nextTag+"'>"+
			"<td height='25px' width='130px'><div id='itemname_"+nextTagId+"' class='item'>"+
				"<span id='itemname_text_"+nextTagId+"' style='display:inline-block'>Name</span>"+
				"<input type='text' id='itemname_edit_"+nextTagId+"' style='display:none;width:100%;'>"+
			"</div></td>"+
			"<td width='430px'><div id='itemurl_"+nextTagId+"'>"+
				"<span id='itemurl_text_"+nextTagId+"' style='display:inline-block'>url</span>"+
				"<input type='text' id='itemurl_edit_"+nextTagId+"' style='display:none;width:100%;'>"+
			"</div></td>"+
			"<td><div class='delete' id='urldel_"+nextTagId+"'></div></td></tr>"; 		
//	console.log(suffixId+tr);
	$("#"+urlArrlast).after(tr);
	urlArr.push(nextTag);

	$("#itemname_"+nextTagId).click(text2edit);
	$("#itemname_edit_"+nextTagId).focusout(edit2text);
	$("#itemurl_"+nextTagId).click(text2edit);
	$("#itemurl_edit_"+nextTagId).focusout(edit2text);
	$("#urldel_"+nextTagId).click(delurl);
	console.log(urlArr);
}  

function SaveUrl(){
	var tagId;
	var urlData = new Array();
	// 0 --- url name
	// 1 --- url
	localStorage.setItem('urlArr',urlArr);
	for(var i=0;i<urlArr.length;i++){
		tagId = urlArr[i].substring(urlArr[i].indexOf('_')+1,urlArr[i].length);				
		urlData[0] = $("#itemname_text_"+tagId).html() ;     
		urlData[1] = $("#itemurl_text_"+tagId).html();   
		console.log(urlData);
		localStorage.setItem(urlArr[i],urlData);
	}
	Message("URL Saved");
}

init();
$(document).ready(function(){
	//var Cnt = localStorage.getItem('periodCnt');
	$("#addPeriodbtn").click(addTable);	
	$("#savePeriodbtn").click(SavePeriod);	
	$("#addUrlbtn").click(addUrl);
	$("#saveUrlbtn").click(SaveUrl);

	for(var i=1;i<=periodArr.length;i++){

		var tagId = Number(periodArr[i-1].substring(periodArr[i-1].indexOf('_')+1,(periodArr[i-1].length)));

		$('#del_'+tagId).click(function(){
			$(this).parent().parent().parent().parent().parent().slideUp('slow',function(){
				$(this).parent().parent().parent().parent().parent().remove();
				periodCnt = periodCnt-1;
				localStorage['periodCnt'] = periodCnt;
				var tag = $(this).parent().parent().parent().parent().parent().context.id;
				periodArr.splice(periodArr.indexOf(tag),1);			
				localStorage.setItem('periodCnt',periodArr.length);
				localStorage.setItem('periodArr',periodArr);
				localStorage.removeItem(tag);
			});
		});		
	}
});

