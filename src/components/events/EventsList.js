import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import RoomIcon from '@material-ui/icons/Room';
import Pagination from '@material-ui/lab/Pagination';
import HOCList from '../abstr/HOCList/HOCList';
import { parseDateTime } from '../../helpers/dateHelpers';
import { prefix } from './eventsListReducer';
import Breadcrumbs from '../abstr/breadcrumbs/Breadcrumbs';

export class EventsList extends Component {
  constructor(props) {
    super(props);
    this.getMapQuery = this.getMapQuery.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getMapQuery(item) {
    const query = `${item.venue.street}+${item.venue.streetNo}+${item.venue.city}`;
    return `http://maps.google.com/?q=${query}`;
  }

  render() {
    const {
      classes,
      items,
      anchorEl,
      handleDeleteItem,
      openItemMenu,
      closeItemMenu,
      goToEdit,
      setPage,
      page,
      totalPages,
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs routes={[{ name: 'Przedstawienia' }]} />

        <Grid container spacing={1}>
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
              Dodaj nowe przedstawienie
            </Button>
          </Grid>
          {!items.length && (
            <Grid item xs={12} align="center">
              <Typography variant="overline">
                Lista pusta! Dodaj nowe przedstawienie!
              </Typography>
            </Grid>
          )}
          {items.map((item, i) => (
            <Grid item key={item._id} xs={12}>
              <Paper
                elevation={3}
                onClick={(e) => goToEdit(e, item._id)}
                className={classes.paper}
                style={{
                  borderLeft: `5px solid ${item.team.color}`,
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={11} align="justify">
                    <Typography variant="subtitle1" color="textSecondary">
                      {item.venue.name}
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
                        Usuń przedstawienie
                      </MenuItem>
                    </Menu>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    className={classes.verticalCenterInGrid}
                  >
                    <Typography variant="subtitle2" color="textSecondary">
                      {parseDateTime(item.dateTime)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={9} sm={8}>
                    <Tooltip title="Pokaż na mapie" position="bottom-start">
                      <IconButton
                        aria-label="show-on-map"
                        component="span"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(this.getMapQuery(item), '_blank');
                        }}
                      >
                        <RoomIcon />
                      </IconButton>
                    </Tooltip>

                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      display="inline"
                    >
                      {`${item.venue.street} ${item.venue.streetNo}, ${item.venue.city}`}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Tooltip title="Edytuj ekipę">
                      <Chip
                        size="small"
                        label={item.team.name}
                        component="p"
                        onClick={(e) => goToEdit(e, item.team._id, 'teams')}
                        clickable
                        variant="outlined"
                        style={{
                          color: item.team.color,
                          borderColor: item.team.color,
                        }}
                      />
                    </Tooltip>
                  </Grid>

                  <Grid item xs={6} md={9}>
                    <Tooltip title="Edytuj bajkę">
                      <Chip
                        size="small"
                        label={item.fairyTale.name}
                        component="p"
                        onClick={(e) =>
                          goToEdit(e, item.fairyTale._id, 'fairyTales')
                        }
                        clickable
                        variant="outlined"
                      />
                    </Tooltip>
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

EventsList.propTypes = {
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
    verticalCenterInGrid: PropTypes.string,
    alignPagination: PropTypes.string,
  }),
  anchorEl: PropTypes.arrayOf(PropTypes.object),
  handleDeleteItem: PropTypes.func,
  openItemMenu: PropTypes.func.isRequired,
  closeItemMenu: PropTypes.func.isRequired,
  goToEdit: PropTypes.func.isRequired,
  setPage: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};

const mapStateToProps = (state) => ({
  loading: state.events.list.loading,
  items: state.events.list.items,
  anchorEl: state.events.list.anchorEl,
  page: state.events.list.page,
  itemsPerPage: state.events.list.itemsPerPage,
  totalItems: state.events.list.totalItems,
  totalPages: state.events.list.totalPages,
});

const wrappedList = HOCList(EventsList, {
  prefix,
  route: 'events',
  serverRoute: 'events',
});

export default connect(mapStateToProps, null)(wrappedList);
