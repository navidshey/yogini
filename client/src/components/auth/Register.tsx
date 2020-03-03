import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
import { AuthState, ICustomError } from "../../store/types";
import { bindActionCreators, Dispatch } from "redux";
import { ApplicationRoutes } from "../../constants";
import TextFieldGroup from "../common/TextFieldGroup";

// import FormComponent from "../base/FormComponent";

interface StateProps {
  auth: AuthState;
  errors: ICustomError;
}

interface mapDispatch {
  registerUser: (userData: any, history: any) => any;
}

type State = {
  name: string;
  email: string;
  password: string;
  password2: string;
  errors?: any;
};
type Props = StateProps & mapDispatch & RouteComponentProps;

class Register extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticatd) {
      this.props.history.push(ApplicationRoutes.DASHBOARD);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e: React.FormEvent): void {
    e.preventDefault();

    const newUser: State = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    const history = this.props.history;
    this.props.registerUser(newUser, history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                ></TextFieldGroup>

                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                ></TextFieldGroup>

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                ></TextFieldGroup>

                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                ></TextFieldGroup>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

(Register as any).propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state: StateProps) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch: Dispatch<AuthState>) => {
  return bindActionCreators({ registerUser: registerUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
