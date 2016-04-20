window.onload = initPage;

var u_name = document.getElementById("username");
var submit_btn =document.getElementById("register");

function initPage(){
   addEventHandler(u_name,'blur',checkUserName);
   submit_btn.disabled = true;
}

function checkUserName(){
	u_name.className = "thinking";
	var request = createRequest();
	if(request===null){
		alert("sorry,can't find request");
	}else {
		var url = "checkName.php?username=" + u_name.value; 
		request.open("GET",url,true);
		request.onreadystatechange = showUserNameStatus;
		request.send(null);
	}
}

function showUserNameStatus(){
	if(request.readyState == 4){
		if(request.status == 200 ){
			if(request.responseText == "okay"){
				u_name.className = "approved";
				submit_btn.disabled = false;
			}else if(request.responseText == "denied"){
				u_name.className = "denied";
				u_name.focus();
				u_name.select();
				submit_btn.disabled = true;
			}else{
				console.log(request.responseText);
			}
		}
	}
}