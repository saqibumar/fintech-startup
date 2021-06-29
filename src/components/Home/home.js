import React, { Component } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import './home.css';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"

import Modal from 'react-modal';
import Signup from '../Customer/Register/signup'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Slider from 'infinite-react-carousel';


const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate( -50%, -50%)',
      /* width: '60vw',
      height: '70vh' */
  }
};
const settings =  {
  /* autoplay: true,
  autoplaySpeed: 2000, */
  /* duration: 2000,
  rows: 1,
  slidesToShow: 1 */
};

Modal.setAppElement(document.getElementById('root'));

class Home extends Component{
  constructor (props) {
    super (props);
    this.state = {
        asOf: new Date(),
        token: localStorage.getItem("RegistrationToken"),
        value: 1000,
        days:1,
        modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this); 
    this.afterOpenModal = this.afterOpenModal.bind(this); 
    this.closeModal = this.closeModal.bind(this);
}

openModal() {
  this.setState({modalIsOpen: true});
}

afterOpenModal() {
  // references are now sync'd and can be accessed. 
  this.subtitle.style.color = '#f00';
}

closeModal() {
  this.setState({modalIsOpen: false});
}

calculate(amount, days) {
  let p = amount;
  let n = 1; // no. of compoundings per day (1%)
  let t = days; // no. of days
  let r = 1; //rate 1%
  // result = document.getElementById("result");
  // The equation is A = p * [[1 + (r/n)] ^ nt]
  let A = (p* Math.pow((1 + (r/(n*100))), (n*t)));
  // toFixed is used for rounding the amount with two decimal places.
  // result.innerHTML = "The total amount is " + A.toFixed(2);
  /* "The total amount is " + A.toFixed(2) + " The interest is " + (A.toFixed(2) - p).toFixed(2) */
  return (<div>
    The total amount + interest is <b>${A.toFixed(2)}</b>
    <br />
    {/* The interest + IVA is <b>${((A.toFixed(2) - p)+(A.toFixed(2) - p)*0.16).toFixed(2)}</b>
    <br/>
    16% IVA is <b>${((A.toFixed(2) - p)*0.16).toFixed(2)}</b> */}
  </div>
  );

}

onChange = date => this.setState({asOf: date});

