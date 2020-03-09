import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { ISelectListOption } from "../../constants/interfaces";
import { profileState, ICustomError } from "../../store/types";
import {
  createProfile,
  getCurrentProfile
} from "../../store/actions/profileActions";
import { isEmpty } from "../../validation/is-empty";
import { ApplicationRoutes } from "../../constants";

interface StateProps {
  profile: profileState;
  errors: ICustomError;
}

interface mapDispatch {
  createProfile: (userData: any, history: any) => any;
  getCurrentProfile: () => any;
}

interface State {
  displaySocialInputs?: boolean;
  handle: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  githubusername: string;
  bio: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  instagram: string;
  errors?: {};
}

type Prop = State & StateProps & mapDispatch & RouteComponentProps;

class EditProfile extends Component<Prop, State & any> {
  constructor(props: Prop) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps: Prop) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile && nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const formProfile: State = {
        displaySocialInputs: false,
        handle: "",
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
        errors: {}
      };
      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field doesnt exist, make empty string
      formProfile.handle = profile.handle;
      formProfile.status = profile.status;
      formProfile.company = !isEmpty(profile.company) ? profile.company : "";
      formProfile.website = !isEmpty(profile.website) ? profile.website : "";
      formProfile.location = !isEmpty(profile.location) ? profile.location : "";
      formProfile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      formProfile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      //   profile.social = !isEmpty(profile.social) ? profile.social : {};
      formProfile.twitter = !isEmpty(profile.social && profile.social.twitter)
        ? profile.social.twitter
        : "";
      formProfile.facebook = !isEmpty(profile.social && profile.social.facebook)
        ? profile.social.facebook
        : "";
      formProfile.linkedin = !isEmpty(profile.social && profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      formProfile.youtube = !isEmpty(profile.social && profile.social.youtube)
        ? profile.social.youtube
        : "";
      formProfile.instagram = !isEmpty(
        profile.social && profile.social.instagram
      )
        ? profile.social.instagram
        : "";

      // Set component fields state
      this.setState({
        handle: formProfile.handle,
        company: formProfile.company,
        website: formProfile.website,
        location: formProfile.location,
        status: formProfile.status,
        skills: skillsCSV,
        githubusername: formProfile.githubusername,
        bio: formProfile.bio,
        twitter: formProfile.twitter,
        facebook: formProfile.facebook,
        linkedin: formProfile.linkedin,
        youtube: formProfile.youtube,
        instagram: formProfile.instagram
      });
    }
  }

  onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const profileData: State = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e: any): void {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    const options: ISelectListOption[] = [
      { label: "Select Professional Status", value: "0" },
      { label: "Developer", value: "Developer" },
      { label: "Junio Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Seniorr Developer" }
    ];
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={ApplicationRoutes.DASHBOARD} className="btn-light">
                GO Back
              </Link>
              <h1 className="display-4 text-center">Edit profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = isRequired fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for you profile URL. your full name , company name, nickname"
                />

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own Website or one you company one"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested(eg. Gilan, Rasht)"
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML, CSS, JAVASCRIPT, PHP"
                />

                <TextFieldGroup
                  placeholder="Github username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState((prevState: State) => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

(EditProfile as any).propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateTProps = (state: StateProps) => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateTProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
