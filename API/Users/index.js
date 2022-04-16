// Libraries
import express from "express";
import passport from "passport";

// Database Modal
import { UserModel } from "../../database/allModels";

const Router = express.Router();

/**
 * Route        /:_id
 * Des          GET authorized user data
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id)
    const getUser = await UserModel.findById(_id);
    console.log(getUser)

    if (!getUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: getUser });
  }
  catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
  const { _id } = req.params;
  const getUser = await UserModel.findById(_id);
  console.log(getUser)
});

/**
 * Route        /:_id
 * Des          GET user data
 * Params       _id
 * Access       Public
 * Method       GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const getUser = await UserModel.findById(_id);
    const { fullName } = getUser;
    console.log(getUser)
    if (!getUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: { fullName } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route        /update
 * Des          Update user data
 * Params       _id
 * Access       Public
 * Method       PUT
 */
Router.put("/update/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const { userData } = req.body;

    const updateUserData = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: userData,
      },
      {
        new: true,
      }
    );

    return res.json({ user: updateUserData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route        /:userId
 * Des          Delete user data
 * Params       none
 * Access       Public
 * Method       DELETE
 */

 Router.delete('/:userId', (req, res, next) => {
  UserModel.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      console.log(result);
      return res.status(200).json({
        message: "User Deleted"
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      })
    })
})


export default Router;



// const obj =
// {
//   "user":
//   {
//     "_id": "61e660f9e24645dddc50042a",
    // "fullName": "Nikhil2",
    // "email": "user2@gmail.com", 
    // "password": "$2a$08$56sm.Sk2thuE/eKjOshaquj4HyYG0Tq22WvgSJ/26UW/iJODS885W", 
    // "phoneNumber": [], 
    // "address": [], 
//     "createdAt": "2022-01-18T06:40:57.890Z", 
//     "updatedAt": "2022-01-18T06:40:57.890Z", 
//     "__v": 0
//   }
// }