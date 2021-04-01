
//this will search through our database eventually
let filterGroups = {
    sports: ["Basketball", "Volleyball", "Soccer", "Baseball", "Tennis", "Ice Rink", "Skate Park", "Disc Golf", "Pickleball"],
    activities: ["Canoe Rentals", "Bike Rentals", "Horseshoes",],
    fishing: ["Boat Launch", "Beach", "Lake", "Pond",],
    family: ["Tables", "Pavillion", "Grills", "Fire Rings", "Rec Center", "Other Shelter",],
    amenities: ["Aquatics Center", "Playgrounds", "Trails", "Grass Fields", "Dog Park",],
};
//used to convert filterGroups strings to camelcase for the purpose of HTML tagging
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
//gets the id of our checkboxes
const attributeGetter = function() {
    let attribute = this.getAttribute("id");
    let attrTarget = document.getElementById("searchBar");
    attrTarget.value = attrTarget.value + " + " + "'" + attribute +"'";
};
  
//empty array for our search object IDs
let searchArray = [];
//init value of currentFilter
let currentFilter = filterGroups.sports;
//
let listenerIDs = [];
//function to take filters from database/array and put them into our DOM
function searchBarPopLoop () {
    //main loop for generating search filters
    for (i=0; i <= 4; i++) {
        
        if (i === 1) {
            currentFilter = filterGroups.activities;
        } if (i === 2) {
            currentFilter = filterGroups.fishing;
        } if (i === 3) {
            currentFilter = filterGroups.family;
        } else if (i === 4) {
            currentFilter = filterGroups.amenities;
        };
        //array of variables that determine how many Boostrap columns will be needed for the filterGroups, and rounds them if they aren't integers
        let divvies = [sportsDivvy = Math.round(currentFilter.length/4), activityDivvy = Math.round(currentFilter.length/4), fishingDivvy = Math.round(currentFilter.length/4), picnicDivvy = Math.round(currentFilter.length/4), amenityDivvy = Math.round(currentFilter.length/4)];
        //array of variable that determine the size of the columns being made
        let columnCalc = [sportsColumnCalc = 12/divvies[0], activityColumnCalc = 12/divvies[1], fishingColumnCalc = 12/divvies[2], picnicColumnCalc = 12/divvies[3], amenityColumnCalc = 12/divvies[4],];
        //array of variables that rounds our column size to the neares even number for even spacing of the filterGroups
        let columnSize = [sportsColumnSize = 2*Math.round(columnCalc[0]/2), activityColumnSize = 2*Math.round(columnCalc[1]/2), fishingColumnSize = 2*Math.round(columnCalc[2]/2), picnicColumnSize = 2*Math.round(columnCalc[3]/2), amenityColumnSize = 2*Math.round(columnCalc[4]/2),];
        //array to store the filterGroup names as strings
        let filterNames = ["sports", "activities", "fishing", "family", "amenities"];
        //empty array to store filter element ids
        let currentIds = [];
        //empty array to store filter checkbox HTML
        let filterHTML = [];
        
        //the number of columns needed for our current filterGroup
        let currentDivvy = divvies[i];
        //the size of the columns needed, unrounded. this isn't used, it's just here for debugging/logging purposes
        let currentCCalc = columnCalc[i];
        //the size of the columns needed, rounded to the nearest even integer
        let currentCSize = columnSize[i];
        let currentFName = filterNames[i];
        console.log ("currentDivvy:", currentDivvy);
        console.log ("currentCCalc:", currentCCalc);
        console.log ("currentCSize;", currentCSize);

        //selects which element we're putting filters in and assigns it a responsively sized column and id. also fills the currentIds array with element ids that the filter checkboxes are appended to
        for (n=0; n < currentDivvy; n++) {
            $("#" + currentFName + "Filters").append("<div class='col-md-" + currentCSize + " " + currentFName + "column' id='" + currentFName + "Populate" + n + "'></div>");
            currentIds.push("#" + currentFName + "Populate" + n);
        };
        console.log("currentIds", currentIds);
        //generates the HTML for our checkboxes, all properly id'd and everything
        for (x=0; x < currentFilter.length; x++) {
            filterHTML.push("<div class='form-check'><input class='form-check-input' type='checkbox' id='" + camelize(currentFilter[x]) + "'><label class='form-check-label' for='flexCheckDefault' value=''>" + currentFilter[x] + "</label></div>")
            console.log(currentFName);
            console.log(currentFilter[x]);
        };
        console.log("filterHTML:", filterHTML);

        //init values for the arraySlicer function
        let slicerEnd = 4;
        let slicerStart = slicerEnd-4

        //function that puts all of this together and populates the search bar with filters
        for (y=0; y < currentIds.length;) {
            console.log("y:", y)
            //array to hold which 4 filters are being passed into our ids
            let arraySlicer = filterHTML.slice(slicerStart, slicerEnd);
            $(currentIds[y]).append(arraySlicer);
            //calculates if our array/database doesn't divide by 4 well and then makes space for the remainder
            if ((currentFilter.length - slicerEnd) < 4 && (currentFilter.length - slicerEnd) > 0) {
                let remainder = currentFilter.length - slicerEnd;
                console.log("remainder:", remainder);
                //sets remainderStart and End to the values of our extra filters
                let remainderStart = slicerStart+=(4+remainder);
                console.log("remainderStart:", remainderStart);
                let remainderEnd = slicerEnd+=remainder;
                console.log("remainderEnd:", remainderEnd);
                //new slice function for our remainder filters
                let remainderSlicer = filterHTML.slice(remainderStart, remainderEnd);
                console.log("remainderSlicer:", remainderSlicer)
                //handler for if there's only 1 remaining filter to append to our last div
                if (remainderSlicer.length === 0) { 
                $(currentIds[i]).append(filterHTML[remainderStart - 1]);
                //otherwise, append leftover filters to the current currentId div
                } else {
                $(currentIds[i]).append(remainderSlicer);
                };
             //stops the slicers from iterating if we've gone too far
            } else if (slicerStart > currentFilter.length && slicerEnd > currentFilter.length) {
            slicerStart = currentFilter.length;
            slicerEnd = currentFilter.length;
            //slicers can only iterate if there's enough space for them
            } else if (currentFilter.length - slicerEnd >= 4 && currentFilter.length - slicerStart >= 5)  {
            slicerStart = slicerEnd;
            slicerEnd+=4;
            }
            y++;
        };
        for (z=0; z < currentFilter.length; z++) {
            let camelID = camelize(currentFilter[z]);
            console.log("camelID:", camelID);
            listenerIDs.push("#" + camelID);
        }
        //re-empties these arrays
        currentIds = [];
        filterHTML = [];
        console.log("currentIds", currentIds);
        console.log("ListenerIDs:", listenerIDs)
        console.log("i:", i);
        
    };
};  

