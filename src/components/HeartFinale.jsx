import { useEffect, useState } from 'react'
import { IoMdHeart } from 'react-icons/io'
import './HeartFinale.css'

const HeartFinale = ({ isPaused = false }) => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    // Generate heart-shaped pattern with emoji hearts
    const generateHeartEmojis = () => {
      const newHearts = []
      const numHearts = 80
      
      for (let i = 0; i < numHearts; i++) {
        const t = (i / numHearts) * Math.PI * 2
        
        // Heart shape formula
        const x = 16 * Math.pow(Math.sin(t), 3)
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        
        newHearts.push({
          x: x * 25,
          y: y * 25,
          delay: Math.random() * 1.5,
          duration: 2 + Math.random() * 2,
          size: 35 + Math.random() * 25,
        })
      }
      
      setHearts(newHearts)
    }

    generateHeartEmojis()
  }, [])

  return (
    <div className="heart-finale">
      <div className="heart-container">
        {hearts.map((heart, index) => (
          <IoMdHeart
            key={index}
            className={`heart-emoji ${isPaused ? 'paused' : ''}`}
            style={{
              left: `calc(50% + ${heart.x}px)`,
              top: `calc(50% + ${heart.y}px)`,
              fontSize: `${heart.size}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          />
        ))}
        
        <div className={`love-text ${isPaused ? 'paused' : ''}`}>
          Love you <IoMdHeart className="heart-icon" />numaa<IoMdHeart className="heart-icon" />
        </div>
      </div>
    </div>
  )
}

export default HeartFinale
