/**
 * A simple chore tracking app.
 * It goes through each chore a person has when it is time to switch chores and simply assigns the next chore in the
 * chore array. To prevent repeating a chore, don't start a person with two chores next to each other on the list.
 */

const fs = require('fs');

const choreList = [
    "sweep",
    "chef",
    "yardwork",
    "fun",
    "recycler",
    "trash",
    "clean & sort",
    "clear table",
    "clean kitchen floor & fridge",
    "clean countertops",
    "clean dishes",
    "put away dishes"
];
const choreLineupPath = 'Chore/choreLineup.json'


function getNextChore(currentChore) {
    let currentIndex = choreList.indexOf(currentChore);
    return choreList[(currentIndex + 1) % choreList.length];
}

function loadChores() {
    let data = fs.readFileSync(choreLineupPath);
    return JSON.parse(data);
}

function saveChores(data) {
    try {
        fs.writeFileSync(choreLineupPath,JSON.stringify(data), 'utf-8');
        console.log("File written.");
    } catch (error) {
         console.log("File write failed.")
    }
}