function listenerGenerator() {
    let checkBoxes = document.getElementsByClassName("form-check-input");
    for (i=0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener('click', attributeGetter)
    };
};

window.onload = function searchBarPop() {
    searchBarPopLoop();
    listenerGenerator();
};

 //clicking filters adds them to the search bar, and adds them to searchArray as table IDs. apologies in advance for the dry code
 let searchButton = document.getElementById("searchButton");

 const parkSearch = async (event) => {
     event.preventDefault();
 
     let searchBarText = document.getElementById("searchBar");
     let searchValue = searchBarText.value
     if(searchValue.includes("'basketball'")) {
         searchArray.push(3);
     } if(searchValue.includes("'tennis'")) {
         searchArray.push(20)
     } if(searchValue.includes("'volleyball'")) {
         searchArray.push(5);
     } if(searchValue.includes("'soccer'")) {
         searchArray.push(19);
     } if(searchValue.includes("'baseball'")) {
         searchArray.push(2);
     } if(searchValue.includes("'iceRink'")) {
         searchArray.push(22);
     } if(searchValue.includes("'skatePark'")) {
         searchArray.push(17);
     } if(searchValue.includes("'horseshoes'")) {
         searchArray.push(13);
     } if(searchValue.includes("'pickleball'")) {
         searchArray.push(23);
     }  if(searchValue.includes("'discGolf'")) {
         searchArray.push(7);
     } if(searchValue.includes("'grills'")) {
         searchArray.push(4);
     } if(searchValue.includes("'tables'")) {
         searchArray.push(24);
     } if(searchValue.includes("'pavillion'")) {
         searchArray.push(25);
     } if(searchValue.includes("'otherShelter'")) {
         searchArray.push(15);
     } if(searchValue.includes("'fireRing'")) {
         searchArray.push(10);
     } if(searchValue.includes("'lake'")) {
         searchArray.push(26);
     } if(searchValue.includes("'boatLaunch'")) {
         searchArray.push(6);
     } if(searchValue.includes("'fishing'")) {
         searchArray.push(11);
     } if(searchValue.includes("'beach'")) {
         searchArray.push(27);
     } if(searchValue.includes("'playgrounds'")) {
         searchArray.push(16);
     } if(searchValue.includes("'trails'")) {
         searchArray.push(28);
     } if(searchValue.includes("'aquaticsCenter'")) {
         searchArray.push(1);
     } if(searchValue.includes("'canoeRentals'")) {
         searchArray.push(29);
     } if(searchValue.includes("'dogPark'")) {
         searchArray.push(8);
     } if(searchValue.includes("'recCenter'")) {
         searchArray.push(30);
     } 
     console.log("searchArray:", searchArray)
 
 
     if (searchArray) {
         let data = await fetch('api/parks/filter-parks', {
             method: 'POST',
             body: JSON.stringify({ searchArray }),
             headers: { 'Content-Type' : 'application/json' }
         })
         .then ( (response) => response.json())
         .then ( (data => {
             return data;
         }))

         for (let i = 0; i < data.length; i++) {

            // div class=col-md-6
            const colDiv = document.createElement('div');
            // div class=card
            const cardDiv = document.createElement('div');
            // div class=card-body
            const cardbodyDiv = document.createElement('div');
            // h5 class=card-title
            const cardtitleEl = document.createElement('h5');
            // p class=address
            const addressEl = document.createElement('p');
            // <a href="#" class="btn btn-primary map-btn" id="park-btn" data-lat="{{parks.[0].latitude}}" data-lng="{{parks.[0].longitude}}">show on map</a>
            const alink = document.createElement('a');

            const iName = document.createElement('i');
            const iAddress = document.createElement('i');

            
            let name = data[i].name;
            let address = data[i].address;

            console.log(name, address);
            console.log(data);


            const resultsOverFlow = document.querySelector('#resultsOverflow');

            let coldivClass = resultsOverFlow.appendChild(colDiv);
            let carddivClass = colDiv.appendChild(cardDiv);
            let cardbodydivClass = cardDiv.appendChild(cardbodyDiv);
            let cardtitleelClass = cardbodyDiv.appendChild(cardtitleEl);
            let inameClass = cardtitleEl.appendChild(iName);
            let addresselClass = cardbodyDiv.appendChild(addressEl);
            let iaddressClass = addressEl.appendChild(iAddress);
            let alinkClass = cardbodyDiv.appendChild(alink);

            coldivClass.setAttribute('class', 'col-md-6 ' + [i]);
            carddivClass.setAttribute('class', 'card ' + [i]);
            carddivClass.setAttribute('style', 'width: 16rem')
            cardbodydivClass.setAttribute('class', 'card-body ' + [i]);
            cardtitleelClass.setAttribute('class', 'card-title ' + [i]);
            addresselClass.setAttribute('class', 'address ' + [i]);

            alinkClass.setAttribute('href', '#');
            alinkClass.setAttribute('class', 'btn btn-primary map-btn');
            alinkClass.setAttribute('id', 'park-btn');
            alinkClass.setAttribute('data-lat', data[i].latitude);
            alinkClass.setAttribute('data-lng', data[i].longitude);

            inameClass.setAttribute('class', 'fa fa-tree')
            iaddressClass.setAttribute('class', 'fa fa-road')


            cardtitleEl.innerHTML += name;
            addressEl.innerHTML += address;
            alink.innerHTML += 'Show on Map'

            cardbodyDiv.appendChild(cardtitleEl);
            cardbodyDiv.appendChild(addressEl);
            cardbodyDiv.appendChild(alink);

         }
 
     }
 }
 
 searchButton.addEventListener('click', parkSearch)

