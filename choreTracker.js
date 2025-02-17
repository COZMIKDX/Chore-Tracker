/**
 * A simple chore tracking app.
 * It goes through each chore a person has when it is time to switch chores and simply assigns the next chore in the
 * chore array. To prevent repeating a chore, don't start a person with two chores next to each other on the list.
 */

const { Client, Events, GatewayIntentBits } = require('discord.js');
const chore = require("./Chore/chore.js");
const reminders = require("./Chore/reminder.js");
let config;
try {
    config = require('./config.json');
} catch {
    console.log("config.json file not found.\nRun \"$ npm run configsetup\"");
    process.exit();
}

let lineup = chore.loadChores();

function changeChores(lineup) {
    let newLineup = {};
    for (const [person, chores] of Object.entries(lineup)) {
        newLineup[person] = chores.map((x) => chore.getNextChore(x));
    }
    return newLineup;
}



const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.once(Events.ClientReady, readyClient => {
    // This will act upon valid command flags and do nothing otherwise.

    const reminderIndex = process.argv.indexOf("-reminder");
    if (reminderIndex > -1) {
        let reminderValue = process.argv[reminderIndex + 1];
        reminders.sendReminder(client, config.targetChannelID, reminderValue);
    }

    const lineupChangeIndex = process.argv.indexOf("-lineupChange");
    if (lineupChangeIndex > -1) {
        const newLineup = changeChores(lineup);

        let channel = client.channels.cache.get(config.targetChannelID);
        channel.send(`Chore time!\n${chore.formatReadable(newLineup)}`);
        chore.saveChores(newLineup);
        console.log("Chores updated.");
    }

    client.destroy().then(() => {
        console.log('Shutting down.');
        process.exit();
    });
});

// I only really want this to run if I have args to tell it what to do.
if (process.argv.length > 2) {
    client.login(config.discordToken);
}