import axios from "axios";
import { useState, useEffect } from "react";
export default function Users() {
  const [users, setusers] = useState([]);
  const [runuseeffect , setRun] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/user/show/')
      .then((res) => res.json())
      .then((data) => setusers(data));
  }, [runuseeffect]);
  async function deleteusers (id){
    try{
    const res =await axios.delete (`http://127.0.0.1:8000/api/user/delete/${id}`);
    if (res===200){
    setRun((pre)=>pre+1);
  }
    } catch{
      console.log('none')
    }
  }

  const showdata = users.map((users, index) => (
    <tr>
      <td>{index+1}</td>
      <td>{users.name}</td>
      <td>{users.email}</td>
      <td>
        <button className="btn-delete" onClick={()=>deleteusers(users.id) }>DELETE</button>
      </td>
      
    </tr>
  ));
  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>DELETE</th>
          </tr>
        </thead>
        <tbody>{showdata}</tbody>
      </table>
    </div>
  );
}
