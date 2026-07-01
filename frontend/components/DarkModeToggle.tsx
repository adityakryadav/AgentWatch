import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true)

  // On mount, read saved preference (default to dark since the app is dark-first)
  useEffect(() => {
    const saved = localStorage.getItem('agentwatch-theme')
    if (saved === 'light') {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    } else {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('agentwatch-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('agentwatch-theme', 'light')
    }
  }

  return (
    <button
      id="dark-mode-toggle"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      style={{
        background: 'none',
        border: '1.5px solid rgba(255,255,255,0.15)',
        borderRadius: '8px',
        padding: '6px 10px',
        cursor: 'pointer',
        fontSize: '16px',
        lineHeight: 1,
        color: 'inherit',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
