$(() => {
    const htmlElements = {
        "getContainer": () => document.querySelector(".monkeys"),
        "getAllButtons": () => document.getElementsByTagName("button"),
    }

    fetch("http://127.0.0.1:5500/monkeys.hbs")
        .then(res => res.text())
        .then(source =>{
            const context = {monkeys};
            const template = Handlebars.compile(source);
            const html = template(context);

            htmlElements.getContainer().innerHTML = html;
            
            Array.from(htmlElements.getAllButtons()).map(btn=>btn.addEventListener("click", showInfo));

            function showInfo(){
                const info = (this.parentNode.querySelector("p"));
                
                if (info.style.display = "none" && this.textContent==="Info"){
                    info.style.display = "block";
                    this.textContent = "Hide info";
                } else if (info.style.display = "block" && this.textContent==="Hide info"){
                    info.style.display = "none";
                    this.textContent = "Info";
                }
            }
        })
        .catch(error=>alert(error))
})