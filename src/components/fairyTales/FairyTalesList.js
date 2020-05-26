import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { saveItemsFromServer, toggleLoading } from './FairyTalesListActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DetailsIcon from '@material-ui/icons/Assignment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 240;

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    td: {
        maxWidth: '300px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

export class FairyTalesList extends Component {
    constructor(props) {
        super(props);
        this.route = 'fairyTales'
    }
    componentDidMount() {
        this.props.dispatch(toggleLoading(true))
        axios
            .get(`${window.App.serverPath}${this.route}`)
            .then(res => {
                this.props.dispatch(saveItemsFromServer(res.data));
                this.props.dispatch(toggleLoading(false));
            });
    }
    render() {
        const { classes, items } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Nazwa</TableCell>
                            <TableCell>Opis</TableCell>
                            <TableCell align="right">
                                <Tooltip title="Dodaj nową bajkę">
                                    <IconButton edge="end" aria-label="add">
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                items.length === 0 &&
                                <TableRow>
                                    <TableCell component="th" colSpan={3} align="center">
                                        Lista pusta! Dodaj nową bajkę!
                                    </TableCell>
                                </TableRow>
                            }
                            {items.map((item) => (
                                <TableRow key={item.name} hover>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className={classes.td}>{item.description}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edytuj bajkę">
                                            <IconButton edge="end" aria-label="edit">
                                                <DetailsIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Usuń bajkę">
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.fairyTales.loading,
        items: state.fairyTales.items
    }
}
const styledComponent = withStyles(styles)(FairyTalesList);

export default connect(mapStateToProps, null, null, { pure: false })(styledComponent); 
