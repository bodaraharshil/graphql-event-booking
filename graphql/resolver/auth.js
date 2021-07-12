const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

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
    login: async (args) => {
        const user = await User.findOne({ email: args.email });
        if (!user) {
            throw new Error('User does not exits');
        }

        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
            throw new Error("password is incorrect");
        }
        else {
            const token = await JWT.sign({ email: user.email, id: user.id }, 'somesupersecretkey', {
                expiresIn: '1h'
            });

            return { userId: user.id, token: token, tokenExpiration: 1 };

        }
    }

}