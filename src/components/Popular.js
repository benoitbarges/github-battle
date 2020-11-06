import React from 'react'
import Proptypes from 'prop-types'
import { fetchLanguage } from '../utils/api'

function LanguagesNav ({ selected, onUpdateLanguage }) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className='flex-center'>
      {languages.map((language) => (
        <li key={language}>
          <button
            style={selected === language ? {color: 'red'} : null}
            className='btn-clear nav-link'
            onClick={() => onUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: Proptypes.string.isRequired,
  onUpdateLanguage: Proptypes.func.isRequired
}

function ReposGrid ({repos}) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url} className='repo bg-light'>
            <h4 className='header-lg center-text'>
              #{index + 1}
            </h4>
            <img
              className='avatar'
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <h2 className='center-text'>
              <a href={html_url}>{name}</a>
            </h2>
          </li>
        )
      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: Proptypes.array.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {}
    }
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage,
    })
    if (!this.state.repos[selectedLanguage]) {
      fetchLanguage(selectedLanguage)
        .then((data) => {
          this.setState({
            repos: {
              ...this.state.repos,
              [selectedLanguage]: data
            }
          })
        })
    }
  }

  isLoading = () => {
    return !this.state.repos[this.state.selectedLanguage]
  }

  render() {
    return (
      <React.Fragment>
        <LanguagesNav
          selected={this.state.selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <p>LOADING</p>}
        {this.state.repos[this.state.selectedLanguage] && <ReposGrid repos={this.state.repos[this.state.selectedLanguage]}/>}
      </React.Fragment>
    )
  }
}
