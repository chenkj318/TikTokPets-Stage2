let button = document.getElementById("continue");
button.addEventListener("click",buttonPress);
let myvideo = document.getElementById("goto8");
myvideo.onclick=function(){
  location.href="8-load.html"
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


function buttonPress() { 
    // Get all the user info.
  let username = document.getElementById("user").value;
  let URL = document.getElementById("URL").value;
  let nickname = document.getElementById("nickname").value;

  let data = {
      "Username": username,
      "URL":URL,
      "Nickname":nickname
    }
    
  sendPostRequest("/videoData", data)
  .then( function (response) {
    console.log("Response recieved", response);
    if(response==1){
        window.location = "videoViewer.html";
    }else if(response==0){
      window.confirm("Database is Full!");
    }

  })
  .catch( function(err) {
    console.log("POST request error",err);
  });
}
