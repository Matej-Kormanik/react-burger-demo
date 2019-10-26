import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>

        {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}

        {props.isAuth
            ? <NavigationItem link="/logout">log out</NavigationItem>
            : <NavigationItem link="/auth">authenticate</NavigationItem>
        }
    </ul>
);



export default navigationItems;