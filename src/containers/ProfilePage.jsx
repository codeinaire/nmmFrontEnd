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
      state: 'true',
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <GridSpace>
          <GridContainer >
            <GridItemA >
              <div className="card">
                <div className="card-body">
                  <h1>This is for photo</h1>
                </div>
              </div>
            </GridItemA>
            <GridItemB >
              <div className="card" >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Username: {this.props.username}</li>
                  <li className="list-group-item">Name</li>
                  <li className="list-group-item">Email Address</li>
                </ul>
              </div>
            </GridItemB>
            <GridItemC >
              <div className="card">
                <div className="card-body">
                  About
                </div>
              </div>
            </GridItemC>
            <GridItemD >
              <div className="card">
                <div className="card-body">
                  My motivations
                </div>
              </div>
            </GridItemD>
            <GridItemE >
              <div className="card">
                <div className="card-body">
                  Badges
                </div>
              </div>
            </GridItemE>
          </GridContainer>
          <Button >Edit</Button>
        </GridSpace>
      </div>
    );
  }
}


export default ProfilePage;
