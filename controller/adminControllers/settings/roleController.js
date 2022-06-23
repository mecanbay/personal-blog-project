const Roles = require("../../../models/Roles");
const Users = require("../../../models/User");

exports.viewRoleCreatePage = (req, res) => {
  try {
    res.status(200).render("admin/settings/create-role", {
      page_name: "create-role",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.createRole = async (req, res) => {
  try {
    await Roles.create(req.body);
    res.status(201).redirect("/admin/settings/roles");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.viewRolesPage = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).render("admin/settings/roles", {
      page_name: "roles",
      roles,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getRole = async (req, res) => {
  try {
    const role = await Roles.findById(req.params.id);
    res.status(200).json({
      role,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Roles.findByIdAndUpdate(req.body.id);
    role.name = req.body.name;
    role.create_user = req.body.create_user == 1 ? 1 : 0;
    role.read_user = req.body.read_user == 1 ? 1 : 0;
    role.update_user = req.body.update_user == 1 ? 1 : 0;
    role.delete_user = req.body.delete_user == 1 ? 1 : 0;
    role.create_role = req.body.create_role == 1 ? 1 : 0;
    role.read_role = req.body.read_role == 1 ? 1 : 0;
    role.update_role = req.body.update_role == 1 ? 1 : 0;
    role.delete_role = req.body.delete_role == 1 ? 1 : 0;
    role.save();
    res.status(204).redirect("/admin/settings/roles");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const existUser = false
    const users = await Users.find({ role_id: req.params.id });
    for (let i = 0; i < users.length; i++) {
      let user = await Users.findByIdAndUpdate(users[i]._id);
      user.isDeleted = 1;
      user.save()
      if (users[i]._id == req.session.userID){
        existUser = true
      }
    }

    await Roles.findByIdAndRemove(req.params.id)
    if(existUser){
      res.status(202).redirect("/admin/login")
    }
    res.status(202).redirect("/admin/settings/roles")
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
