const datalist = document.getElementById('places');
const submitButton = document.getElementById('request');
const returncheck = document.getElementById('return');
const pickup = document.getElementById('pickup');
const dropoff = document.getElementById('dropoff');
const contact = document.getElementById('contact');
let datalistOptions = [];

submitButton.addEventListener('click', function() {
    submitRequest(pickup.value, dropoff.value, returncheck.value, contact.value);
});

function getDatalistOptions(field) {
    datalist.innerHTML = '';
    datalistOptions.splice(0, datalistOptions.length);
    search(document.getElementById(field).value).then((x) => {
        for (const [key, value] of Object.entries(x)) {
            if (key == '_place_name' && !datalistOptions.includes(value)) {
                for (i = 0; i < value.length; i++) {
                    datalistOptions.push(value[i]);
                    if (datalistOptions.length > 5) datalistOptions.length = 5;
                }
                console.log(datalistOptions);
            }
        }
        for (i = 0; i < datalistOptions.length; i++) {
            var option = new Option('', datalistOptions[i]);
            console.log(option);
            datalist.appendChild(option);
        }
    });
}