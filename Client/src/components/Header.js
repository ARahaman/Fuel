import React, { Component } from 'react';
import { Container, Row, Col, DropdownButton, InputGroup, FormControl, Dropdown, ButtonGroup, Button, Modal, Form, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { Pic } from './UtilComponents';
import { Link } from 'react-router-dom';
import { getData, postData } from '../utils/rest-util';
import { userInfo } from 'os';

const LoginButton = styled.button`
  border-radius: 20px;
  width: 100%;
  font-weight: bold;
  border: solid 1px;
  margin: 5px;
  color: ${props => props.type === "login"? '#FFF' : '#213355'};
  background: ${props => props.type==="facebook"? '#45619d': props.type==='login'? '#61b2e8': '#FFF'};
  padding: ${props => props.type==="login"? '10px' : '0px'};
`

const Img = styled.img`
  width: 65px;
  height: 60px;
  margin: 5px;
`;

const SigninImg = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Ul = styled.ul`
  list-style: none;
  // overflow: scroll;
`

const Li = styled.li`
  display: inline-block;
  margin: 5px;
  padding-right: 5px;
  color: #FFF;
  // text-decoration: underline;
`

const Redirect = styled(Link)`
  color: #FFF;
  // color: #ece5d9;
  font-weight: bold;
  text-transform: uppercase;
  vertical-align: middle;
  &:hover {
    color: #FFF;
    text-decoration: none;
  }
`
const MenuItem  = styled(Link)`
  color: #5d5a5a;
  // font-weight: bold;
  // text-transform: uppercase;
  vertical-align: middle;
  &:hover {
    color: #FFF;
    text-decoration: none;
  }
`

const ProfilePic= styled(Pic)`
  margin: 0px; 
`

class Header extends Component {
  constructor () {
    super();
    this.style = {
      height: '40px',
      position: 'sticky',
      top: 70,
      zIndex: 99,
      borderBottom: 'solid 1px #c4c6ce',
      borderTop: 'solid 1px #c4c6ce',
      backgroundColor: '#1fc8db',
      backgroundImage: 'linear-gradient(141deg, rgb(3, 163, 239) 0%, rgb(178, 136, 68) 51%, rgb(78, 108, 43) 75%)'
      // backgroundImage: 'linear-gradient(141deg, rgb(177, 159, 184) 0%, rgb(83, 86, 136) 51%, rgb(158, 143, 158) 75%)'
    }
    this.style1 = {
      height: '70px',
      position: 'sticky',
      top: 0,
      zIndex: 999,
      backgroundColor: '#FFF'
    }
    this.state = {
      categories: [],
      showLogin: false,
      showSignup: false,
      error: null,
      singinerror: null,
      designation: null
    }
    this.signupUsername = React.createRef();
    this.signupPassword = React.createRef();
    this.signupConfirmPassword = React.createRef();
    this.signinUsername = React.createRef();
    this.signinPassword = React.createRef();
  }

  setDesignation(e){
    this.setState({ designation: e.target && e.target.value });
  }

  handleClose () {
    this.setState({showLogin: false});
  }

  handleShow () {
    this.setState({showLogin: true});
  }

  handleSignUpClose () {
    this.setState({showSignup: false});
  }

  handleSignUpShow () {
    this.setState({showSignup: true, showLogin: false});
  }

  async componentDidMount () {
    window.scrollTo(0, 0);
  }

  async signin() {
    if(!(this.signinUsername.current && this.signinUsername.current.value.trim() && this.signinPassword.current && this.signinPassword.current.value.trim())){
      this.setState({singinerror: 'Username or Passord is wrong'});
    } else {
      let user = await postData("/auth/clogin", {username: this.signinUsername.current.value.trim(), password: btoa(this.signinPassword.current.value.trim()), type:'signin'});
      user = user.data;
      if(!user){
        this.setState({singinerror: 'User not Found'});
      } else {
        sessionStorage.setItem('designation',user.designation);
        sessionStorage.setItem('id',user._id);
        sessionStorage.setItem('authorization', user.token);
        window.location.href='/'
      }
    }
  }

  async signup() {
    let user = {};
    if(this.signupPassword.current && this.signupPassword.current.value.trim() !== this.signupConfirmPassword.current.value.trim()){
      this.setState({error: 'Password and Confirmation Password doesn\'t match'});
    } else if(!(this.signupUsername.current && this.signupUsername.current.value.trim()!='')){
      this.setState({error: 'Username is required'});
    } else {
      user = await postData('/auth/clogin', { username: this.signupUsername.current.value.trim(), password: btoa(this.signupPassword.current.value.trim()), designation: this.state.designation }); 
      this.setState({error: null});
      window.location.href='/'
    }
  }

  logout () {
    postData('logout');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authorization');
    window.location.href='/' 
  }

  render () {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col><Redirect to="/"><Img src='/logo.png' />Gas Station</Redirect></Col>
            <Col style={ {paddingTop: '10px'} }>
              <Row>
                <Col>
                  { (!sessionStorage.getItem('authorization') || sessionStorage.getItem('authorization')==="undefined")? 
                  <Col>
                    <Row>
                      <Col xs={4} md={10}></Col>
                      <Col xs={8} md={2} className="login">
                        <Button variant="primary" onClick={()=>this.handleShow()}>Login</Button>
                        <Modal show={this.state.showLogin} onHide={()=>this.handleClose()}>
                          <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Row>
                              <Col>
                                {/* <center><Img src='/logo.png' /></center> */}
                                {/* <center><h3><span className="buttonText">Sign in</span></h3></center> */}
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                              <Form onSubmit={()=>this.signin()}>
                                  <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Username*</Form.Label>
                                    <Form.Control type="Text" placeholder="Username" ref={this.signinUsername}/>
                                  </Form.Group>
                                  <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password*</Form.Label>
                                    <Form.Control type="password" placeholder="Password" ref={this.signinPassword}/>
                                  </Form.Group>
                                  { this.state.singinerror?
                                    <Alert variant='danger'>
                                      {this.state.singinerror}
                                    </Alert> : ''
                                  }
                                  <LoginButton type="login" onClick={()=>this.signin()}>
                                    <span>Log in</span>
                                  </LoginButton>
                                  <center><span className="buttonText"><u>Forgot Password?</u></span></center>
                                  <center><span className="buttonText">Don't have and account? <a href='#' onClick={()=>this.handleSignUpShow()}>Sign Up</a></span></center>
                                </Form>
                              </Col>  
                            </Row>
                          </Modal.Body>
                        </Modal>

                        <Modal show={this.state.showSignup} onHide={()=>this.handleSignUpClose()}>
                          <Modal.Header closeButton>
                            <Modal.Title>Sign-up</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Row>
                              <Col>
                              <Form>
                                  <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Username*</Form.Label>
                                    <Form.Control type="text" placeholder="Username" ref={this.signupUsername}/>
                                  </Form.Group>
                                  <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password*</Form.Label>
                                    <Form.Control type="password" placeholder="Password" ref={this.signupPassword}/>
                                  </Form.Group>
                                  <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Confirmation Password*</Form.Label>
                                    <Form.Control type="password" placeholder="Password" ref={this.signupConfirmPassword}/>
                                  </Form.Group>
                                  <Form.Group controlId="exampleForm.ControlInput1">
                                  <Form.Check
                                      type="radio"
                                      label="Worker"
                                      name="group2"
                                      value="worker"
                                      onChange={this.setDesignation.bind(this)}
                                  /> 
                                  <Form.Check
                                      type="radio"
                                      label="Manager"
                                      name="group2"
                                      value="manager"
                                      onChange={this.setDesignation.bind(this)}
                                  /> 
                                  </Form.Group>
                                  { this.state.error?
                                    <Alert variant='danger'>
                                      {this.state.error}
                                    </Alert> : ''
                                  }
                                  <LoginButton type="login" onClick={()=>this.signup()}>
                                    <span>Sign-up</span>
                                  </LoginButton>
                                  <center><span className="buttonText">i've an account? <a href="#" onClick={()=>this.handleShow()}>Login</a></span></center>
                                </Form>
                              </Col>  
                            </Row>
                          </Modal.Body>
                          {/* <Modal.Footer>
                            <Button variant="secondary" onClick={()=>this.handleClose()}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={()=>this.handleClose()}>
                              Save Changes
                            </Button>
                          </Modal.Footer> */}
                        </Modal>

                        {/* <DropdownButton as={ButtonGroup} title="Login" id="bg-nested-dropdown">
                          <Dropdown.Item eventKey="1"><a href="http://localhost:5000/api/auth/google"><SigninImg src='https://www.searchpng.com/wp-content/uploads/2018/11/google_icon_2048.png' /></a></Dropdown.Item>
                          <Dropdown.Item eventKey="2"><a href="http://localhost:5000/api/auth/facebook"><SigninImg src='https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png' /></a> &nbsp;</Dropdown.Item>
                        </DropdownButton> */}
                      </Col>
                    </Row>
                  </Col>
                  :
                  <span>
                    <ProfilePic src={null} style={ { float: 'right' } }/>
                    <span style={{ color:'#185e84', fontWeight: 'bold', cursor:'pointer', verticalAlign: 'middle', margin: '20px 5px', float: 'right'}}><a onClick={()=>this.logout()}>Logout</a></span>
                  </span>
                  }
                </Col>
                </Row>
              </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Header;
