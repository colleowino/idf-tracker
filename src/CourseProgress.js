import React from "react";

class CourseProgress extends React.Component {
  render() {
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
          <span className="ml3">
            {points_gained}/{points_total}
          </span>
        </td>
        <td>
          <button
            className="b--black-10 ba bg-green pointer pv1 white"
            type="submit"
            // onClick={this.showCourseDialog}
          >
            Edit
          </button>
          <button
            className="b--black-10 ba bg-red ml3 pointer pv1 white"
            type="submit"
            // onClick={this.showCourseDialog}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default CourseProgress;
