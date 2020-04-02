import React from "react";
import "./App.css";
import "./tachyons.min.css";
import CourseProgress from "./CourseProgress";
import FromModal from "./FormModal";
import { COURSE_URL, formActions } from "./constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sortAsc: false,
      refreshKey: Math.random(),
      action: formActions.CREATE,
      currentCourse: {}
    };
  }

  refreshCourseList = () => {
    fetch(COURSE_URL)
      .then(response => response.json())
      .then(data => {
        const updateProgressPoints = data.map(x =>
          Object.assign(x, {
            points_progress: x.points_gained / x.points_total
          })
        );
        this.setState({ data: updateProgressPoints });
      });
  };

  componentDidMount() {
    this.refreshCourseList();
  }

  sortCourses = column => {
    const tempCourses = [...this.state.data];
    tempCourses.sort((a, b) => parseInt(a[column]) - parseInt(b[column]));
    if (!this.state.sortAsc) {
      tempCourses.reverse();
    } 
    this.setState({ data: tempCourses, sortAsc: !this.state.sortAsc });
  };

  sortCoursesByProgress = () => {
    const tempCourses = [...this.state.data];
    tempCourses.sort((a, b) => {
      const progressA = a.points_gained / a.points_total;
      const progressB = b.points_gained / b.points_total;
      return progressA - progressB;
    });
    if (!this.state.sortAsc) {
      tempCourses.reverse();
    }
    this.setState({ data: tempCourses, sortAsc: !this.state.sortAsc });
  };

  resetToAddCourses = () => {
    this.setState({ currentCourse: {} });
    this.showCourseDialog();
  };

  addCourses = () => {
    this.setState({ action: formActions.CREATE, currentCourse: {} });
    this.showCourseDialog();
  };

  showCourseDialog() {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("dn");
  }

  updateDeleteCourse = (action, course) => {
    this.setState({ action, currentCourse: course });
    this.showCourseDialog();
  };

  render() {
    const courseItems = this.state.data.map((x, indx) => (
      <CourseProgress
        courseHandler={this.updateDeleteCourse}
        index={indx + 1}
        key={x.id}
        course={x}
      />
    ));
    return (
      <div className="relative App">
        <FromModal
          refresh={this.refreshCourseList}
          formAction={this.state.action}
          course={this.state.currentCourse}
        />
        <main className="w-70 center mt5">
          <h1 className="f6 fw6 ttu tracked mb4">
            Interaction Design Foundation Courses
            <button
              className="b--black-10 ba bg-blue fr pointer pv1 white"
              type="submit"
              onClick={this.addCourses}
            >
              + Course
            </button>
          </h1>

          <table className="blueTable">
            <thead>
              <tr>
                <th className="nums"></th>
                <th className="course-title"></th>
                <th colSpan="3">Points</th>
                <th></th>
              </tr>
              <tr>
                <th className="nums">#</th>
                <th className="course-title">course</th>
                <th
                  onClick={this.sortCoursesByProgress}
                  className="pointer"
                >
                  Progress
                </th>
                <th
                  onClick={() => this.sortCourses("points_gained")}
                  className="course-points pointer"
                >
                  Gained
                </th>
                <th
                  onClick={() => this.sortCourses("points_total")}
                  className="course-points pointer"
                >
                  Total
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{courseItems}</tbody>
          </table>
        </main>
      </div>
    );
  }
}
export default App;
