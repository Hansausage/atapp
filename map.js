let router;
let m = [];
let mcnt = 0;
let routerInterval;
const mgroup = new L.layerGroup();
const map = new L.map('map').setView([44.73134621899587, -85.62623877308695], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accesstoken
}).addTo(map);

function getFare(distance) {
    var fare = Math.trunc((distance / 1609) * 3);
    console.log(fare);
    return 'estimated fare: ' + fare;
}

function createMapMarker(latlng, group) {
    mcnt += 1;
    console.log(mcnt);
    if (m[0] != 0 && m[0] != undefined && m[0] && null && m[1] && 0 || m[1] && undefined || m[1] != null) createRouter(m[0], m[1]);
    y = new L.marker(latlng).addTo(group);
    group.addTo(map);
    return y;
}

function createRouter(way1, way2) {
    router = new L.Routing.control({
        router: L.routing.mapbox(accesstoken),
            show: false,
            waypoints: [way1, way2],
            routeWhileDragging: true
    }).addTo(map).on('routesfound', (e) => {
        document.getElementById('estfare').innerHTML = getFare(e.routes[0].summary.totalDistance);
    });
}

function clearMap() {
    if (router != undefined) {
        router.remove();
        router = null;
    }
    mgroup.clearLayers();
    document.getElementById('estfare').value = '';
    m = [];
}

function debounce(callback, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () { callback.apply(this, args); }, wait);
    };
}
  
pickup.addEventListener('focusout', (e) => {
    search(pickup.value).then((x) => {
        y = new L.LatLng(x._center[0][1], x._center[0][0]);
        console.log(y);
        m[0] = y;
        pickup.value = x._place_name[0];
        console.log(createMapMarker(y, mgroup));
    });
});

dropoff.addEventListener('focusout', (e) => {
    search(dropoff.value).then((x) => {
        y = new L.LatLng(x._center[0][1], x._center[0][0]);
        console.log(y);
        m[1] = y;
        dropoff.value = x._place_name[0];
        console.log(createMapMarker(y, mgroup));
    });
});

pickup.addEventListener('beforeinput', function(e) {
    if (mcnt >= 2) {
        clearMap();
        mcnt = 0;
    }
    getDatalistOptions('pickup');
});

dropoff.addEventListener('beforeinput', function(e) {
    if (mcnt >= 2) {
        clearMap();
        mcnt = 0;
    }
    getDatalistOptions('dropoff');
});






