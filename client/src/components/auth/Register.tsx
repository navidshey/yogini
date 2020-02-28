import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
import { RegisterState, ActionTypes, ErrorState } from "../../store/types";
import { bindActionCreators, Dispatch } from "redux";

// import FormComponent from "../base/FormComponent";

interface StateProps {
  auth: RegisterState;
  errors: ErrorState;
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
    console.log(history);
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
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    value={this.state.name}
                    name="name"
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email} </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2} </div>
                  )}
                </div>
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(registerUser, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
