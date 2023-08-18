import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const Success = ({message}) => {
  return (
    <div className="success-message">
    <CheckCircleOutlineIcon />
    <p>{message}</p>
  </div>
  )
}

export default Success
