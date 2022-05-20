getDatalist();
let button = document.getElementById("addnew");
button.onclick = function() {
    checknum();
    //location.href = "tiktokpets.html";
}
//create list of names and X buttons
let names = document.getElementsByClassName("videoName");
      console.log(names)
let buttons = document.getElementsByClassName("x");
//

for (let i=0; i<8; i++) {
  let xx = buttons[i];
  xx.addEventListener("click",
  function () { buttonAction(i) });
}
function buttonAction(num){
  let names = document.getElementsByClassName("videoName");
  let data=names[num].placeholder;
  let obj={name:data};
  console.log("text:",obj);
  console.log("name wants to delete:",typeof data);
  sendPostRequest("/deleted", obj)
  .then( function (response) {
    console.log("Response recieved", response);
    document.location.reload();
  })
  .catch( function(err) {
    console.log("POST request error",err);
  });


}
//names[0].placeholder="hhhhhhhhhhh"
//console.log(names);

//send get request
async function sendGetRequest(url) {
  let response = await fetch(url);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}
//call getDatalist, load entered video from data base to 8-load page

function getDatalist() { 
  sendGetRequest("/getList")
  .then( function (response) {
    console.log("Response recieved", response);
    let datanames=JSON.parse("[" + response + "]");
    
    for(let i=0;i<8;i++){
      if(datanames[0][i]!=null){
        names[i].placeholder=datanames[0][i];
        names[i].id="";
        //buttons[i].disabled=false;
      }else{
        names[i].placeholder="";
        names[i].id="other-inputs";
        //buttons[i].disabled=true;
      }
    }
  })
  .catch( function(err) {
    console.log("Get request error",err);
  });
  sendGetRequest("/checknum")
  .then(function(response){
    console.log("check num", response)
    if(response==1){
document.getElementById("continue").style.backgroundColor= "rgba(241, 147, 171, 0.9)"; document.getElementById("continue").disabled=true;
    }else if(response==0){
document.getElementById("addnew").style.backgroundColor= "rgba(241, 147, 171, 0.9)";
  document.getElementById("addnew").disabled=true;
      //window.confirm("Database is full!");
    }
  })
    .catch( function(err) {
    console.log("Get request error",err);
  });
}
//check whether total videos in data base reach max 8
function checknum(){
  sendGetRequest("/checknum")
  .then(function(response){
    console.log("check num", response)
    if(response==1){
      location.href = "tiktokpets.html";
    }else if(response==0){ //document.getElementById("addnew").disabled=true;
     // window.confirm("Database is full!");
    }
  })
    .catch( function(err) {
    console.log("Get request error",err);
  });
}

// given function that sends a post request
async function sendPostRequest(url,data) {
  params = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data) };
  console.log("about to send post request");
  
  let response = await fetch(url,params);
  if (response.ok) {
    let data = await response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}
