import React from 'react';
import { Query, Mutation } from 'react-apollo';
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

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $bio: String,
    $motivation: String!,
  ) {
    profileUpdate (
      bio: $bio,
      motivation: $motivation,
    ) {
      bio
      motivation
    }
  }
`;

const GET_PROFILE = gql`
  {
    profile {
      motivation
      bio
    }
  }
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
    this.updateState = this.updateState.bind(this);
  }

  handleSubmit(event, updateProfile) {
    console.log('this is event', event);
    event.preventDefault();

    const data = new FormData(event.target);

    const dataToSend = {
      bio: data.get('bioText'),
      motivation: data.get('motivationText'),
    };

    console.log('this is data', dataToSend);
    this.editProfile();

    updateProfile({
      variables: dataToSend,
    }).then((response) => {
      console.log('this is response in profile', response);
    }).catch((err) => {
      console.error('there was an error sending the query', err.networkError.response.status);
    });
    // profileUpdate({ variables: {
    //
    // }})
  }

  editProfile() {
    this.setState(prevState => ({
      editProfile: !prevState.editProfile,
    }));
  }

  updateState(data) {
    this.setState({
      bioText: data.profile[0].bio,
      motivationText: data.profile[0].motivation,
    });
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
          defaultValue={this.state[`${value}`]}
          spellCheck
          wrap="soft"
        />
      </div>)) : textareaSectionNames.map(value => (<p className="card-body" id={value}>{this.state[`${value}`]}</p>));
    const nameInput = this.state.editProfile ? (
      <div className="input-group">
        <input
          className="form-control"
          defaultValue={this.state.firstName}
          onChange={event => this.setState({ firstName: event.target.value })}
          name="firstName"
          placeholder="First Name"
          type="text"
        />
        <input
          className="form-control"
          defaultValue={this.state.lastName}
          onChange={event => this.setState({ lastName: event.target.value })}
          name="lastName"
          placeholder="Last Name"
          type="text"
        />
      </div>
    ) : (<p className="card-body">{this.state.firstName} {this.state.lastName}</p>);
    const submitButton = this.state.editProfile ? (
      <Button type="submit">
      Submit
      </Button>
    ) : null;
    return (
      <div>
        <NavBar />
        <GridSpace>
          <Mutation mutation={UPDATE_PROFILE}>
            {(updateProfile, { loadingMutation, errorMutation }) => {
              console.log('this is test', updateProfile);
              return (
                <div>
                  <form onSubmit={event => this.handleSubmit(event, updateProfile)}>
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
                    {submitButton}
                  </form>
                  {loadingMutation && (<p>Loading...</p>)}
                  {errorMutation && (<p>Error :( Please try again</p>)}
                </div>
              );
            }}
          </Mutation>
          <Button
            onClick={this.editProfile}
          >
          Edit
          </Button>
        </GridSpace>
      </div>
    );
  }
}

export default ProfilePage;
