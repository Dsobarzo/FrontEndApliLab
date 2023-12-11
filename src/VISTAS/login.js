import React from 'react';
import '../ESTILOS/login.css';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import Cookies from 'js-cookie';

const usuarios = [
  { username: '91f5167c34c400758115c2a6826ec2e3', password: '25d55ad283aa400af464c76d713c07ad', role: 'administrador' }, // 'administrador', '12345678' encriptados con MD5
  { username: 'ac99fecf6fcb8c25d18788d14a5384ee', password: '5e8667a439c68f5145dd2fcbecf02209', role: 'docente' } // 'docente', '87654321' encriptados con MD5
];

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    error: ''
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    // Validar campos obligatorios
    if (!username || !password) {
      this.setState({ error: 'Por favor, complete todos los campos' });
      return;
    }

    // Encriptar el nombre de usuario y la contraseña ingresados
    const encryptedUsername = md5(username);
    const encryptedPassword = md5(password);

    // Buscar el usuario por nombre de usuario
    const usuario = usuarios.find((user) => user.username === encryptedUsername);

    if (usuario) {
      // Comparar la contraseña encriptada con la contraseña almacenada del usuario
      if (encryptedPassword === usuario.password) {
        // Establecer cookie de autenticación
        Cookies.set('authToken', 'token_de_autenticacion', { expires: 1 }); // Establece una cookie con el nombre 'authToken'
        Cookies.set('rolUsuario', usuario.role); // Establece una cookie con el nombre 'rolUsuario' con el valor del rol del usuario

        // Redirecciona al usuario a la página correspondiente
        if (usuario.role === 'administrador') {
          window.location.href = './menu_administrador'; // Redireccionar a la página del administrador
        } else if (usuario.role === 'docente') {
          window.location.href = './menu_docente'; // Redireccionar a la página del docente
        }
      } else {
        // Contraseña incorrecta
        this.setState({ error: 'Contraseña incorrecta' });
      }
    } else {
      // Usuario no encontrado
      this.setState({ error: 'Usuario no encontrado' });
    }
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="contenedor">
        <div className="container m-0" id='contenedorPrincipal'>
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-4 col-md-8 col-sm-10 ">
              <div className='detalle'>
                <div className="columna">
                  <div className="titulo mb-">
                    <h2 className='fs-2 mb-5'>UNIVERSIDAD DE MAGALLANES</h2>
                  </div>
                  <h2 className='fs-3 mt-3' style={{ color: "white" }}>Gestión de reservas de laboratorios</h2>
                  <br /><br />
                  <p className="fs-5 text-start">
                    Esta es una herramienta útil y eficaz para optimizar tus procesos de reserva.<br /><br />
                    ¡Disfruta de la facilidad y conveniencia que te brindamos y no dudes en comunicarte con nosotros si necesitas ayuda!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8 px-0">
              <div className="columna" id='login'>
                <label>Usuario</label>
                <br />
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  className="control"
                />
                <br />
                <label>Contraseña</label>
                <br />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="control"
                />
                <br />
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Iniciar Sesión
                </button>
                <div className='text-center'>
                  <div className='error'>
                    {error && <p>{error}</p>}
                  </div>
                  <div className='terminos'>
                    <Link to="/term_cond">Términos y Condiciones</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
