import React from "react";
import "./App.css";
import "./tachyons.min.css";

class App extends React.Component {
  render() {
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
            <tbody>
              <tr>
                <td>
                  <h1 className="f6 f5-ns fw6 lh-title black mv0">
                    Dynamic User Experience: Design and Usability
                  </h1>
                </td>
                <td>
                  <progress className="white" max="100" value="80"></progress>
                  <span className="ml3">70/100</span>
                </td>
              </tr>
              <tr>
                <td>
                  <h1 className="f6 f5-ns fw6 lh-title black mv0">
                    Dynamic User Experience: Design and Usability
                  </h1>
                </td>
                <td>
                  <progress className="white" max="100" value="80"></progress>
                  <span className="ml3">70/100</span>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    );
  }
}
export default App;
