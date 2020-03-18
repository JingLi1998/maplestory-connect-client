import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { fameSmega, defameSmega } from '../../redux/actions/dataActions';

export class FameButton extends Component {
  famedSmega = () => {
    if (
      this.props.user.fame &&
      this.props.user.fame.find(e => e.smegaId === this.props.smegaId)
    )
      return true;
    else return false;
  };

  fameSmega = () => {
    this.props.fameSmega(this.props.smegaId);
  };
  defameSmega = () => {
    this.props.defameSmega(this.props.smegaId);
  };

  render() {
    const { authenticated } = this.props.user;
    const fameButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Fame">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.famedSmega() ? (
      <MyButton tip="Undo fame" onClick={this.defameSmega}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Fame" onClick={this.fameSmega}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return fameButton;
  }
}

FameButton.propTypes = {
  user: PropTypes.object.isRequired,
  smegaId: PropTypes.string.isRequired,
  fameSmega: PropTypes.func.isRequired,
  defameSmega: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  fameSmega,
  defameSmega
};

export default connect(mapStateToProps, mapActionsToProps)(FameButton);
