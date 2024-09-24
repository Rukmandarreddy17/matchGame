import './index.css'

const TabItem = props => {
  const {eachTab, upadteImageList} = props
  const {tabId, displayText} = eachTab

  const selectTab = () => {
    upadteImageList(tabId)
  }

  return (
    <li className="tabItem">
      <button className="tabButton" onClick={selectTab}>
        {' '}
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
