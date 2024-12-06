import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const { user } = useAuth();

  console.log(user);
  return (
    <Navbar collapseOnSelect className="bg-white fixed-top">
      <Container fluid className="d-flex">
        <Navbar.Brand>
          <Link to={ user ? "/cabinet": "/"} className="nav-link">
            <img
              src="../../public/images/logo-text.png"
              width="50%"
              height="50%"
              className="d-inline-block"
              alt=""
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
          {isAuthenticated && user && (
            <Nav>
              <NavLink to="/cabinet" className="nav-link me-5 text-primary">
              Cabinets
              </NavLink>
              <NavLink to="/animal" className="nav-link me-5 text-primary">
              Animaux
              </NavLink>
        

              <Dropdown className="me-5 pe-3">
                <Dropdown.Toggle className="bg-primary" id="dropdown-basic">
                  <i className="bi bi-person-fill"></i>{" "}
                  {user && user.nom + " " + user.prenom}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-25">
                  <Dropdown.Item>
                    {" "}
                    <Link to="/user" className="nav-link">
                      <i className="bi bi-person-fill"></i> Mon profil{" "}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout} className="text-danger">
                    {" "}
                    <i className="bi bi-box-arrow-left text-danger"></i>{" "}
                    Déconnecter
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
