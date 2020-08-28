import React from 'react'
import { Link } from 'gatsby'
import AccessibilityBar from './AccessibilityBar'
import HomeLogo from './HomeLogo'
import Banner from './Banner'

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
        <Banner/>
        <nav
          className="navbar"
          role="navigation"
          aria-label="main-navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <HomeLogo/>
              <AccessibilityBar/>
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
                <Link className="navbar-item" to="/aktivitaeten">
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
