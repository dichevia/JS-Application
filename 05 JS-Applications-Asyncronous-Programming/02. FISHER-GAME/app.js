function attachEvents() {

    const addBtn = document.querySelector("#addForm .add");
    const loadBtn = document.querySelector(".load");
    const catches = document.querySelector("#catches");

    const AddElements = {
        angler: () => document.querySelector("#addForm .angler"),
        weight: () => document.querySelector("#addForm .weight"),
        species: () => document.querySelector("#addForm .species"),
        location: () => document.querySelector("#addForm .location"),
        bait: () => document.querySelector("#addForm .bait"),
        captureTime: () => document.querySelector("#addForm .captureTime"),
    }


    const operations = function () {

        let baseURL = `https://fisher-game.firebaseio.com/catches/`;

        const post = function (data) {
            return fetch(`${baseURL}` + ".json",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
        };

        const get = function () {
            return fetch(`${baseURL}` + ".json")
                .then(response => response.json())
        }

        const del = function (id) {
            return fetch(`${baseURL}${id}` + ".json", { method: "DELETE" })
                .then(response => response.json())
        }

        const update = function (id, data) {
            return fetch(`${baseURL}${id}` + ".json", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
        }

        return {
            post,
            get,
            del,
            update
        }
    }()

    addBtn.addEventListener("click", postCatch);
    loadBtn.addEventListener("click", loadCatches);


    function postCatch() {
        const angler = AddElements.angler().value;
        const weight = AddElements.weight().value;
        const species = AddElements.species().value;
        const location = AddElements.location().value;
        const bait = AddElements.bait().value;
        const captureTime = AddElements.captureTime().value;

        operations.post({ angler, weight, species, location, bait, captureTime })
            .catch(error => console.log(error))
    }

   
    function loadCatches() {
        operations.get()
            .then(data => {
                Object.keys(data).forEach(key => {
                    let clonedElement = document.querySelector(".catch").cloneNode(true);
                    
                    clonedElement.setAttribute("data-id", `${key}`)
                    clonedElement.querySelector(".delete").addEventListener("click", deleteCatch);
                    clonedElement.querySelector(".update").addEventListener("click", updateCatch);
                    Object.keys(AddElements).forEach(el => {
                        clonedElement.querySelector(`.${el}`).value = `${data[key][el]}`
                    })
                    catches.appendChild(clonedElement);
                })
                catches.removeChild(catches.childNodes[1]);
            });
    }

    function deleteCatch(e) {
        const id = e.target.parentNode.getAttribute("data-id");
        operations.del(id)
            .catch(error => console.log(error));
        loadCatches();
    }

    function updateCatch(e) {
        let parrent = e.target.parentNode;
        const id = parrent.getAttribute("data-id");
        const angler = parrent.querySelector(".angler").value;
        const weight = parrent.querySelector(".weight").value;
        const species = parrent.querySelector(".species").value;
        const location = parrent.querySelector(".location").value;
        const bait = parrent.querySelector(".bait").value;
        const captureTime = parrent.querySelector(".captureTime").value;

        operations.update(id, { angler, weight, species, location, bait, captureTime })
            .catch(error => console.log(error));

    }
}

attachEvents();

