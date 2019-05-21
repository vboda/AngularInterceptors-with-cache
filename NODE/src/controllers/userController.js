const express = require('express');

function UserController(User){
    function get(req,res){
        User.find((err,Users)=>{
            if(err){
                alert('Error')
            }
            else{
                return res.json(Users);
            }
        })
    }

    function post(req,res){
        const user = new User(req.body);
        if(req.body._id){
            res.status(400)
            res.send('User already exists');
        }
        user.save();
        res.status(201);
        return res.json(user);
    }


    function put(req,res){
        const {user} = req
        user.name = req.body.name;
        user.mobileNumber=req.body.mobileNumber;
        user.address=req.body.address;
        user.city=req.body.city;
        user.state=req.body.state;
        user.country=req.body.country;
        user.save();
        return res.json(user)
    }

    function patch(req,res){
        console.log('In patch service');
        const {user} = req;
        Object.entries(req.body).forEach(ele=>{
            const key = ele[0];
            const value = ele[1]
            user[key] = value;
        })
        user.save();
        return res.json(user);
    }

    function deleteUser(req,res){
        req.user.remove((err)=>{
            if(err) return res.send(err);
            return res.sendStatus(204)
        })
    }

    
    
    return {get, post, put, patch, deleteUser}
}

module.exports = UserController;