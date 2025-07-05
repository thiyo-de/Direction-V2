// Auto Trigger on Page Load (Optional)
window.onload = function() {
  gettingUserLocation();
};

// Getting User Location
function gettingUserLocation() {
  if (navigator.geolocation) {
    document.getElementById("output").innerHTML = "Fetching your location...";
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("output").innerHTML = "Geolocation is not supported by this browser.";
  }
}

// Show User Coordinates
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  alert(`Latitude: ${latitude}\nLongitude: ${longitude}`);

  let mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(mapUrl, "_blank");
}

// Handle Errors
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("output").innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("output").innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.getElementById("output").innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("output").innerHTML = "An unknown error occurred.";
      break;
  }
}
