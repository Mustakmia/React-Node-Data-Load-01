import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  const salaryRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const salary = salaryRef.current.value;
    const newUser = { name: name, email: email, salary: salary }

    // send data to the server
    fetch('http://localhost:3000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const addeedUser = data;
        const newUser = [...users, addeedUser];
        setUsers(newUser);
      })
    nameRef.current.value = '';
    emailRef.current.value = '';
    salaryRef.current.value = '';
    e.preventDefault();
  }
  return (
    <div className="App">

      <h2>Found users:{users.length}</h2>
      <form onSubmit={handleAddUser}>

        <input type="text" ref={nameRef}
          placeholder="name"></input>

        <input type="email" ref={emailRef} name="" id="" placeholder="email" />
        <br />

        <input type="text" ref={salaryRef}
          placeholder="salary"></input>

        <input type="submit" value="submit" />


      </form>

      <ul>
        {
          users.map(user => <li key={user.id}> Id:-{user.id}:     Name:-{user.name}:   Job:-{user.acu}:    Age:-{user.age}:    Salary:-{user.salary}:email:-{user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
