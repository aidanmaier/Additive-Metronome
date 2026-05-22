import { useEffect, useState } from 'react'

export default function Clock() {
  const [isRed, setIsRed] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsRed((prev) => !prev)
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div
      style={{
        width: '120px',
        height: '120px',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isRed ? 'red' : '#222',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 700,
        transition: 'background-color 0.25s ease',
      }}
    >
      {isRed ? 'RED' : 'WAIT'}
    </div>
  )
}
