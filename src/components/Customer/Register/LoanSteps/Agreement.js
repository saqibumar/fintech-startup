import React from 'react';
import { connect } from 'react-redux';
import HourGlass from '../../../Common/hourGlass';
import { registerAction } from '../../../redux/actions/registrationActions'
import {  Redirect} from 'react-router-dom'

class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.nextStep = this.props.nextStep;
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.register = this.props.register;
}

  onChange(e) {
    this.props.saveValues(e.target.name, e.target.checked);
  }

  render() {
    if(localStorage.getItem("RegistrationToken")===null){
      return (
       <Redirect to='/customer/home' />
     ) 
    }
    if (this.props.form.loading) {
      return <div><HourGlass /></div>;
    }


    return (
        <div>
            <h2>Términos y Condiciones de Uso y Privacidad del Sitio</h2>

      
        <div className='row'>
          <div className='col'>
            <div className="terms">
                            
                El presente contrato describe los términos y condiciones generales de uso y privacidad (los “Términos y Condiciones Generales”) aplicables al uso de los servicios ofrecidos (“Servicios y Contenidos”) por IDF Capital, S.A.P.I. de C.V., SOFOM, E.N.R. (en lo sucesivo “SrPreston”) dentro del sitio www.SrPreston.com.mx (el “Sitio”), los cuales serán referidos en el Sitio y en estos Términos y Condiciones Generales, indistintamente como SrPreston. Cualquier persona que desee acceder y/o usar el sitio o los servicios podrá hacerlo sujetándose a los Términos y Condiciones Generales, junto con todas las demás políticas y principios que rigen SrPreston y que son incorporados al presente por referencia.
                CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES GENERALES, LOS CUALES TIENEN UN CARÁCTER OBLIGATORIO Y VINCULANTE, DEBERÁ ABSTENERSE DE UTILIZAR EL SITIO Y/O LOS SERVICIOS.
                El Usuario debe leer, entender y aceptar todas las condiciones establecidas en los presentes Términos y Condiciones Generales y en el Aviso de Privacidad así como en los demás documentos incorporados a los mismos por referencia, previo a su inscripción como Usuario de SrPreston.
                
                I. LEGITIMACIÓN de USO
                El acceso o utilización del Portal expresan la adhesión plena y sin reservas del Usuario a los presentes Términos y Condiciones de Uso y Privacidad. A través del Portal (www.SrPreston.com.mx), el Usuario se servirá y/o utilizará diversos servicios y contenidos (en lo sucesivo, los “Servicios y Contenidos”), puestos a disposición de los Usuarios por SrPreston y/o por terceros proveedores de Servicios y Contenidos.
                SrPreston tendrá el derecho a negar, restringir o condicionar al Usuario el acceso a las Páginas que integran el Portal, total o parcialmente, a su entera discreción, así como a modificar los Servicios y Contenidos de las Páginas en cualquier momento y sin necesidad de previo aviso. El Usuario reconoce que no todos los Servicios y Contenidos están disponibles en todas las áreas geográficas y que algunos podrán ser utilizados solamente con posterioridad a su contratación, activación o registro previo por el Usuario y/o mediante el pago de una comisión, según se indique en las condiciones de contratación que se establezcan en la documentación respectiva. SrPreston no garantiza la disponibilidad y continuidad de la operación del Portal o de las Páginas y de los Servicios y Contenidos, ni la utilidad del Portal o los Servicios y Contenidos en relación con cualquier actividad específica, independientemente del medio de acceso que utilice el Usuario incluido el de telefonía móvil. SrPreston no será responsable por daño o pérdida alguna de cualquier naturaleza que pueda ser causado debido a la falta de disponibilidad o continuidad de operación del Portal, la Página y/o de los Servicios y Contenidos.
                El Usuario autoriza a SrPreston y a sus proveedores de telefonía móvil, a enviarle mensajes de texto o SMS a través del equipo telefónico del Usuario para la autenticación de la identidad de aquél, en el entendido de que el envío de los mensajes de texto o SMS serán a demanda del Usuario.
                Sin que lo anterior implique de ninguna manera, autorización de parte del Usuario para recibir a través de ese medio información publicitaria de SrPreston ni de sus proveedores.
                Los Servicios y Contenidos únicamente estarán disponibles para personas que tengan la capacidad legal para contratarlos. No podrán utilizar los servicios las personas que no tengan esa característica, los menores de edad o Usuarios de SrPreston que hayan sido suspendidos temporalmente o inhabilitados definitivamente en relación a su comportamiento crediticio. En caso de solicitar los servicios como Empresa, deberá tener la capacidad jurídica para contratar a nombre de tal entidad y de obligar a la misma en los términos de este Acuerdo y estar legitimados con facultades de representación legal en cumplimiento del segundo párrafo del artículo 2554 del Código Civil Federal, en relación con el artículo 2° del Código de Comercio, otorgado ante fedatario público.
                Asimismo, el Usuario, entendiendo por este término a aquella persona que accede mediante el uso de un equipo de cómputo y/o de comunicación al Portal, está de acuerdo en no utilizar dispositivos, programas de cómputo, software, o cualquier otro medio que pueda interferir tanto en las funcionalidades, actividades y/u operaciones del Portal como en las bases de datos y/o información que se contenga en el mismo.
                
                II. DATOS PERSONALES
                Es obligatorio completar el formulario de inscripción en todos sus campos con datos personales válidos para poder utilizar los servicios y contenidos que brinda SrPreston. El futuro Usuario deberá completarlo con información personal de manera exacta, precisa y verdadera (“Datos Personales”) y asume el compromiso de actualizar los Datos Personales conforme resulte necesario.
                SrPreston podrá utilizar diversos medios para identificar a sus Usuarios, pero SrPreston NO se responsabiliza por la certeza de los Datos Personales provistos por sus Usuarios. Los Usuarios garantizan y responden, en cualquier caso, de la veracidad, exactitud, vigencia y autenticidad de los Datos Personales ingresados. SrPreston se reserva el derecho de solicitar algún comprobante y/o dato adicional a efectos de corroborar los Datos Personales, así como de suspender temporal o definitivamente a aquellos Usuarios cuyos datos no hayan podido ser confirmados.
                El Usuario accederá a su cuenta personal (“Cuenta”) mediante el ingreso de su clave y contraseña elegida (“Clave de Seguridad”). El Usuario se obliga a mantener la confidencialidad de su Clave de Seguridad. La Cuenta es personal, única e intransferible, y está prohibido que un mismo Usuario inscriba o posea más de una Cuenta. En caso que SrPreston detecte distintas Cuentas que contengan datos coincidentes o relacionados, podrá cancelar, suspender o inhabilitarlas.
                El Usuario será responsable por todas las operaciones efectuadas en su Cuenta, pues el acceso a la misma está restringido al ingreso y uso de su Clave de Seguridad, de conocimiento exclusivo del Usuario. El Usuario se compromete a notificar a SrPreston en forma inmediata y por medio idóneo y fehaciente, cualquier uso no autorizado de su Cuenta, así como el ingreso por terceros no autorizados a la misma. Se aclara que está prohibida la venta, cesión o transferencia de la Cuenta (incluyendo la reputación y calificaciones) bajo ningún título.
                SrPreston se reserva el derecho de rechazar cualquier solicitud de registro o de cancelar un registro previamente aceptado, sin que esté obligado a comunicar o exponer las razones de su decisión y sin que ello genere algún derecho a indemnización o resarcimiento.
                No obstante en caso de que la aplicación sea rechazada por causas imputables al Usuario, SrPreston podrá mostrarles otras opciones que se ajusten a su capacidad de pago con la finalidad de facilitar el acceso al crédito, sin que esto signifique obligación por parte del solicitante de aceptar dichas opciones.
                Al utilizar el Sitio, el usuario se adhiere plenamente y sin reservas a los presentes Términos y Condiciones Generales. A través del Sitio, el usuario tendrá acceso y/o disposición de servicios, productos y contenidos varios (en adelante “Servicios y Contenidos”). SrPreston se reservará el derecho de negar, restringir o condicionar en cualquier momento al usuario el acceso total o parcial al Sitio de manera discrecional, pudiendo de igual manera modificar los “Servicios y Contenidos” del Sitio en todo momento y sin previo aviso. SrPreston no garantiza en ningún momento la disponibilidad y continuidad de la operación, funcionalidad, utilidad y/o disponibilidad del Sitio y/o los “Servicios y Contenidos”, en relación con ninguna actividad específica. SrPreston no se responsabiliza por pérdida o daño alguno, sin importar su alcance o naturaleza, que resulte de la falta de continuidad o disponibilidad operativa del Sitio y/o de los “Servicios y Contenidos”.
                
                III. PROPIEDAD INTELECTUAL
                IDF Capital, S.A.P.I. de C.V., SOFOM, E.N.R, y/o Innovative Digital Finance o IDFinance y SrPreston son Marcas Registradas que se encuentran protegidas por la Ley de la Propiedad Industrial tanto en México como en el extranjero según las leyes aplicables. La utilización, difusión, exhibición, explotación, comercialización o cualquier otro uso, sea parcial o total, de forma idéntica o que confunda en menor o mayor grado; sea por cualquier medio, incluyendo ms no limitándose al impreso, magnético, óptico, electrónico o informático, está expresamente prohibido sin previa autorización por escrito del titular de los derechos de autor y/o marca correspondiente. Cualquier contravención a lo anteriormente expuesto o la legislación aplicable en materia de propiedad intelectual, industrial, derechos de autor será considerada y perseguida como un delito penal de comisión directa.
                El logotipo, diseños, formas, marcas denominativas y mixtas, tanto de SrPreston como de IDF Capital, S.A.P.I. de C.V., SOFOM, E.N.R., así como cualquier material estático o interactivo incluido en el Sitio, está debidamente registrado ante las autoridades competentes y son propiedad de IDF Capital, S.A.P.I. de C.V., SOFOM, E.N.R. y/o Innovative Digital Finance o IDFinance. Los derechos de propiedad intelectual correspondientes a los Servicios y Contenidos y los materiales distintivos y dominios del Sitio, así como los derechos de uso y explotación correspondientes mismos que incluyen mas no se limitan a su publicación, reproducción, divulgación, transformación y distribución son propiedad exclusiva en conjunto de IDF Capital, S.A.P.I. de C.V., SOFOM, E.N.R. y/o de Innovative Digital Fianance o IDFinance. El usuario no adquirirá bajo ninguna circunstancia concesión o derecho alguno sobre la propiedad intelectual e industrial de SrPreston por el mero uso de su Sitio o de sus servicios y contenidos; por lo tanto, su uso no podrá ser considerado como una autorización tácita o expresa para utilizar los servicios y contenidos” con algún fin diverso a los contemplados por el presente documento.
                
                IV. PROPIEDAD INTELECTUAL DE TERCEROS
                El usuario reconoce y se obliga a los términos del apartado III. PROPIEDAD INTELECTUAL, para efectos de la titularidad de los derechos de uso, difusión y explotación de los de terceros respecto a los servicios y contenidos ofrecidos en las páginas vinculadas al Sitio.
                
                V. MODIFICACIONES
                SrPreston se reserva el derecho de modificar discrecionalmente el contenido y funcionalidad del Portal en cualquier momento, sin necesidad de previo aviso. SrPreston podrá modificar los Términos y Condiciones Generales en cualquier momento haciendo públicos en el Sitio los términos modificados. Todos los términos modificados entrarán en vigor a los 10 (diez) días de su publicación. Dentro de los 5 (cinco) días siguientes a la publicación de las modificaciones introducidas, el Usuario deberá comunicar por e-mail si no acepta las mismas; en ese caso quedará disuelto el vínculo contractual y será inhabilitado como Usuario siempre que no tenga deudas pendientes. Vencido este plazo, se considerará que el Usuario acepta los nuevos términos y el contrato continuará vinculando a ambas partes.
                
                VI. PRIVACIDAD DE LA INFORMACIÓN
                Para utilizar los Servicios y Contenidos ofrecidos por SrPreston, los Usuarios deberán facilitar determinados datos de carácter personal. Su información personal se procesa y almacena en servidores o medios magnéticos que mantienen altos estándares de seguridad y protección tanto física como tecnológica. Para mayor información sobre la privacidad de los Datos Personales y casos en los que será revelada la información personal, se puede consultar nuestro Aviso de Privacidad.
                
                VII. VIOLACIONES DEL SISTEMA O BASES DE DATOS
                No está permitida ninguna acción o uso de dispositivo, software, u otro medio tendiente a interferir tanto en las actividades y operatividad de SrPreston como en la base de datos. Cualquier intromisión, tentativa o actividad violatoria o contraria a las leyes sobre derecho de propiedad intelectual y/o a las prohibiciones estipuladas en este contrato harán pasible a su responsable de las acciones legales pertinentes, y a las sanciones previstas por este acuerdo, así como lo hará responsable de indemnizar los daños ocasionados.
                
                VIII. SUSPENSIÓN DE OPERACIONES
                Sin perjuicio de otras medidas, SrPreston podrá advertir, suspender en forma temporal o inhabilitar definitivamente la Cuenta de un Usuario o una publicación, aplicar una sanción que impacte negativamente en la reputación de un Usuario, iniciar las acciones que estime pertinentes y/o suspender la prestación de sus Servicios si: (a) se quebrantara alguna ley, o cualquiera de las estipulaciones de los Términos y Condiciones Generales y demás políticas de SrPreston; (b) si incumpliera sus compromisos como Usuario; (c) si se incurriera a criterio de SrPreston en conductas o actos dolosos o fraudulentos; (d) no pudiera verificarse la identidad del Usuario o cualquier información proporcionada por el mismo fuere errónea; (e) SrPreston entendiera que las publicaciones u otras acciones pueden ser causa de responsabilidad para el Usuario que las publicó.
                
                IX. RESPONSABILIDAD
                SrPreston recomienda actuar con prudencia y sentido común al momento de realizar operaciones con otros Usuarios. El Usuario debe tener presente además, los riesgos de contratar con menores o con personas que se valgan de una identidad falsa.
                En caso que uno o más Usuarios o algún tercero inicien cualquier tipo de reclamo o acciones legales contra otro u otros Usuarios, todos y cada uno de los Usuarios involucrados en dichos reclamos o acciones eximen de toda responsabilidad a SrPreston y a sus directores, gerentes, empleados, agentes, operarios, representantes y apoderados.
                
                X. FALLAS EN EL SISTEMA
                SrPreston no se responsabiliza por cualquier daño, perjuicio o pérdida al Usuario causados por fallas en el sistema, en el servidor o en Internet. SrPreston tampoco será responsable por cualquier virus que pudiera infectar el equipo del Usuario como consecuencia del acceso, uso o navegación de su sitio web o a raíz de cualquier transferencia de datos, archivos, imágenes, textos, o audio contenidos en el mismo, así como cualquier otra información enviada con el uso de medios electrónicos. Los Usuarios NO podrán imputarle responsabilidad alguna ni exigir pago por lucro cesante, en virtud de perjuicios resultantes de dificultades técnicas o fallas en los sistemas o en Internet. SrPreston no garantiza el acceso y uso continuado o ininterrumpido de su Sitio. El sistema puede eventualmente no estar disponible debido a dificultades técnicas o fallas de Internet, o por cualquier otra circunstancia ajena a SrPreston; en tales casos se procurará restablecerlo con la mayor celeridad posible sin que por ello pueda imputársele algún tipo de responsabilidad. SrPreston no será responsable por ningún error u omisión contenidos en su sitio web.
                
                XI. CONFIDENCIALIDAD
                SrPreston se obliga expresamente a mantener confidencial la información que reciba del usuario que tenga dicho carácter conforme a legislación aplicable a la materia en la República Mexicana. SrPreston no se obliga a guardar confidencialidad respecto a cualquier otra información señalada por el usuario durante cualquier interacción con el Sitio o en el proceso de aplicación y/o obtención de los servicios y contenidos, incluyendo más no limitándose a la información proporcionada en blogs, chats o medios afines.
                El usuario autoriza expresamente a SrPreston a usar, publicar, o comunicar públicamente la información no considerada confidencial ingresada mediante el uso del Sitio, en términos de lo establecido en el artículo 109 de la Ley Federal de los Derechos de Autor.
                
                XII. COOKIES
                El usuario que tenga acceso al Sitio, acuerda recibir las Cookies que les transmitan los servidores de SrPreston. “Cookie” significa un archivo de datos que se almacena en el disco duro de la computadora del usuario cuando éste tiene acceso al Sitio. Las Cookies pueden contener información tal como la identificación proporcionada por el usuario o información para rastrear las páginas que el usuario ha visitado. Una Cookie no puede leer los datos o información del disco duro del usuario ni leer las Cookies creadas por otros sitios o páginas.
                Los presentes Términos y Condiciones Generales atañen únicamente a los servicios de SrPreston. No tenemos control alguno sobre los sitios web mostrados como resultados de búsquedas o enlaces que se incluyen en nuestro Sitio. Es posible que estos sitios independientes envíen sus propias cookies u otros archivos a su equipo, recopilen datos o le soliciten que envíe información personal.
                
                XIII. INDEMNIZACIÓN
                El Usuario indemnizará y mantendrá indemne a SrPreston, sus filiales, empresas controladas y/o controlantes, directivos, administradores, representantes y empleados, por cualquier reclamo o demanda de otros Usuarios o terceros por sus actividades en el Sitio o por su incumplimiento los Términos y Condiciones Generales y demás Políticas que se entienden incorporadas al presente o por la violación de cualesquiera leyes o derechos de terceros, incluyendo los honorarios de abogados en una cantidad razonable.
                
                XIV. JURISDICCIÓN Y LEY APLICABLE
                Este acuerdo estará regido en todos sus puntos por las leyes vigentes en la República Mexicana, en particular respecto de mensajes de datos, contratación electrónica y comercio electrónico se regirá por lo dispuesto por la legislación federal respectiva. Cualquier controversia derivada del presente acuerdo, su existencia, validez, interpretación, alcance o cumplimiento, será sometida a las leyes aplicables y a los Tribunales competentes.
                Para la interpretación, cumplimiento y ejecución del presente contrato, las partes expresamente se someten a la jurisdicción de los tribunales federales competentes de la Ciudad de México, renunciando en consecuencia a cualquier fuero que en razón de su domicilio presente o futuro pudiera corresponderles.
                
                XV. DOMICILIO
                Se fija como domicilio de SrPreston Extremadura 59 Int Piso 4, Col. Insurgentes Mixcoac, Benito Juárez, C.P.03920, Ciudad de México.
                
                XVI. ADVERTENCIAS
                Incumplir tus obligaciones te puede generar comisiones e intereses moratorios.
                Contratar créditos por arriba de tu capacidad de pago puede afectar tu historial crediticio.


            </div>
            <span>By clicking "Accept" I agree that:</span>
            <ul className='docs-terms'>
              <li>
                I have read and accepted the <a href='http://google.com'>User Agreement</a>
              </li>
              <li>
                I have read and accepted the <a href='http://google.com'>Privacy Policy</a>
              </li>
              <li>I am at least 18 years old</li>
            </ul>
            <ul className="form-fields">
        <li>
        <label>
            Accept the policy and agreement
            <input
                name="didAgree"
                type='checkbox'
                //   defaultChecked={this.state.checked}
                checked={this.props.form.didAgree}
                onChange={this.onChange}
                autoFocus
                style={{width: '200px'}}
            />
        </label>
        </li>
        
        <li className="form-footer">
            <button className="btn -default pull-left" onClick={this.props.previousStep} >Back</button>
          {/* <button className="btn -primary pull-right" onClick={this.nextStep}>Finish</button> */}
          <button className="btn -primary pull-right" onClick={this.handleSubmit}
           disabled={!this.props.form.didAgree}>Finish</button>
        </li>
      </ul>
            
          </div>
        </div>
      </div>
    )
  }

  nextStep(e) {
    e.preventDefault()

    // this.props.saveValues(key, value)
    this.props.nextStep()
  }
  /* register(e){
    e.preventDefault()
    // this.props.saveValues(key, value)
    this.props.register()
  } */

  handleSubmit(event) {
    // this.props.saveValues('loading', true)
    // this.props.getPosts('time');
    event.preventDefault();
  
    this.setState({ submitted: true });
    const { data } = this.props.form;
    this.props.register(data)
    .then((res)=>{
      this.props.saveValues("PendingStepNumber", null);
            this.updateStepsProgress()
                    .then((res)=>{
                      // this.nextStep();
                      this.props.nextStep();
                    })
          });
  }

  async updateStepsProgress(){
    return new Promise((resolve, reject) => {

      this.setState ({
        isFetching: true,
        fetchError: null,
      });
      // (this.state.totalAmountwithIva, this.props.form.ChosenAmount);
      const request = {
        RegistrationToken: localStorage.getItem("RegistrationToken"),
        PendingStepNumber: this.props.form.data.PendingStepNumber,
        ChosenAmount: this.props.form.data.ChosenAmount,
        ChosenDays: this.props.form.data.ChosenDays,
      };
    var config = require('../../../../Config/config.json');
    fetch(config.apiUrl + "updateStepsProgress", {
        method: 'PUT', 
        headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json', 
            //Authorization: this.props.token
        }, 
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(result => {
        //setTimeout(() => {
            
            if(result.error){
              reject("FAILED to update");
              throw new Error("Failed to update");
            }
            
            this.setState ({
                isFetching: false,
                fetchError: null,
            });
            //this.forceUpdate();
        //}, 3000);
        resolve(result);  
    })
    .catch(e => {
        // (e); 
        this.setState({
            isFetching: false, 
            fetchError: e.message,
        });
    });
    }

    )}
    
}


const mapDispatchToProps = {
  // getPosts: fetchPosts,
  register: registerAction,
}

function mapStateToProps(state) {
  return {
    form: {
      didAgree:state.form.didAgree,
      name: state.form.name,
      middleName: state.form.middleName,
      lastName: state.form.lastName,
      phone: state.form.phone,
      password: state.form.password,
      email: state.form.email,
      age: state.form.age,
      data: state.form,
      loading: state.form.loading
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Agreement)
