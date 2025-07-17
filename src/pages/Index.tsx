import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'

interface Artwork {
  id: number
  title: string
  type: 'image' | 'video'
  thumbnail: string
  description: string
  angle: number
}

const Index = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [rotation, setRotation] = useState(0)
  const eyeRef = useRef<HTMLDivElement>(null)
  const mouthRef = useRef<HTMLDivElement>(null)

  const artworks: Artwork[] = [
    { id: 1, title: 'Цифровая Афродита', type: 'image', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'ИИ интерпретация классической красоты в цифровом пространстве', angle: 0 },
    { id: 2, title: 'Нейронные Сны', type: 'video', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Визуализация работы нейронных сетей в создании искусства', angle: 60 },
    { id: 3, title: 'Квантовая Поэзия', type: 'image', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Абстрактное представление квантовых состояний в искусстве', angle: 120 },
    { id: 4, title: 'Алгоритмическая Душа', type: 'video', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Попытка ИИ понять и выразить человеческие эмоции', angle: 180 },
    { id: 5, title: 'Синтетическая Реальность', type: 'image', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Грань между реальным и созданным искусственным интеллектом', angle: 240 },
    { id: 6, title: 'Электронная Муза', type: 'video', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Современная интерпретация вдохновения через призму технологий', angle: 300 }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (eyeRef.current && isHovered) {
      const rect = e.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
      const rotationAngle = (angle * 180) / Math.PI
      eyeRef.current.style.transform = `rotate(${rotationAngle}deg)`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Main Portrait */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-96 h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl hover:scale-105 transition-all duration-500">
          <img 
            src="/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg" 
            alt="AI Artist Portrait" 
            className="w-full h-full object-cover opacity-90"
          />
          
          {/* Eyes */}
          <div ref={eyeRef} className="absolute top-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full transition-all duration-200">
            <div className={`w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
          </div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full transition-all duration-200">
            <div className={`w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
          </div>
          
          {/* Mouth */}
          <div ref={mouthRef} className={`absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-4 h-2 border-2 border-pink-300 rounded-full transition-all duration-300 ${isHovered ? 'h-4 border-pink-400' : ''}`} />
        </div>
      </div>

      {/* Rotating Artworks */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px]">
          {artworks.map((artwork) => {
            const angle = (artwork.angle + rotation) * (Math.PI / 180)
            const radius = 250
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            
            return (
              <div
                key={artwork.id}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300 cursor-pointer"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
                }}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <Card className="w-16 h-16 overflow-hidden border-2 border-white/30 hover:border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
                  <img 
                    src={artwork.thumbnail} 
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  {artwork.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Icon name="Play" size={16} className="text-white" />
                    </div>
                  )}
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 font-mono tracking-wider">
          НЕЙРОННАЯ ГАЛЕРЕЯ
        </h1>
        <p className="text-lg text-white/80 font-light">
          Цифровое искусство будущего
        </p>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="max-w-4xl bg-slate-800 border-white/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {selectedArtwork?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedArtwork?.type === 'video' ? (
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <Icon name="Play" size={64} className="text-white/50" />
                <span className="ml-4 text-white/70">Видео контент</span>
              </div>
            ) : (
              <img 
                src={selectedArtwork?.thumbnail} 
                alt={selectedArtwork?.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            )}
            <p className="text-white/80 text-lg leading-relaxed">
              {selectedArtwork?.description}
            </p>
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setSelectedArtwork(null)}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default Index;