import ChatBottonBar from "./ChatBottonBar"
import MessageList from "./MessageList"
import ChatTopBar from "./ChatTopBar"

function MessageContainer() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopBar />
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <MessageList />
        <ChatBottonBar />
      </div>
    </div>
  )
}

export default MessageContainer
