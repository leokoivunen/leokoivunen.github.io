import React, { useEffect } from 'react'

const Alert = ({type, message, removeAlert, list }) => {
  useEffect(() => {
    // Callback function
    const timeout = setTimeout(() => {
      // Remove alert after 3000 ms
      removeAlert()
    }, 3000)
    return () => {
      clearTimeout(timeout)
    }
  }, [list])
  return <p className={`alert alert-${type}`}>{message}</p>
}

export default Alert
