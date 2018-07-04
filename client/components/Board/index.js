import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

const styles = {
  card: {
    maxWidth: 300,
  },
  title: {
    marginBottom: 16,
    fontSize: 16,
  },
};

function Board(props) {
  const { classes } = props;
  return (
    <Grid item>
      <Card className={classes.card} style={{ margin: '0 10' }}>
        <CardContent>
        <TextField
          id="title"
          // label="Title"
          className={classes.textField}
          value={props.board.title}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        </CardContent>
        <CardActions>
          <Button
            variant="fab"
            color="primary"
            style={{ width: 30, height: 30 }}
          >
            <Icon>
              touch_app
            </Icon>
          </Button>
          <Button
            variant="fab"
            color="primary"
            style={{ width: 30, height: 30 }}
          >
            <Icon>
              edit
            </Icon>
          </Button>
          <Button
            variant="fab"
            color="primary"
            style={{ width: 30, height: 30 }}
          >
            <Icon>
              delete
            </Icon>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Board);
