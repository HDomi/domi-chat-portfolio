import React from 'react'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      {/* Overlay click to cancel */}
      <div className="absolute inset-0" onClick={onCancel} />

      {/* Modal Content */}
      <div className="relative bg-[#2a2b2e] border border-gray-700 rounded-xl p-5 md:p-6 w-[90%] max-w-sm shadow-xl transform transition-all animate-scale-in">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">{message}</p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/20"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
