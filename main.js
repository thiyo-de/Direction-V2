//Auto Trigger

window.addEventListener("DOMContentLoaded",getingUserLocation);

// Geting User Location
function getingUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Show User Coords
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(mapUrl, "_blank");
}

// Error
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("output").innerHTML =
        "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("output").innerHTML =
        "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.getElementById("output").innerHTML =
        "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("output").innerHTML =
        "An unknown error occurred.";
      break;
  }
}
