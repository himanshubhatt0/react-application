import React, { Component } from 'react';
import {Navbar, NavbarBrand,Nav,NavbarToggler,Collapse,NavItem,Jumbotron} from "reactstrap";
import {NavLink} from 'react-router-dom';
class Header extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            isNavOpen:false
        };
        this.toggleNav=this.toggleNav.bind(this);
    }
    toggleNav(){
        this.setState({isNavOpen:!this.state.isNavOpen});
    }
    render()
    {
        return(
            <>
        <Navbar dark expand="md">
          <div className="container">
              <NavbarToggler onClick={this.toggleNav}/>
          <NavbarBrand className="mr-auto" href="/"><img src="assets/images/logo.png" height="30" width="41" alt="Restorante Con Fusion"/> 
          </NavbarBrand>
        <Collapse isOpen={this.state.isNavOpen} navbar>
          <Nav navbar>
              <NavItem>
                  <NavLink className="nav-link" to="/home">
                      <span className="fa fa-home fa-lg">Home</span>
                  </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                      <span className="fa fa-info fa-lg">Aboutus</span>
                  </NavLink>
              </NavItem>
              <NavItem>
                  <NavLink className="nav-link" to="/menu">
                      <span className="fa fa-list fa-lg">Menu</span>
                  </NavLink>
               </NavItem>
                  <NavItem>
                  <NavLink className="nav-link" to="/contectus">
                      <span className="fa fa-address-card fa-lg">Contectus</span>
                  </NavLink>
              </NavItem>
             
          </Nav>
        </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
            <div className="container">
                <div className="row row-header">
                    <div className="col-12 col-sm-6">
                        <h1>Restorante Con Fusion</h1>
                        <p>we take inspiration from the world best cuisines,and create aunique fusion experine,our lipsmacking creation will tickle your cluinery sence!</p>
                    </div>

                </div>
            </div>
        </Jumbotron>
            </>
        );
    }
}
export default Header;
