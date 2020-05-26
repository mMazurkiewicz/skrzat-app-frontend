import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
});

export class FairyTalesList extends Component {
    render() {
        const { classes } = this.props;
        return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
                Welcome to Fairy Tales List Component!
            </Typography>
        </main>
        )
    }
}

export default withStyles(styles)(FairyTalesList);