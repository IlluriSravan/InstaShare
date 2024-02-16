import './index.css'

const UserProfileStories = props => {
  const {details} = props
  const {image} = details
  return (
    <li className="profile-story-item">
      <img src={image} className="profile-story-img" alt="user story" />
    </li>
  )
}
export default UserProfileStories
