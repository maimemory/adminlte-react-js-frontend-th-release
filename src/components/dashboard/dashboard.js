import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Dashboard() {

  const createMemo = () => {
    Swal.fire({
      title: "Submit Your Memo",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: (inputText) => {
        return fetch(`//api.github.com/users/${inputText}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Save Successfully!",
          "Redirect to Dashboard!",
          "success"
        );
      }
    });
  };

  return (
    <div className="content-wrapper">
      {/* Main content */}
      <section className="content">
        {/* Default box */}
        <div className="card" style={{ marginTop: 10 }}>
          <div className="card-header">
            <h3 className="card-title">Projects</h3>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Project Name</th>
                  <th style={{ width: "8%" }} className="text-center">
                    Status
                  </th>
                  <th style={{ width: "20%" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a>AdminLTE v3</a>
                    <br />
                    <small>Created 01.01.2019</small>
                  </td>
                  <td className="project-state">
                    <span className="badge badge-success">Success</span>
                  </td>
                  <td className="project-actions text-right">
                    <a className="btn btn-info btn-sm" href="#">
                      <i className="fas fa-pencil-alt"></i>
                      Edit
                    </a>
                    <a className="btn btn-danger btn-sm" href="#">
                      <i className="fas fa-trash"></i>
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
        <button
          className="btn btn-block bg-gradient-success btn-lg"
          style={{ marginTop: 10 }}
          onClick={createMemo}
        >
          New Task
        </button>
      </section>
      {/* /.content */}
    </div>
  );
}

export default Dashboard;
