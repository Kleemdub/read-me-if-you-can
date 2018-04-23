document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

// Code for Google maps
const googleMapApi = 3;
//process.env.googleMap_id;

function startMap() {
  const ironhackBCN = {
  	lat: 48.8718279,
    lng: 2.3110933
  };
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: ironhackBCN
    }
  );
}

const myMarker = new google.maps.Marker({
  position: {
  	lat: 48.8718279,
  	lng: 2.3110933
  },
  map: map,
  title: "I'm here"
});

startMap();
