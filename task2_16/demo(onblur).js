window.onload= function(){
var aqi_data={

};

var regex_city = /^[\u4e00-\u9fa5a-zA-Z]+$/;
var regex_quality = /^\d+$/;
var regex_null = /\s+/g;
var flag = true;
var table = $("aqi_table");
/*
 * 验证input标签的输入是否合法；
*/
function validate(id){
     
     var value_ipt = $(id).value.replace(regex_null,"");
  
      if(id == "aqi_city_input"){
          if(!regex_city.test(value_ipt)){
            $("tip_city").innerHTML = "城市必须为中引文字符";
            $(id).value = "";
            flag = false;
         }
         else{
            $("tip_city").innerHTML = "";
            flag = true;
         }
      }
     else if(id == "aqi_quality_input"){
          if(!regex_quality.test(value_ipt)){
           $("tip_quality").innerHTML = "空气质量必须为整数";
           $(id).innerHTML = "";
            flag = false;
         }
         else{
            $("tip_quality").innerHTML = "";
             flag = true;
         }
     }
       else{
           alert("id error");
        }
      return flag;
      
}

/*
 * 从用户输入获取数据，向aqi_data中添加一条数据；
*/
function addAqiData(){
   var city = $("aqi_city_input").value.replace(regex_null,"");;
   var quality = $("aqi_quality_input").value.replace(regex_null,"");;
      if(flag)
      aqi_data[city] = quality;
}



/*
 渲染aqi_table表格；
*/
function renderTable(){
   
    table.innerHTML = null;
    var frag = document.createDocumentFragment();
     for(var city in aqi_data){
     	 var tr = document.createElement("tr");
     	 var td_city = document.createElement("td");
     	 var ct_city = document.createTextNode(city);
     	 td_city.appendChild(ct_city);
     	 var td_quality = document.createElement("td");
     	 var ct_quality = document.createTextNode(aqi_data[city]);
     	 td_quality.appendChild(ct_quality);
     	 var td_del = document.createElement("td");
     	 var del_btn = document.createElement("button");
     	 var ct_del = document.createTextNode("删除");
     	 del_btn.appendChild(ct_del);
     	 td_del.appendChild(del_btn);
     	 tr.appendChild(td_city);
     	 tr.appendChild(td_quality);
     	 tr.appendChild(td_del);
     	 frag.appendChild(tr);
     	 }
       table.appendChild(frag);
}

/*
 *点击add_btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新；
*/
function addBtnHandle(){
     addAqiData();
     renderTable();
}

/*
 *点击del_btn时的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示；
 */
function delBtnHandle(_this){
     var del_tr = _this.parentNode.parentNode;
     var del_city = del_tr.firstChild.innerHTML;
      delete aqi_data[del_city];
      
     renderTable();
}

/*
*根据id获取DOM节点；
*/
function $(id){
	return document.getElementById(id);
}

/*
*绑定事件
*给add_btn绑定onclick事件；
*给del_btn绑定onclick事件；
*/
function init(){

   $("add_btn").onclick = function(){
   	  var _this = this;
   	  addBtnHandle();
   }; 
  
   //调用删除函数；
   delegate();

       $("aqi_city_input").onblur = function(){
          var _this  = this;
           validate(this.id);
         
       }

       $("aqi_quality_input").onblur = function(){
          var _this = this;
          validate(this.id);
       }
}

/*
*事件委托
*del_btn的删除事件冒泡到aqi_table时触发；
*/
 function delegate(){	
 	 $("aqi_table").onclick = function(e){
 	 	var e = window.event||e;
 	 	var target = e.target || e.srcElement;
          if(target.nodeName.toLowerCase() == "button" ){
          	 delBtnHandle(target);

          }
 	 }
 }
   init();
}