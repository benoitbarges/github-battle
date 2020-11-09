import React from 'react'
import Proptypes from 'prop-types'
import { fetchLanguage } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'

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
        const { owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              name={login}
              href={html_url}
            >
              <ul className='card-list'>
                <li>
                  <FaUser color='#F7BE73' size={22}/>
                  <a href={`https://github.com/${login}`}>{login}</a>
                </li>
                <li>
                  <FaStar color='#FBD84A' />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='#81C3F5' />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='#F18A93' />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
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
        {this.isLoading() && <Loading text='Fetching Repos'/>}
        {this.state.repos[this.state.selectedLanguage] && <ReposGrid repos={this.state.repos[this.state.selectedLanguage]}/>}
      </React.Fragment>
    )
  }
}
