import React, { Component } from 'react';
import firebase from 'firebase';
import Boton  from '../img/boton.png';
import { ArrayBotones } from './botones.json';
import Alert from 'react-s-alert';
var Reproduciendo;
var Ultimo;
var uid;
var config = {
    apiKey: "AIzaSyCcqguc1RuEa46XNSwePVm2O-dHyxKzs-k",
    authDomain: "botonera-fccfc.firebaseapp.com",
    databaseURL: "https://botonera-fccfc.firebaseio.com",
    projectId: "botonera-fccfc",
    storageBucket: "botonera-fccfc.appspot.com",
    messagingSenderId: "465060720795"
  };
  firebase.initializeApp(config);
class Botones extends Component{
  constructor(){
    super();
    this.state = {
      ArrayBotones,
      Botones2 : ArrayBotones,

    };
    this.Play = this.Play.bind(this);
  }

  componentWillMount(){
    var user = firebase.auth().currentUser;
    if (user != null) {
        uid = user.uid;
    }

    const ReproName = firebase.database().ref().child('objeto').child('Repro');
    ReproName.on('value', (snapshot)=>{
      Reproduciendo = snapshot.val();
        var p = document.getElementById("Buscar");
	   	if (Reproduciendo === true){
        if (p !=null)
	    	p.disabled = false;
        Alert.closeAll();
		    } else {
        if (p !=null)
	    	p.disabled = true;
        Alert.info('Se esta reproduciendo un botonito', {
              position: 'bottom-right',
              effect: 'flip',
              timeout: 'none'
          });
		   }
    });

    const UltimaReprodu = firebase.database().ref().child('objeto').child('UltimaRepro');
    UltimaReprodu.on('value', (snapshot)=>{
      Ultimo = snapshot.val();
    });



  }

  Play(index){
  	const ReproName = firebase.database().ref('objeto');
  	const Usuarios = firebase.database().ref('Usuarios');
  	if (Reproduciendo===true){
  		Usuarios.set(
	      {
	        ID : uid
	      }
	      ).then(()=>{
	      }).catch((error) => {
	          console.log(error);
	    });
		ReproName.set(
	      {
	        Repro : false,
	        Ultimo: index.ubicacion,
	        UltimaRepro:  new Date().toLocaleTimeString(),
	        Token : uid
	      }
	      ).then(()=>{
	      }).catch((error) => {
	          console.log(error);
		 });
	  	}
  	}



componentDidUpdate(prevProps) {
  	if (this.props.buscar !== prevProps.buscar) {
	  	var buscar = this.props.buscar;
   		if (buscar !==''){
	       this.setState({
	        Botones2 : ArrayBotones.filter(t=>t.descripcion.toLowerCase().indexOf(buscar.toLowerCase()) !== -1)
	       });
	     } else{
	       this.setState({
	          Botones2 : ArrayBotones
	       });
	     }
  	}
   }
  render(){
    const ArrayBotones = this.state.Botones2.map((boton,index) =>{
       return(
           <div className="col-lg-2 col-sm-4 col-xs-6 contenedor-datos" key={index}>
            <img src={Boton} className="Boton" onClick={this.Play.bind(this,boton)} alt=''/>
            <div className="Nombre">
                {boton.descripcion}
            </div>
            <audio src={boton.ubicacion} id={boton.ubicacion} />
           </div>
       )
     });
      return(
        <div className="col-md-12 contenedor" >
          <Alert/>
            <div className="row">
              { ArrayBotones }
            </div>
        </div>
      )

  }

}
export default Botones;
