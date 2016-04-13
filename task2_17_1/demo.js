/*
 * 数据格式如下：
var aqiSourceData = {
    "北京":{
       "2016-01-01":10;
       "2016-01-02":10;
       "2016-01-03":10;
       "2016-01-04":10;
    }
};
*/

function getDateStr(date){
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	m=m<10 ? "0"+m:m;
	d=d<10 ? "0"+d:d;
	return y + "/" + m +"/" + d;
} 

function randomBuildData(seed){
	 var resultData = {}; 
	 date = new Date("2016/01/01");
	 var dateStr = "";
	 var i;
	 for(i=1;i<92;i++){
	 	dateStr = getDateStr(date);
	 	resultData[dateStr] = Math.ceil(Math.random()*seed);
	 	date.setDate(date.getDate() + 1);
	 }
	 return resultData;
}
 
 var aqiSourceData = {
 	"北京" : randomBuildData(500),
    "上海" : randomBuildData(300),
    "广州" : randomBuildData(200),
    "深圳" : randomBuildData(100),
    "成都" : randomBuildData(300),
    "西安" : randomBuildData(500),
    "福州" : randomBuildData(100),
    "厦门" : randomBuildData(100),
    "沈阳" : randomBuildData(500)
 };

var pageState = {
	nowSelectCity : "北京",
	nowGraTime : "day"
};

var charData = {

};

  var rdList = document.getElementsByTagName("input");
  var citySel = document.getElementById("city-select");
  var wraper = document.getElementById("aqi-chart-wrap");
 /*
 * 跨浏览器实现事件绑定；
 */
 function addEventHandler(ele,event,handler){
 	if(ele.addEventListener){
 		ele.addEventListener(event,handler,false);
 	}else if(ele.attachEvent){
 		ele.attachEvent("on"+event,handler);
 	}else{
 		ele["on"+event] = handler;
 	}

 }

 function initAqiChartData(){
	//将原始的源数据处理成图表需要的数据格式；
	//处理好的数据存到charData中；
	charData = {};
	var cityData = aqiSourceData[pageState.nowSelectCity];
	var type = pageState.nowGraTime;
	console.log(type + pageState.nowSelectCity);
	var sum=0 , count=0 , day , week=1 , month=1;
	
	   if(type=="day")
	     charData = cityData;
	    else if(type == "week"){
	      for(var d in cityData){
	    	 sum += cityData[d];
             count ++;
             day = new Date(d).getDay();
             if(day==6){
           	   charData["第"+ week +"周"] = Math.floor(sum/count);
           	    week++;
           	    sum =0;
           	    count = 0; 
              }
	      }
	      //最后不满一周的也要保存起来；
         if(count!=0){
         	charData["第"+ week +"周"] = Math.floor(sum/count);
         	sum = 0;
         	count = 0;
          }
	    }//week 结束
	     else if(type=="month"){
             for(var d in cityData){
             	sum += cityData[d];
             	count ++ ;
           
             	//判断本月是否结束；
             	if((new Date(d).getMonth()+1) != month){
             		charData["第" + month + "月"] = Math.floor(sum/count);
             		month++;
             		sum = 0;
             		count = 0;
             	}
             }
             if(count!=0){
             		charData["第" + month + "月"] = Math.floor(sum/count);
             		sum = 0;
             		count = 0;
             }
	    }else{
	    	alert("nowGraTime error");
	    }
}

/*
 *渲染图表；
*/
function renderChart(){
    var text="",color;
    var w= pageState.nowGraTime;
    for(var x in charData){
        color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase();
       if(color.length<7) color += "F";
        text += '<div class="chart ' + w +'" title="'+ x +'_'+ charData[x]+'" style="height:'+ charData[x] +'px; background-color:'+ color +'"></div>';
    }
    wraper.innerHTML = text;
}



//日、周、月的radio事件点击时的处理函数;
function  graTimeChange(){
   // 确定是否选项发生了变化 
   if(pageState.nowGraTime==this.value)
   	   return;
  // 设置对应数据
    pageState.nowGraTime = this.value;
    initAqiChartData();
  // 调用图表渲染函数
    renderChart();
}

//select发生变化时的处理函数；
function citySelectChange(){
	// 确定是否选项发生了变化 
	 if(pageState.nowSelectCity == this.options[this.selectedIndex].value)
	 	return;
	  // 设置对应数据
	pageState.nowSelectCity = this.options[this.selectedIndex].value;
    initAqiChartData();
      // 调用图表渲染函数
    renderChart();
     
}

/*
*初始化日周月的radio事件，点击时，调用函数；
*/
function initGraTimeForm(){

    for(var i=0;i<rdList.length;i++){
        addEventHandler(rdList[i],'click',graTimeChange);
    	}
    }


/*
*初始化城市select下拉选择框中的选项；
*/
function initCitySelector(){
       addEventHandler(citySel,'change',citySelectChange);
}



/*
*初始化函数；
*/
function init(){
	initGraTimeForm();
	initCitySelector();
	initAqiChartData();
}

init();