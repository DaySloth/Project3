import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./footer.css";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Congo</h5>
            <p>
              Making shopping a breeze.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links to our Github Pages:</h5>
            <ul>
              <li className="list-unstyled">
                <a href="https://github.com/DaySloth">Allister</a>
              </li>
              <li className="list-unstyled">
                <a href="https://github.com/carsonsavage">Carson</a>
              </li>
              <li className="list-unstyled">
                <a href="https://github.com/beshayr2020">Beshayr</a>
              </li>
              <li className="list-unstyled">
                <a href="https://github.com/tlee0825">Teshera</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href=""> Congo </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;