import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PostItem from '../PostItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {searchList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {search} = this.props
    const jwt = Cookies.get('jwt_token')
    const options = {headers: {Authorization: `Bearer ${jwt}`}}
    const postsUrl = `https://apis.ccbp.in/insta-share/posts?search=${search}`
    const postsResponse = await fetch(postsUrl, options)
    const postsData = await postsResponse.json()
    if (postsResponse.ok) {
      const updatedPosts = postsData.posts.map(eachPost => ({
        postId: eachPost.post_id,
        userId: eachPost.user_id,
        postUserName: eachPost.user_name,
        profilePic: eachPost.profile_pic,
        postDetails: {
          imageUrl: eachPost.post_details.image_url,
          caption: eachPost.post_details.caption,
        },
        likesCount: eachPost.likes_count,
        comments: eachPost.comments.map(eachComment => ({
          userName: eachComment.user_name,
          userId: eachComment.user_id,
          comment: eachComment.comment,
        })),
        createdAt: eachPost.created_at,
        likeStatus: false,
      }))
      this.setState({
        searchList: updatedPosts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  failureView = () => (
    <>
      <img
        src="https://res.cloudinary.com/dvwo0xuvo/image/upload/v1707983250/alert-triangle_xjf7ff.png"
        alt="failure view"
      />
      <p>"Something went wrong. Please try again"</p>
      <button type="button" onClick={() => this.componentDidMount()}>
        Try again
      </button>
    </>
  )

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  postLike = async (postId, likeStatus) => {
    const postLikeUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const jwt = Cookies.get('jwt_token')
    const dat = {like_status: likeStatus}
    const likeOptions = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwt}`},
      body: JSON.stringify(dat),
    }
    const postLikeResponse = await fetch(postLikeUrl, likeOptions)
    const postLikeData = await postLikeResponse.json()
  }

  successView = () => {
    const {searchList} = this.state

    return searchList.length > 0 ? (
      <>
        <h1>Search Results</h1>
        <ul className="posts-container">
          {searchList.map(eachPost => (
            <PostItem
              key={eachPost.postId}
              details={eachPost}
              postLike={this.postLike}
            />
          ))}
        </ul>
      </>
    ) : (
      <>
        <img
          src="https://res.cloudinary.com/dvwo0xuvo/image/upload/v1708050687/Group_cuzucd.png"
          className="no-search-img"
          alt="search not found"
        />
        <h1>Search Not Found</h1>
        <p>Try different keyword or search again</p>
      </>
    )
  }

  renderConditions = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return 0
    }
  }

  render() {
    const {searchList} = this.state
    return this.renderConditions()
  }
}
export default Search
