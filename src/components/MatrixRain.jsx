import { useEffect, useRef } from 'react'
import './MatrixRain.css'

const MatrixRain = ({ isPaused = false }) => {
  const canvasRef = useRef(null)
  const isPausedRef = useRef(isPaused)

  // Update the ref whenever isPaused changes
  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      const paused = isPausedRef.current
      
      // Only apply fade effect when not paused
      if (!paused) {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.font = `${fontSize}px monospace`
        
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)]
          
          // Pink/magenta gradient colors
          const colors = ['#ff1493', '#ff69b4', '#da70d6', '#ba55d3', '#9370db']
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
          
          ctx.fillText(text, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }
      // When paused, don't draw anything - keep canvas as is
    }

    const interval = setInterval(draw, 33)

    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain" />
}

export default MatrixRain
