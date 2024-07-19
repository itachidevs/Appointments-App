// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {title, date, isStarred, id} = appointmentDetails
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const formatted = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const onclicking = () => {
    toggleStar(id)
  }
  return (
    <li className="appointment-container">
      <div className="top-content">
        <p className="title">{title}</p>
        <button
          className="star"
          type="button"
          onClick={onclicking}
          data-testid="star"
        >
          <img src={starImage} className="star-image" alt="star" />
        </button>
      </div>
      <p className="date">Date: {formatted}</p>
    </li>
  )
}
export default AppointmentItem
