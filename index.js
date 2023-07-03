import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
        databaseURL: "https://playground-57369-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const salesRepInDB = ref(database, "salesRep")


const postBtnEl = document.getElementById("post-button")
const inputFieldEl = document.getElementById("input-field")
const commentListEl = document.getElementById("comment-list")

function clearCommentListEl() {
    commentListEl.innerHTML = ""
}



postBtnEl.addEventListener("click", function() {

    let inputValue = inputFieldEl.value
    
    if (inputValue === "") {

    } else {
    push(salesRepInDB, inputValue)
    
    }
})

onValue(salesRepInDB, function(snapshot) {
    if (snapshot.exists()) {
        let commentArray = Object.entries(snapshot.val())

        clearCommentListEl()
    
        
        for (let i = 0; i < commentArray.length; i++) {
            let currentItem = commentArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendCommentToList(currentItem)
        }    
    } else {
        commentListEl.innerHTML = "Schreibe einen Kommentar!"
    }
})

function appendCommentToList(comment) {
    let commentID = comment[0]
    let commentValue = comment[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = commentValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `salesRep/${commentID}`)
        remove(exactLocationOfItemInDB)
        lastItemRemoved = commentValue
        

    })
    
    commentListEl.append(newEl)
}