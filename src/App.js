import React from 'react'
import './App.css';
import Popular from './components/Popular'

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    )
  }
}
