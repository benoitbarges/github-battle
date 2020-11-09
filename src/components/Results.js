import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Proptypes from 'prop-types'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

function ProfileList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <Tooltip text="User's name">
          <FaUser color='#EF7373' size={22}/>
          {profile.name}
        </Tooltip>
      </li>
      <li>
        <Tooltip text="User's location">
          <FaCompass color='#9173F7' size={22}/>
          {profile.location}
        </Tooltip>
      </li>
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22}/>
        {profile.followers} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22}/>
        {profile.following} following
      </li>
      <li>
        <FaCode color='rgb(59, 76, 85)' size={22}/>
        {profile.public_repos} repositories
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: Proptypes.object.isRequired
}

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount () {
    const { playerOne, playerTwo } = this.props

    battle([ playerOne, playerTwo ])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      }).catch(({ message }) => {
          this.setState({
            error: message,
            loading: false
          })
      })
  }

  render() {
    const { winner, loser, error, loading } = this.state

    if (loading) {
      return <Loading text='Battling' />
    }

    if (error) {
      return <p className='error center-text'>{error}</p>
    }

    return (
      <React.Fragment>
        <div className='grid space-around container-sm'>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score : ${winner.score.toLocaleString()}`}
            href={winner.profile.html_url}
            name={winner.profile.login}
            avatar={winner.profile.avatar_url}
          >
            <ProfileList profile={winner.profile}/>
          </Card>

          <Card
            header={winner.score === loser.score ? 'Tie' : 'loser'}
            subheader={`Score : ${loser.score.toLocaleString()}`}
            href={loser.profile.html_url}
            name={loser.profile.login}
            avatar={loser.profile.avatar_url}
          >
            <ProfileList profile={loser.profile}/>
          </Card>
        </div>
        <button
          onClick={this.props.onResetBattle}
          className='btn dark-btn btn-space'
        >
          Restart
        </button>
      </React.Fragment>
    )
  }
}
