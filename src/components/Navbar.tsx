import React from 'react'
import { Link } from 'gatsby'
import home from '../img/home.svg'
import banner from '../img/banner-rgz.svg'

interface IState {
  active: boolean;
  navBarActiveClass: string;
}

const Navbar = class extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
            navBarActiveClass: 'is-active',
          })
          : this.setState({
            navBarActiveClass: '',
          })
      }
    )
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="columns">
            <div className="column" style={{ textAlign: 'right' }}>
              <Link to="/" title="Zur Startseite gehen">
                <img src={banner} alt="Banner RGZ" style={{ height: '140px' }} />
              </Link>
            </div>
          </div>
        </div>
        <nav
          className="navbar"
          role="navigation"
          aria-label="main-navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item" title="Zur Startseite gehen">
                <img src={home} alt="Startseite" style={{ width: '88px' }} />
              </Link>
              {/* Hamburger menu */}
              <div
                className={`navbar-burger burger ${this.state.navBarActiveClass}`}
                data-target="navMenu"
                onClick={() => this.toggleHamburger()}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
            <div
              id="navMenu"
              className={`navbar-menu ${this.state.navBarActiveClass}`}
            >
              <div className="navbar-end has-text-centered">
                <Link className="navbar-item" to="/news">
                  AKTIVITÄTEN
              </Link>
                <Link className="navbar-item" to="/projekte">
                  PROJEKTE
              </Link>
                <Link className="navbar-item" to="/ueberuns">
                  ÜBER UNS
              </Link>
                <Link className="navbar-item" to="/vorstand">
                  VORSTAND
              </Link>
                <Link className="navbar-item" to="/kontakt">
                  KONTAKT
              </Link>
                <Link className="navbar-item" to="/spenden">
                  SPENDEN
              </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
