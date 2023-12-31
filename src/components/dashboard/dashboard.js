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
    axios.post('https://adminlte-react-js-backend-th-release.onrender.com/readmemo', {
      username : localStorage.getItem('currentUser')
    })
    .then(result => {
      setMemoList(result.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [save])

  const showMemoList = memoList.map((item, index) => {

    const deleteMemo = (id) => {
      axios.post(`https://adminlte-react-js-backend-th-release.onrender.com/deletememo/${item._id}`, {
        username : localStorage.getItem('currentUser')
      })
      .then(result => {
        setMemoList(memoList.filter(item => {
          return item._id !== id;
        }))
      })
    }

    const editMemo = (id) => {
      Swal.fire({
        title: "แก้ไขบันทึก",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: (inputText) => {
  
          // const newMemo = {
          //   memo: inputText,
          //   isDone: false,
          //   created: Date()
          // }
  
          return axios.post(`https://adminlte-react-js-backend-th-release.onrender.com/editmemo/${item._id}`,{
            username : localStorage.getItem('currentUser'),
            newMemo : inputText
          })
          .then(result => {
            // setMemoList(memoList.filter(item => {
            //   if(item._id === id){
            //     item.memo = newMemo;
            //   }
            //   return item;
            // }))
          })
          .catch(err => {
            console.log(err);
            Swal.showValidationMessage(`Request failed: ${err}`);
          });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then(result => {
        if (result.isConfirmed) {
          setSave(~save);
          Swal.fire(
            "บันทึกข้อมูลสำเร็จ!",
            "กำลังไปยังหน้า Dashboard!",
            "success"
          );
        }
      });
    }

    const setMemoStatus = (id) => {
      axios.post(`https://adminlte-react-js-backend-th-release.onrender.com/updatememo/${item._id}`, {
        username : localStorage.getItem('currentUser'),
        oldIsDone : item.isDone
      })
      .then(result => {
        setMemoList(memoList.filter(item => {
          if(item._id === id){
            item.isDone === true ? item.isDone = false: item.isDone = true;
          }
          return item;
        }))
      })
    }

    return(
      <tr key={item._id}>
        <td>
          <span>{item.memo}</span>
          <br />
          <small>{item.created}</small>
        </td>
        <td className="project-state" onClick={() => setMemoStatus(item._id)}>
          {(item.isDone) ? 
          <span className="badge badge-success" style={{padding: 10}}>สำเร็จ</span> : 
          <span className="badge badge-danger" style={{padding: 10}}>ยังไม่ได้ทำ</span>}
        </td>
        <td className="project-actions text-right">
          <button className="btn btn-info btn-sm" onClick={() => editMemo(item._id)} style={{width: 70}}>
            <i className="fas fa-pencil-alt"></i>
            แก้ไข
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => deleteMemo(item._id)} style={{width: 70}}>
            <i className="fas fa-trash"></i>
            ลบ
          </button>
        </td>
      </tr>
    )
  })

  const createMemo = () => {
    Swal.fire({
      title: "พิมพ์ข้อความที่ต้องการ",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: (inputText) => {

        // const newMemo = {
        //   memo: inputText,
        //   isDone: false,
        //   created: Date()
        // }

        return axios.post(`https://adminlte-react-js-backend-th-release.onrender.com/creatememo`,{
          username : localStorage.getItem('currentUser'),
          newMemo : inputText
        })
        .then(result => {
          // setMemoList([...memoList, newMemo]);
        })
        .catch(err => {
          console.log(err);
          Swal.showValidationMessage(`Request failed: ${err}`);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.isConfirmed) {
        setSave(~save);
        Swal.fire(
          "บันทึกข้อมูลสำเร็จ!",
          "กำลังไปยังหน้า Dashboard!",
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
            <h3 className="card-title">บันทึก</h3>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>#</th>
                  <th style={{ width: "8%" }} className="text-center">
                    สถานะ
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
          เพิ่มบันทึก
        </button>
      </section>
      {/* /.content */}
    </div>
  );
}

export default Dashboard;
