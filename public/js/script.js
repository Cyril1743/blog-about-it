var username;
var password;
var submitbutton;

if (window.localStorage.pathname === '/login'){
    username = $("#inputEmail1");
    password = $("#inputPassword1");
    submitbutton = $("#submit")
    submitbutton.on("click", login())
}

function login(event){
    event.preventDefault()
    let UnameVal = username.val()
    let PVal = password.val()

    fetch("/login/users", {
        method: "get"
    })
    .then(response => response.json())
    .then((data)=> {
       for(let i = 0; i < data.length; i++){
        if(data[i].username == UnameVal && data[i].password == PVal){
            window.location.href = `/account/${UnameVal}`
        } else {
            var form = $(".login-form")
            form.append("<p>Invaild username or password</p>")
        }
       }
    })
}
if (window.location.pathname === '/sign-up'){
    var submitbutton = $("#submit")
    var loginbutton = $("#login")
    submitbutton.on("click",)
}