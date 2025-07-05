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

function showPosition(position) {
  userLat = position.coords.latitude;
  userLng = position.coords.longitude;

  document.getElementById(
    "user-location"
  ).innerText = `You are here: ${userLat.toFixed(4)}, ${userLng.toFixed(4)}`;

  // Show map centered on user location
  document.getElementById(
    "map"
  ).src = `https://maps.google.com/maps?q=${userLat},${userLng}&hl=es;&output=embed`;

  // Hide loader, show content
  document.getElementById("loader").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");

  // Render the place menu
  const placeList = document.getElementById("placeList");
  places.forEach((place) => {
    const li = document.createElement("li");
    li.textContent = place.name;
    li.onclick = () => {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${place.lat},${place.lng}&travelmode=driving&hl=en`;
      window.open(url, "_blank"); // Open in a new tab
    };
    placeList.appendChild(li);
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
