import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import { prefix } from './employeesListReducer';
import HOCList from '../abstr/HOCList/HOCList';

export class EmployeesList extends Component {
  render() {
    const {
      classes,
      items,
      anchorEl,
      handleDeleteItem,
      openItemMenu,
      closeItemMenu,
      goToEdit,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography
          variant="h3"
          color="textSecondary"
          gutterBottom
          align="center"
        >
          Pracownicy
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} align="right">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={(e) => goToEdit(e, 0)}
            >
              Dodaj nowego pracownika
            </Button>
          </Grid>
          {!items.length && (
            <Grid item xs={12} align="center">
              <Typography variant="overline">
                Lista pusta! Dodaj nowego pracownika!
              </Typography>
            </Grid>
          )}
          {items.map((item, i) => (
            <Grid item key={item._id} xs={12} md={6}>
              <Paper
                elevation={3}
                onClick={(e) => goToEdit(e, item._id)}
                className={classes.paper}
              >
                <Grid container key={item._id} spacing={2}>
                  <Grid item xs={11} key={item._id}>
                    <Typography variant="subtitle1" color="textSecondary">
                      {item.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={1} align="right">
                    <IconButton
                      className={classes.showOnHover}
                      size="small"
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => openItemMenu(e, i)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="item-menu"
                      anchorEl={anchorEl[i]}
                      keepMounted
                      open={Boolean(anchorEl[i])}
                      onClose={(e) => closeItemMenu(e, i)}
                      TransitionComponent={Fade}
                    >
                      <MenuItem
                        onClick={(e) => handleDeleteItem(e, item._id, i)}
                      >
                        Usuń {item.name}
                      </MenuItem>
                    </Menu>
                  </Grid>

                  <Grid item xs={12} lg={6} align="left">
                    <Button
                      variant="outlined"
                      component="a"
                      href={`mailto:${item.email}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.email}
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={6} align="left">
                    <Button
                      variant="outlined"
                      component="a"
                      href={`tel:${item.phoneNumber}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.phoneNumber}
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    {item.teams.map((team) => (
                      <Tooltip title="Edytuj ekipę" key={team._id}>
                        <Chip
                          key={team._id}
                          size="small"
                          className={classes.chips}
                          label={team.name}
                          component="p"
                          onClick={(e) => goToEdit(e, team._id, 'teams')}
                          clickable
                          variant="outlined"
                          style={{
                            color: team.color,
                            borderColor: team.color,
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </main>
    );
  }
}

EmployeesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  classes: PropTypes.shape({
    table: PropTypes.string,
    content: PropTypes.string,
    toolbar: PropTypes.string,
    chips: PropTypes.string,
    paper: PropTypes.string,
    showOnHover: PropTypes.string,
  }),
  anchorEl: PropTypes.arrayOf(PropTypes.object),
  handleDeleteItem: PropTypes.func,
  openItemMenu: PropTypes.func.isRequired,
  closeItemMenu: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.employees.list.loading,
  items: state.employees.list.items,
  anchorEl: state.employees.list.anchorEl,
});

const wrappedList = HOCList(EmployeesList, {
  prefix,
  route: 'employees',
  serverRoute: 'employees',
});

export default connect(mapStateToProps, null)(wrappedList);
