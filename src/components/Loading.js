import React from 'react'
import Proptypes from 'prop-types'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: props.text
    }
  }

  componentDidMount() {
    const { text, speed } = this.props

    this.interval = window.setInterval(() => {
      this.state.content === `${text}...`
        ? this.setState({content: text})
        : this.setState(({ content }) => ({content: content + '.'}))
    }, speed)

  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return(
      <p className='loading'>{this.state.content}</p>
    )
  }
}

Loading.propTypes = {
  text: Proptypes.string.isRequired,
  speed: Proptypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
