"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("./../../validation/profile");
const experience_1 = require("./../../validation/experience");
const education_1 = require("./../../validation/education");
const User_1 = require("../../models/User");
const Profile_1 = require("../../models/Profile");
const errorMessages_1 = require("../../config/errorMessages");
class ProfileController {
    getCurrentUser(req, res) {
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
    }
    getAll(req, res) {
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
    }
    getByHandle(req, res) {
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
    }
    getByUserId(req, res) {
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
    }
    createOrEdit(req, res) {
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
    }
    addExperience(req, res) {
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
    }
    addEducation(req, res) {
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
    }
    deleteExperience(req, res) {
        Profile_1.Profile.findOne({ user: req.user.id }, (err, profile) => {
            // Get remove index
            const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);
            // Splice out of array
            profile.experience.splice(removeIndex, 1);
            profile.save().then(profile => res.json(profile));
        }).catch(err => res.status(404).json(err));
    }
    deleteEducation(req, res) {
        Profile_1.Profile.findOne({ user: req.user.id }, (err, profile) => {
            // Get remove index
            const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.params.edu_id);
            // Splice out of array
            profile.education.splice(removeIndex, 1);
            profile.save().then(profile => res.json(profile));
        }).catch(err => res.status(404).json(err));
    }
    delete(req, res) {
        Profile_1.Profile.findOneAndRemove({ user: req.user.id })
            .then(() => {
            User_1.User.findOneAndRemove({ _id: req.user.id }).then(() => {
                res.json({ success: true });
            });
        })
            .catch(err => res.status(404).json(err));
    }
}
exports.default = ProfileController;
