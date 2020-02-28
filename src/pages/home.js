import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

export class home extends Component {
  state = {
    smegas: null
  };
  componentDidMount() {
    axios
      .get('/smegas')
      .then(res => {
        this.setState({
          smegas: res.data
        });
        console.log(this.state.smegas);
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentSmegasMarkup = this.state.smegas ? (
      this.state.smegas.map(smega => <p>{smega.body}</p>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentSmegasMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
