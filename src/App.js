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
      refreshKey: Math.random(),
      action: formActions.CREATE,
      currentCourse: {}
    };
  }

  refreshCourseList = () => {
    fetch(COURSE_URL)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  };

  componentDidMount() {
    this.refreshCourseList();
  }

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

          {/* <h1>currentTitle: {title}, points: {points_gained}</h1>   */}
          <table className="blueTable">
            <thead>
              <tr>
                <th className="nums">#</th>
                <th className="til">course</th>
                <th>Progress</th>
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
