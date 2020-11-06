import React from 'react'
import './App.css';
import Popular from './components/Popular'
import Battle from './components/Battle'

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Battle />
      </div>
    )
  }
}
