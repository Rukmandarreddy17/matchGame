import './index.css'

const MatchItem = props => {
  const {eachItem, validate} = props
  const {category, id, thumbnailUrl} = eachItem

  const checkImage = () => {
    validate(id)
  }

  return (
    <li className="listItem" onClick={checkImage}>
      <button className="tabButton">
        <img className="image" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}
export default MatchItem
