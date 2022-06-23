module.exports = (req, res, next) => {
  if (req.session.userID) {
    return res.status(302).redirect("/admin/dashboard");
  }
  next();
};
