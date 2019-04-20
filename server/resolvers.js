const User = require('./models/user');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello, world!";
    }
  },
  Mutation: {
    login: async (_, {email, password}) => {
      const user = await User.findOne({email: email});
      if (!user) {
        throw "User not found";
      }
      const match = await user.comparePassword(password);
      if (match) {
        return jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
      } else {
        throw "Incorrect password"
      }
    },
    register: async (_, {email, password, confirmPassword}) => {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      const user = new User({
        email: email,
        password: password,
      });

      await user.save();
      return true;
    },
  }
};

module.exports = resolvers;