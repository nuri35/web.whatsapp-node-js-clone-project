import React from 'react'
import "./SidebarChat.css"
import {Avatar,IconButton} from "@material-ui/core"
import "./SidebarChat.css"

function SidebarChat() {
  return (
    <div className='SidebarChat'>

<Avatar src="https://joeschmoe.io/api/v1/random" />
<div className='sidebarChat__info'>
<h2>Hasan yılmaz</h2>
<p>nasıl oldun kardesim</p>
</div>
    </div>
  )
}

export default SidebarChat