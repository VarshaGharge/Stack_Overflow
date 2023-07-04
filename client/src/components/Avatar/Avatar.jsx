import React from 'react'

const Avatar = ({ children, backgroundColor, fontWeight, px, py, color, borderRadius, fontSize, cursor, height }) => {
  const style = {
    height,
    backgroundColor,
    fontWeight,
    padding: `${py} ${px}` ,
    color: color || 'black',
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration: 'none'
  }
  return (
    <div style={ style }>
      { children }
    </div>
  )
}

export default Avatar
