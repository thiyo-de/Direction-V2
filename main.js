const places = [
  { name: "Trichy", lat: 10.7905, lng: 78.7047 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Coimbatore", lat: 11.0168, lng: 76.9558 },
  { name: "Madurai", lat: 9.9252, lng: 78.1198 },
  { name: "Salem", lat: 11.6643, lng: 78.146 },
  { name: "Erode", lat: 11.341, lng: 77.7172 },
  { name: "Thanjavur", lat: 10.7867, lng: 79.1391 },
  { name: "Tirunelveli", lat: 8.7139, lng: 77.7567 },
  { name: "Tiruppur", lat: 11.1085, lng: 77.3411 },
  { name: "Vellore", lat: 12.9165, lng: 79.1325 },
  { name: "Nagercoil", lat: 8.178, lng: 77.434 },
  { name: "Karur", lat: 10.9601, lng: 78.0766 },
  { name: "Dindigul", lat: 10.3656, lng: 77.97 },
  { name: "Kanchipuram", lat: 12.8342, lng: 79.7036 },
  { name: "Cuddalore", lat: 11.748, lng: 79.7714 },
  { name: "Tuticorin", lat: 8.7642, lng: 78.1348 },
  { name: "Kumbakonam", lat: 10.9601, lng: 79.3845 },
  { name: "Namakkal", lat: 11.2205, lng: 78.1652 },
  { name: "Theni", lat: 10.0153, lng: 77.4777 },
  { name: "Perambalur", lat: 11.2354, lng: 78.881 },
];

let userLat = 0;
let userLng = 0;

// 🆕 Get human-readable address using Nominatim
function getLocationName(lat, lon, callback) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
  )
    .then((response) => response.json())
    .then((data) => {
      const location = data.address.city || data.address.town || data.address.village || data.display_name;
      callback(location);
    })
    .catch((error) => {
      console.error("Geocoding error:", error);
      callback("Unknown Location");
    });
}

function showPosition(position) {
  userLat = position.coords.latitude;
  userLng = position.coords.longitude;

  const mapIframe = document.getElementById("map");
  const placeList = document.getElementById("placeList");

  getLocationName(userLat, userLng, (locationName) => {
    document.getElementById(
      "user-location"
    ).innerText = `You are here: ${locationName} (${userLat.toFixed(
      4
    )}, ${userLng.toFixed(4)})`;

    mapIframe.src = `https://maps.google.com/maps?q=${userLat},${userLng}&hl=es;&output=embed`;

    document.getElementById("loader").style.display = "none";
    document.getElementById("mainContent").classList.remove("hidden");

    let currentActive = null;

    const yourLocationLi = document.createElement("li");
    yourLocationLi.textContent = "📍 Your Location";
    yourLocationLi.onclick = () => {
      mapIframe.src = `https://maps.google.com/maps?q=${userLat},${userLng}&hl=es;&output=embed`;
      if (currentActive) currentActive.classList.remove("active");
      yourLocationLi.classList.add("active");
      currentActive = yourLocationLi;
    };
    placeList.appendChild(yourLocationLi);

    places.forEach((place) => {
      const li = document.createElement("li");
      li.textContent = place.name;
      li.onclick = () => {
        const mapSrc = `https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d19454.29600938653!2d78.68570509848412!3d10.77768427993685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e0!4m3!3m2!1d${userLat}!2d${userLng}!4m3!3m2!1d${place.lat}!2d${place.lng}!5e1!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`;
        mapIframe.src = mapSrc;
        if (currentActive) currentActive.classList.remove("active");
        li.classList.add("active");
        currentActive = li;
      };
      placeList.appendChild(li);
    });

    yourLocationLi.classList.add("active");
    currentActive = yourLocationLi;
  });
}

function showError(error) {
  document.getElementById("loader").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
  document.getElementById("user-location").innerText =
    "Unable to fetch your location.";
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  document.getElementById("loader").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
  document.getElementById("user-location").innerText =
    "Geolocation is not supported by this browser.";
}
