"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const passport = require("passport");
// Load validation
const profile_1 = require("./../../validation/profile");
const experience_1 = require("./../../validation/experience");
const education_1 = require("./../../validation/education");
// Load profile model
const Profile_1 = require("../../models/Profile");
// Load User Profile
const User_1 = require("../../models/User");
const errorMessages_1 = require("../../config/errorMessages");
// @route   Get api/profile
// @test    Get current user profile
// @access  private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("start");
    const errors = {};
    Profile_1.Profile.findOne({ user: req.user.id })
        .populate("user", ["name", "avatar"])
        .then(profile => {
        if (!profile) {
            errors.noprofile = errorMessages_1.ProfileErrorMessages.No_Profile;
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
        .catch(err => res.status(404).json(err));
});
// @route   Get api/profile/all
// @test    Get all profiles
// @access  public
router.get("/all", (req, res) => {
    const errors = {};
    Profile_1.Profile.find()
        .populate("user", ["name", "avatar"])
        .then(profiles => {
        if (!profiles) {
            errors.noprofile = errorMessages_1.ProfileErrorMessages.No_Profiles;
            return res.status(404).json(errors);
        }
        res.json(profiles);
    })
        .catch(err => res.status(400).json({
        profile: errorMessages_1.ProfileErrorMessages.No_Profiles
    }));
});
// @route   Get api/profile/handle/:handle
// @test    Get profile by handle
// @access  public
router.get("/handle/:handle", (req, res) => {
    const errors = {};
    Profile_1.Profile.findOne({ handle: req.params.handle })
        .populate("user", ["name", "avatar"])
        .then(profile => {
        if (!profile) {
            errors.noprofile = errorMessages_1.ProfileErrorMessages.No_Profile;
            res.status(400).json(errors);
        }
        res.json(profile);
    })
        .catch(err => err.status(400).json(err));
});
// @route   Get api/profile/user/:user_id
// @test    Get profile by user id
// @access  public
router.get("/user/:user_id", (req, res) => {
    const errors = {};
    Profile_1.Profile.findOne({ user: req.params.user_id })
        .populate("user", ["name", "avatar"])
        .then(profile => {
        if (!profile) {
            errors.noprofile = errorMessages_1.ProfileErrorMessages.No_Profile;
            res.status(400).json(errors);
        }
        res.json(profile);
    })
        .catch(err => res.status(400).json({
        profile: errorMessages_1.ProfileErrorMessages.No_Profile
    }));
});
// @route   Post api/profile
// @test    Create or edit user  profile
// @access  private
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = profile_1.validateProfileInput(req.body);
    // check validation
    if (!isValid) {
        // return errors
        return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle)
        profileFields.handle = req.body.handle;
    if (req.body.company)
        profileFields.company = req.body.company;
    if (req.body.website)
        profileFields.website = req.body.website;
    if (req.body.location)
        profileFields.location = req.body.location;
    if (req.body.bio)
        profileFields.bio = req.body.bio;
    if (req.body.status)
        profileFields.status = req.body.status;
    if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;
    //skills is split into array
    if (typeof req.body.skills !== "undefined") {
        profileFields.skills = req.body.skills.split(",");
    }
    //social
    profileFields.social = {};
    if (req.body.youtube)
        profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter)
        profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook)
        profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin)
        profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram)
        profileFields.social.instagram = req.body.instagram;
    Profile_1.Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
            //update
            Profile_1.Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile => res.json(profile));
        }
        else {
            // create
            // check if handle exist
            Profile_1.Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if (profile) {
                    errors.handle = errorMessages_1.ProfileErrorMessages.Handle_Already_Exist;
                    res.status(400).json(errors);
                }
                // save profile
                new Profile_1.Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    });
});
// @route   Post api/profile/experience
// @test    Add experience to profile
// @access  private
router.post("/experience", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = experience_1.validateExperienceInput(req.body);
    // check validation
    if (!isValid) {
        // return errors
        return res.status(400).json(errors);
    }
    Profile_1.Profile.findOne({ user: req.user.id }, (err, profile) => {
        const newExp = {
            id: req.body.id,
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        };
        // add to exp array
        //unshif add to begening
        //push add to the end
        if (!profile.experience)
            profile.experience = [];
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile));
    });
});
// @route   Post api/profile/education
// @test    Add education to profile
// @access  private
router.post("/education", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { errors, isValid } = education_1.validateEducationInput(req.body);
    // check validation
    if (!isValid) {
        // return errors
        return res.status(400).json(errors);
    }
    Profile_1.Profile.findOne({ user: req.user.id }, (err, profile) => {
        const newEdu = {
            id: req.body.id,
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        };
        // add to exp array
        //unshif add to begening
        //push add to the end
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile));
    });
});
// @route   Delete api/profile/experience/:exp_id
// @test    Delete experience from profile
// @access  private
router.delete("/experience/:exp_id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile_1.Profile.findOne({ user: req.user.id }, (err, profile) => {
        // Get remove index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);
        // Splice out of array
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
    }).catch(err => res.status(404).json(err));
});
// @route   Delete api/profile/education/:exp_id
// @test    Delete education from profile
// @access  private
router.delete("/education/:edu_id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile_1.Profile.findOne({ user: req.user.id }, (err, profile) => {
        // Get remove index
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);
        // Splice out of array
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
    }).catch(err => res.status(404).json(err));
});
// @route   Delete api/profile
// @test    Delete user and profile
// @access  private
router.delete("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile_1.Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
        User_1.User.findOneAndRemove({ _id: req.user.id }).then(() => {
            res.json({ success: true });
        });
    })
        .catch(err => res.status(404).json(err));
});
module.exports = router;
