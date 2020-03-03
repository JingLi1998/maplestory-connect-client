import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    fontWeight: 700
  }
};

export class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button
            className={classes.button}
            component={Link}
            to="/login"
            color="inherit"
          >
            Login
          </Button>
          <Button
            color="inherit"
            className={classes.button}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            className={classes.button}
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar);
