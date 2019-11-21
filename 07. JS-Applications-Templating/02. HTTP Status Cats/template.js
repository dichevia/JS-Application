(() => {
     renderCatTemplate();

     async function renderCatTemplate() {
        const htmlElements = {
            "getAllCats": () => document.getElementById("allCats"),
            "getShowBtns": () => document.querySelectorAll(".showBtn"),
        }

        const source = await fetch("http://127.0.0.1:5500/cats.hbs")
        .then(res => res.text());
        const template = Handlebars.compile(source);
        const context = {cats:window.cats};
        const html = template(context);
        htmlElements.getAllCats().innerHTML = html;

        Array.from(htmlElements.getShowBtns()).map(btn=>btn.addEventListener("click", showOrHideStatusCode));

        function showOrHideStatusCode(){
           const status =this.parentNode.querySelector(".status");
           if (status.style.display = "none" && this.textContent == "Show status code"){
            status.style.display = "block";
            this.textContent = "Hide status code";
           }else if (status.style.display = "block" && this.textContent == "Hide status code"){
            status.style.display = "none";
            this.textContent = "Show status code";
           }
           
        }
     }
 
})()
