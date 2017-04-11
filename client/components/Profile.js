import React from 'react';

const Profile = () => {
  return (
    <div>
      <h1>Your Profile</h1><br />
      <div>
        <label htmlFor="inputUsername">Username:</label>
        <input id="inputUsername" type="text" placeholder="username" />
      </div>
      <div>
        <label htmlFor="inputPassword">Password:</label>
        <input id="inputPassword" type="text" placeholder="password" />
      </div>
      <div>
        <label>Member since XXXXXXX</label>
      </div>
      <div>
        <label htmlFor="inputEmailAddress">Email:</label>
        <input id="inputEmailAddress" type="text" placeholder="email" />
      </div>
      <div>
        <label htmlFor="inputCity">City:</label>
        <input id="inputCity" type="text" placeholder="city" />
      </div>
      <div>
        <label htmlFor="inputCountry">Country:</label>
        <input id="inputCountry" type="text" placeholder="country" />
      </div>
      <br />
      <div>
        <button>Update My Profile</button>
        &nbsp;&nbsp;
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Profile;
