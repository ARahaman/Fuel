import React, { Component } from 'react';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

class Input extends Component {
  constructor () {
    super()
    this.state = {
      action: ''
    }
  }

  addTodo () {
    const task = { action: this.state.action }

    if (task.action && task.action.length > 0) {
      axios.post('/api/todos', task)
        .then(res => {
          if (res.data) {
            this.props.getTodos();
            this.setState({ action: '' })
          }
        })
        .catch(err => console.log(err))
    } else {
      console.log('input field required')
    }
  }

  handleChange (e) {
    this.setState({
      action: e.target.value
    })
  }

  render () {
    const { action } = this.state;
    return (
      <div>
        <input type="text" onChange={(e) => this.handleChange(e)} value={action} />
        <button onClick={() => this.addTodo() }>add todo</button>
      </div>
    )
  }
}

export default Input;
