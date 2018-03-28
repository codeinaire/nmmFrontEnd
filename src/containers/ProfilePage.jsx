import React from 'react';
// import { ApolloClient } from 'apollo-client';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import NavBar from '../sharedPresentational/SharedNavBar';

const GridSpace = styled.div`
  margin: 4rem;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  background-color: #fff;
  color: #444;
`;
const GridItem = styled.div`
  background-color: #444;
  border-radius: 5px;
  padding: 20px;
  font-size: 150%;
`;
const GridItemA = GridItem.extend`
  grid-column: 1;
  grid-row: 1;
`;
const GridItemB = GridItem.extend`
  grid-column: 2 / 4;
  grid-row: 1;
`;
const GridItemC = GridItem.extend`
  grid-column: 1;
  grid-row: 2;
`;
const GridItemD = GridItem.extend`
  grid-column: 2;
  grid-row: 2;
`;
const GridItemE = GridItem.extend`
  grid-column: 3;
  grid-row: 2;
`;
const Button = styled.button.attrs({
  className: 'btn btn-primary',
  type: 'button',
})`
  margin: 1rem;
`;

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bioText: 'Enter a bit about yourself!',
      editProfile: false,
      motivationText: 'What motivates you?',
      firstName: '',
      lastName: '',
    };

    this.editProfile = this.editProfile.bind(this);
  }

  editProfile() {
    this.setState(prevState => ({
      editProfile: !prevState.editProfile,
    }));
  }

  render() {
    const textareaSectionNames = ['bioText', 'motivationText'];
    const textareaSections = this.state.editProfile ? textareaSectionNames.map(value => (
      <div className="form-group">
        <textarea
          className="form-control"
          id={value}
          maxLength="160"
          name={value}
          placeholder="Tell us a bit about yourself"
          required
          rows="5"
          value={this.state[`${value}`]}
          spellCheck
          wrap="soft"
        />
      </div>)) : textareaSectionNames.map(value => (<p className="card-body" id={value}>{this.state[`${value}`]}</p>));
    const nameInput = this.state.editProfile ? (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="First Name" value={this.state.firstName} />
        <input type="text" className="form-control" placeholder="Last Name" value={this.state.lastName} />
      </div>
    ) : (<p className="card-body">{this.state.firstName} {this.state.lastName}</p>);
    const editSubmitButton = this.state.editProfile ? (
      <Button
        onClick={this.editProfile}
      >
      Submit
      </Button>
    ) : (
      <Button
        onClick={this.editProfile}
      >
      Edit
      </Button>
    );
    return (
      <div>
        <NavBar />
        <GridSpace>
          <form >
            <GridContainer >
              <GridItemA >
                <div className="card">
                  <div className="card-body">
                    <h1 className="card-title">This is for photo</h1>
                  </div>
                </div>
              </GridItemA>
              <GridItemB >
                <div className="card" >
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Username: {this.props.username}</li>
                    <li className="list-group-item">Name: {nameInput}</li>
                    <li className="list-group-item">Email Address: {this.props.email}</li>
                  </ul>
                </div>
              </GridItemB>
              <GridItemC >
                <div className="card">
                  <div className="card-header">
                    Bio
                  </div>
                  <div className="card-body">
                    {textareaSections[0]}
                  </div>
                </div>
              </GridItemC>
              <GridItemD >
                <div className="card">
                  <div className="card-header">
                    Motivation
                  </div>
                  <div className="card-body">
                    {textareaSections[1]}
                  </div>
                </div>
              </GridItemD>
              <GridItemE >
                <div className="card">
                  <div className="card-header">
                    Badges
                  </div>
                  <div className="card-body">
                    <p className="card-text">This is where badges go</p>
                  </div>
                </div>
              </GridItemE>
            </GridContainer>
          </form>
          {editSubmitButton}
        </GridSpace>
      </div>
    );
  }
}


export default ProfilePage;
