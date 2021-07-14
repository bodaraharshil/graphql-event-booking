const Event = require("../../models/event");
const User = require("../../models/user");
const { dateTosting } = require("../../helpers/date");

const { transformEvent } = require("./merge");




module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map((event) => {
                return transformEvent(event);
            })
        }
        catch (error) {
            throw error;
        }
    },
    createEvent: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error("unauthenticated!");
            }
            const event = await new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
                date: dateTosting(args.eventInput.date),
                creator: req.userId
            });
            const result = await event.save()
            createEvent = transformEvent(result)
            const user = await User.findOne({ _id: req.userId })
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
