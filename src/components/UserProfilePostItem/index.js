import './index.css'

const UserProfilePostItem = props => {
  const {details} = props
  const {image} = details
  return (
    <li className="profile-post-item">
      <img src={image} className="profile-post-img" alt="user post" />
    </li>
  )
}
export default UserProfilePostItem
