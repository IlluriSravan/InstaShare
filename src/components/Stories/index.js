import './index.css'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import StoryItem from '../StoryItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const Stories = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress)
  const [storiesData, setStoriesData] = useState([])
  const [succe, setSucce] = useState(true)

  useEffect(() => {
    setApiStatus(apiStatusConstants.inProgress)
    const getStories = async () => {
      const storiesUrl = 'https://apis.ccbp.in/insta-share/stories'
      const jwt = Cookies.get('jwt_token')
      const options = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
      const storiesResponse = await fetch(storiesUrl, options)
      const storyData = await storiesResponse.json()
      if (storiesResponse.ok) {
        console.log(storiesResponse)
        const updatedStoryData = storyData.users_stories.map(eachStory => ({
          userId: eachStory.user_id,
          userName: eachStory.user_name,
          storyUrl: eachStory.story_url,
        }))
        console.log('story', updatedStoryData)
        setApiStatus(apiStatusConstants.success)
        setStoriesData(updatedStoryData)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }
    getStories()
  }, [succe])

  const loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const successView = () => {
    const settings = {
      dots: false,
      accessibility: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 620,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
      ],
    }
    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {storiesData.map(each => (
            <StoryItem key={each.userId} details={each} />
          ))}
        </Slider>
      </ul>
    )
  }

  const failureView = () => (
    <>
      <img
        src="https://res.cloudinary.com/dvwo0xuvo/image/upload/v1707981105/Group_7522_tx4f0m.png"
        alt="failure view"
      />
      <p>"Something went wrong. Please try again"</p>
      <button type="button" onClick={() => setSucce(false)}>
        Try again
      </button>
    </>
  )

  const renderConditions = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return loadingView()
      case apiStatusConstants.success:
        return successView()
      case apiStatusConstants.failure:
        return failureView()
      default:
        return 0
    }
  }
  return renderConditions()
}
export default Stories
