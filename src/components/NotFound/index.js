import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://res.cloudinary.com/dvwo0xuvo/image/upload/v1708052950/erroring_2_n2mlw4.png"
      alt="page not found"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found.Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="return-to-home">
        Home Page
      </button>
    </Link>
  </div>
)
export default NotFound
