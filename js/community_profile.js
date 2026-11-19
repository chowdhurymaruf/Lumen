
// STORE COMMUNITY INFORMATION

let currentCommunity = {};

let isJoined = false;


// LOAD JSON DATA

fetch("data/community.json")

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        // GET COMMUNITY ID FROM URL

        let parameters = new URLSearchParams(
            window.location.search
        );

        let selectedId = parameters.get("id");


        // FIND SELECTED COMMUNITY

        for (let i = 0; i < data.communities.length; i++) {

            if (data.communities[i].id === selectedId) {

                currentCommunity = data.communities[i];

                break;

            }

        }


        // CHECK IF COMMUNITY EXISTS

        if (currentCommunity.id === undefined) {

            document.getElementById("communityPosts").innerHTML =
                "<p class='no-posts'>Community not found.</p>";

            return;

        }


        // UPDATE PAGE TITLE

        document.title = "LUMEN - " + currentCommunity.name;


        // DISPLAY INFORMATION AND POSTS

        displayCommunity();

        displayPosts();

    })


    .catch(function(error) {

        document.getElementById("communityPosts").innerHTML =
            "<p class='no-posts'>Unable to load community data.</p>";

        console.log(error);

    });



// DISPLAY COMMUNITY INFORMATION

function displayCommunity() {

    let logo = document.getElementById("communityLogo");


    // COMMUNITY LOGO

    if (currentCommunity.logoImage !== "") {

        logo.innerHTML =
            "<img src='" + currentCommunity.logoImage +
            "' alt='Community logo'>";

    } else {

        logo.innerHTML = currentCommunity.logoText;

    }


    // COMMUNITY DETAILS

    document.getElementById("communityName").innerHTML =
        currentCommunity.name;

    document.getElementById("communityCategory").innerHTML =
        currentCommunity.category;

    document.getElementById("communityMembers").innerHTML =
        currentCommunity.members + " Members";

    document.getElementById("communityDescription").innerHTML =
        currentCommunity.description;

    document.getElementById("postCount").innerHTML =
        currentCommunity.posts.length + " Posts";


    updateJoinButton();

}



// DISPLAY COMMUNITY POSTS

function displayPosts() {

    let postArea =
        document.getElementById("communityPosts");

    postArea.innerHTML = "";


    // SEARCH VALUE

    let searchValue = document
        .getElementById("searchPosts")
        .value.toLowerCase();


    let foundPosts = 0;


    // LOOP THROUGH POSTS

    for (let i = 0; i < currentCommunity.posts.length; i++) {

        let post = currentCommunity.posts[i];


        let searchText = (

            post.title + " " +
            post.description + " " +
            post.author + " " +
            post.tags.join(" ")

        ).toLowerCase();


        if (searchText.includes(searchValue)) {

            foundPosts++;


            // CREATE TAGS

            let tagsHTML = "";

            for (let j = 0; j < post.tags.length; j++) {

                tagsHTML +=
                    "<span class='post-tag'>" +
                    post.tags[j] +
                    "</span>";

            }


            // CREATE AVATAR

            let avatarHTML = "";

            if (post.avatar !== "") {

                avatarHTML =
                    "<img src='" + post.avatar +
                    "' alt='Profile photo'>";

            } else {

                avatarHTML =
                    post.author.charAt(0).toUpperCase();

            }


            // INTEREST BUTTON STATUS

            let buttonText = post.interested ?
                "Interested" : "I'm Interested";

            let buttonDisabled = post.interested ?
                "disabled" : "";


            // CREATE POST CARD

            let postHTML = `

                <div class="community-post">

                    <div class="post-user">

                        <div class="post-avatar">
                            ${avatarHTML}
                        </div>

                        <div>

                            <h4>${post.author}</h4>

                            <span>${post.time}</span>

                        </div>

                    </div>


                    <h3 class="post-title">
                        ${post.title}
                    </h3>


                    <p class="post-description">
                        ${post.description}
                    </p>


                    <div class="post-tags">
                        ${tagsHTML}
                    </div>


                    <div class="post-footer">

                        <span class="post-time">
                            ${post.responses} teachers responded
                        </span>


                        <button
                            class="interest-btn"
                            onclick="showInterest(${post.id})"
                            ${buttonDisabled}
                        >

                            ${buttonText}

                        </button>

                    </div>

                </div>

            `;


            postArea.innerHTML += postHTML;

        }

    }


    // NO POSTS FOUND

    if (foundPosts === 0) {

        postArea.innerHTML =
            "<p class='no-posts'>No matching learning requests found.</p>";

    }

}



// SEARCH POSTS

document.getElementById("searchPosts")
    .addEventListener("keyup", displayPosts);



// JOIN / LEAVE COMMUNITY

function updateJoinButton() {

    let button = document.getElementById("joinButton");

    if (isJoined === true) {

        button.innerHTML = "Leave Community";

    } else {

        button.innerHTML = "Join Community";

    }

}


document.getElementById("joinButton")
    .addEventListener("click", function() {

        if (isJoined === false) {

            isJoined = true;

            currentCommunity.members++;

        } else {

            isJoined = false;

            currentCommunity.members--;

        }


        document.getElementById("communityMembers").innerHTML =
            currentCommunity.members + " Members";


        updateJoinButton();

    });



// TEACHER INTEREST BUTTON

function showInterest(postId) {

    // USER MUST JOIN FIRST

    if (isJoined === false) {

        alert("Please join the community first!");

        return;

    }


    // FIND THE SELECTED POST

    for (let i = 0; i < currentCommunity.posts.length; i++) {

        if (currentCommunity.posts[i].id === postId) {

            currentCommunity.posts[i].responses++;

            currentCommunity.posts[i].interested = true;


            displayPosts();

            return;

        }

    }

}
