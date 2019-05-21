const express = require('express');
const userController = require('../controllers/userController');
function userRouter(User){
    const userRoute = express.Router();
    const controller = userController(User)
    userRoute.route('/users')
    .get(controller.get)
    .post(controller.post)

    userRoute.use('/users/:userId',(req,res,next)=>{
        User.findById(req.params.userId,(err,user)=>{
            if(err) return res.send(err);
            if(user){
                req.user = user;
                return next();
            }
            return res.sendStatus(404);
        })
    })
    userRoute.route('/users/:userId')
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteUser)
    return userRoute;
}

module.exports = userRouter;