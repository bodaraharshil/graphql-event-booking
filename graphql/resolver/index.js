const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");

const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return { ...user._doc, _id: user._id, createEvents: events.bind(this, user._doc.createEvents) }
    }
    catch (error) {
        throw error;
    }
}

const events = async (eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map((event) => {
            return { ...event._doc, _id: event._id, creator: user.bind(this, event.creator) }
        })
    }
    catch (error) {
        throw error;
    }
}

const singleevent = async (eventId) => {
    try {
        const event = await Event.findById(eventId);
        return { ...event._doc, _id: event.id, creator: user.bind(this, event.creator) }
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map((event) => {
                return {
                    ...event._doc, _id: event._id, creator: user.bind(this, event._doc.creator)
                };
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
                date: new Date(args.eventInput.date),
                creator: '60e41054a46eb824e92535c2'
            });
            const result = event.save()
            createEvent = { ...result._doc, _id: result._doc._id.toString(), creator: user.bind(this, result.__doc.creator) };
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
    createUser: async (args) => {
        const userExits = await User.findOne({ email: args.userInput.email })
        if (userExits) {
            throw new Error("User already exits");
        }
        const hashpassword = await bcrypt.hash(args.userInput.password, 12)
        const user = await new User({
            email: args.userInput.email,
            password: hashpassword
        })
        const result = await user.save();
        return { ...result._doc, _id: result._id };
    },
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map((booking) => {
                return {
                    ...booking._doc,
                    _id: booking.id,
                    createdAt: new Date(booking._doc.createdAt).toString(),
                    updatedAt: new Date(booking._doc.updatedAt).toString(),
                    event: singleevent.bind(this, booking._doc.event),
                    user: user.bind(this, booking._doc.user)
                }
            })
        }
        catch (error) {
            throw error;
        }
    },
    bookEvent: async (args) => {
        try {
            const fetchevent = await Event.findOne({ _id: args.eventId });
            const booking = await new Booking({
                user: '60e41054a46eb824e92535c2',
                event: fetchevent
            });
            const result = await booking.save();
            return {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(result._doc.createdAt).toString(),
                updatedAt: new Date(result._doc.updatedAt).toString(),
                event: singleevent.bind(this, booking._doc.event),
                user: user.bind(this, booking._doc.user)
            }
        }
        catch (error) {
            throw error;
        }
    },
    cancelBooking: async (args) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            console.log("-=-=-=-=-=", booking)
            const event = { ...booking.event._doc, _id: booking.event.id, creator: user.bind(this, booking.event._doc.creator) }
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        }
        catch (error) {
            throw error;
        }
    }
}