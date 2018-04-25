//code for Google maps

function startMap() {
  const mapDiv = document.querySelector('.map');
  const parisCenter = { lat: 48.856614,  lng: 2.3522219000000177 };
  // const user1 = { lat: 48.8762767,  lng: 2.3318527 };
  // const user2 = { lat: 48.853185,  lng: 2.343240899999955 };
  // const user3 = { lat: 48.8489901,  lng: 2.333889 };
  // const user4 = { lat: 48.83565499999999,  lng: 2.396356400000059 };

  map = new google.maps.Map(mapDiv, {
  zoom: 12,
  center: parisCenter
});




//code to center the map based on user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      const userMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here",
        animation: google.maps.Animation.DROP
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}

startMap();

//axios to retrieve Google Map info from the backend
axios.get("/caching/data")
.then((response)=>{
  const cacheList = response.data;

  cacheList.forEach((oneCache) => {
    const [ lat, lng ] = oneCache.location.coordinates;
    new google.maps.Marker({
      position: {lat, lng},
      map: map,
      title: oneCache.clue,
      animation: google.maps.Animation.DROP
    });
  })
})
.catch((err)=>{
  console.log(err)
  alert("Something went wrong !")
});



const locationInput = document.querySelector(".location-input");
const latInput = document.querySelector(".lat-input");
const lngInput = document.querySelector(".lng-input");

const autocomplete = new google.maps.places.Autocomplete(locationInput);

autocomplete.addListener("place_changed", () => {
  const place = autocomplete.getPlace();
  const loc = place.geometry.location;

  latInput.value = loc.lat();
  lngInput.value = loc.lng();
});
  




