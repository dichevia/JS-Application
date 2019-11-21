function solve() {
    const infoBox = document.querySelector(`span`);
    let departBtn = document.querySelector(`#depart`);
    let arriveBtn = document.querySelector(`#arrive`);
    let currentId = `depot`;
    let currentName ='';
    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
        .then(response=>response.json())
        .then(data=>responseInfo(data))
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${currentName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };

    function responseInfo(data){
        currentName = data.name;
        infoBox.textContent = `Next stop ${currentName}`;
        currentId = data.next;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }
}

let result = solve();