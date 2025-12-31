import { useEffect, useState } from 'react'
import './Countdown.css'

const Countdown = ({ number, isPaused = false }) => {
  const [pixels, setPixels] = useState([])

  useEffect(() => {
    // Generate pixel positions for the number
    const generatePixels = () => {
      const newPixels = []
      const pixelSize = 12
      const spacing = 4 // spacing multiplier
      
      // Define number patterns (simplified)
      const patterns = {
        3: [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [0,0,0,1,0],
          [0,0,1,0,0],
          [0,0,0,1,0],
          [1,0,0,0,1],
          [0,1,1,1,0],
        ],
        2: [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [0,0,0,0,1],
          [0,0,0,1,0],
          [0,0,1,0,0],
          [0,1,0,0,0],
          [1,1,1,1,1],
        ],
        1: [
          [0,0,1,0,0],
          [0,1,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,1,1,1,0],
        ],
      }

      const pattern = patterns[number]
      const patternWidth = pattern[0].length * pixelSize * spacing
      const patternHeight = pattern.length * pixelSize * spacing
      const offsetX = -patternWidth / 2
      const offsetY = -patternHeight / 2

      pattern.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell === 1) {
            newPixels.push({
              x: x * pixelSize * spacing + offsetX + (pixelSize * spacing / 2),
              y: y * pixelSize * spacing + offsetY + (pixelSize * spacing / 2),
              delay: Math.random() * 0.5,
            })
          }
        })
      })

      setPixels(newPixels)
    }

    generatePixels()
  }, [number])

  return (
    <div className="countdown">
      {pixels.map((pixel, index) => (
        <div
          key={index}
          className={`pixel ${isPaused ? 'paused' : ''}`}
          style={{
            left: `calc(50% + ${pixel.x}px)`,
            top: `calc(50% + ${pixel.y}px)`,
            animationDelay: `${pixel.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Countdown
