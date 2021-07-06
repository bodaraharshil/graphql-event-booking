const Event = require("../../models/event");
const User = require("../../models/user");
const { dateTosting } = require("../../helpers/date");

const { transformEvent } = require("./merge");
const { await } = require(".");




module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map((event) => {
                return transformEvent(event)
            })
        }
        catch (error) {
            throw error;
        }
    },
    createEvent: async (args) => {
        try {
            const event = await new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: dateTosting(args.eventInput.date),
                creator: '60e41054a46eb824e92535c2'
            });
            const result = await event.save()
            createEvent = transformEvent(result)
            const user = await User.findOne({ _id: '60e41054a46eb824e92535c2' })
            if (!user) {
                throw new Error("user not found");
            }
            await user.createEvents.push(event);
            await user.save();
            return createEvent;

        }
        catch (error) {
            throw error;
        }
    },
}
