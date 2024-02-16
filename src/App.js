import './App.css'
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import MyProfile from './components/MyProfile'

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/my-profile" component={MyProfile} />
        <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        <Route exact path="/bad-path" component={NotFound} />
        <Redirect to="bad-path" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </>
)
export default App