  render(){
    return (
<div id="container">
   <div id="header">
   <Header token={localStorage.getItem("RegistrationToken")} />
   </div>
   <div id="body">
     {/* Section 1 contains banner and calculator */}
     <div className="section-1">
        <div className="container">
        
          <div className="banner-bg">
          

          <div className="overlapping-div">
            <h2>¿NECESITAS DINERITO?</h2>
          <div className="container calculator-container">
          <div className="row">
        <div className="col-12 calculator-header">
        <h4>Calcula tu préstamo</h4>
        </div>
        </div>
        <div className="row" style={{paddingTop: '20px'}}>
        <div className="col-md-5 col-lg-5 col-xl-5 col-sm-5 col-xs-12 text-left"  style={{color:'#8d8d8d'}}>
        ¿Cuánto dinero necesitas?
        </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-sm-6 col-xs-12">
          <InputRange 
            step={100}
            formatLabel={value => `$${value}`}
            maxValue={10000}
            minValue={1000}
            value={this.state.value}
            onChange={value => this.setState({ value })} />

          </div>
        </div>
        <div className="row" style={{paddingTop: '40px'}}>
        <div className="col-md-5 col-lg-5 col-xl-5 col-sm-5 col-xs-12 text-left"  style={{color:'#8d8d8d'}}>
        ¿En cuánto tiempo deseas pagar?
        </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-sm-6 col-xs-12">
          <InputRange 
            step={1}
            formatLabel={days => `${days}`}
            maxValue={15}
            minValue={1}
            value={this.state.days}
            onChange={days => this.setState({ days })} />  
            </div>              

        </div>
        <div className="row" style={{paddingTop: '20px', maxWidth:'500px'}}>
        <div className="col-md-12 col-lg-12 col-xl-12 text-center">          
          <button className="btn-normal" onClick={()=>{
            if(localStorage.getItem("RegistrationToken")){
              window.location.href='/customer/home/steps';
            }
            else{
              this.openModal();
              
            }
            
          }}>
            <span>Solicítalo Aquí</span>
            </button>
            <Modal 
                        isOpen={this.state.modalIsOpen} 
                        onAfterOpen={this.afterOpenModal} 
                        onRequestClose={this.closeModal} 
                        style={customStyles} 
                        contentLabel=''
                    >
                    <h3 ref={subtitle => this.subtitle = subtitle}>
                        
                    </h3>
                        <Signup />
                </Modal>
        </div>
        <div className="col-md-12 col-lg-12 col-xl-12 text-left" style={{color:'#8d8d8d'}}>
          *En Señor Préston nunca te cobraremos anticipadamente <br></br>para darte un préstamo
          <hr />
        </div>
        </div>
        <div className="row" style={{'padding': '20px'}}>
        <div className="col-md-12 col-lg-12 col-xl-12 text-right">
          {this.calculate(this.state.value, this.state.days)}
        </div>
        </div>
      </div>

            </div>
            <Carousel className="carousel" 
            autoPlay 
            showArrows={false} showStatus={false} showIndicators={false}
            showThumbs={false} stopOnHover={false} infiniteLoop={true}
            >
                <div>
                  <img alt="" src="/images/Homepage/header-1.jpg" className="img-section1"></img>
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                <img alt="" src="/images/Homepage/header-2.jpg" className="img-section1"></img>
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                <img alt="" src="/images/Homepage/header-3.jpg" className="img-section1"></img>
                    {/* <p className="legend">Legend 3</p> */}
                </div>
                <div>
                <img alt="" src="/images/Homepage/header-4.jpg" className="img-section1"></img>
                    {/* <p className="legend">Legend 4</p> */}
                </div>
            </Carousel>

          </div>
        </div>
        
        </div>
     {/* End of Section 1 contains banner and calculator */}

      {/* START of Section 2 contains note */}
      <div className="section-2">
          <div className="container">

          {/* <div id='logo_wrapper'>
            <img alt="" src="http://i.imgur.com/nPvZsjB.png" />
            <div className='blinkeyes'>
              &#9679; &#9679; &nbsp;&nbsp;&nbsp;
            </div>
          </div> */}
<div>
<img alt="" src="/images/Homepage/note.jpg" style={{width:'100%'}} />
</div>
          {/* <div id='logo_wrapper'>
            <img alt="" src="/images/Homepage/note.jpg" style={{width:'100%'}} />
            <div className='blinkeyes'>
            QUE NECESITAS PARA <br/>
              OBTENER TU PRESTAMO?
            </div>
          </div> */}


          {/* <div className="banner-bg wrapper">
          <div className="overlapping-note-div">
            <h4 className="text-left">
              QUE NECESITAS PARA <br/>
              OBTENER TU PRESTAMO?
            </h4>

          </div>
          <img alt="" src="/images/Homepage/note.jpg" className="img-section1"></img>
          </div> */}


      </div>
      </div>
      {/* End of Section 2 contains note */}


      <div className="section-2">
          <div className="container">
            <div style={{overflow: 'hidden'}}>
              <div className="subtitle fancy"><span>
                <h4>
                ¿Cómo funciona?
                </h4>
              </span></div>
            </div>
            <div className="row">
            <div className="col-lg-4 col-xl-4 col-md-4 col-sm-12">
            <img alt="" src="/images/Homepage/icons-clock.png"></img>
            <br />
            <h4>
            Solicita tu préstamo
            </h4>            
            <br/>
            <p>
            Entra a nuestra web, calcula el monto y la fecha de pago. Ingresa los datos que se te soliciten.
Es muy sencillo.
            </p>
            </div>
            <div className="col-lg-4 col-xl-4 col-md-4 col-sm-12">
            <img alt="" src="/images/Homepage/icons-computer.png" ></img>
            <br/>
            <h4>
            Procesamos tu solicitud
            </h4>
            <br/>
            <p>
            Nuestro sistema valida tus datos. Esto puede tardar unos minutos. Tu información está segura
con nosotros.
            </p>
            </div>
            <div className="col-lg-4 col-xl-4 col-md-4 col-sm-12">
            <img alt="" src="/images/Homepage/icons-money.png" ></img>
            <br/>
            <h4>
            Recibe el dinero
            </h4>
            <br/>
            <p>
            A través de una transferencia bancaria te haremos llegar el monto solicitado. Es rápido, cómodo
y seguro.
            </p>
            </div>
            </div>
      </div>
      </div>

      <div className="section-2">
      <div className="container wrapper2">
  <div className="img">
  <img alt="" src="/images/Homepage/image1.jpg" />
  </div>
  <div className="txt">
  <h4>¿Tienes un imprevisto y sin dinero? En Señor Prestón te ayudamos.</h4>
  <span>
Somos una opción diferente a los bancos. En nuestro portal, eliges el monto que necesitas, el
tiempo en que lo pagarías y una cuenta bancaria para recibirlo.
  </span>
<span>
Solicita el monto desde la comodidad de tu hogar. En tan sólo unos minutos, Señor Prestón te
brinda un préstamo 100% online, de manera segura, cómoda y rápida.
Salir del apuro es muy sencillo, ¡tú eliges!
</span>
  </div>
  <div className="txt1">
  En Señor Prestón estamos comprometidos en brindarte una atención y servicio de primera
para ayudarte a resolver rápidamente tu imprevisto. Con nosotros tienes:
<ul>
  <li>
    <b>Flexibilidad:</b> tú eliges el monto del préstamo y en cuánto tiempo lo pagarás.
  </li>
  <li>
  <b>Rapidez:</b> te damos respuesta en pocos minutos. Recibes el dinero directo en tu cuenta
bancaria.
  </li>
  <li>
  <b>Seguridad:</b> toda tu información se procesa con absoluta discreción y protegiendo tus
datos.
  </li>
  <li>
    <b>100% digital:</b> ahorras tiempo. Todo el trámite lo haces online. Sin filas y sin papeleo.
  </li>
</ul>

Recuerda que puedes solicitar tu préstamo desde tu Tablet, Smartphone o computadora.
<p>
<b style={{fontFamily: 'DK_Drop_Dead_Gorgeous'}}>¡Es muy fácil!</b>
</p>
  </div>
  <div  className="img1">
  <img alt="" src="/images/Homepage/image2.jpg" />
  </div>
  </div>
        {/* <div className="container">
            
            <div className="row">
              <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
              <img alt="" src="/images/Homepage/image1.jpg" style={{width:'inherit'}} />
              </div>
              <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
              ¿Tienes un imprevisto y sin dinero? En Señor Prestón te ayudamos.
Somos una opción diferente a los bancos. En nuestro portal, eliges el monto que necesitas, el
tiempo en que lo pagarías y una cuenta bancaria para recibirlo.
Solicita el monto desde la comodidad de tu hogar. En tan sólo unos minutos, Señor Prestón te
brinda un préstamo 100% online, de manera segura, cómoda y rápida.
Salir del apuro es muy sencillo, ¡tú eliges!
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
              En Señor Prestón estamos comprometidos en brindarte una atención y servicio de primera
para ayudarte a resolver rápidamente tu imprevisto. Con nosotros tienes:
- Flexibilidad: tú eliges el monto del préstamo y en cuánto tiempo lo pagarás.
- Rapidez: te damos respuesta en pocos minutos. Recibes el dinero directo en tu cuenta
bancaria.
- Seguridad: toda tu información se procesa con absoluta discreción y protegiendo tus
datos.
- 100% digital: ahorras tiempo. Todo el trámite lo haces online. Sin filas y sin papeleo.
Recuerda que puedes solicitar tu préstamo desde tu Tablet, Smartphone o computadora.
¡Es muy fácil!
              </div>
              <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
              <img alt="" src="/images/Homepage/image2.jpg"  style={{width:'inherit'}} />
              </div>
            </div>

        </div> */}
      </div>
      {/* End of Section 3 contains note */}
      <div className="section-2">
      <div className="container">     
        <div className="row">
          <div className="col-12" style={{padding:0}}>
      <div id="box-search">
      <div className="thumbnail">
      <img alt="" className="im2" src="/images/Homepage/testimonial-image.jpg" />
          <div className="caption">
              <h4>Lo Que dicen <br/> nuestros clientes</h4>              
          </div>

          <div className="Xtestimonies">
          {/* <h4>Juan Carlos</h4>
              <p>
                Some details here about the testimonies
              </p> */}
          <Slider { ...settings } className="Slider">
          <div>
            <h4>Juan Carlos</h4>
              <p>
                Some details here about the testimonies
              </p>
          </div>
          <div>
          <h4>Juan Carlos</h4>
              <p>
                2 Some details here about the testimonies
              </p>
          </div>
          <div>
          <h4>Juan Carlos</h4>
              <p>
                3 Some details here about the testimonies
              </p>
          </div>
          
        </Slider>
              
          </div>
      </div>
  </div>
            
          </div>
        </div>       
      </div> 
      {/* Nuestros clientes opinan

      Nombre: Viry Rodríguez
      Testimonio: Los recomiendo ampliamente. Tienen una excelente atención y entregan en
tiempo y forma. Gracias. */}
      </div>
   </div>
  <div id="footer">
   <Footer />
   </div>
</div>

  );
  }

}
/* const styles = {
  width: '100%',
  height: '500px'
} */
export default Home;

