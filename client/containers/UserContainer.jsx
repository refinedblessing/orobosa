import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import MenuBar from '../components/User/MenuBar.jsx';
import * as userActionCreators from '../actionCreators/UserActionCreators';
import BoardContainer from './BoardContainer.jsx';
import credentials from '../credentials.json';


const mapStateToProps = ({ userState }) => ({ userState });

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(userActionCreators.logout()),
  logMeIn: () => dispatch(userActionCreators.logMeIn()),
  getUser: () => dispatch(userActionCreators.getUser()),
  onFailure: error => dispatch({ type: 'ERROR', error }),
  onSuccessResponse: resp => dispatch(userActionCreators.login(resp)),
});

class UserContainer extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { isAuthenticated, userDetails, wantsToLogin } = this.props.userState;
    const content = wantsToLogin ?
      <Grid container justify="center" spacing={16} style={{ marginTop: '15%' }}>
        <GoogleLogin
          clientId={credentials.GOOGLE_CLIENT_ID}
          buttonText='Google Login'
          onSuccess={this.props.onSuccessResponse}
          onFailure={this.props.onFailure}
        />
      </Grid> : <BoardContainer user={userDetails}/>;
    return (
      <Grid>
        <MenuBar
          logout={this.props.logOut}
          login={this.props.logMeIn}
          picture={userDetails.picture}
          name={userDetails.name}
          isAuthenticated={isAuthenticated}
        />
        {content}
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserContainer);
