/**
 * A simple chore tracking app.
 * It goes through each chore a person has when it is time to switch chores and simply assigns the next chore in the
 * chore array. To prevent repeating a chore, don't start a person with two chores next to each other on the list.
 */
const chore = require("./Chore/chore.js");

let lineup = chore.loadChores();

function changeChores(lineup) {
    let newLineup = {};
    for (const [person, chores] of Object.entries(lineup)) {
        newLineup[person] = chores.map((x) => chore.getNextChore(x));
    }
    return newLineup;
}

console.log(changeChores(lineup));