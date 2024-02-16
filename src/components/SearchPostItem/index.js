import './index.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

const SearchPostItem = props => {
  const {details, postLike} = props
  const [likeStatus, setLiked] = useState(true)
  const {
    userId,
    postId,
    postUserName,
    profilePic,
    postDetails,
    likesCount,
    comments,
    createdAt,
  } = details
  const {imageUrl, caption} = postDetails
  const onPostLike = () => {
    postLike(postId, likeStatus)
    setLiked(prev => !prev)
  }
  return (
    <li className="post-item">
      <div className="post">
        <div className="post-top">
          <Link to={`/users/${userId}`} className="post-top">
            <img
              src={profilePic}
              className="profile-pic-post"
              alt="post author profile"
            />
            <p className="profile-name-post">{postUserName}</p>
          </Link>
        </div>
        <img src={imageUrl} className="post-image" alt="post" />
        <p>{caption}</p>
        <div className="options-post">
          {likeStatus ? (
            <button
              type="button"
              className="button-options-post"
              aria-label="love"
              data-testid="likeIcon"
              onClick={onPostLike}
            >
              <BsHeart />
            </button>
          ) : (
            <button
              type="button"
              className="button-options-post"
              aria-label="love"
              data-testid="unLikeIcon"
              onClick={onPostLike}
            >
              <FcLike />
            </button>
          )}
          <button
            type="button"
            className="button-options-post"
            data-testid="commentIcon"
            aria-label="love"
          >
            <FaRegComment />
          </button>
          <button
            type="button"
            className="button-options-post"
            aria-label="love"
            data-testid="shareIcon"
          >
            <BiShareAlt />
          </button>
        </div>
        <p>{likesCount} likes</p>
        <p className="caption-post">{caption}</p>
        <div className="comment-post">
          <span className="comment-username">{comments[0].userName}</span>
          <p>{comments[0].comment}</p>
        </div>
        <div className="comment-post">
          <p className="comment-username">{comments[1].userName}</p>
          <p>{comments[1].comment}</p>
        </div>
        <p className="time-post">{createdAt}</p>
      </div>
    </li>
  )
}
export default SearchPostItem
