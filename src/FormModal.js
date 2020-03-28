import React from "react";
import serialize from "form-serialize";
import axios from "axios";
import { COURSE_URL, formActions } from "./constants";

class FormModal extends React.Component {
  hideCourseDialog() {
    const overlay = document.getElementById("overlay");
    document.getElementById("courseForm").reset();
    overlay.classList.add("dn");
  }

  addCourse(data) {
    axios
      .post(COURSE_URL, data)
      .then(resp => {
        console.log(resp);
        this.props.refresh(resp.data);
        this.hideCourseDialog();
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateCourse(data) {
    axios
      .patch(`${COURSE_URL}/${this.props.course.id}`, data)
      .then(resp => {
        this.props.refresh(resp.data);
        this.hideCourseDialog();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { formAction } = this.props;
    const data = serialize(event.target, { hash: true });

    if (formAction === formActions.CREATE) {
      this.addCourse(data);
    }

    if (formAction === formActions.EDIT) {
      this.updateCourse(data);
    }

    this.hideCourseDialog();
  };

  render() {
    const { title, points_gained, points_total } = this.props.course || {};
    return (
      <div
        className="overlay absolute dn left-0 vh-100 w-100 bg-black-70"
        id="overlay"
      >
        <article className="absolute ba add-form bg-white relative center pa4 black-80">
          <form
            id="courseForm"
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
                  defaultValue={title || ""}
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
                  defaultValue={points_gained}
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
                  defaultValue={points_total}
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
                className="f6 b ml3  link dim br1 ph3 pv2 mb2 dib white bg-silver"
                href="#0"
                onClick={this.hideCourseDialog}
              >
                Cancel
              </a>
            </div>
          </form>
        </article>
      </div>
    );
  }
}

export default FormModal;
