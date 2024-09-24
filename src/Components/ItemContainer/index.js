import {Component} from 'react'
import MatchItem from '../MatchItem'
import TabItem from '../TabItem'
import './index.css'

class ItemContainer extends Component {
  state = {
    score: 0,
    seconds: 60,
    category: 'FRUIT',
    randomNumber: Math.floor(Math.random() * 10),
    isgamestarted: true,
    timerId: null,
    refScore: 0,
  }

  componentDidMount() {
    this.startTimer()
  }

  startTimer = () => {
    const timerId = setInterval(this.tick, 1000)
    this.setState({timerId})
  }

  tick = () => {
    this.setState(prev => {
      if (prev.seconds <= 0) {
        clearInterval(prev.timerId)
        return {
          seconds: 0,
          isgamestarted: false,
          timerId: null,
        }
      }
      return {
        seconds: prev.seconds - 1,
      }
    })
  }

  upadteImageList = tabId => {
    this.setState({category: tabId})
  }

  getFilteredImages = () => {
    const {imagesList} = this.props
    const {category} = this.state

    return imagesList.filter(each => each.category === category)
  }

  validate = id => {
    const {imagesList} = this.props
    const {randomNumber, seconds, timerId} = this.state
    if (imagesList[randomNumber].id === id && seconds >= 0) {
      this.setState(prev => ({
        score: prev.score + 1,
        refScore: prev.refScore + 1,
        randomNumber: Math.floor(Math.random() * imagesList.length),
      }))
    } else if (imagesList[randomNumber].id !== id || seconds === 0) {
      this.setState({
        seconds: 60,
        isgamestarted: false,
      })
      clearInterval(timerId)
    }
  }

  playAgain = () => {
    clearInterval(this.state.timerId)
    this.setState(
      {
        score: 0,
        seconds: 60,
        refScore: 0,
        isgamestarted: true,
      },
      () => this.startTimer(),
    )
  }

  render() {
    const {score, seconds, randomNumber, isgamestarted, refScore} = this.state
    const {tabsList, imagesList} = this.props
    const upadteImageList = this.getFilteredImages()

    return (
      <div className='bgContainer'>
        <ul className='navigationContainer'>
          <img
            className='matchGameImage'
            src='https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png'
            alt='website logo'
          />
          <div className='scoreAndTimerContainer'>
            <p className='score'>
              Score: <span className='time'>{score}</span>
            </p>
            <img
              className='timerImage'
              src='https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png'
              alt='timer'
            />
            <p className='time'>{seconds} sec</p>
          </div>
        </ul>
        {isgamestarted ? (
          <div className='container'>
            <li className='list'>
              <img
                className='imageUrl'
                src={imagesList[randomNumber].imageUrl}
                alt='match'
              />
            </li>

            <ul className='tabItemsContainer'>
              {tabsList.map(each => (
                <TabItem
                  eachTab={each}
                  key={each.tabId}
                  upadteImageList={this.upadteImageList}
                />
              ))}
            </ul>
            <ul className='itemsContainer'>
              {upadteImageList.map(each => (
                <MatchItem
                  eachItem={each}
                  key={each.id}
                  validate={this.validate}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className='c2'>
            <div className='gameOverContainer'>
              <img
                className='trophyImage'
                src='https://assets.ccbp.in/frontend/react-js/match-game-trophy.png'
                alt='trophy'
              />
              <p>YOUR SCORE</p>
              <p>{refScore}</p>
              <button className='resetButton' onClick={this.playAgain}>
                <img
                  src='https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png'
                  alt='reset'
                />{' '}
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ItemContainer
