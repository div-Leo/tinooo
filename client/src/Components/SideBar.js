import React, { Component } from 'react';

class SideBar extends Component {
 componentDidMount() {}

 show = () => {
  console.log('hi');
 };
 // RENDER =========================
 render() {
  return <div>{this.props.shown ? <h1>Hello</h1> : null}</div>;
 }
}

export default SideBar;
