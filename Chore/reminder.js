/*
I should add something to check if the channelId is valid and if the reminderName corresponds to one that currently exists in the 
reminders.json file.
 */

const fs = require('fs');
const chore = require("./chore.js");

const remindersPath = "Chore/reminders.json"

module.exports = {
    loadReminders() {
        let data  = fs.readFileSync(remindersPath);
        return JSON.parse(data)
    },

    sendReminder(client, channelId, reminderName) {
        let reminders = this.loadReminders();
        let reminder = reminders[reminderName];
        let userId;
        let message = "";
        if (reminder.mention) {
            if (reminder.userId != null) {
                userId = reminder.userId;
            } else if (reminder.chore != null) {
                userId = chore.getUserWithChore(reminder.chore);
            }
            message = `<@${userId}> ${reminder.content}`;
        }
        else {
            message = reminder.content;
        }

        let channel = client.channels.cache.get(channelId);
        channel.send(message);
    }
}