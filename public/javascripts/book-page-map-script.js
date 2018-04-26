//code for Google maps

function startMap() {
  const mapDiv = document.querySelector('.map');
  const parisCenter = { lat: 48.856614,  lng: 2.3522219000000177 };
  
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
      // map.setCenter(user_location);

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}

const recupBookId = document.querySelector('.book-id').innerHTML;
// console.log(recupBookId);

startMap();

//axios to retrieve Google Map info from the backend
axios.get(`/caching/book/data/${recupBookId}`)
.then((response)=>{
  const cache = response.data;

  const [ lat, lng ] = cache.location.coordinates;
  
  const book_location = {
    lat: lat,
    lng: lng
  };

  map.setCenter(book_location);

  var marker = new google.maps.Marker({
    position: {lat, lng},
    map: map,
    title: cache.book.title,
    animation: google.maps.Animation.DROP
  });
})
.catch((err)=>{
  console.log(err);
  alert("Something went wrong !")
});





  




