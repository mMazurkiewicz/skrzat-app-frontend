import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
    maxWidth: '250px',
  },
});

export function Home(props) {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <img
        src="./assets/skrzat-logo.png"
        alt="skrzat logo"
        className={classes.logo}
      />
    </main>
  );
}

Home.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string,
    content: PropTypes.string,
    logo: PropTypes.string,
  }),
};

export default withStyles(styles)(Home);
