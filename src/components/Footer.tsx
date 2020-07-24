import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-light">
        <div className="content has-text-centered has-background-light">
          <div className="container has-background-light">
            <div style={{ maxWidth: '100vw' }} className="columns">
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/news">
                        News
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/projekte">
                        Projekte
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/vorstand">
                        Vorstand
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="content has-text-centered">
          <p>© RGZ - Schweizerischer Blindenbund 2020</p>
        </div>
      </footer>
    )
  }
}

export default Footer
