const fs = require('fs');

// Keys start at 1; Must not be missing numbers between 1 and the last key.
const choreList = {
    1: "sweep",
    2: "chef",
    3: "yardwork",
    4: "fun",
    5: "recycler",
    6: "trash",
    7: "clean & sort",
    8: "clear table",
    9: "clean kitchen floor & fridge",
    10: "clean countertops",
    11: "clean dishes",
    12: "put away dishes"
};
const choreLineupPath = 'Chore/choreLineup.json';


// Input type is Number.
function getNextChore(currentChoreKey) {
    // Note: The chores are numbered starting at 1. '.length' isn't 0 indexed.
    let choreKey = currentChoreKey + 1;
    if (choreKey > Object.keys(choreList).length) {
        choreKey = 1;
    }
    return choreKey;
}

function loadChores() {
    let data = fs.readFileSync(choreLineupPath);
    return JSON.parse(data);
}

function saveChores(data) {
    try {
        fs.writeFileSync(choreLineupPath, JSON.stringify(data), 'utf-8');
        console.log("File written.");
    } catch (error) {
         console.log("File write failed.");
    }
}

function formatReadable(lineup) {
    let readable = "";
    for (const [person, chores] of Object.entries(lineup)) {
        let list = [];
        for (const choreNum of chores) {
            list.push(choreList[choreNum]);
        }
        readable += `<@${person}>: ${list.join(", ")}\n`
    }

    return readable;
}

function getUserWithChore(choreId) {
    const choreLineup = loadChores();
    for (const [person, chores] of Object.entries(choreLineup)) {
        if (chores.includes(choreId)) {
            return person;
        }
    } 
}

module.exports = { getNextChore, loadChores, saveChores, formatReadable, getUserWithChore }