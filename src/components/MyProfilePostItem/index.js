import './index.css'

const MyProfilePostItem = props => {
  const {details} = props
  const {image} = details
  return (
    <li className="profile-post-item">
      <img src={image} className="profile-post-img" alt="my post" />
    </li>
  )
}
export default MyProfilePostItem
