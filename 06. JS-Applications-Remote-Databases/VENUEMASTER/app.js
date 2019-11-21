import { get, post } from "./requester.js";
 let purchaseId = "";
 let purchaseQuatity = "";
const html = {
    "getVenues": () => document.getElementById("getVenues"),
    "getVenueDate": () => document.getElementById("venueDate"),
    "getVenueInfo": () => document.getElementById("venue-info"),
    "getCofirmBtn": () => document.querySelector(".confirm")
}

const actions = {
    "getVenues": async function () {
        const date = html.getVenueDate();
        const venueContainer = html.getVenueInfo();

        try {
            const venues = await post("rpc", `custom/calendar?query=${date.value}`);

            venues.forEach(async function (venueId) {
                try {
                    const currentVenue = await get("appdata", `venues/${venueId}`);

                    const divWrapper = createElementDOM("div", "venue");
                    const span = createElementDOM("span", "venue-name", `${currentVenue.name}`);
                    const input = createElementDOM("input", "info", "More info");
                    const divDetails = createElementDOM("div", "venue-details");
                    const table = createElementDOM("table");
                    const trHead = createElementDOM("tr");
                    const tdTicketPriceH = createElementDOM("td", "", "Ticket Price");
                    const tdQuantityH = createElementDOM("td", "", "Quantity");
                    const tdQH = createElementDOM("td");
                    const trBody = createElementDOM("tr");
                    const tdTicketPriceB = createElementDOM("td", "venue-price", `${currentVenue.price} lv`);
                    const tdQuantityB = createElementDOM("td");
                    const select = createElementDOM("select", "quantity");
                    const tdPurchaseB = createElementDOM("td");
                    const inputPurchaseB = createElementDOM("input", "purchase", "Purchase");
                    const spanHead = createElementDOM("span", "head", "Venue description:");
                    const pDescription = createElementDOM("p", "description", `${currentVenue.description}`);
                    const pStartingTime = createElementDOM("p", "description", `Starting time: ${currentVenue.startingHour}`);

                    divWrapper.id = `${currentVenue._id}`;
                    input.type = "button";
                    inputPurchaseB.type = "button";
                    input.addEventListener("click", showMoreInfo);
                    inputPurchaseB.addEventListener("click", purchase);
                    divDetails.style.display = "none";

                    for (let i = 1; i <= 5; i++) {
                        let option = createElementDOM("option");
                        option.value = i;
                        option.textContent = i;
                        select.appendChild(option);
                    }

                    span.appendChild(input);
                    trHead.append(tdTicketPriceH, tdQuantityH, tdQH);
                    tdQuantityB.appendChild(select);
                    tdPurchaseB.appendChild(inputPurchaseB);
                    trBody.append(tdTicketPriceB, tdQuantityB, tdPurchaseB);
                    table.append(trHead, trBody);
                    divDetails.append(table, spanHead, pDescription, pStartingTime);
                    divWrapper.append(span, divDetails);
                    venueContainer.appendChild(divWrapper);
                } catch (error) {
                    alert(error);
                }
            })

            venueContainer.innerHTML = "";
        } catch (error) {
            alert(error);
        }
    }
}

function showMoreInfo(e) {
    const currentVenue = this.parentNode.parentNode;

    if (this.value == "More info") {
        currentVenue.querySelector(".venue-details").style.display = "block";
        this.value = "Less info";
    } else if (this.value == "Less info") {
        currentVenue.querySelector(".venue-details").style.display = "none";
        this.value = "More info";
    }
}

async function purchase() {
    try {
        html.getVenueInfo().innerHTML = "";
        
        const currVenueId = this.parentNode.parentNode.parentNode.parentNode.parentNode.id;
        const currentVenue = await get("appdata", `venues/${currVenueId}`);
        const currentQuatity = this.parentNode.parentNode.parentNode.querySelector("select").value;
        const totalPrice = Number(currentVenue.price) * Number(currentQuatity);

        const span = createElementDOM("span", "head", "Confirm purchase");
        const div = createElementDOM("div", "purchase-info");
        const spanName = createElementDOM("span", "", `${currentVenue.name}`)
        const spanQtyPrice = createElementDOM("span", "", `${currentQuatity} x ${currentVenue.price}`);
        const spanTotal = createElementDOM("span", "", `${totalPrice}`);
        const inputConfirm = createElementDOM("input", "confirm", "Confirm");
        inputConfirm.type = "button";
        inputConfirm.addEventListener("click", confirm);

        div.append(spanName, spanQtyPrice, spanTotal, inputConfirm);
        html.getVenueInfo().append(span, div);

        purchaseId = currVenueId;
        purchaseQuatity = currentQuatity;

    } catch (error) {
        alert(error);
    }
}

function handleEvent(e) {
    e.preventDefault();
    if (typeof actions[e.target.id] === "function") {
        actions[e.target.id]();
    }
}

function createElementDOM(type, className, text) {
    const element = document.createElement(type);
    if (className) {
        element.classList.add(className);
    }

    if (type !== "input") {
        element.textContent = text;
    } else {
        element.value = text;
    }

    return element;
}

async function confirm(){
    const response = await post("rpc", `custom/purchase?venue=${purchaseId}&qty=${purchaseQuatity}`);
    
    html.getVenueInfo().textContent = "You may print this page as your ticket";
    html.getVenueInfo().innerHTML += (response.html);
}

(function attachEvent() {
    document.addEventListener("click", handleEvent);
}());