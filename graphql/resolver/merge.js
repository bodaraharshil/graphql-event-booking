const Event = require("../../models/event");
const User = require("../../models/user");
const { dateTosting } = require("../../helpers/date");

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
            return transformEvent(event)
        })
    }
    catch (error) {
        throw error;
    }
}

const singleevent = async (eventId) => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event)
    }
    catch (error) {
        throw error;
    }
}

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event._id,
        creator: user.bind(this, event.creator)
    }
}

const tranfromBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        createdAt: dateTosting(booking._doc.createdAt).toString(),
        updatedAt: dateTosting(booking._doc.updatedAt).toString(),
        event: singleevent.bind(this, booking._doc.event),
        user: user.bind(this, booking._doc.user)
    }
}

module.exports = {
    transformEvent,
    tranfromBooking
}