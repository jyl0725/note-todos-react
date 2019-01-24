import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

class App extends Component {
  state = {
    user: '',
    todos: [],
    email: '',
    password: ''
  }


  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  signUpHandler = async (event) => {
    event.preventDefault();
    const newUser = await fetch('https://glacial-wave-21445.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": this.state.email, "password": this.state.password})
    });

    localStorage.setItem('jwt', newUser.headers['x-auth'])

    const parsednewUser = await newUser.json()

    await this.setStateAsync({
      user: parsednewUser.email,
      email: '',
      password: '',
    })
  }

  inputChangeHandle = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  render() {
    return (
      <div className="App">

      </div>
    );
  };
};

export default App;
