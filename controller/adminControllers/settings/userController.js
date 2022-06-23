const User = require('../../../models/User')
const Roles = require('../../../models/Roles')
exports.viewUserCreatePage = async (req, res) => {
    try {
        const roles = await Roles.find()
        res.status(200).render("admin/settings/create-user", {
            page_name : "create-user",
            roles
        })
    }catch(error) {
        res.status(401).json({
            status : "fail",
            error
        })
    }
}

exports.createUser = async (req, res) => {
    try{
        if (req.body.status == 'on') req.body.status = 1
        await User.create(req.body)
        res.status(201).redirect('/admin/dashboard')
    }catch (error) {
        res.status(401).json({
            status : "fail",
            error
        })
    }
}


exports.viewUsersPage = async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).render("admin/settings/users", {
            page_name : "users",
            users
        })
    }
    catch(error) {

    }
}