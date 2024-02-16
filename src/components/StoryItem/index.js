import './index.css'

const StoryItem = props => {
  const {details} = props
  const {userId, userName, storyUrl} = details
  return (
    <li className="story-item">
      <img src={storyUrl} className="story-img" alt="user story" />
      <p>{userName}</p>
    </li>
  )
}
export default StoryItem
