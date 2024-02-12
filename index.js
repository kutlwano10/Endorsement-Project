//DATABASE SECTION
/*  -We need to import initializeApp()
    -We also need to getDatabase()
    -We need to put our Project inside an object 
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://live-data-d7f6c-default-rtdb.europe-west1.firebasedatabase.app/"
}
/* - we feed the initializeApp() an Object of appSetting
    as an argument & store the info in app var
    - we then feed the getDatabase() an agurment of app 
    which contain info.
*/
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "Endorsements")//will use this data on our button section


//BUTTON & INPUT FUNCTIONALITY
/*
    - When we enter a message inside an endorsementInputField its stored inside a
    endorsementValue.
    - Push() our stored endorsementValue to our Database Project
*/
const endorsementInputField = document.getElementById("endorsement-field")
const publishButton = document.getElementById("publish-btn")
const endorsementMessage = document.getElementById("endorsement-msg")

const messageText = document.getElementById("message-text")


publishButton.addEventListener("click", function() {
    let endorsementValue = endorsementInputField.value
    push(endorsementListInDB, endorsementValue)
    
    //We need to feed it endorsementValue as declaring argument so that it shows on the html
    // showEndorsementMessages(endorsementValue)
    clearEndorsementInputField() 
})
//include a paremeter on this function, dont leave it blank
function showEndorsementMessages(messageValue) {
    endorsementMessage.innerHTML += `<p>${messageValue}</p>`

}
function clearEndorsementInputField() {
    endorsementInputField.value = ""
}

// FETCHING DATA FROM FIREBASE TO SHOW ON OUR APP

/*  -use onValue -We want to keep the data our app even when we    refresh the page.
    -Give onValue the ref of where we want to get our data from.
    -created an Array that keeps all my messages data,since it was an object.
    -Make a for loop to make the data show on App and still remain there.
*/

onValue(endorsementListInDB, function(snapshot) {
    let messageArray = Object.values(snapshot.val())

    clearEndorsementMessage()//WE dont want our messages to keep repeating or doubling everytime we click publish
    
    for (let i = 0; i < messageArray.length; i++) {
        showEndorsementMessages(messageArray[i])
    }
})

function clearEndorsementMessage() {
    endorsementMessage.innerHTML = ""
    //before this function our messages where doubling when publish is clicked
}
