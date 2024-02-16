import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="app">
          <img
            src="https://res.cloudinary.com/dvwo0xuvo/image/upload/v1707969337/Illustration_1_j6huik.png"
            alt="website login"
            className="login-img"
          />
          <div className="form-container">
            <div className="form1">
              <img
                src="https://res.cloudinary.com/dvwo0xuvo/image/upload/v1705726592/logo_flvzaw.png"
                alt="website logo"
                className="logo-img"
              />
              <h1>Insta Share</h1>
            </div>
            <form className="login-form" onSubmit={this.onSubmitForm}>
              <div className="user">
                <label htmlFor="user">USERNAME</label>
                <input
                  onChange={e => {
                    this.setState({username: e.target.value})
                  }}
                  id="user"
                  type="text"
                  className="user-input"
                  placeholder="USERNAME"
                  value={username}
                />
              </div>
              <div className="user">
                <label htmlFor="pass">PASSWORD</label>
                <input
                  onChange={e => {
                    this.setState({password: e.target.value})
                  }}
                  id="pass"
                  type="password"
                  className="user-input"
                  placeholder="PASSWORD"
                  value={password}
                />
              </div>
              {isError && <p className="error">*{errorMsg}</p>}
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}
export default Login
