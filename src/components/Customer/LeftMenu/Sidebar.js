import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { NavDropdown, Navbar } from 'react-bootstrap';
import { Nav, /* NavDropdown */ } from 'react-bootstrap'; 

const StyledSideNav = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    xheight: 100%;
    width: 75px;     /* Set the width of the sidebar */
    z-index: 1;      /* Stay on top of everything */
    top: 0em;      /* Stay at the top */
    background-color: #EFEFEF; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 0px;
`;

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            items: [
                {
                  path: '/customer/home/', /* path is used as id to check which NavItem is active basically */
                  name: 'Home',
                  css: 'fa fa-fw fa-home',
                  key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                    path: '/customer/orders/',
                    name: 'customer-orders',
                    css: 'fa fas fa-tachometer-alt',
                    key: 2
                  },
                  /* {
                    path: '/NoMatch',
                    name: 'NoMatch',
                    css: "fas fa-money-check-alt",
                    key: 3
                  }, */
                {
                  path: '/customer/payments/',
                  name: 'Payments',
                  css: 'fa fa-fw fas fa-file-alt',
                  key: 4
                },
                {
                path: '/logout',
                name: 'Logout',
                css: 'fa fa-fw fas fa-sign-out-alt',
                key: 5
                },
                /* {
                path: '/about',
                name: 'About',
                css: 'fa fa-fw fas fa-cog',
                key: 6
                }, */
              ]
        }
    }

    onItemClick = (path) => {
        this.setState({ activePath: path });
    }

    render() {
        const { items, activePath } = this.state;
        const loggedinUser=true;
        return(
            <div style={{width:'100%'}}>

            <StyledSideNav>
            {/* <img alt="" src="/Favicon_Pack/Favicon-310x310px.png" style={{width: '100%'}} className="responsive-logo"></img> */}
            {/* <img alt="" src="/images/logo/logo.png" style={{width: '100%'}} className="responsive-logo"></img> */}
            <div style={{position:'absolute', zIndex:1}}>
            <img alt="" src="/images/logo/logo.png" style={{width: '100%'}} className="responsive-logo"></img>
            </div>
            <Navbar expand="lg" className="pull-right">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                {/* <Navbar.Brand href="/">
                    <div className="sc-htpNat ciNOlO" style={{height:'100%', backgroundColor:'transparent'}}>
                    <img alt="" src="/Favicon_Pack/Favicon-310x310px.png" style={{width: '100%'}}></img>
                    <hr style={{width:'100%', background:'#EFEFEF'}} />
                    </div>
                </Navbar.Brand> */}

                {
                    items.map((item) => {
                        return (
                            <NavItem 
                                path={item.path}
                                name={item.name}
                                css={item.css}
                                onItemClick={this.onItemClick}
                                active={item.path === activePath}
                                key={item.key}
                            />
                        );
                    })
                }
                    </Navbar.Collapse>
                

                </Navbar>
            </StyledSideNav>
            </div>
        );
    }
}

const RouterSideNav = withRouter(SideNav);

const StyledNavItem = styled.div`
    height: 70px;
    width: 75px; /* width must be same size as NavBar to center */
    text-align: center; /* Aligns <a> inside of NavIcon div */
    margin-bottom: 0;   /* Puts space between NavItems */
    a {
        font-size: 2.7em;
        color: ${(props) => props.active ? "white" : "#9FFFCB"};
        :hover {
            opacity: 0.7;
            text-decoration: none; /* Gets rid of underlining of icons */
        }  
    }
`;

class NavItem extends React.Component {
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        const { active } = this.props;
        return(
            <StyledNavItem active={active}>
                <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
                    <NavIcon></NavIcon>
                </Link>
            </StyledNavItem>
        );
    }
}

const NavIcon = styled.div`

`;

export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav></RouterSideNav>
        );
    }
}


const stylesHide={
    display: 'none'
}
const stylesShow={
   display: 'block',
   /* float: 'right',
   flex: '2',
   'flexDirection': 'row' */
}