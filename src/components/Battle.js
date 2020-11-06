import React from 'react'
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa'

function Instructions () {
  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>
        Instructions
      </h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUserFriends className='bg-light' size={140} color='#F7BE73' />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className='bg-light' size={140} color='#727272' />
        </li>
        <li>
          <h3 className='header-sm'>See the winner</h3>
          <FaTrophy className='bg-light' size={140} color='#FBD84A' />
        </li>
      </ol>
    </div>
  )
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      username: event.currentTarget.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  render() {
    return (
      <form className="column player" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className='player-label'>
          {this.props.label}
        </label>
        <div className='row player-inputs'>
          <input
            type='text'
            id='username'
            className='input-light'
            placeholder='Github username'
            autoComplete='off'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            type='submit'
            className='btn dark-btn'
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null
    }
  }

  handleSubmit = (id, username) => {
    this.setState({
      [id]: username
    })
  }

  render() {
    return (
      <React.Fragment>
        <Instructions />
        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {this.state.playerOne === null && (
              <PlayerInput
                label='Player One'
                onSubmit={(username) => this.handleSubmit('playerOne', username)}
              />
            )}
            {this.state.playerTwo === null && (
              <PlayerInput
                label='Player Two'
                onSubmit={(username) => this.handleSubmit('playerTwo', username)}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
