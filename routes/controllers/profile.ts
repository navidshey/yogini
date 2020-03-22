import { Request, Response } from "express";
import { validateProfileInput } from "./../../validation/profile";
import { validateExperienceInput } from "./../../validation/experience";
import { validateEducationInput } from "./../../validation/education";
import { User } from "../../models/User";
import { Profile, IProfile } from "../../models/Profile";
import { IEducation } from "../../models/IEducation";
import { ProfileErrorMessages } from "../../config/errorMessages";
import { IExperience } from "../../models/IExperience";

export default class ProfileController {
  public getCurrentUser(req: Request, res: Response) {
    const errors: any = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = ProfileErrorMessages.No_Profile;
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }

  public getAll(req: Request, res: Response) {
    const errors: any = {};
    Profile.find()
      .populate("user", ["name", "avatar"])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = ProfileErrorMessages.No_Profiles;
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err =>
        res.status(400).json({
          profile: ProfileErrorMessages.No_Profiles
        })
      );
  }

  public getByHandle(req: Request, res: Response) {
    const errors: any = {};
    Profile.findOne({ handle: req.params.handle })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = ProfileErrorMessages.No_Profile;
          res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => err.status(400).json(err));
  }

  public getByUserId(req: Request, res: Response) {
    const errors: any = {};
    Profile.findOne({ user: req.params.user_id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = ProfileErrorMessages.No_Profile;
          res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err =>
        res.status(400).json({
          profile: ProfileErrorMessages.No_Profile
        })
      );
  }

  public createOrEdit(req: Request, res: Response) {
    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
      // return errors
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields: IProfile | any = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //skills is split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    //social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create

        // check if handle exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = ProfileErrorMessages.Handle_Already_Exist;
            res.status(400).json(errors);
          }

          // save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }

  public addExperience(req: Request, res: Response) {
    const { errors, isValid } = validateExperienceInput(req.body);
    // check validation
    if (!isValid) {
      // return errors
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }, (err: any, profile: IProfile) => {
      const newExp: IExperience = {
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
      if (!profile.experience) profile.experience = [];
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }

  public addEducation(req: Request, res: Response) {
    const { errors, isValid } = validateEducationInput(req.body);
    // check validation
    if (!isValid) {
      // return errors
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }, (err: any, profile: IProfile) => {
      const newEdu: IEducation = {
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

  public deleteExperience(req: Request, res: Response) {
    Profile.findOne({ user: req.user.id }, (err: any, profile: IProfile) => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      // Splice out of array
      profile.experience.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    }).catch(err => res.status(404).json(err));
  }

  public deleteEducation(req: Request, res: Response) {
    Profile.findOne({ user: req.user.id }, (err: any, profile: IProfile) => {
      // Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      // Splice out of array
      profile.education.splice(removeIndex, 1);
      profile.save().then(profile => res.json(profile));
    }).catch(err => res.status(404).json(err));
  }

  public delete(req: Request, res: Response) {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => res.status(404).json(err));
  }
}
