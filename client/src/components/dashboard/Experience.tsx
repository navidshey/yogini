import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { IExperience } from "../../store/types";
import Moment from "react-moment";
import { deleteExperience } from "../../store/actions/profileActions";

interface StateProps {
  experience: IExperience[];
}

interface mapDispatch {
  deleteExperience: (id: string) => any;
}

type Props = StateProps & mapDispatch & any;

class Experience extends Component<Props, any> {
  onDeleteClick(id: string) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map((exp: IExperience) => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

(Experience as any).propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
