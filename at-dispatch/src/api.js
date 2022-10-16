module.exports = class Api {
    
    Api() {}
    async getKeys() {
        try {
            const request = await fetch('http://192.168.12.156:8080/db/scan', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const response = await request.json();
            for (let i = 0; i < response.length; i++) {
                if (response[i].includes('_t')) {
                    response.splice(i, 1);
                }
            }
            return response;
        } catch (err) {
            return err;
        }
    }

    async getKey(key) {
        try {
            const request = await fetch('http://192.168.12.156:8080/db/getkey?key=' + key, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            const response = await request.json();
            return response;
        } catch (err) {
            return err;
        }
    }

    async submitRide(pickup, dropoff, contact, schedDateTime = null) {
        try {
            const response = await fetch("http://192.168.12.156:8080/db/createride", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    up: pickup, 
                    drop: dropoff, 
                    number: contact,
                    reqDateTime: new Date().toLocaleString(),
                    schedDateTime: new Date(schedDateTime).toLocaleString()
                })
            });
            const content = await response.json();
            console.log(content);
            return content;
        } catch (err) {
            return err;
        }
    }

    async submitLogin(form) {
        try {
            const response = await fetch('http://192.168.12.156:8080/db/login', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new FormData(form))
            })
        } catch (err) {
            return err;
        }
    }
}


