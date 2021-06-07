import React from 'react';
import { XOctagonFill } from 'react-bootstrap-icons';
import { Image } from 'react-bootstrap';

class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFlag: this.props.value,
      size: this.props.size || '25'
    };
    this.style = {
      display: 'inline-block',
      float: this.props.position || 'left',
      margin: '10px',
      position: 'relative',
      zIndex: '2',
      color: '#125e84',
      fontWeight: 'bold',
      fontSize: '17px',
      cursor: 'pointer'
    }
  }

  render() {
    const Source = this.props.source;
    const Inverseicon = this.props.inverseicon;
    if (Source && Inverseicon && this.props.click) {
      return (
        <div onClick={() => this.props.click()} style={this.props.style || this.style}>
          {
            this.props.value ? <Source color={this.props.color?this.props.color:"#125e84"} size={this.state.size} /> : <Inverseicon color={this.props.color?this.props.color:"#125e84"} size={this.state.size} />
          }
          {
            ` ${ this.props.text===undefined ? 0 : this.props.text }`
          }
        </div>
      )
    } else if (Source) {
      return (
        <div style={this.props.style || this.style}>
          {this.props.click ? <Source color={this.props.color?this.props.color:"#125e84"} size={this.state.size} onClick={() => this.props.click()} /> : <Source color={this.props.color?this.props.color:"#125e84"} size={this.state.size} />}
          {
            ` ${ this.props.text===undefined ? 0 : this.props.text }`
          }
        </div>
      )
    } else {
      return (
        <XOctagonFill color={this.props.color?this.props.color:"#125e84"} size={this.state.size} style={this.props.style || this.style} />
      )
    }
  }
}

class FormFieldIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFlag: this.props.value,
      size: this.props.size || '20'
    };
    this.style = {
      clear: 'all',
      display: 'inline-block'
    }
  }

  render() {
    const Source = this.props.source;
    if (Source) {
      return (
        <div style={this.style}>
          {
            this.props.value ? <Source size={this.state.size} /> : <Source color={this.props.color?this.props.color:"#125e84"} size={this.state.size} />
          }
        </div>
      )
    } else {
      return (
        <XOctagonFill color={this.props.color?this.props.color:"#125e84"} size={this.state.size} style={this.style} />
      )
    }
  }
}

class Pic extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      width: this.props.size || '50px',
      padding: '5px',
      margin: '5px',
      position: 'relative',
      zIndex: '2',
      background: '#125e84',
      ...this.props.style
    }
  }

  render () {
    return (
      <React.Fragment>
        { this.props.src ? <Image src = {this.props.src} style={this.style} roundedCircle/> : <Image style={this.style} src="https://img.icons8.com/officel/2x/person-male.png" roundedCircle /> }
      </React.Fragment>
    )
  }
}

export {
  Icon,
  FormFieldIcon,
  Pic
};
