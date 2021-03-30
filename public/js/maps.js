//function calls  the map, this is called in the map.handlebars when the script on line 10
function initMap() {
  //renders map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.9463, lng: -93.1100 },
    zoom: 11,
  });
  

  //loops through array and calls addMarker function for every item in array
  for(let i=0; i < locations.length; i++) {
    addMarker(locations[i])
  }

  //creates marker to page
  function addMarker(coords) {
  const markers = new google.maps.Marker({
      position: coords,
      map: map,
    });
  };

  console.log(locations)

};  


  const locations = [
    {lat: 44.9231, lng: -93.1085},
    {lat: 44.9470, lng: -93.1141},
    {lat: 44.9758, lng: -93.1880},
    {lat: 44.9222, lng: -93.0721},
    {lat: 44.9534, lng: -93.1201},
    {lat: 44.9356, lng: -93.1124},
    {lat: 44.8474, lng: -92.9953}
  ];

//this gets data here - trying to push to array, getting error message in console
document.querySelectorAll('#park-btn').addEventListener('click', function (event) {
  event.preventDefault();

  const parkCoords = {
    lat: event.target.getAttribute("data-lat"),
    lng: event.target.getAttribute("data-lng")
  }
  console.log(parkCoords)
})