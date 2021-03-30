let sports = ["Basketball", "Volleyball", "Soccer", "Baseball", "Tennis", "Ice Skating", "Skating", "Disc Golf", "Pickleball"];
let activities = ["Kayaking", "Canoe Rentals", "Bike Rentals", "Horseshoes"];
let picnic = ["Grills", "Fire Rings", "Pavilion", "Picnic Tables"]
let amenities = ['Aq'];

//empty array for sportsPopulateIds
let sportsPopulateIds = [];
//empty array that holds our check boxes for the sports search filters
let sportsFilters = [];

window.onload = function sportsPopulater() {
    //determines how many columns we need, and rounds them to the nearest numbr
    let sportsDivvy = Math.round(sports.length/4);
    //determens how many columns we need roughly
    let columnCalc = 12/sportsDivvy;
    //in case columnCalc is an odd number or has a decimal, round it to the nearest even number
    let columnSize = 2*Math.round(columnCalc/2);

    //determines how many columns are needed to populate filters to and creates divs with the correct number of columns
    for (i=0; i < sportsDivvy; i++) {
    //generates a column in the sportsFilers div with size dependent on how many items are in sports
        $("#sportsFilters").append("<div class='col-md-" + columnSize + " sportsColumn' id='sportsPopulate" + i + "'></div>")
    };

    //fills sportsPopulateIds with  sportsPopulate id's that we'll be using
    for (i=0; i < columnCalc - 1; i++) {
        sportsPopulateIds.push("#sportsPopulate" + i);
    };

    //populates our sportsFilters array with HTML strings
    for (i=0; i < sports.length; i++) {
        sportsFilters.push("<div class='form-check'><input class='form-check-input' type='checkbox' value='' id='flexCheckDefault'><label class='form-check-label' for='flexCheckDefault' value='" + sports[i] + "'>" + sports[i] + "</label></div>")
    };
    
    //init values of sportsSlicer
    let slicerEnd = 4;
    let slicerStart = slicerEnd-4;
    //array that holds the value of which 4 filters we're passing in to our ids
    let sportsSlicer = sportsFilters.slice(slicerStart, slicerEnd);

    //populates the sportsPopulate divs 
    for (i=0; i < sportsPopulateIds.length;) {
        $(sportsPopulateIds[i]).append(sportsSlicer);
        slicerEnd+=4;
        i++;
        console.log(i);
        console.log("slicerStart:", slicerStart);
        console.log("slicerEnd:", slicerEnd);
        console.log("sportsSlicer:", sportsSlicer);
    };

    console.log("sportsFilters:", sportsFilters);
    console.log("sportsPopulateIds:", sportsPopulateIds)
    console.log("sportsDivvy:", sportsDivvy);
    console.log("columnCalc:", columnCalc)
    console.log("columnSize:", columnSize);
};