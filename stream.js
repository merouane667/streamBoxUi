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
const user = JSON.parse(localStorage.getItem("user"));
const goToYourProfile = document.querySelector(".username");
goToYourProfile.setAttribute('onclick',`goToProfile(${user.user.id})`);

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
