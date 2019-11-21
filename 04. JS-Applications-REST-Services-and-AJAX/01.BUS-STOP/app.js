function getInfo() {
    const stopId = document.getElementById('stopId');
    let id = stopId.value;
    let stopName = document.getElementById('stopName');

    fetch(`https://judgetests.firebaseio.com/businfo/${id}.json`)
        .then(response => response.json())
        .then(data => getBuses(data))
        .catch(error => stopName.textContent = `Error`);

    function getBuses(data) {
        stopName.textContent = `${data.name}`;
        let li = document.createElement('li');
        let buses = Object.entries(data.buses)

        for (const [busId, time] of buses) {
            let li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time}`;
            document.getElementById('buses').appendChild(li);
        }
    }
}