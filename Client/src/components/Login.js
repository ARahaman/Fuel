import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { getDataById } from '../utils/rest-util';

const Tile = styled.div`
    width: 100%;
    height: 300px;
    margin-top: 25px;
`;

const cust_img = styled.img`
  width: 50%;
  height: 50%;
  display: block;
  position: absolute;
  margin: 5px;
  cursor: pointer;
  transition: 0.50s ease-out;
  &:hover {
    width: 70%;
    height: 70%;
  }
`;

const Img1 = styled(cust_img)`
  bottom: 0;
  right: 0;
  border-radius: 50px 0px 0px 0px;
`;

const Img2 = styled(cust_img)`
  bottom: 0;
  left: 0;
  border-radius: 0px 50px 0px 0px;
  width: 65%;
  height: 65%;
`;

const Img3 = styled(cust_img)`
  top: 0;
  right: 0;
  border-radius: 0px 0px 0px 50px;
  width: 65%;
  height: 65%;
`;

const Img4 = styled(cust_img)`
  top: 0;
  left: 0;
  border-radius: 0px 0px 50px 0px;
`;

class Home extends Component {
  constructor () {
    super();
    this.style = {
      borderBottom: 'aliceblue',
      height: '100%',
      width: '100%',
      marginTop: '10px',
      position: 'relative',
      bottom: '0px'
    }
    let params = (new URL(document.location)).searchParams;
    if(params.get('t'))
      sessionStorage.setItem('authorization', params.get('t').trim());
    if(params.get('i'))
      sessionStorage.setItem('id', params.get('i').trim());
  }

  async componentDidMount () {
    window.location='http://localhost:3000'
  }

  render () {
    return (
      <React.Fragment>
        
      </React.Fragment>
    )
  }
}

export default Home;
