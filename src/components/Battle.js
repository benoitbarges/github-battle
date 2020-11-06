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

  handleChange = (e) => {
    this.setState({
      username: e.currentTarget.value
    })
  }

  render() {
    return (
      <form className="column player">
        <label htmlFor="username" className='player-label'>

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
            className='btn btn-dark'
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
  render() {
    return (
      <React.Fragment>
        <Instructions />
        <PlayerInput />
      </React.Fragment>
    )
  }
}
