import React, { Component } from 'react';
import Botones from './components/Botones';
import firebase from 'firebase';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import './App.css';
class App extends Component {
  constructor(){
    super();
    this.state = ({
      user : null,
      filtro: ''
    });
    this.onBuscar = this.onBuscar.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user=>{
      this.setState({user})
    });
  }

  handleAuth(e){
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .catch(error => console.log(`Error {error.code}: ${error.message}`))
  }

  handleLogOut(e){
    e.preventDefault();
    firebase.auth().signOut()
    .then(function(value) {
      Alert.info('¡Hasta luego! ', {
              position: 'bottom-right',
              effect: 'slide',
              timeout: 2000
          });
    })
    .catch(error => console.log(`Error {error.code}: ${error.message}`))
  }

  onBuscar(e) {
    this.setState({ filtro: e.target.value });
  }

  RenderNavBar(){
    if (this.state.user !== null){
      return (
      <div>
        <nav className="navbar navbar-light bg-light barrita">
          <form className="form-inline">
          <button className="btn btn-primary ml-4 navbar-right" onClick={this.handleLogOut}>Cerrar sesion</button>
          </form>

         <input className="form-control buscador" placeholder="Buscador" id="Buscar" autoComplete="off" onChange={this.onBuscar}/>
         <div className="NombrePerfil"> {this.state.user.displayName} </div>
         <img  className="rounded-circle foto-perfil" src={this.state.user.providerData[0].photoURL} alt=''/>
        </nav>
      </div>
      );
    } else {
      return(
       <div>
        <nav className="navbar navbar-light bg-light barrita">
            <button className="btn btn-primary ml-4" onClick={this.handleAuth}>Inicia Sesion</button>
        </nav>
      </div>
    );
    }
  }

  RenderBotones(){
    const { filtro } = this.state;
    if (this.state.user !== null){
      return (
        <div>
           <Botones buscar={filtro}/>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="App">
        <Alert/>
        {this.RenderNavBar()}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 form-elegant scrollbar-light-blue">
               {this.RenderBotones()}
            </div>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
