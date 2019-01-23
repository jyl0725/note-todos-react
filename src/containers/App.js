import React, { Component } from 'react';
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
        <form onSubmit ={this.signUpHandler}>
          <label>Email</label>
          <input type="email" name="email" onChange={this.inputChangeHandle}/>
          <label>Password</label>
          <input type="password" name ="password" onChange={this.inputChangeHandle}/>
          <input type="submit"  value="Submit" />
        </form>
      </div>
    );
  };
};

export default App;
