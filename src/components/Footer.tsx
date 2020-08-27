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
      <footer className="footer">
        <div className="content has-text-centered">
          <div className="container">
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
                      <Link className="navbar-item" to="/aktivitaeten">
                        News
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/projekte">
                        Projekte
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/ueberuns">
                        Über uns
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/vorstand">
                        Vorstand
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/kontakt">
                        Kontakt
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/spenden">
                        Spenden
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="content has-text-centered">
          <p>© RGZ - Schweizerischer Blindenbund 2020 | <Link className='impressum' to="/impressum">Impressum</Link></p>
        </div>
      </footer>
    )
  }
}

export default Footer
