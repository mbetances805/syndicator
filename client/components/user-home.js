import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import NewProductForm from './newProductForm'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <div className='welcome-message'><h3>Welcome, {email}</h3></div>
      <NewProductForm />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
