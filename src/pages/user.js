import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Smega from '../components/smega/Smega';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import SmegaSkeleton from '../util/SmegaSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    smegaIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const smegaId = this.props.match.params.smega;

    if (smegaId) this.setState({ smegaIdParam: smegaId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { smegas, loading } = this.props.data;
    const { smegaIdParam } = this.state;

    const smegasMarkup = loading ? (
      <SmegaSkeleton />
    ) : smegas === null ? (
      <p>No smegas from this user</p>
    ) : !smegaIdParam ? (
      smegas.map(smega => <Smega key={smega.smegaId} smega={smega} />)
    ) : (
      smegas.map(smega => {
        if (smega.smegaId !== smegaIdParam)
          return <Smega key={smega.smegaId} smega={smega} />;
        else return <Smega key={smega.smegaId} smega={smega} openDialog />;
      })
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {smegasMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
