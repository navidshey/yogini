import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { IEducation } from "../../store/types";
import Moment from "react-moment";
import { deleteEducation } from "../../store/actions/profileActions";

interface StateProps {
  education: IEducation[];
}

interface mapDispatch {
  deleteEducation: (id: string) => any;
}

type Props = StateProps & mapDispatch & any;

class Education extends Component<Props, any> {
  onDeleteClick(id: string) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map((edu: IEducation) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

(Education as any).propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
