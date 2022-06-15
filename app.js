function solve() {
    let currentStop = 'depot';
    let nextStop = '';
    let infoBox = document.getElementsByClassName('info')[0];

    function depart() {
        let baseURL = 'http://localhost:3030/jsonstore/bus/schedule/';
        fetch((baseURL + currentStop))
            .then((res) => res.json())
            .then((data) => {
                currentStop = data.name;
                nextStop = data.next;
                infoBox.textContent = `Next stop ${currentStop}`;
                document.getElementById('depart').disabled = true;
                document.getElementById('arrive').disabled = false;
            })
            .catch((error) => {
                infoBox.textContent = "Error";
                document.getElementById('depart').disabled = true;
                document.getElementById('arrive').disabled = true;
            });

    }

    function arrive() {
        infoBox.textContent = `Arriving at ${currentStop}`;
        document.getElementById('depart').disabled = false;
        document.getElementById('arrive').disabled = true;
        currentStop = nextStop;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();