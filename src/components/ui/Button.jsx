import React from 'react'
import cn from 'classnames'

function Button({ onClick, children, className }) {
  return (
    <div className={cn('w-[343px] h-[52px] rounded-[8px] text-white flex justify-between items-center gap-4 border-none px-4', className)} style={{background: '#25c73d'}} onClick={onClick}>
      <p className='font-sans font-semibold text-white '>{children}</p>
      <img src="/icons/buttonArrows.png" alt="" className='w-[39px]' />
    </div>
  )
}

export default Button
