const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Login

class Login {

  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateonSubmit();
  }

  validateonSubmit() {
    let self = this;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      var error = 0;
      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}_login`);
        if(self.validateFields(input) == false){
          error++;
        }
        if(error == 0) {
          var data = {
            email: document.querySelector(`#email_login`).value,
            password: document.querySelector(`#password_login`).value,
          }

          fetch("http://127.0.0.1:8000/api/auth/login",{
            method:"POST",
            body:JSON.stringify(data),
            headers: {"Content-type": "application/json;charset=UTF-8"},

          }).then((response)=>response.json())
            .then((data)=>{
              if(data.user){
                console.log(data);
                localStorage.setItem("auth",data.access_token);
                localStorage.setItem("user",JSON.stringify(data));
                window.location.replace("/index.html");
              }else{
                var errorSpan = document.querySelector(".error-span");
                errorSpan.innerHTML="incorrect email or password"
              }
            })
            .catch((data)=>{
              console.log("Error:",data.error);

            })
        }
      });
    })
  }

  validateFields(field) {
    field.parentElement.style.border = "";
    if(field.value.trim() == ""){
      field.parentElement.style.border = "3px solid red";
      var errorSpan = document.querySelector(".error-span");
      errorSpan.innerHTML="fields shouldn't be blank"
      return false;
    }
  }

}

// login form
const form = document.querySelector(".sign-in-form");

if (form) {
  const fields = ["email", "password"];
  const validator = new Login(form, fields);
}

// sign up

class signUp {

  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateonSubmit();
  }

  validateonSubmit() {
    let self = this;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      var error = 0;
      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}_signUp`);
        if(self.validateFields(input) == false){
          error++;
        }
        if(error == 0) {
          var data = {
            name:document.querySelector(`#username_signUp`).value,
            email: document.querySelector(`#email_signUp`).value,
            password: document.querySelector(`#password_signUp`).value,
          }

          fetch("http://127.0.0.1:8000/api/auth/register",{
            method:"POST",
            body:JSON.stringify(data),
            headers: {"Content-type": "application/json;charset=UTF-8"},

          }).then((response)=>response.json())
            .then((data)=>{
              if(data.user){
                container.classList.remove("sign-up-mode");
                var errorSpan = document.querySelector(".success-span");
                errorSpan.innerHTML=data.message+" you can login now";
              }else{
                var errorSpan = document.querySelector(".error-span2");
                errorSpan.innerHTML="something went wrong"
              }
            })
            .catch((data)=>{
              console.log("Error:",data.error);

            })
        }
      });
    })
  }

  validateFields(field) {
    field.parentElement.style.border = "";
    if(field.value.trim() == ""){
      field.parentElement.style.border = "3px solid red";
      var errorSpan = document.querySelector(".error-span2");
      errorSpan.innerHTML="fields shouldn't be blank"
      return false;
    }
  }

}

const form_up = document.querySelector(".sign-up-form");
if (form_up) {
  const fields = ["username","email", "password"];
  const validator = new signUp(form_up, fields);
}