const Booking = require("../../models/booking");
const Event = require("../../models/event");

const { tranfromBooking, transformEvent } = require('./merge');

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map((booking) => {
                return tranfromBooking(booking);
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
            return tranfromBooking(result)
        }
        catch (error) {
            throw error;
        }
    },
    cancelBooking: async (args) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        }
        catch (error) {
            throw error;
        }
    }
}