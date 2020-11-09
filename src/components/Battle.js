import React from 'react'
import Proptypes from 'prop-types'
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa'
import Results from './Results'

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

function PlayerPreview({ username, label, onReset }) {
  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className='row bg-light'>
        <div className='player-info'>
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar of ${username}`}
            className='avatar-small'
          />
          <a href={`https://github.com/${username}`} className='link'>
            {username}
          </a>
        </div>
        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='#C2392A' size={26} />
        </button>
      </div>
    </div>
  )
}

PlayerPreview.propTypes = {
  username: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  onReset: Proptypes.func.isRequired
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    }
  }

  handleSubmit = (id, username) => {
    this.setState({
      [id]: username
    })
  }

  handleReset = (id) => {
     this.setState({
      [id]: null
    })
  }

  resetBattle = () => {
     this.setState({
      playerOne: null,
      playerTwo: null,
       battle: false
    })
  }

  render() {
    if (this.state.battle) {
      return <Results playerOne={this.state.playerOne} playerTwo={this.state.playerTwo} onResetBattle={this.resetBattle}/>
    }

    return (
      <React.Fragment>
        <Instructions />
        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {this.state.playerOne === null
              ? <PlayerInput
                  label='Player One'
                  onSubmit={(username) => this.handleSubmit('playerOne', username)}
                />
              : <PlayerPreview
                  username={this.state.playerOne}
                  label='Player One'
                  onReset={() => this.handleReset('playerOne')}
                />
            }

            {this.state.playerTwo === null
              ? <PlayerInput
                  label='Player Two'
                  onSubmit={(username) => this.handleSubmit('playerTwo', username)}
                />
              : <PlayerPreview
                  username={this.state.playerTwo}
                  label='Player Two'
                  onReset={() => this.handleReset('playerTwo')}
                />
            }

          </div>
          {this.state.playerOne && this.state.playerTwo && (
            <button
              className='btn dark-btn btn-space'
              onClick= {() => this.setState({battle: true})}
            >
              Battle
            </button>
          )}
        </div>
      </React.Fragment>
    )
  }
}
