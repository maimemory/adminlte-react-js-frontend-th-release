import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Context } from "./../../App";

function Dashboard() {

  const { account } = useContext(Context);

  const [memoList, setMemoList] = useState([]);
  const [save, setSave] = useState(false);

  if(localStorage.getItem('currentUser') === null){
    localStorage.setItem('currentUser', account.username);
  }
  
  useEffect(() => {
    axios.post('http://localhost:1000/readmemo', {
      username : localStorage.getItem('currentUser')
    })
    .then(result => {
      console.log(result);
      setMemoList(result.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [save])

  const showMemoList = memoList.map((item, index) => {

    const deleteMemo = (id) => {

      axios.post(`http://localhost:1000/deletememo/${item._id}`, {
        username : localStorage.getItem('currentUser')
      })
      .then(result => {
        console.log(result.data);
        setMemoList(memoList.filter(item => {
          return item._id != id;
        }))
      })
    }

    // const setMemoStatus = (id) => {

    //   axios.post(`http://localhost:1000/updatememo/${item._id}`, {
    //     username : localStorage.getItem('currentUser')
    //   })
    //   .then(result => {
    //     console.log(result.data);
    //     setMemoList(memoList.filter(item => {
    //       if(item._id = id){
    //         item.isDone = ~item.isDone;
    //       }
    //     }))
    //   })
    // }

    return(
      <tr key={item._id}>
        <td>
          <a>{item.memo}</a>
          <br />
          <small>{item.created}</small>
        </td>
        <td className="project-state">
          {(item.isDone) ? 
          <span className="badge badge-success" style={{padding: 10}}>Success</span> : 
          <span className="badge badge-danger" style={{padding: 10}}>Incomplete</span>}
        </td>
        <td className="project-actions text-right">
          <a className="btn btn-info btn-sm" href="#">
            <i className="fas fa-pencil-alt"></i>
            Edit
          </a>
          <a className="btn btn-danger btn-sm" onClick={() => deleteMemo(item._id)}>
            <i className="fas fa-trash"></i>
            Delete
          </a>
        </td>
      </tr>
    )
  })

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

        const newMemo = {
          memo: inputText,
          isDone: false,
          created: Date()
        }

        return axios.post(`http://localhost:1000/creatememo`,{
          username : localStorage.getItem('currentUser'),
          newMemo : inputText
        })
        .then(result => {
          setMemoList([...memoList, newMemo]);
          console.log(result);
        })
        .catch(err => {
          console.log(err);
          Swal.showValidationMessage(`Request failed: ${err}`);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      console.log(result);
      if (result.isConfirmed) {
        setSave(~save);
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
                {showMemoList}
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
