const htmlElements = {
    "getbtnLoadTowns": () => document.getElementById("btnLoadTowns"),
    "getTowns": () => document.getElementById("towns"),
    "getRoot": () => document.getElementById("root"),
}

htmlElements.getbtnLoadTowns().addEventListener("click", getTowns)

async function getTowns(){
   const towns = htmlElements.getTowns().value.split(", ");
   const container = htmlElements.getRoot();

   const source =  await fetch("http://127.0.0.1:5500/towns.hbs").then(res => res.text())
   const context = {towns};
   
   const template = Handlebars.compile(source);
   const html = template(context);
   container.innerHTML = html;
}