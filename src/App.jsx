import { useState, useEffect } from 'react'
import { IoPause, IoPlay } from 'react-icons/io5'
import MatrixRain from './components/MatrixRain'
import Countdown from './components/Countdown'
import PixelText from './components/PixelText'
import HeartFinale from './components/HeartFinale'
import './App.css'

function App() {
  const [stage, setStage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return // Don't progress if paused

    const timings = [
      3000,  // Stage 0: Matrix rain
      1500,  // Stage 1: Countdown 3
      1500,  // Stage 2: Countdown 2
      1500,  // Stage 3: Countdown 1
      2000,  // Stage 4: "Selamat"
      2000,  // Stage 5: "Tahun"
      2000,  // Stage 6: "Baru"
      2500,  // Stage 7: "Sayanggg"
      5000,  // Stage 8: Heart with text
    ]

    if (stage < timings.length) {
      const timer = setTimeout(() => {
        setStage(stage + 1)
      }, timings[stage])

      return () => clearTimeout(timer)
    } else {
      // Loop back to beginning
      const resetTimer = setTimeout(() => {
        setStage(0)
      }, 2000)
      return () => clearTimeout(resetTimer)
    }
  }, [stage, isPaused])

  return (
    <div className={`app ${isPaused ? 'paused' : ''}`}>
      <MatrixRain isPaused={isPaused} />
      
      {stage === 1 && <Countdown number={3} isPaused={isPaused} />}
      {stage === 2 && <Countdown number={2} isPaused={isPaused} />}
      {stage === 3 && <Countdown number={1} isPaused={isPaused} />}
      
      {stage === 4 && <PixelText text="Selamat" isPaused={isPaused} />}
      {stage === 5 && <PixelText text="Tahun" isPaused={isPaused} />}
      {stage === 6 && <PixelText text="Baru" isPaused={isPaused} />}
      {stage === 7 && <PixelText text="Sayanggg" isPaused={isPaused} />}
      
      {stage === 8 && <HeartFinale isPaused={isPaused} />}

      {/* Play/Pause Button */}
      <button 
        className="control-button"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? 'Play animation' : 'Pause animation'}
      >
        {isPaused ? <IoPlay /> : <IoPause />}
      </button>
    </div>
  )
}

export default App
