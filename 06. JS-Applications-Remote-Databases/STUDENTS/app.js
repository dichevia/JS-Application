import { get, post } from "./requester.js";

const html = {
    "loadStudents": () => document.getElementById("loadStudents"),
    "createStudentBtn": () => document.getElementById("createStudent"),
    "getId": () => document.getElementById("id"),
    "getFirstName": () => document.getElementById("firstName"),
    "getLastName": () => document.getElementById("lastName"),
    "getFacultyNumber": () => document.getElementById("facultyNumber"),
    "getGrade": () => document.getElementById("grade"),
    "getAllStudents": () => document.querySelector("tbody")
}

const actions = {
    "loadStudents": async function () {
        try {
            let students = await get("appdata", "students");
            const resultContainer = html.getAllStudents();
            const fragment = document.createDocumentFragment();

            students.sort((a, b) => a.id - b.id);

            students.forEach(student => {
                const tr = document.createElement("tr");
                const idTd = document.createElement("td");
                const firstNameTd = document.createElement("td");
                const lastNameTd = document.createElement("td");
                const facultyNumberTd = document.createElement("td");
                const gradeTd = document.createElement("td");

                idTd.textContent = `${student.id}`;
                firstNameTd.textContent = `${student.firstName}`;
                lastNameTd.textContent = `${student.lastName}`;
                facultyNumberTd.textContent = `${student.facultyNumber}`;
                gradeTd.textContent = `${student.grade}`;

                tr.append(idTd, firstNameTd, lastNameTd, facultyNumberTd, gradeTd);
                fragment.appendChild(tr);
            })

            resultContainer.innerHTML = "";
            resultContainer.appendChild(fragment);
        } catch (error) {
            alert(error);
        }
    },
    "createStudent": async function () {
        try {
            const id = html.getId();
            const firstName = html.getFirstName();
            const lastName = html.getLastName();
            const facultyNumber = html.getFacultyNumber();
            const grade = html.getGrade();

            if (!id.value || !firstName.value  || !lastName.value|| !facultyNumber.value|| !grade.value){
                return alert("Every input field must be 1 or more characters long!");
            }

            const data = {
                id: id.value,
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value
            }

            const response = await post("appdata", "students", data);

            id.value = "";
            firstName.value = "";
            lastName.value = "";
            facultyNumber.value = "";
            grade.value = "";

            actions["loadStudents"]();
        } catch (error) {
            alert(error);
        }
    }
}

function handleEvent(e) {
    e.preventDefault();
    if (typeof actions[e.target.id] === "function") {
        actions[e.target.id]();
    }
}

(function attachEvent() {
    document.addEventListener("click", handleEvent);
}());