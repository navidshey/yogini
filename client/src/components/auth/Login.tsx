import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import classnames from "classnames";
import { bindActionCreators, Dispatch } from "redux";
import { AuthState, ICustomError } from "../../store/types";
import { loginUser } from "./../../store/actions/authActions";
import { ApplicationRoutes } from "../../constants";

interface StateProps {
  auth: AuthState;
  errors: ICustomError;
}

interface mapDispatch {
  loginUser: (userData: any) => any;
}

type State = {
  email: string;
  password: string;
  errors?: any;
};

type Props = StateProps & mapDispatch & RouteComponentProps;

class Login extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
    if (nextProps.auth.isAuthenticatd) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e: React.FormEvent): void {
    e.preventDefault();

    const userData: State = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

(Login as any).propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state: StateProps) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch: Dispatch<AuthState>) => {
  return bindActionCreators({ loginUser: loginUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
