import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ImageModalProps {
  imageUrl: string | null
  onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null)

  useEffect(() => {
    if (imageUrl) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [imageUrl])

  if (!imageUrl) return null

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.05, 4))
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.05, 0.5))

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setZoomLevel(prev => Math.min(prev + 0.05, 4))
    } else {
      setZoomLevel(prev => Math.max(prev - 0.05, 0.5))
    }
  }

  const getDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setLastTouchDistance(getDistance(e.touches))
    } else if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDistance !== null) {
      const currentDistance = getDistance(e.touches)
      const diff = currentDistance - lastTouchDistance
      const zoomChange = diff * 0.01
      setZoomLevel(prev => Math.min(Math.max(prev + zoomChange, 0.5), 4))
      setLastTouchDistance(currentDistance)
    } else if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
    }
  }

  const handleTouchEnd = () => {
    setLastTouchDistance(null)
    setIsDragging(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-9999 bg-[rgba(0,0,0,0.5)] flex overflow-hidden touch-none select-none"
      onClick={onClose}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* Close Button */}
      <button
        className="fixed top-6 right-6 text-white bg-gray-800/70 p-2 rounded-full hover:bg-gray-700 transition-colors z-10000 cursor-pointer"
        onClick={onClose}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Zoom Controls */}
      <div
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-10000 bg-gray-800/80 px-5 py-2 rounded-full border border-gray-600 shadow-lg items-center"
        onClick={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
      >
        <button
          className="text-white hover:text-yellow-400 font-bold w-6 h-6 flex items-center justify-center text-3xl pb-1 cursor-pointer"
          onClick={handleZoomOut}
        >
          -
        </button>
        <span className="text-white flex items-center text-sm font-medium min-w-12 justify-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          className="text-white hover:text-yellow-400 font-bold w-6 h-6 flex items-center justify-center text-2xl pb-1 cursor-pointer"
          onClick={handleZoomIn}
        >
          +
        </button>
      </div>

      {/* Image Wrapper */}
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Zoomed Content"
          className={`rounded-md shadow-2xl transition-transform ${isDragging ? 'duration-0 cursor-grabbing' : 'duration-75 cursor-grab'}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
          draggable={false}
          onClick={e => e.stopPropagation()}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>,
    document.body,
  )
}

export default ImageModal
