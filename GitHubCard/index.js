const cards = document.querySelector(".cards");

/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get(`https://api.github.com/users/alexjoeb`).then(({ data }) => {
    console.log(data);
    cards.append(template(data));
});

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

axios
    .get("https://api.github.com/users/alexjoeb/followers")
    .then(({ data }) => {
        data.forEach(item => {
            axios
                .get(`https://api.github.com/users/${item.login}`)
                .then(({ data }) => {
                    cards.append(template(data));
                });
        });
    })
    .catch(err => console.log(err));

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const element = type => document.createElement(type);

// ! AC = Add Class
const ac = (e, c) => {
    e.classList.add(c);
};

const template = data => {
    // Define Elements
    const card = element("div"),
        cardInfo = element("div"),
        img = element("img");

    // Add Class Names
    ac(card, "card");
    ac(cardInfo, "card-info");

    // Setting content
    img.src = data.avatar_url; // ! Image of URL for user.

    // Appending
    card.append(img);
    card.append(cardInfo);

    // Define Elements
    const h3 = element("h3"),
        username = element("p"),
        location = element("p"),
        profile = element("p"),
        a = element("a"),
        followers = element("p"),
        following = element("p"),
        bio = element("p");

    // Add Class Names
    ac(h3, "name");
    ac(username, "username");

    // Setting content
    h3.textContent = data.login;
    location.textContent = data.location || "It's a secret.";
    profile.textContent = "Profile: ";
    a.href = data.html_url;
    a.textContent = data.html_url;
    followers.textContent = `Followers: ${data.followers}`;
    following.textContent = `Following: ${data.following}`;
    bio.textContent = `Bio: ${data.bio ||
        "I haven't written my really awesome bio yet."}`;

    // Appending
    cardInfo.append(h3);
    cardInfo.append(username);
    cardInfo.append(location);
    cardInfo.append(profile);
    profile.append(a);
    cardInfo.append(followers);
    cardInfo.append(following);
    cardInfo.append(bio);

    return card;
};