import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";

import {useRouter} from 'next/router'
import Link from "../../theme/Link";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

// Login
const Login = () => {
    const router = useRouter();
    return (
        <span onClick={() => router.push('' +
            '/api/v1/login')}>Login</span>
    )

}

// Logout
const Logout = () => {
    const router = useRouter();
    return (<span onClick={() => router.push('' +
        '/api/v1/logout')}>Logout</span>)
}

const Header = ({user, loading}) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        Universal App
                    </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" href="/home" as="home" className={classes.link}>
                            Home
                        </Link>
                        <Link variant="button" color="textPrimary" href="/about" as="about" className={classes.link}>
                            About
                        </Link>
                        <Link variant="button" color="textPrimary" href="/secret" as="secret" className={classes.link}>
                            Secret
                        </Link>
                        <Link variant="button" color="textPrimary" href="/secretssr" as="secretssr" className={classes.link}>
                            Secret SSR
                        </Link>
                        <Link variant="button" color="textPrimary" href="/admin" as="admin" className={classes.link}>
                            Admin
                        </Link>
                    </nav>
                    {!loading &&
                    <>
                        {user &&
                        <Button color="primary" variant="outlined" className={classes.link}>
                            <Logout/>
                        </Button>
                        }
                        {!user &&
                        <Button color="primary" variant="outlined" className={classes.link}>
                            <Login/>
                        </Button>
                        }
                    </>
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Header;