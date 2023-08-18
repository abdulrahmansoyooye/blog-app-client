import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Error = ({message}) => {
  return (
    <div className="error-message">
    <ErrorOutlineIcon />
    <p>{message}</p>
  </div>
  )
}

export default Error
