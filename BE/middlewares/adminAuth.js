module.exports = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status.send("invalid username/password");
  } else {
    next();
  }
};
