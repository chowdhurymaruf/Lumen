
// STORE ALL COMMUNITIES

let allCommunities = [];


// LOAD JSON DATA

fetch("data/community.json")

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        allCommunities = data.communities;

        displayCommunities();

    })

    .catch(function(error) {

        document.getElementById("communitiesList").innerHTML =
            "<p class='no-communities'>Unable to load communities.</p>";

        console.log(error);

    });


// DISPLAY COMMUNITY CARDS

function displayCommunities() {

    let communityArea =
        document.getElementById("communitiesList");

    let searchValue = document
        .getElementById("communitySearch")
        .value.toLowerCase();

    communityArea.innerHTML = "";

    let foundCommunities = 0;


    // LOOP THROUGH ALL COMMUNITIES

    for (let i = 0; i < allCommunities.length; i++) {

        let community = allCommunities[i];

        let searchText = (
            community.name + " " +
            community.category + " " +
            community.description
        ).toLowerCase();


        // CHECK SEARCH VALUE

        if (searchText.includes(searchValue)) {

            foundCommunities++;


            // DISPLAY LOGO

            let logoHTML = "";

            if (community.logoImage !== "") {

                logoHTML =
                    "<img src='" + community.logoImage +
                    "' alt='Community logo'>";

            } else {

                logoHTML = community.logoText;

            }


            // CREATE COMMUNITY CARD

            let cardHTML = `

                <a class="community-card"
                   href="community_profile.html?id=${community.id}">

                    <div class="community-card-header">

                        <div class="directory-logo">
                            ${logoHTML}
                        </div>

                        <div class="community-card-info">

                            <h3>${community.name}</h3>

                            <span>${community.category}</span>

                        </div>

                    </div>


                    <p class="community-card-description">
                        ${community.description}
                    </p>


                    <div class="community-card-footer">

                        <span class="community-member-count">
                            ${community.members} Members
                        </span>

                        <span class="view-community">
                            View Community →
                        </span>

                    </div>

                </a>

            `;


            communityArea.innerHTML += cardHTML;

        }

    }


    // UPDATE COMMUNITY COUNT

    document.getElementById("communityCount").innerHTML =
        foundCommunities + " Communities";


    // NO SEARCH RESULTS

    if (foundCommunities === 0) {

        communityArea.innerHTML =
            "<p class='no-communities'>No communities found.</p>";

    }

}


// SEARCH COMMUNITIES

document.getElementById("communitySearch")
    .addEventListener("keyup", displayCommunities);
