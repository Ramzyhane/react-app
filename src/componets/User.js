import React from 'react'
import g from 'geodist'

const User = (props) => {
  console.log(props);
  //Code
  const dist = g({
    lat: props.user.address.geo.lat,
    lon: props.user.address.geo.lng},
    {
      lat: 31.25091982190628,
      lon: 34.79060897876562
    })
    
  return (
    <li class="list-group-item d-flex justify-content-between align-items-start c6 ">
    <div class="ms-2 me-auto ">
      <div class="fw-bold c4">{props.user.name}</div>
       {props.user.username} | {props.user.email} 
    </div>
    <span class="badge bg-primary rounded-pill">{dist}Km</span>
  </li>
  )
}

export default User