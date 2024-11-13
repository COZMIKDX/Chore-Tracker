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
const choreLineupPath = 'Chore/choreLineup.json';


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
         console.log("File write failed.");
    }
}

module.exports = { getNextChore, loadChores, saveChores }