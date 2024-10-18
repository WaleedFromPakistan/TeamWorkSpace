import React, { useState } from 'react';
import './AddNewMember.css';

const AddNewMember = () => {
  
  const [member, setMember] = useState({
    name: '',
    email: ''
  });

  const onChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleAddNewMember = async (e) => {
    e.preventDefault(); // Prevent form submission
    let memberData;
    await fetch('http://localhost:4000/addmember', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    })
      .then((res) => res.json())
      .then((data) => (memberData = data));

    if (memberData.success) {
      console.log(memberData);
      window.location.replace('/Dashboard'); // Corrected the typo
    }
  };

  return (
    <div className="add-member">
      <h2>Add New Member</h2>
      <form method='POST' onSubmit={handleAddNewMember}>
        <input
          type="text"
          placeholder="Member Name"
          value={member.name}
          name="name"
          onChange={onChange}
          required
        />
        <input
          type="email"
          placeholder="Member Email"
          value={member.email}
          name="email"
          onChange={onChange}
          required
        />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddNewMember;
