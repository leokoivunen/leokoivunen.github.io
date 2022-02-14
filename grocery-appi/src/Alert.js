import React, { useEffect } from 'react'

const Alert = ({type, message, removeAlert }) => {
  useEffect(() => {
    // Callback function
    const timeout = setTimeout(() => {
      // Remove alert after 3000 ms
      removeAlert()
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])
  return <p className={`alert alert-${type}`}>{message}</p>
}

export default Alert
