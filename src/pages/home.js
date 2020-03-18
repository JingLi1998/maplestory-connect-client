import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Smega from '../components/smega/Smega';
import Profile from '../components/profile/Profile';
import SmegaSkeleton from '../util/SmegaSkeleton';

import { connect } from 'react-redux';
import { getSmegas } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getSmegas();
  }
  render() {
    const { smegas, loading } = this.props.data;
    let recentSmegasMarkup = !loading ? (
      smegas.map(smega => <Smega smega={smega} key={smega.smegaId} />)
    ) : (
      <SmegaSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentSmegasMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getSmegas: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getSmegas })(home);
