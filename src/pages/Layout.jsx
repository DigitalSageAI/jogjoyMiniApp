import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomMenu from '../components/shared/BottomMenu'

function Layout() {
    return (
      <div className="flex flex-col justify-start items-center w-[100%] h-[100%]">
          <div className="flex flex-col w-full overflow-auto" style={{ height: "calc(100% - 67px)" }}>
              <Outlet />
          </div>
          <BottomMenu />
      </div>
    )
  }
  

export default Layout