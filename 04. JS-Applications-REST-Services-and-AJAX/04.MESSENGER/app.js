function attachEvents() {
    const submitBtn = document.querySelector(`#submit`);
    const author = document.querySelector(`#author`);
    const content = document.querySelector(`#content`);
    const refreshBtn = document.querySelector(`#refresh`);
    const messagesTextArea = document.querySelector(`#messages`);

    submitBtn.addEventListener(`click`, function sendMessage() {
        let newMessage = {
            'author': author.value,
            'content': content.value,
        }

        let headers = {
            method: `POST`,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newMessage)

        }
        fetch(`https://rest-messanger.firebaseio.com/messanger.json`, headers)

    })

    refreshBtn.addEventListener(`click`, function refresh() {
        fetch(`https://rest-messanger.firebaseio.com/messanger.json`)
            .then(response => response.json())
            .then(data => {
                let messages = [];
                Object.entries(data).forEach(element => {
                    messages.push(`${element[1].author}: ${element[1].content}`);
                });
                messagesTextArea.textContent = messages.join('\n');
            })
    })
}

attachEvents();