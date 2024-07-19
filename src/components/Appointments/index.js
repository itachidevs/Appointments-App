import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: new Date(),
    appointments: [],
    isStarButtonClicked: false,
  }

  onsubmitting = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      title,
      date,
      isStarred: false,
      id: uuidv4(),
    }
    this.setState(prevState => ({
      appointments: [...prevState.appointments, newAppointment],
    }))
    this.setState({
      title: '',
      date: '',
    })
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    console.log(event.target.value)
    this.setState({date: event.target.value})
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  starredClik = () => {
    this.setState(prevState => ({
      isStarButtonClicked: !prevState.isStarButtonClicked,
    }))
  }

  render() {
    const {appointments, date, title, isStarButtonClicked} = this.state
    const starButtonClassName = isStarButtonClicked
      ? 'starred-btn'
      : 'star-button'
    const results = isStarButtonClicked
      ? appointments.filter(each => each.isStarred === true)
      : appointments
    return (
      <div className="container">
        <div className="app-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="top-container">
            <form className="input-container" onSubmit={this.onsubmitting}>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                className="input"
                onChange={this.onTitleChange}
                id="title"
                placeholder="Title"
                value={title}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                className="input"
                onChange={this.onDateChange}
                id="date"
                placeholder="dd/mm/yyyy"
                value={date}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointments-img"
              alt="appointments"
            />
          </div>
          <div className="appontments-container">
            <div className="container-head">
              <h1 className="appointments-container-heading">Appointments</h1>
              <button
                className={starButtonClassName}
                type="button"
                onClick={this.starredClik}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list-container">
              {results.map(each => (
                <AppointmentItem
                  appointmentDetails={each}
                  key={each.id}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
