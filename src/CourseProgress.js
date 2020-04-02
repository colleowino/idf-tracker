import React from "react";
import { formActions } from "./constants";

class CourseProgress extends React.Component {

  deleteCourse = (event) => {
    event.preventDefault();
    this.props.courseHandler(formActions.DELETE, this.props.course);
  }
  
  editCourse = (event) => {
    event.preventDefault();
    this.props.courseHandler(formActions.EDIT, this.props.course);
  }

  render = () => {
    const { title, points_gained, points_total } = this.props.course;
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>
          <h1 className="f6 f5-ns fw6 lh-title black mv0">{title}</h1>
        </td>
        <td>
          <progress
            className="white"
            max={points_total}
            value={points_gained}
          ></progress>
        </td>
        <td>{points_gained}</td>
        <td>{points_total}</td>
        <td>
          <button
            className="b--black-10 ba bg-green pointer pv1 white"
            type="submit"
            onClick={this.editCourse}
          >
            Edit
          </button>
          <button
            className="b--black-10 ba bg-red ml3 pointer pv1 white"
            type="submit"
            onClick={this.deleteCourse}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default CourseProgress;
