const express = require('express');
const routes=express.Router();
const service=require('../services/user');
const auth=require('../utilities/auth');
routes.post('/cart',auth,async(req,res,next)=>{
    req.body.userid=req.user.userid
    req.body.image=req.body.image[0];
    try {
        let cartItems=await service.addtoCart(req.body);
        res.json({"cartItems":cartItems}).status(200);
    } catch (error) {
        next(error);
    }
})
routes.put('/cartquantity',auth,async(req,res,next)=>{
    req.body.userid=req.user.userid
    try {
        let cartData=await service.cartQuan(req.body);
        res.json({"cartDetail":cartData}).status(200);
    } catch (error) {
        next(error);
    }
})
routes.get('/cart',auth,async(req,res,next)=>{
    try {
        let cartDetail=await service.getfromCart(req.user.userid);
        res.json({"cartDetail":cartDetail}).status(200);
    } catch (error) {
        next(error);
    }
})
routes.delete('/cartdelete',auth,async(req,res,next)=>{
    req.body.userid=req.user.userid;
    try {
        let cartDetail=await service.cartDelete(req.body);
        res.json({"cartDetail":cartDetail}).status(200);
    } catch (error) {
        next(error);
    }
})
routes.get('/cartcount',auth,async(req,res,next)=>{
    try {
        let cartCount=await service.getcartCount(req.user.userid);
        res.json({"count":cartCount}).status(200);
    } catch (error) {
        next(error);
    }
})
routes.delete('/cartempty',auth,async(req,res,next)=>{
    try {
        let cartempty=await service.getcartEmpty(req.user.userid);
        res.json({"cart":cartempty}).status(200);
    } catch (error) {
        next(error);
    }
})
module.exports=routes;