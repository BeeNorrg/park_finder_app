
const parkCoordinates = [{}]

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.977, lng: -93.264 },
    zoom: 10,
  });
  const marker = new google.maps.Marker({
    position: 
      {lat: 44.9231, lng: -93.1085},

    map: map
  })
};
