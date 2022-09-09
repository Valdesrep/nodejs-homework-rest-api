const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const avatarUrl = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarUrl,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Подтвердите почту</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "succes",
    code: "201",
    data: {
      user: {
        email,
        subscription,
        avatarUrl,
      },
    },
  });
};

module.exports = signup;
