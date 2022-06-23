// const User = require('../models/User')

// module.exports = (roles) => {
//     return async (req, res, next) => {
//         const perm = await User.findById(req.session.userID).populate('role_id')
//         if(`perm.role_id.${roles}`){
//             console.log("varrrrr");
//         }
//     }
// }




// // module.exports = async (req, res, next) => {
// //     const perm = await User.findById(req.session.userID).populate('role_id')
// //     if (perm.role_id.create_user){
// //         console.log("var");
// //     }
// //     else {
// //      console.log("yok");
// //    }


// // }

// // return async (req, res, next) => {
// //     const perm = await User.findById(req.session.userID).populate('role_id')
// //     if (perm.role_id.create_user){
// //         console.log("var");
// //     }else {
// //         console.log("yok");
// //     }
// // }