let file1 = undefined;
let file2 = undefined;
let fileInput1 = document.getElementById("file-upload-input-image");
let fileSelect1 = document.getElementsByClassName("file-upload-select-image")[0];
fileSelect1.onclick = function() {
	fileInput1.click();
}
fileInput1.onchange = function() {
    file1 = fileInput1.files[0];
	let filename1 = fileInput1.files[0].name;
    let selectName1 = document.getElementsByClassName("file-select-name-image")[0];
	selectName1.innerText = filename1;
}

let fileInput2 = document.getElementById("file-upload-input-cover");
let fileSelect2 = document.getElementsByClassName("file-upload-select-cover")[0];
fileSelect2.onclick = function() {
	fileInput2.click();
}
fileInput2.onchange = function() {
    file2 = fileInput2.files[0];
	let filename2 = fileInput2.files[0].name;
	let selectName2 = document.getElementsByClassName("file-select-name-cover")[0];
	selectName2.innerText = filename2;
}


const send_button = document.getElementById("send");
send_button.addEventListener('click',(e)=>{
    e.preventDefault();
    if (fileInput1.files[0]==undefined || fileInput2.files[0]==undefined) {
        console.log("error");
    }else{
        let form_data = new FormData();
        form_data.append('image',file1);
        form_data.append('cover',file2);
        form_data.append('bio',"FORTNITE");
        
        const bearer = 'Bearer ' + localStorage.getItem('auth');

        fetch("http://127.0.0.1:8000/api/auth/edit",{
            method:"POST",
            body:form_data,
            headers: {
                'Authorization': bearer,
                
            },

          }).then((response)=>response.json())
            .then((data)=>{
                console.log(data);
                window.location.replace("/index.html");
            })
            .catch((data)=>{
              console.log("Error:",data.error);

            })
        }
})

function profileController() {
    const profile_id = localStorage.getItem("toVisit");
    if (profile_id == "undefined" || profile_id== null) {
        window.location.replace("/index.html");
    }else{
        fetch(`http://127.0.0.1:8000/api/auth/profile/${profile_id}`,{
            method:"GET",
            headers: {"Content-type": "application/json;charset=UTF-8"},

          }).then((response)=>response.json())
            .then((data)=>{
                const user = JSON.parse(localStorage.getItem("user"));
                const nav_image = document.querySelector(".username");
                nav_image.innerHTML='<span class="usrname">'+user.user.name+'</span> <img src="http://127.0.0.1:8000/upload/profileImage/'+user.user.id+'.jpg"'+'" alt="">';
            })

    }
}

function logOut() {
    localStorage.removeItem("auth");
    window.location.replace("/login.html");
}
document.querySelector(".logout").addEventListener("click",(e)=>{
    logOut()
})

const userId = JSON.parse(localStorage.getItem("user")).user.id;
function getFollowings() {
    fetch(`http://127.0.0.1:8000/api/auth/followers/${userId}`,{
        method:"GET",
        headers: {"Content-type": "application/json;charset=UTF-8"},

      }).then((response)=>response.json())
        .then((data)=>{
            const subscriptionsContainer = document.querySelector(".subscriptions");
            const h5 = document.createElement("h5");
            h5.innerText="Subscriptions";
            const cards = document.createElement("div");
            cards.classList = 'cards'
            subscriptionsContainer.appendChild(h5);
            subscriptionsContainer.appendChild(cards);
            data.followers.forEach(profile => {
                const card = document.createElement("div");
                card.classList = 'card';
                card.innerHTML='<div class="img_profile"><img src="http://127.0.0.1:8000/upload/profileImage/'+profile.image+'" alt=""></div><div class="content"><h6>'+profile.name+'</h6><p>'+profile.bio+'</p></div>';
                cards.appendChild(card);
            });
            console.log(data);
        })
        .catch((data)=>{
          console.log("Error:",data.error);

        })
}
getFollowings()
profileController()
function goToProfile(profile_id){
    localStorage.setItem("toVisit",profile_id);

}
const user = JSON.parse(localStorage.getItem("user"));
const goToYourProfile = document.querySelector(".username");
goToYourProfile.setAttribute('onclick',`goToProfile(${user.user.id})`);