import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const username = 'test';

let updatedUser = {};

const onClick = () => {
  axios.put(`/profiles/${username}`, updatedUser)
  .then((res) => {
    console.log(res);
  });
};

const onChange = (e) => {
  const val = e.target.value;
  const prop = e.target.getAttribute('data-type');
  updatedUser[prop] = val;
};

const Profile = (props) => {
  updatedUser = { ...props.user };

  return (
    <div>
      <h1>Your Profile</h1><br />
      <div>
        <label htmlFor="inputUsername">Username:</label>
        <input id="inputUsername" onChange={onChange} data-type="username" type="text" placeholder="username" defaultValue={updatedUser.username} />
      </div>
      <div>
        <label htmlFor="inputPassword">Password:</label>
        <input id="inputPassword" onChange={onChange} data-type="password" type="text" placeholder="password" />
      </div>
      <div>
        <label>Member since {updatedUser.dateAdded} </label>
      </div>
      <div>
        <label htmlFor="inputEmailAddress">Email:</label>
        <input id="inputEmailAddress" onChange={onChange} data-type="email" type="text" placeholder="email" defaultValue={updatedUser.email} />
      </div>
      <div>
        <label htmlFor="inputCity">City:</label>
        <input id="inputCity" onChange={onChange} data-type="cityOfResidence" type="text" placeholder="city" defaultValue={updatedUser.cityOfResidence} />
      </div>
      <div>
        <label htmlFor="inputCountry">Country:</label>
        <input id="inputCountry" onChange={onChange} data-type="countryOfResidence" type="text" placeholder="country" defaultValue={updatedUser.countryOfResidence} />
      </div>
      <br />
      <div>
        <button onClick={onClick} >Update My Profile</button>
        &nbsp;&nbsp;
        <button>Cancel</button>
      </div>
    </div>
  );
};

Profile.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

Profile.defaultProps = {
  isAuthenticated: false,
  user: {},
};

export default Profile;
