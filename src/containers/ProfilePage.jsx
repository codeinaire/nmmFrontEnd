import React from 'react';
import NavBar from '../sharedPresentational/SharedNavBar';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      state: 'true',
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        {`the state is: ${this.props.username}`}
      </div>
    );
  }
}

export default ProfilePage;
