//新建xhr对象，兼容ie不同版本
function createXHR(){
	if(typeof xmlHttpRequest != "undefined"){
		return new xmlHttpRequest();
	}
	 else if(typeof ActiveXObject != "undefined"){
	 	 if(typeof arguments.callee.activeXString != "string"){
	 	 	 var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
	 	 	 var i,len;
	 	 	 for(i=0,len=versions.length;i<len;i++){
	 	 	 	try {
	 	 	 		 new ActiveXObject(version[i]);
	 	 	 		arguments.callee.activeXString = version[i];
	 	 	 		break;
	 	 	 	}
	 	 	 	catch(ex){
	 	 	 	    console.log(ex + version[i]);
	 	 	 	}
	 	 	 }
	 	 }
	 	 return new ActiveXObject(arguments.callee.activeXString);
	 }
	 else{
	 	throw new Error("no XHR object avaliable;");
	 }
}

var xhr = createXHR();

 var ajax = function(conf){ 
 	//type可选
 	var type= conf.type;
 	//url,必填;
 	var url = conf.url;
 	//flag可选，默认为异步；
 	var flag = conf.flag;
    //datatype 可选;
    var dataType = conf.dataType;
    //data可选，只有在post请求时需要
    var data = conf.data;
    //回调函数可选；
    var success = conf.success;

    if(type == null)
    	type = "get";
    if(dataType == null)
    	dataType = "text";
    if(flag == null)
    	flag = false;

    //创建xhr对象；
    var xhr = createXHR();

    //调用回调函数，处理http响应；
    xhr.onreadystatechange = function(){
	 try{
	 	if(xhr.readyState == 4){
		  if(xhr.status == 200 || xhr.status == 304 ){
		  	if(dataType=="text" || dataType=="TEXT"){
		  		if(success!=null)
		  			success(xhr.responseText);
		  		}
		  	   else if(dataType=="xml" || dataType=="XML"){
		  	   	   if(success!=null)
                     success(xhr.responseXML);
		  	  }
		  	  else if(dataType=="json" || dataType=="JSON"){
                       if(success!=null)
                       	success(eval("("+ xhr.responseText +")"));
		  	    }
		  	 }
           }
		
	  }catch(ex){
	 	//可能由ontimeout事件处理；
	    }
	  }//readystatechange--end;
	
	   xhr.open(xhr.type,xhr.url,xhr.flag);
        //setRequestHeader必须出现在open之后，send之前；
        if(type == "get" || type="GET"){
        	xhr.send(null);
        }
	    else if(type=="post" || type=="POST"){
    	  xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
          xhr.send(data);
         }
	  
 }