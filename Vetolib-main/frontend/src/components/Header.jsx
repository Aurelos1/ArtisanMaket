import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from "../utils/AuthContext";


const Header = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect className="bg-success fixed-top">
      <Container fluid className="d-flex">
        <Navbar.Brand >
          <Link to="/" className='nav-link'>
            <img
              src="../../public/images/logo.png"
              width="10%"
              className="d-inline-block align-top"
              alt=""
            />
            <img src="../../public/images/logo-text.png" width="15%" height="15%" className="d-inline-block" alt="" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated && user ? (
            <Nav>

              <Dropdown className='me-5 pe-3'>

                <Dropdown.Toggle className='bg-primary' id="dropdown-basic">
                  <i className="bi bi-person-fill"></i> {user && user.nom + ' ' + user.prenom}
                </Dropdown.Toggle>

                <Dropdown.Menu className='w-25'>
                  <Dropdown.Item > <Link to="/profile" className='nav-link'><i className="bi bi-person-fill"></i> Mon profil </Link></Dropdown.Item>
                  {user && user.user_type === 'propriétaire' && <Dropdown.Item ><Link to={"/cabinet/owner/"+user.user_id} className='nav-link'><i className="bi bi-houses"></i> Mes cabinets </Link></Dropdown.Item>}
                 {user && user.user_type === 'user' && (<>
                  <Dropdown.Item > <Link to={"/animal/owner/" + user.user_id} className='nav-link'><i className="bi bi-house-heart-fill"></i> Mes animaux </Link> </Dropdown.Item>
                  <Dropdown.Item > <Link to="/appointments" className='nav-link'><i className="bi bi-calendar-check-fill"></i> Mes RDV </Link></Dropdown.Item>
                  </>)}
                  <Dropdown.Item onClick={logout} className='text-danger'> <i className="bi bi-box-arrow-left text-danger"></i> Déconnecter</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            <Nav>
              <Link to="/inscription" className="mt-2 fw-semibold text-white nav-link">
                Vous êtes un vétérinaire ?
              </Link>
              <Link eventKey={2} to="/connexion" className='nav-link'>
                <Button className="btn-primary">
                  Connexion
                </Button>
              </Link>
            </Nav>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;