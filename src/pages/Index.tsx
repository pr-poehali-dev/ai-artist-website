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
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Main Portrait - Full Screen */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full">
          <img 
            src="https://cdn.poehali.dev/files/7d52a643-f7e3-4c19-a573-1c6901691332.jpeg" 
            alt="AI Artist Portrait" 
            className="w-full h-full object-cover object-center"
          />
          
          {/* Interactive overlay for eye tracking */}
          <div className="absolute inset-0" />
        </div>
      </div>

      {/* Halo/Nimbus Rotating Artworks */}
      <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center pointer-events-none pt-16">
        <div className="relative w-[400px] h-[200px]">
          {artworks.map((artwork) => {
            // Elliptical halo path above the head
            const angle = (artwork.angle + rotation) * (Math.PI / 180)
            const radiusX = 180 // horizontal radius
            const radiusY = 60  // vertical radius (flattened ellipse)
            const x = Math.cos(angle) * radiusX
            const y = Math.sin(angle) * radiusY * 0.3 // flatten even more for halo effect
            
            return (
              <div
                key={artwork.id}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300 cursor-pointer"
                style={{
                  left: `50%`,
                  top: `30%`,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
                }}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <Card className="w-12 h-12 overflow-hidden border-2 border-gray-300 hover:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90">
                  <img 
                    src={artwork.thumbnail} 
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  {artwork.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Icon name="Play" size={12} className="text-white" />
                    </div>
                  )}
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-8 text-left">
        <h1 className="text-3xl font-bold text-gray-800 mb-1 font-serif">
          НЕЙРОННАЯ ГАЛЕРЕЯ
        </h1>
        <p className="text-lg text-gray-600 font-light">
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