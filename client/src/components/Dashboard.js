import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import { ConversationsContext } from '../context/ConversationsProvider';

export default function Dashboard({id}) {
  const { selectedConversation } = useContext(ConversationsContext);
  // console.log(selectedConversation)
  return (
    <div style={{height: '100vh'}}  className='d-flex'>
      <Sidebar id={id}/>
      {selectedConversation && <OpenConversation/>}
    </div>
  )
}
