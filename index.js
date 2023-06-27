import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
        databaseURL: "https://playground-57369-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const salesRepInDB = ref(database, "salesRep")

const inputFieldEl = document.getElementById("input-field")
const postBtnEl = document.getElementById("post-button")

postBtnEl.addEventListener("click", function() {
    
    let inputValue = inputFieldEl.value

    if (inputValue === "") {

    }   else {
        push(salesRepInDB, inputValue)
    }

})
