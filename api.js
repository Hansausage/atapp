const accesstoken = 'pk.eyJ1IjoiYWNhYmdhYnJpZWwiLCJhIjoiY2wxeXZoeWNiMGFqbjNkbWk3N212cG90MCJ9.ZHcKscmMgU512WYIh5LDlA';
const atapp_server = 'http://server.atapp.test';
const mapbox_places = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

//mapbox geocoding
async function requestForwardGeo(place) {
    const rawResponse = await fetch(mapbox_places + place + '.json?bbox=-86.3291,44.24672,-85.00427,45.209985&proximity=-85.62497,44.73323&access_token=' + accesstoken, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const content = await rawResponse.json();
    return content;
}

async function requestReverseGeo(latlng) {
const query = latlng.lng + ',' + latlng.lat;
const rawResponse = await fetch(mapbox_places + query + '.json?types=address&access_token=' + accesstoken, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const content = await rawResponse.json();
    address = content.features[0].place_name.toString();
    console.log(content);
    return address;
}

//textbelt server
async function submitText(a, b, c) {
    const response = await fetch(atapp_server, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            number: '2314937699',
            message: a + ' => ' + b,
        })
    });
    const content = await response.json();
    console.log(content);
    return content;
}

//search
async function search(place) {
    try {
        const response = await requestForwardGeo(place);
        let coords = [];
        let address = [];
        for (i = 0; i < response.features.length; i++) {
            coords[i] = response.features[i].center;
            address[i] = response.features[i].place_name;
        }
        return {
            _center: coords,
            _place_name: address,
        }
    } catch(err) { console.log(err); }
}

//atapp-server
async function submitRequest(pickup, dropoff, isReturn, contact) {
    const response = await fetch(atapp_server + "/db/createride", {
        method: 'POST',
         headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            up: pickup, 
            drop: dropoff, 
            return: isReturn, 
            number: contact,
            reqDateTime: new Date().toLocaleString()
        })
    });

    const content = await response.json();
    console.log(content);
    return content;
}