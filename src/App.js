import React from "react";
import "./App.css";
import "./tachyons.min.css";
import CourseProgress from "./CourseProgress";

const COURSE_URL = "http://localhost:1960/courses";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(COURSE_URL)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    const courseItems = this.state.data.map(x => (
      <CourseProgress key={x.id} course={x} />
    ));
    return (
      <div className="App">
        <main className="w-50 center mt5">
          <h1 className="f6 fw6 ttu tracked mb4">
            IDF Courses
            <button
              className="b--black-10 ba bg-blue fr pointer pv1 white"
              type="submit"
            >
              + Course
            </button>
          </h1>

          <table className="blueTable">
            <thead>
              <tr>
                <th className="til">course</th>
                <th>Progress</th>
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
