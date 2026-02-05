import { useState } from 'react'
import { Link } from 'react-router-dom'
import LOGO from '@p/images/facicon.png'

const MENU_ITEMS = [{ label: '홈', path: '/' }]

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <>
      <header className="h-[48px] px-4 flex items-center justify-between relative z-50 w-full">
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="p-1 rounded-md transition-colors"
            aria-label="메뉴 열기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <span className="ml-[20px] font-bold text-lg">Portfolio Bot</span>
        </div>

        <img src={LOGO} alt="Logo" className="h-8 w-auto object-contain" />
      </header>

      {/* Backdrop for closing menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-[48px] z-30 bg-transparent"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed left-0 top-[48px] bottom-0 w-64 bg-transparent backdrop-blur-[10px] border-r border-[#8d8d8d] transition-transform duration-300 ease-in-out z-40 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {MENU_ITEMS.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block px-4 py-2 rounded-md border-b border-[#00000000] hover:border-[#8d8d8d] transition-colors text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MainHeader
