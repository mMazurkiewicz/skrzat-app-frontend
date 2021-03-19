import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Pagination from '@material-ui/lab/Pagination';
import HOCList from '../abstr/HOCList/HOCList';
import { prefix } from './teamsReducer';
import Breadcrumbs from '../abstr/breadcrumbs/Breadcrumbs';

export class TeamsList extends Component {
  render() {
    const {
      classes,
      items,
      goToEdit,
      anchorEl,
      handleDeleteItem,
      openItemMenu,
      closeItemMenu,
      setPage,
      page,
      totalPages,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs routes={[{ name: 'Ekipy' }]} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Pagination
              count={totalPages}
              classes={{
                ul: classes.alignPagination,
              }}
              page={page}
              onChange={(e, p) => setPage(p)}
            />
          </Grid>

          <Grid item xs={12} align="right">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={(e) => goToEdit(e, 0)}
            >
              Dodaj nową ekipę
            </Button>
          </Grid>
          {!items.length && (
            <Grid item xs={12} align="center">
              <Typography variant="overline">
                Lista pusta! Dodaj nową ekipę!
              </Typography>
            </Grid>
          )}
          {items.map((item, i) => (
            <Grid item key={item._id} xs={12} md={6}>
              <Paper
                elevation={3}
                style={{
                  borderLeft: `5px solid ${item.color}`,
                }}
                onClick={(e) => goToEdit(e, item._id)}
                className={classes.paper}
              >
                <Grid container spacing={1}>
                  <Grid item xs={11}>
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
                        Usuń ekipę
                      </MenuItem>
                    </Menu>
                  </Grid>

                  <Grid item xs={12}>
                    {item.members.map((member) => (
                      <Tooltip key={member._id} title="Edytuj pracownika">
                        <Chip
                          size="small"
                          className={classes.chips}
                          label={member.name}
                          component="p"
                          onClick={(e) => goToEdit(e, member._id, 'employees')}
                          clickable
                          variant="outlined"
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

TeamsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  classes: PropTypes.shape({
    content: PropTypes.string,
    toolbar: PropTypes.string,
    title: PropTypes.string,
    paper: PropTypes.string,
    chips: PropTypes.string,
    showOnHover: PropTypes.string,
    alignPagination: PropTypes.string,
  }),
  handleDeleteItem: PropTypes.func.isRequired,
  openItemMenu: PropTypes.func.isRequired,
  closeItemMenu: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  anchorEl: PropTypes.arrayOf(PropTypes.object),
  setPage: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};

const mapStateToProps = (state) => ({
  loading: state.teams.list.loading,
  items: state.teams.list.items,
  anchorEl: state.teams.list.anchorEl,
  page: state.teams.list.page,
  itemsPerPage: state.teams.list.itemsPerPage,
  totalItems: state.teams.list.totalItems,
  totalPages: state.teams.list.totalPages,
});

const wrappedList = HOCList(TeamsList, {
  prefix,
  route: 'teams',
  serverRoute: 'teams',
});

export default connect(mapStateToProps, null)(wrappedList);
