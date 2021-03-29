
const parkCoordinates = [{}]

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.977, lng: -93.264 },
    zoom: 10,
  });
  const marker = new google.maps.Marker({
    position: 
      {lat: 44.9231, lng: -93.1085},
      // {lat: 44.9470, lng: -93.1141},
      // {lat: 44.9758, lng: -93.1880},
      // {lat: 44.9222, lng: -93.0721},
      // {lat: 44.9534, lng: -93.1201},
      // {lat: 44.9356, lng: -93.1124},
      // {lat: 44.8474, lng: -92.9953}
    map: map
  })
};
