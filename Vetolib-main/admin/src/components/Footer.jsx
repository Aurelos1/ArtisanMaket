import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img src="../public/images/logo.png" className="" width="10%" />
            <span className="top-2">
              <img
                src="../public/images/logo-text.png"
                className=""
                width="20%"
                height="20%"
              />
            </span>
          </a>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
            <i className="bi bi-twitter-x"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
            <i className="bi bi-facebook"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
            <i className="bi bi-linkedin"></i>
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;