import { Sidebar } from 'primereact/sidebar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const MySidebar = ({ visible, onHide }) => {
  return (
    <Sidebar visible={visible} onHide={onHide}>
      <div className="sidebar-header">
        <h2>Menú de Navegación</h2>

      </div>
      <p>
        Selecciona una opción para navegar entre diferentes páginas de cifrado.
      </p>
      <ul>
        <li>
          <Link to="/">
            <i className="pi pi-lock" style={{ marginRight: '0.5em' }}></i>
            Cifrado César
          </Link>
        </li>
        <li>
          <Link to="/cifrado-escitala">
            <i className="pi pi-key" style={{ marginRight: '0.5em' }}></i>
            Cifrado Escítala
          </Link>

        </li>
        <li>
          <Link to="/cifrado-TEA">
            <i className="pi pi-key" style={{ marginRight: '0.5em' }}></i>
            Cifrado TEA
          </Link>
        </li>
        <li>
          <Link to="/cifrado-RSA">
            <i className="pi pi-key" style={{ marginRight: '0.5em' }}></i>
            Cifrado RSA
          </Link>
        </li>
        <li>
          <Link to="/cifrado-Whirlpool">
            <i className="pi pi-key" style={{ marginRight: '0.5em' }}></i>
            Cifrado Whirlpool
          </Link>
        </li>
      </ul>
    </Sidebar>
  );
};

// Definir las PropTypes
MySidebar.propTypes = {
  visible: PropTypes.bool.isRequired, // Se espera que visible sea un booleano y es requerido
  onHide: PropTypes.func.isRequired,   // Se espera que onHide sea una función y es requerido
};