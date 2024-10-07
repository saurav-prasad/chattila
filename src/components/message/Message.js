import React from 'react'
import MessageHeader from '../messageHeader/MessageHeader'
import MessageTypeBox from '../messageType/MessageTypeBox'
import MessageBox from '../messageBox/MessageBox'
import './message.css'
import { useParams } from 'react-router-dom'

function Message() {
  const params = useParams()
  const windowWidth = window.innerWidth

  return (
    <div className={`md:flex-[5] message w-full h-full ${(!params.userid && windowWidth <= 768) && 'hidden'} flex flex-col justify-between items-center z-[5]`}>
      <div className='backgroundImage'></div>
      {params.userid && <>
        <MessageHeader />
        <MessageBox />
        <MessageTypeBox />
      </>}
    </div>
  )
}

export default Message