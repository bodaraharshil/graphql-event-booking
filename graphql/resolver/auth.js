const bcrypt = require("bcryptjs");

const User = require("../../models/user");

module.exports = {
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

}