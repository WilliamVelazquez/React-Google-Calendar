import React from 'react';
//import logo from './../logo.svg';

class Header extends React.Component{
  render(){
    return(
      <header className="App-header">        
        <img src={this.props.image} className="App-logo" alt="logo" />
        <h1 className="App-title">{this.props.title}</h1>
      </header>
    );
  }
}

export default Header;
//<img src={logo} className="App-logo" alt="logo" />
//<h1 className="App-title">Welcome to React</h1>