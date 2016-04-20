function createRequest(){
	try{
		request = new XMLHttpRequest();
	}catch(tryMS){
		try{
			request = new ActiveXObjext("Msxml2.XMLHTTP");
		}catch(otherMs) {
			try{
               request = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(failed){
				request = null;
			}
			
		}
	}
	return request;
}

function addEventHandler(ele,action,handler){
	if(ele.addEventListener){
		ele.addEventListener(action,handler,false);
	}else if(ele.attachEvent){
		 ele.attachEvent("on"+action,handler);
	}else{
		 ele["on"+action] = handler;
	}
}
