import loader from '../icons/loader.svg'

import React from 'react'

export default () => {
  return (
    <div className="loader">
      <img src={loader} alt="loading" className="loader-icon"/>
    </div>
  )
}
