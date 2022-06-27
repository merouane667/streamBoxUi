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
                const cover = document.querySelector(".cover");
                const image = document.querySelector(".profileImage");
                const profileName = document.querySelector(".profileName");
                const nav_image = document.querySelector(".username");
                cover.innerHTML = '<img src="http://127.0.0.1:8000/upload/coverImage/'+data.profile.cover+'"alt="">';
                image.innerHTML = '<img src="http://127.0.0.1:8000/upload/profileImage/'+data.profile.image+'"alt="">';
                profileName.innerHTML = '<h6>'+data.profile.name+' <i class="bi bi-patch-check"></i></h6>';
                nav_image.innerHTML='<span class="usrname">'+user.user.name+'</span> <img src="http://127.0.0.1:8000/upload/profileImage/'+user.user.id+'.jpg"'+'" alt="">';
            })
            .catch((data)=>{
              console.log("Error:",data.error);

            })

    }
}
const user = JSON.parse(localStorage.getItem("user"));
const profile_id = JSON.parse(localStorage.getItem("toVisit"));
const edit = document.querySelector("#edit");
const follow_btn = document.querySelector(".followBtn")
if (user.user.id != profile_id) {
    edit.style.display="none";
}
if (user.user.id == profile_id) {
    follow_btn.style.display="none";
}
function logOut() {
    localStorage.removeItem("auth");
    window.location.replace("/login.html");
}

document.querySelector(".logout").addEventListener("click",(e)=>{
    logOut()
})

function goToProfile(profile_id){
    localStorage.setItem("toVisit",profile_id);

}

const goToYourProfile = document.querySelector(".username");
goToYourProfile.setAttribute('onclick',`goToProfile(${user.user.id})`);

const numberOfFollowing = document.querySelector(".numberOfFollowing");
const numberOfFollowers = document.querySelector(".numberOfFollowers");
// numberOfFollowing.innerText="test"

function getfollo() {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(`http://127.0.0.1:8000/api/auth/followersNb/${user.user.id}`,{
            method:"GET",
            headers: {"Content-type": "application/json;charset=UTF-8"},

          }).then((response)=>response.json())
            .then((data)=>{
                const profile_id = JSON.parse(localStorage.getItem("toVisit"));
                const user = JSON.parse(localStorage.getItem("user"));
                if (profile_id==user.user.id) {
                    numberOfFollowers.innerText=data.followers;
                    numberOfFollowing.innerText=data.followings;
                }else{
                    numberOfFollowers.innerText=data.followings;
                    numberOfFollowing.innerText=data.followers;
                }

            })
            .catch((data)=>{
              console.log("Error:",data.error);

            })
}
function amIfollowing() {
    const profile_id = JSON.parse(localStorage.getItem("toVisit"));
    const bearer = 'Bearer ' + localStorage.getItem('auth');
    fetch(`http://127.0.0.1:8000/api/auth/amIfollowing/${profile_id}`,{
            method:"GET",
            headers: {
                'Authorization': bearer,
                
            },

          }).then((response)=>response.json())
            .then((data)=>{
                if (data == true) {
                    const btn = document.getElementById("followBtn")
                    btn.innerText = "unfollow"
                }
            })
            .catch((data)=>{
              console.log("Error:",data.error);

            })
        
}

const btn = document.getElementById("followBtn")
btn.addEventListener("click",(e)=>{
    followUnfollow();
    if (btn.innerText == "unfollow") {
        btn.innerText = "follow"
    }else{
        btn.innerText = "unfollow"

    }
})

function followUnfollow() {
    const profile_id = JSON.parse(localStorage.getItem("toVisit"));
    const bearer = 'Bearer ' + localStorage.getItem('auth');
    fetch(`http://127.0.0.1:8000/api/auth/follows/${profile_id}`,{
            method:"POST",
            headers: {
                'Authorization': bearer,
                
            },

          }).then((response)=>response.json())
            .then((data)=>{
            })
            .catch((data)=>{
              console.log("Error:",data.error);

            })
            setTimeout("location.reload(true);",500);
}

profileController()
getfollo()
amIfollowing() 

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