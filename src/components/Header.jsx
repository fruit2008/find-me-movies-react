import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TheatersIcon from '@material-ui/icons/Theaters';
import ScheduleIcon from '@material-ui/icons/Schedule';
import navigationService from '../services/navigation.service';
import MovieSearch from '../modules/movies/components/MovieSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(10)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    textDecoration: 'none',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  },
  appBar: {
    backgroundColor: '#000'
  },
  list: {
    width: 250
  }
}));

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired
};

// TODO: Refactor side drawer stuff
const Header = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });
  const anchor = 'left';

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={classes.list}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            onClick={() => navigationService.goToHome()}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText
            primary="Popular Movies"
            onClick={() => navigationService.goToPopularMovies()}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <ListItemText
            primary="Top Rated Movies"
            onClick={() => navigationService.goToTopMovies()}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TheatersIcon />
          </ListItemIcon>
          <ListItemText
            primary="On Theaters"
            onClick={() => navigationService.goToOnTheaters()}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Upcoming Movies"
            onClick={() => navigationService.goToUpcomingMovies()}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" className={classes.title}>
              <Typography variant="h6" noWrap>
                MovieFlixtor
              </Typography>
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <MovieSearch />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default Header;
