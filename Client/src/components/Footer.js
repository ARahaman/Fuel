import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class Header extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <React.Fragment>
        <Container fluid>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Header;
