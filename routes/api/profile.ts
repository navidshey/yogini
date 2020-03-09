import * as express from "express";
import { Request, Response, NextFunction } from "express";
const router = express.Router();
const passport = require("passport");

// Load validation
import { validateProfileInput } from "./../../validation/profile";
import { validateExperienceInput } from "./../../validation/experience";
import { validateEducationInput } from "./../../validation/education";

// Load profile model
import { Profile, IProfile } from "../../models/Profile";
// Load User Profile
import { User } from "../../models/User";

// @route   Get api/profile/test
// @test    Test profiles route
// @access  public
router.get("/test", (req: Request, res: Response) =>
  res.json({ msg: "profiles works" })
);

// @route   Get api/profile
// @test    Get current user profile
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    console.log("start");
    const errors: any = {};
    Profile.findOne({ user: req.user.id })
      .populate("User", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no profile for the user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   Get api/profile/all
// @test    Get all profiles
// @access  public
router.get("/all", (req: Request, res: Response) => {
  const errors: any = {};
  Profile.find()
    .populate("User", ["name", "avatar"])
    .then(profiles => {
      console.log(profiles);
      if (!profiles) {
        errors.noprofile = "there are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(400).json({
        profile: "There are no profile"
      })
    );
});

// @route   Get api/profile/handle/:handle
// @test    Get profile by handle
// @access  public
router.get("/handle/:handle", (req: Request, res: Response) => {
  const errors: any = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("User", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err => err.status(400).json(err));
});

// @route   Get api/profile/user/:user_id
// @test    Get profile by user id
// @access  public
router.get("/user/:user_id", (req: Request, res: Response) => {
  const errors: any = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("User", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(400).json({
        profile: "There is no profile for this user"
      })
    );
});

// @route   Post api/profile
// @test    Create or edit user  profile
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
      // return errors
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields: any = {};
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
            errors.handle = "that handle already exist";
            res.status(400).json(errors);
          }

          // save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   Post api/profile/experience
// @test    Add experience to profile
// @access  private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    // check validation
    if (!isValid) {
      // return errors
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }, (err: any, profile: IProfile) => {
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
      if (!profile.experience) profile.experience = [];
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });

    // Profile.findOne({ user: req.user.id }).then(profile:IProfile => {
    //   const newExp = {
    //     title: req.body.title,
    //     company: req.body.company,
    //     location: req.body.location,
    //     from: req.body.from,
    //     to: req.body.to,
    //     current: req.body.current,
    //     description: req.body.description
    //   };

    //   // add to exp array
    //   //unshif add to begening
    //   //push add to the end
    //   if (!profile.experience) profile.experience = [];
    //   profile.experience.unshift(newExp);
    //   profile.save().then(profile => res.json(profile));
    // });
  }
);

// @route   Post api/profile/education
// @test    Add education to profile
// @access  private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    const { errors, isValid } = validateEducationInput(req.body);
    // check validation
    if (!isValid) {
      // return errors
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }, (err: any, profile: IProfile) => {
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
);

// @route   Delete api/profile/experience/:exp_id
// @test    Delete experience from profile
// @access  private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
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
);

// @route   Delete api/profile/education/:exp_id
// @test    Delete education from profile
// @access  private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
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
);

// @route   Delete api/profile
// @test    Delete user and profile
// @access  private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
