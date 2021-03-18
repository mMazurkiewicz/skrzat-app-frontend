import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  link: { color: theme.palette.text.secondary },
});

export function SimpleBreadcrumbs(props) {
  const { routes, classes } = props;
  return (
    <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '50px' }}>
      <NavLink to="/" className={classes.link}>
        Home
      </NavLink>
      {routes &&
        routes.map((route, i) => {
          if (i < routes.length - 1) {
            return (
              <NavLink
                key={i}
                color="textSecondary"
                to={route.href}
                className={props.classes.link}
              >
                {route.name}
              </NavLink>
            );
          }
          return (
            <Typography key={i} color="textPrimary">
              {route.name}
            </Typography>
          );
        })}
    </Breadcrumbs>
  );
}

SimpleBreadcrumbs.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.shape({
    link: PropTypes.string,
  }),
};

export default withStyles(styles)(SimpleBreadcrumbs);
