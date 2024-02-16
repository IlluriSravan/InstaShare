import './index.css'

const MyProfileStories = props => {
  const {details} = props
  const {image} = details
  return (
    <li className="profile-story-item">
      <img src={image} className="profile-story-img" alt="my story" />
    </li>
  )
}
export default MyProfileStories
