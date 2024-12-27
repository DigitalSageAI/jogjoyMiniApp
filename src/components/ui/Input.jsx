import React from 'react'
import cn from 'classnames'

function Input({ className, placeholder, onChange, value }) {
  return (
    <input 
        type="text"
        onChange={onChange}
        className={cn('rounded-[8px] w-[342px] h-[58px] focus:outline-none px-[17px] placeholder:text-middleGray', className)}
        value={value}
        placeholder={placeholder}
        style={{background: "rgba(118, 118, 128, 0.24)", color: 'white', border: '1px solid rgba(84, 84, 88, 0.65)'}}
    />
        
  )
}

export default Input
