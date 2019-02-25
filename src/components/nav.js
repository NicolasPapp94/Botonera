import React, { Component } from 'react';
import firebase from 'firebase';


class Nav extends Component{
	

	render(){
		return( 
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <a className="navbar-brand" href="#">Botonera</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			 <form class="form-inline my-2 my-lg-0">
		      <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search"/>
		    </form>
		   	</nav>
		)
	}	
}

export default Nav;