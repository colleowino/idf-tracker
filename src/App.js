import React from "react";
import "./App.css";
import "./tachyons.min.css";
import CourseProgress from "./CourseProgress";
import serialize from "form-serialize";
import axios from "axios";

const COURSE_URL = "http://localhost:1960/courses";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showForm: false
    };
  }

  componentDidMount() {
    fetch(COURSE_URL)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  showCourseDialog() {
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("dn");
  }

  hideCourseDialog() {
    const overlay = document.getElementById("overlay");
    document.getElementById("courseForm").reset();
    overlay.classList.add("dn");
  }

  handleSubmit = event => {
    event.preventDefault();
    const data = serialize(event.target, { hash: true });

    axios
      .post(COURSE_URL, data)
      .then(resp => {
        const newData = this.state.data;
        newData.push(resp.data);
        this.setState({ data: newData });
        this.hideCourseDialog();
      })
      .catch(error => {
        console.log(error);
      });

    this.hideCourseDialog();
  };

  render() {
    const courseItems = this.state.data.map((x, indx) => (
      <CourseProgress index={indx+1} key={x.id} course={x} />
    ));
    return (
      <div className="relative App">
        <div
          className="overlay absolute dn left-0 vh-100 w-100 bg-black-70"
          id="overlay"
        >
          <article className="absolute ba add-form bg-white relative center pa4 black-80">
            <form
              id="courseForm"
              action="sign-up_submit"
              method="post"
              onSubmit={this.handleSubmit}
              acceptCharset="utf-8"
            >
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <div className="mt3">
                  <label className="db fw4 lh-copy f6" htmlFor="title">
                    Course title
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent w-100 measure"
                    type="text"
                    name="title"
                    id="title"
                    required
                  />
                </div>
                <div className="mt3 w-50 fl pr2">
                  <label className="db fw4 lh-copy f6" htmlFor="points_gained">
                    Points gained
                  </label>
                  <input
                    className="w-100 pa2 input-reset ba bg-transparent"
                    type="number"
                    name="points_gained"
                    id="points_gained"
                    defaultValue="0"
                  />
                </div>
                <div className="mt3 w-50 fr">
                  <label className="db fw4 lh-copy f6" htmlFor="points_total">
                    Maximum points
                  </label>
                  <input
                    className="w-100 pa2 input-reset ba bg-transparent"
                    type="number"
                    name="points_total"
                    id="points_total"
                    required
                  />
                </div>
              </fieldset>
              <div className="mt3">
                <input
                  className="b ph3 white pv2 input-reset ba b--black bg-green grow pointer f6"
                  type="submit"
                  value="Save"
                />
                <a
                  className="f6 b ml3 ba b--black  link dim br1 ph3 pv2 mb2 dib white bg-dark-pink"
                  href="#0"
                  onClick={this.hideCourseDialog}
                >
                  Cancel
                </a>
              </div>
            </form>
          </article>
        </div>
        <main className="w-50 center mt5">
          <h1 className="f6 fw6 ttu tracked mb4">
            Interaction Design Foundation Courses
            <button
              className="b--black-10 ba bg-blue fr pointer pv1 white"
              type="submit"
              onClick={this.showCourseDialog}
            >
              + Course
            </button>
          </h1>

          <table className="blueTable">
            <thead>
              <tr>
                <th className="nums">#</th>
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
