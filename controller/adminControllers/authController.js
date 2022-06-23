const User = require("../../models/User");
const bcrypt = require("bcrypt");
exports.viewDashboardPage = async (req, res) => {
    
  try {
    const users = await User.find()
    res.status(200).render("admin/dashboard", {
      page_name: "dashboard",
      users
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      error,
    });
  }
};

exports.viewLoginPage = (req, res) => {
  try {
    res.status(200).render("admin/login");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password, remember } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            if (remember) {
              req.session.userID = user._id;
              req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
            } else {
              req.session.userID = user._id;
              req.session.cookie.expires = false;
            }

            res.status(200).redirect("/admin/dashboard");
          } else {
            res.status(400).json({
              status: "Parolanız yanlış",
            });
          }
        });
      } else {
        res.status(400).json({
          status: "Kullanıcı Bulunamadı.",
        });
      }
    });
    // res.status(200).render("/admin/dashboard")
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.logoutUser = (req, res) => {
  try{
    req.session.destroy(() => {
      res.redirect("/admin/login")
    })
  }catch(error) {
    res.status(400).json({
      status : "fail",
      error
    })
  }
}