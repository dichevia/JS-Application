function attachEvents() {
    const btnLoad = document.querySelector(`#btnLoad`);
    const phonebook = document.querySelector(`#phonebook`);
    const personInp = document.querySelector(`#person`);
    const phoneInp = document.querySelector(`#phone`);
    const btnCreate = document.querySelector(`#btnCreate`);

    btnLoad.addEventListener(`click`, loadPhonebook);

    btnCreate.addEventListener(`click`, createContact);

    function loadPhonebook() {
        phonebook.innerHTML = ``;
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then(response => response.json())
            .then(data => load(data))
    }

    function load(data) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                let person = element.person;
                let phone = element.phone;

                let deleteBtn = document.createElement(`button`);
                deleteBtn.textContent = `Delete`;
                deleteBtn.addEventListener(`click`, deleteContact);

                let li = document.createElement(`li`);
                li.setAttribute(`id`, `${key}`)
                li.textContent = `${person}: ${phone} `;
                li.appendChild(deleteBtn);

                phonebook.appendChild(li);
            }
        }
    }

    function deleteContact(e) {
        let deleteKey = e.target.parentNode.id;
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${deleteKey}.json`, { method: `DELETE` })
            .then(() => loadPhonebook())
    }

    function createContact() {
        let newContact = {
            "person": `${personInp.value}`,
            "phone": `${phoneInp.value}`
        }

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: `${JSON.stringify(newContact)}`
        })
            .then(() => {
                personInp.value = ``
                phoneInp.value = ``
                loadPhonebook();
            })
    }

}

attachEvents();