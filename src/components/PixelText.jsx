import { useEffect, useState } from 'react'
import './PixelText.css'

const PixelText = ({ text, isPaused = false }) => {
  const [pixels, setPixels] = useState([])

  useEffect(() => {
    // Create pixels for text
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // Responsive font size
    let fontSize
    const width = window.innerWidth
    if (width <= 360) {
      fontSize = text.length > 15 ? 40 : 50
    } else if (width <= 480) {
      fontSize = text.length > 15 ? 50 : 60
    } else if (width <= 768) {
      fontSize = text.length > 15 ? 70 : 85
    } else {
      fontSize = text.length > 15 ? 100 : 120
    }
    
    ctx.font = `bold ${fontSize}px Arial`
    const metrics = ctx.measureText(text)
    
    canvas.width = metrics.width + 40
    canvas.height = fontSize + 40
    
    ctx.font = `bold ${fontSize}px Arial`
    ctx.fillStyle = 'white'
    ctx.textBaseline = 'top'
    ctx.fillText(text, 20, 20)
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newPixels = []
    
    const step = 6 // Sample every 6th pixel for better performance
    
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4
        const alpha = imageData.data[index + 3]
        
        if (alpha > 128) {
          newPixels.push({
            x: x - canvas.width / 2,
            y: y - canvas.height / 2,
            delay: Math.random() * 0.4,
          })
        }
      }
    }
    
    setPixels(newPixels)
  }, [text])

  return (
    <div className="pixel-text">
      {pixels.map((pixel, index) => (
        <div
          key={index}
          className={`text-pixel ${isPaused ? 'paused' : ''}`}
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

export default PixelText
