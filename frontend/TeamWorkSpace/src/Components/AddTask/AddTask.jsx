import React, { useState, useEffect } from 'react';
import './AddTask.css';

const AddTask = () => {
  const [members, setMembers] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    member1: '',
    member2: '',
    member3: '',
    date: ''
  });

  // Fetch members data when the component loads
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:4000/allmembers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        const fetchedMembers = await response.json();

        if (fetchedMembers) {
          setMembers(fetchedMembers);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Update the state when a user changes the input or selects a member
  const changeHandler = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Submit the form and add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    let taskData;
    await fetch('http://localhost:4000/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then((res) => res.json())
      .then((data) => (taskData = data));

    if (taskData.success) {
      console.log(taskData);
      alert("New Task Added");
      window.location.replace('/add-task');
    }
  };

  return (
    <div className="add-task">
      <h2>Add New Task</h2>
      <form method="POST" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task Title"
          name="title"
          value={task.title}
          onChange={changeHandler}
          required
        />
        <textarea
          placeholder="Task Description"
          name="description"
          value={task.description}
          onChange={changeHandler}
          required
        />

        <select
          name="member1"
          value={task.member1}
          onChange={changeHandler}
          required
        >
          <option value="">Select Member 1</option>
          {members.map((member) => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>

        <select
          name="member2"
          value={task.member2}
          onChange={changeHandler}
          required
        >
          <option value="">Select Member 2</option>
          {members.map((member) => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>

        <select
          name="member3"
          value={task.member3}
          onChange={changeHandler}
          required
        >
          <option value="">Select Member 3</option>
          {members.map((member) => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
