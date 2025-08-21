//fetch("apiUrl{options}")
//options:{
//method:POST|GET|PUT|DELETE|PATCH
//headers:{
//"Content-Type":"application/json" | 
//},
//body:JSON.stringify({email,password})
//}


const apiUrl = "http://localhost:3000/api";

async function login(email,password){
    const response = await fetch(apiUrl+"/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    return response;
}
async function logindata(){
  let email = document.getElementById("email").value;
console.log("Email",email);

  let password = document.getElementById("password").value;
  console.log("Password",password);
  const result = await login(email, password);
  console.log("Response", result);
}