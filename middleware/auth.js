const token = await jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  { expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
);
user.token = token;
user.password = undefined;
localStorage.setItem("token", token);
const options = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};
res.cookie("token", token, options).status(200).json({
  success: true,
  message: "User Login Successfully",
});
