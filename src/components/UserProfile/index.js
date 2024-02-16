import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'
import UserProfileStories from '../UserProfileStories'
import UserProfilePostItem from '../UserProfilePostItem'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {profileData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    console.log(this.props)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwt = Cookies.get('jwt_token')
    const myProfileOptions = {headers: {Authorization: `Bearer ${jwt}`}}
    const myProfileUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const myProfileResponse = await fetch(myProfileUrl, myProfileOptions)
    const myProfileData = await myProfileResponse.json()
    const profileData = myProfileData.user_details
    if (myProfileResponse.ok) {
      const updatedMyProfile = {
        id: profileData.id,
        userId: profileData.user_id,
        userName: profileData.user_name,
        profilePic: profileData.profile_pic,
        followersCount: profileData.followers_count,
        followingCount: profileData.following_count,
        userBio: profileData.user_bio,
        posts: profileData.posts.map(each => ({
          id: each.id,
          image: each.image,
        })),
        postsCount: profileData.posts_count,
        stories: profileData.stories.map(eachStory => ({
          id: eachStory.id,
          image: eachStory.image,
        })),
      }
      console.log('MYY', updatedMyProfile)
      this.setState({
        profileData: updatedMyProfile,
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

  successView = () => {
    const {profileData} = this.state
    const {
      id,
      userId,
      userName,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      posts,
      stories,
      postsCount,
    } = profileData
    return (
      <>
        <Header />
        <div className="top-profile">
          <img
            src={profilePic}
            className="profilepic-profile"
            alt="user profile"
          />
          <div className="top-right-profile">
            <h1>{userName}</h1>
            <div className="right-second-profile">
              <p className="posts-count-profile">{postsCount} posts</p>
              <p className="posts-count-profile">{followersCount} followers</p>
              <p className="posts-count-profile">{followingCount} following</p>
            </div>
            <p>{userId}</p>
            <p>{userBio}</p>
          </div>
        </div>
        <ul className="stories-profile">
          {stories.map(each => (
            <UserProfileStories key={each.id} details={each} />
          ))}
        </ul>
        <div className="third-profile">
          <BsGrid3X3 />
          <h1 className="po">Posts</h1>
        </div>
        {posts.length > 1 ? (
          <ul className="posts-container-profile">
            {posts.map(each => (
              <UserProfilePostItem key={each.id} details={each} />
            ))}
          </ul>
        ) : (
          <>
            <BiCamera />
            <h1>No Posts Yet</h1>
          </>
        )}
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
    const {profileData} = this.state
    return this.renderConditions()
  }
}
export default UserProfile
