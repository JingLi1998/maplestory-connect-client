import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteSmega from './DeleteSmega';
import SmegaDialog from './SmegaDialog';
import FameButton from './FameButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = theme => ({
  ...theme.spreadIt
  // card: {
  //   position: 'relative',
  //   display: 'flex',
  //   marginBottom: 20
  // },
  // image: {
  //   minWidth: 200
  // },
  // content: {
  //   padding: 25,
  //   objectFit: 'cover'
  // }
});

export class Smega extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      smega: {
        body,
        createdAt,
        userImage,
        userHandle,
        fameCount,
        commentCount,
        smegaId
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteSmega smegaId={smegaId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            color="primary"
            component={Link}
            to={`/users/${userHandle}`}
            variant="h5"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <FameButton smegaId={smegaId} />
          <span>{fameCount} Fame</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <SmegaDialog
            smegaId={smegaId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Smega.propTypes = {
  user: PropTypes.object.isRequired,
  smega: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Smega));
