var username;
var password;
var submitbutton;

if (window.localStorage.pathname === '/login'){
    username = $("#username");
    password = $("#password");
    submitbutton = $("#submit")
    submitbutton.on("click", login())
}