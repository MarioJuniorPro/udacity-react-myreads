import loader from '../icons/loader.svg'

import React from 'react'

export default function Loader(prop){
  return (
    prop.show ? (
      <div className="loader">
        <img src={loader} alt="loading" className="loader-icon"/>
      </div>
    ) : null
  )
}
