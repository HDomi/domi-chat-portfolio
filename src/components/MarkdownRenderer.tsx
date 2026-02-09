import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // 표(Table) 지원 플러그인
        components={{
          // 1. 표 스타일링 (Tailwind CSS)
          table: props => (
            <div className="overflow-x-auto my-4 border rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200" {...props} />
            </div>
          ),
          thead: props => <thead className="bg-[#3a3b3e]" {...props} />,
          th: props => (
            <th
              className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              {...props}
            />
          ),
          td: props => (
            <td
              className="px-3 py-2 whitespace-nowrap text-sm text-gray-300 border-t border-gray-600"
              {...props}
            />
          ),

          // 2. 링크 스타일링
          a: props => (
            <a
              className="text-yellow-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // 3. 리스트 스타일링
          ul: props => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,

          // 4. 인용문 스타일링
          blockquote: props => (
            <blockquote
              className="border-l-4 border-blue-500 pl-4 italic my-2 text-gray-400"
              {...props}
            />
          ),

          // 5. 기본 텍스트 스타일링 (다크모드 대응)
          p: props => <p className="text-gray-200 leading-relaxed mb-4" {...props} />,
          strong: props => <strong className="font-bold text-white" {...props} />,

          // 6. 헤더 스타일링
          h1: props => (
            <h1
              className="text-2xl font-bold text-white mt-6 mb-4 border-b border-gray-700 pb-2"
              {...props}
            />
          ),
          h2: props => <h2 className="text-xl font-bold text-gray-100 mt-5 mb-3" {...props} />,
          h3: props => <h3 className="text-lg font-semibold text-gray-200 mt-4 mb-2" {...props} />,

          // 7. 리스트 스타일링 (ol, li 추가)
          ol: props => (
            <ol className="list-decimal list-inside space-y-1 my-2 text-gray-300" {...props} />
          ),
          li: props => <li className="pl-1" {...props} />,

          // 8. 코드 블록 스타일링
          code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match && !String(children).includes('\n')

            return isInline ? (
              <code
                className="bg-gray-700 text-yellow-300 px-1 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            ) : (
              <div className="relative my-4 rounded-lg overflow-hidden bg-[#1e1e1e] border border-gray-700">
                {match && (
                  <div className="bg-[#2a2b2e] px-4 py-1 text-xs text-gray-400 border-b border-gray-700 font-mono">
                    {match[1]}
                  </div>
                )}
                <pre className="p-4 overflow-x-auto text-sm text-gray-200 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                  <code className={`font-mono ${className}`} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            )
          },

          // 9. 구분선
          hr: props => <hr className="my-6 border-gray-600" {...props} />,

          // 10. 이미지
          img: props => (
            <img
              className="max-w-full h-auto rounded-lg my-4 border border-gray-700"
              alt={props.alt || ''}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
