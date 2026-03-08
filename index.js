
const Username = document.getElementById("Username");
const password = document.getElementById("password");


document.getElementById("Sign")
.addEventListener("click", function(){
    if(Username.value === "admin" && password.value === "admin123"){
        window.location.assign("home.html");
    }
    else{
        alert("Invalid Username or Password");
    }
})