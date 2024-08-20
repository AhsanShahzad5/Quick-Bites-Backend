import express, { Request, Response } from 'express';
import User from '../models/UserModel';

const test = (req: Request, res: Response) => {
    res.json({ message: 'welcome to test' });
}

const getCurrentUser = async(req: Request, res: Response) => {
    try {
        const currentUser = await User.findOne({_id:req.userId});
        if (!currentUser) {
            return res.status(404).json({ message: "user not found" });
        }        
        res.json(currentUser)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting a  user" });
    }
};
const createCurrentUser = async(req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;
        //if user exisits alr
        const existingUser = await User.findOne({ auth0Id });

        if (existingUser) {
            return res.status(200).send();
        }

        const newUser = new User(req.body);
        await newUser.save();
        //convert the document version wixhi has extra things to a simple js object
        res.status(201).json(newUser.toObject());
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
};
const updateCurrentUser = async(req: Request, res: Response) => {
    try {
        const { name , addressLine1 , country , city } = req.body;
        //get user from middleware
        const userId = req.userId;
        
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        user.name=name;
        user.addressLine1 = addressLine1 ;
        user.city =city ;
        user.country=country;

        await user.save();
        //convert the document version wixhi has extra things to a simple js object
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
    }
};



export { test, createCurrentUser , updateCurrentUser , getCurrentUser}