import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import Link from "next/link";
import auth0 from '../../services/auth0'

const MyNavLink = (props) => {
    const {route, title} = props;
    return (
        <Link href={route}>
            <a className="nav-link port-navbar-link">{title}</a>
        </Link>
    )
}

const Login = () => {
    return (
        <span onClick={auth0.login} className="nav-link port-navbar-link clickable">Login</span>
    )
}

const Logout = () => {
    return (
        <span onClick={auth0.logout} className="nav-link port-navbar-link clickable">Logout</span>
    )
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {

        const {isAuthenticated, user, className} = this.props;

        return (
            <div>
                <Navbar className={`port-navbar port-nav-base absolute ${className}`} color="transparent" dark expand="md">
                    <NavbarBrand className="port-navbar-brand" href="/">{user ? user.name : ''}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="port-navbar-item">
                                <MyNavLink route="/" title="Home"/>
                            </NavItem>

                            <NavItem className="port-navbar-item">
                                <MyNavLink route="/about" title="About"/>
                            </NavItem>

                            <NavItem className="port-navbar-item">
                                <MyNavLink route="/portfolios" title="Portfolio"/>
                            </NavItem>

                            <NavItem className="port-navbar-item">
                                <MyNavLink route="/blogs" title="Blog"/>
                            </NavItem>

                            <NavItem className="port-navbar-item">
                                <MyNavLink route="/cv" title="CV"/>
                            </NavItem>

                            { !isAuthenticated &&
                            <NavItem className="port-navbar-item">
                                <Login/>
                            </NavItem>
                            }

                            { isAuthenticated &&
                            <NavItem className="port-navbar-item">
                                <Logout/>
                            </NavItem>
                            }

                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;