import React from "react"


const LoadingSpiner = ({tittle}) => {

  return (
    <div className="spinner-container flex w-full  ">
       <p className="text-center mx-auto font-bold">{tittle}</p>
       <div className="loading-spinner mx-auto"></div>
     </div>
  )
}

export default LoadingSpiner

