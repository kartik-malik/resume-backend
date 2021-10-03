import dotenv from 'dotenv';
import { RequestHandler } from 'express-serve-static-core';
import { Error } from 'mongoose';
dotenv.config();
import nodemailer from 'nodemailer';
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})
export const sendMail:RequestHandler=async function(req,res,next){

    const {from,desc,subject,name}:{from:string,desc:string,subject:string,name:string}=req.body;
    try {
        const info =await transporter.sendMail({
         from,
         to:'kartikmalikboss@gmail.com',
         subject:name+subject,
         text:desc,
        })
        throw new Error("fff");
        return res.send(info);
    }
    catch(err){
     next(err);
    }
}