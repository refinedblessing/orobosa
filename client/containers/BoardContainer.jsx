import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Board from '../components/Board';
import * as boardActionCreators from '../actionCreators/BoardActionCreators';

const mapStateToProps = ({ boardsState }) => ({
  boardsState,
});

const mapDispatchToProps = dispatch => ({
  addBoard: board =>
    bindActionCreators(
      dispatch({ type: 'ADDING_BOARDS' }),
      dispatch(boardActionCreators.addBoard(board)),
    ),
  deleteBoard: (id, index) =>
    dispatch(boardActionCreators.deleteBoard(id, index)),
  getAllBoards: () => {
    return bindActionCreators(
      dispatch({ type: 'GETTING_BOARDS' }),
      dispatch(boardActionCreators.getAllBoards()),
    )}
});

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBoard: {
        title: '',
      },
    };
  }

  handleChange = (event) => {
    event.persist();
    this.setState(({ newBoard }) => ({
      newBoard: { ...newBoard, title: event.target.value },
    }));
  };

  handleAddMarket = () => {
    this.props.addBoard({ title: this.state.newBoard.title });
    this.setState(({ newBoard }) => ({ newBoard: { ...newBoard, title: '' } }));
  };

  componentDidMount() {
    this.props.getAllBoards();
  }

  render() {
    const { boards, user = {} } = this.props.boardsState;
    const { title } = this.state.newBoard;
    const boardsDisplay = boards.map((board, i) => (
      <Board key={i} board={board} index={i} delete={this.props.deleteBoard} />
    ));

    const boardName = user.name ? `${user.name}'s Boards` : 'Public Boards';
    return (
      <Grid>
        <Paper elevation={1}>
        <Typography variant="headline" component="h3">
         {/* {boardName} */}
        </Typography>
      </Paper>
        <Grid
          container
          style={{ flexGrow: 1, marginTop: 30 }}
          spacing={16}
        >
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              <Card style={{ maxWidth: 300 }}>
                <CardContent>
                  <TextField
                    id="boardInput"
                    label="Add New Board"
                    margin="normal"
                    value={title}
                    onChange={this.handleChange}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="fab"
                    color="primary"
                    aria-label="add"
                    disabled={!title}
                    style={{ width: 30, height: 30 }}
                  >
                    <Icon onClick={this.handleAddMarket} className="add">
                      add
                    </Icon>
                  </Button>
                </CardActions>
              </Card>
              {boardsDisplay}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardContainer);
