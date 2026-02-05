import { HYPER_MENU_ITEMS } from '@/constant'
import { useState } from 'react'

const Home = () => {
  const [chatInput, setChatInput] = useState('')

  const onClickHyperMenuItem = (input: string) => {
    callApi(input)
  }

  const callApi = (input?: string) => {
    if (!input) return
  }

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-baseline justify-baseline max-w-[600px] w-full">
          <h1 className="text-3xl font-bold mb-10">안녕하세요. 반갑습니다..</h1>
          {/* 버튼들 */}
          <div className="flex flex-wrap gap-4">
            {HYPER_MENU_ITEMS.map(item => (
              <button
                key={item.input}
                className="flex items-center border cursor-pointer border-[#8d8d8d57] rounded-md px-2 py-1"
                onClick={() => onClickHyperMenuItem(item.input)}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.input}</span>
              </button>
            ))}
          </div>
          {/*인풋 */}
          <div className="flex items-center flex-col justify-center mt-10 w-full p-4 backdrop-blur-[10px] h-[140px] rounded-[20px] bg-[#1e1f20] overflow-hidden">
            <textarea
              className="flex-1 w-full bg-transparent resize-none outline-none text-white h-full"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  e.preventDefault() // Prevent new line on Enter
                  callApi(chatInput)
                }
              }}
            />
            <div className="flex gap-2 w-full items-center justify-end">
              <p className="text-sm text-[#b1b1b1]">사용 모델</p>
              {/* <button className="px-2 py-1 w-[80px] font-semibold cursor-pointer rounded-md bg-[#0666d4]">
                전송
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
