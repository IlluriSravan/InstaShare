import './index.css'
import {useState} from 'react'
import Header from '../Header'
import Stories from '../Stories'
import Posts from '../Posts'
import Search from '../Search'

const Home = props => {
  const [isSearch, setSearch] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const onSearchChange = search => {
    setSearch(true)
    setSearchInput(search)
  }
  return (
    <>
      <Header onSearchChange={onSearchChange} />
      <main className="home-container">
        <Stories />
        <br className="line" />
        {isSearch ? <Search search={searchInput} /> : <Posts />}
      </main>
    </>
  )
}
export default Home
//
