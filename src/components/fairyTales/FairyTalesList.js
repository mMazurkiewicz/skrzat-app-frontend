import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Pagination from '@material-ui/lab/Pagination';
import HOCList from '../abstr/HOCList/HOCList';
import { prefix } from './fairyTalesListReducer';
import Breadcrumbs from '../abstr/breadcrumbs/Breadcrumbs';

export class FairyTalesList extends Component {
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
        <Breadcrumbs routes={[{ name: 'Bajki' }]} />

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
              Dodaj nową bajkę
            </Button>
          </Grid>
          {!items.length && (
            <Grid item xs={12} align="center">
              <Typography variant="overline">
                Lista pusta! Dodaj nową bajkę!
              </Typography>
            </Grid>
          )}
          {items.map((item, i) => (
            <Grid item key={item._id} xs={12}>
              <Paper
                elevation={3}
                style={{
                  borderLeft: `5px solid ${item.color}`,
                }}
                onClick={(e) => goToEdit(e, item._id)}
                className={classes.paper}
              >
                <Grid container>
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
                      anchorEl={anchorEl[i]}
                      keepMounted
                      open={Boolean(anchorEl[i])}
                      onClose={(e) => closeItemMenu(e, i)}
                      TransitionComponent={Fade}
                    >
                      <MenuItem
                        onClick={(e) => handleDeleteItem(e, item._id, i)}
                      >
                        Usuń bajkę
                      </MenuItem>
                    </Menu>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      component="div"
                      my={2}
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      <Typography noWrap variant="body2">
                        {item.description}
                      </Typography>
                    </Box>
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

FairyTalesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  classes: PropTypes.shape({
    content: PropTypes.string,
    toolbar: PropTypes.string,
    paper: PropTypes.string,
    showOnHover: PropTypes.string,
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
  loading: state.fairyTales.list.loading,
  items: state.fairyTales.list.items,
  anchorEl: state.fairyTales.list.anchorEl,
  page: state.fairyTales.list.page,
  itemsPerPage: state.fairyTales.list.itemsPerPage,
  totalItems: state.fairyTales.list.totalItems,
  totalPages: state.fairyTales.list.totalPages,
});

const wrappedList = HOCList(FairyTalesList, {
  prefix,
  route: 'fairyTales',
  serverRoute: 'fairyTales',
});

export default connect(mapStateToProps, null)(wrappedList);
