import React from 'react';
import "../../styles/Topbar.css";

const Topbar = ({ firstName, onLogout }) => {
    /*
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    */
   
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    firstName = ud.firstName;

    const doLogout = event => 
    {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
    };

  return (
    <div className="top_bar">
      <div className="user_info">
        {firstName && <span>Welcome, {firstName}</span>}
      </div>
      <div className="title">
        <span className="title_text">Turntable</span>
      </div>
      <div className="logout_button">
        <button onClick={doLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Topbar;