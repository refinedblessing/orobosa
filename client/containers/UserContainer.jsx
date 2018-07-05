import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import MenuBar from '../components/User/MenuBar.jsx';
import * as userActionCreators from '../actionCreators/UserActionCreators';
import BoardContainer from './BoardContainer.jsx';
import credentials from '../credentials.json';


const mapStateToProps = ({ userState }) => ({ userState });

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(userActionCreators.logout()),
  logMeIn: () => dispatch(userActionCreators.logMeIn()),
  onFailure: error => dispatch({ type: 'ERROR', error }),
  onSuccessResponse: resp => dispatch(userActionCreators.login(resp)),
});

class UserContainer extends Component {
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
      </Grid> : <BoardContainer />;
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
