import React from 'react'
import Proptypes from 'prop-types'
import { ThemeConsumer } from '../contexts/theme'

export default function Card({ header, subheader, avatar, href, name, children}) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card bg-${theme}`}>
          <h4 className='header-lg center-text'>
            {header}
          </h4>
          <img
            src={avatar}
            alt={`Avatar for ${name}`}
            className='avatar'
          />
          {subheader && (
            <h4 className='center-text'>
              Score : {subheader}
            </h4>
          )}
          <h2 className='center-text'>
            <a href={href} className='link'>
              {name}
            </a>
          </h2>
          {children}
        </div>
      )}
    </ThemeConsumer>
  )
}

Card.propTypes = {
  header: Proptypes.string.isRequired,
  subheader: Proptypes.string,
  avatar: Proptypes.string.isRequired,
  href: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired
}
