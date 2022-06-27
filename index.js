class Auth {
    constructor(){
        document.querySelector("body").style.display = "none";
        const auth = localStorage.getItem("auth");
        const user = localStorage.getItem("user");
        this.validateAuth(auth);
        this.validateAuth(user);

    }
    validateAuth(auth){
        if(auth == null){
            window.location.replace("/login.html");
        }else{
            document.querySelector("body").style.display = "flex";
        }
    }
    logOut() {
        localStorage.removeItem("auth");
        window.location.replace("/login.html");
    }
}

const auth = new Auth();

document.querySelector(".logout").addEventListener("click",(e)=>{
    auth.logOut();
})

let user_info = JSON.parse(localStorage.getItem("user"));
let username_image = document.querySelector(".username");
if (user_info.user.name) {
    username_image.innerHTML=`${user_info.user.name}<img src="http://127.0.0.1:8000/upload/profileImage/${user_info.user.id}.jpg" alt="">`;
    username_image.classList=`username visitProfile${user_info.user.id}`;
    username_image.setAttribute('id',user_info.user.id);
    username_image.setAttribute('onclick',`goToProfile(${user_info.user.id})`);

}else{
    username_image.innerHTML=`unknown <img src="./images/userProfileImage/unknown.jpg" alt="">`
}

function getAllProfiles() {
    fetch("http://127.0.0.1:8000/api/auth/profiles",{
            method:"GET",
            headers: {"Content-type": "application/json;charset=UTF-8"},

          }).then((response)=>response.json())
            .then((data)=>{
              data.profiles.forEach(profile => {
                  const profile_link = document.createElement("a");
                  profile_link.classList = `card_link visitProfile${profile.id}`;
                  profile_link.href = "profile.html";
                  profile_link.id=`${profile.id}`;
                  profile_link.setAttribute('onclick',`goToProfile(${profile.id})`);
                  profile_link.innerHTML = '<div class="card"><img src="http://127.0.0.1:8000/upload/coverImage/'+profile.cover+'"'+'alt=""><div class="channel"><div class="content"><h6>'+profile.name+'</h6><p>'+profile.bio+'</p></div></div></div>';   
                  const channels_bx = document.querySelector(".channels_bx");
                  channels_bx.appendChild(profile_link);
              });
            })
            .catch((data)=>{
              console.log("Error:",data.error);

            })
}

getAllProfiles();

function goToProfile(profile_id){
    localStorage.setItem("toVisit",profile_id);

}

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