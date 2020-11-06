import React from 'react'

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

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All'
    }
  }

  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage
    })
  }

  render() {
    return (
      <React.Fragment>
        <LanguagesNav
          selected={this.state.selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
      </React.Fragment>
    )
  }
}
