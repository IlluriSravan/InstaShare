import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import {MdCancel} from 'react-icons/md'

class Header extends Component {
  state = {isShowMenu: false, searchInput: ''}

  onClickLogout = () => {
    const {history} = this.props
    console.log('headerprops', this.props)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onSearch = () => {
    const {searchInput} = this.state
    const {onSearchChange} = this.props
    onSearchChange(searchInput)
  }

  render() {
    const {isShowMenu, searchInput} = this.state

    return (
      <>
        <div className="header-large">
          <div className="header-left-large">
            <Link to="/" className="links1">
              <img
                src="https://res.cloudinary.com/dvwo0xuvo/image/upload/v1705726592/logo_flvzaw.png"
                className="home-logo"
                alt="website logo"
              />
            </Link>

            <h1>Insta Share</h1>
          </div>
          <div className="header-right-large">
            <input
              type="search"
              onChange={e => this.setState({searchInput: e.target.value})}
              value={searchInput}
              placeholder="Search Caption"
            />

            <button
              type="button"
              className="ham-button"
              aria-label="lop"
              data-testid="searchIcon"
              onClick={this.onSearch}
            >
              <FaSearch />
            </button>
            <ul className="header-list">
              <li>
                <Link to="/" className="links">
                  <h1 className="heading">Home</h1>
                </Link>
              </li>
              <li>
                <Link to="/my-profile" className="links">
                  <h1 className="heading">Profile</h1>
                </Link>
              </li>

              <button
                className="logout-button"
                type="button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </ul>
          </div>
        </div>
        <div className="header-small">
          <div className="header-left-small">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dvwo0xuvo/image/upload/v1705726592/logo_flvzaw.png"
                className="home-logo"
                alt="website logo"
              />
            </Link>

            <h1>Insta Share</h1>
          </div>
          <input
            type="search"
            className="mobile-input"
            onChange={e => this.setState({searchInput: e.target.value})}
            value={searchInput}
            placeholder="Search Caption"
          />

          <button
            type="button"
            className="ham-button"
            aria-label="lop"
            data-testid="searchIcon"
            onClick={this.onSearch}
          >
            <FaSearch />
          </button>
          <div className="header-right-small">
            <button
              type="button"
              className="ham-button"
              aria-label="ham"
              onClick={() =>
                this.setState(pre => ({isShowMenu: !pre.isShowMenu}))
              }
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
        <div className="second">
          {isShowMenu && (
            <div className="Menuu">
              <Link to="/">
                <h1 className="heading">Home</h1>
              </Link>
              <Link to="/my-profile">
                <h1 className="heading">Profile</h1>
              </Link>

              <button
                className="logout-button"
                type="logout-button"
                aria-label="ham"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="ham-button"
                aria-label="ham"
                onClick={() =>
                  this.setState(pre => ({isShowMenu: !pre.isShowMenu}))
                }
              >
                <MdCancel />
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}
export default withRouter(Header)
// <button className="hamburger" onClick>
//           <GiHamburgerMenu />
//         </button>
//         {isShowMenu && (
//           <div className="mobile-menu">
//             <Link to="/">Home</Link>
//           </div>
//         )}
