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

  const artworks: Artwork[] = [
    { id: 1, title: 'Цифровая Афродита', type: 'image', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'ИИ интерпретация классической красоты в цифровом пространстве', angle: 0 },
    { id: 2, title: 'Нейронные Сны', type: 'video', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Визуализация работы нейронных сетей в создании искусства', angle: 60 },
    { id: 3, title: 'Квантовая Поэзия', type: 'image', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Абстрактное представление квантовых состояний в искусстве', angle: 120 },
    { id: 4, title: 'Алгоритмическая Душа', type: 'video', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Попытка ИИ понять и выразить человеческие эмоции', angle: 180 },
    { id: 5, title: 'Синтетическая Реальность', type: 'image', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Грань между реальным и созданным искусственным интеллектом', angle: 240 },
    { id: 6, title: 'Электронная Муза', type: 'video', thumbnail: '/img/f81bf97f-7a72-4172-8874-151f5be82c4e.jpg', description: 'Современная интерпретация вдохновения через призму технологий', angle: 300 }
  ]

  useEffect(() => {
    let animationId: number
    const animate = () => {
      setRotation(prev => prev + 0.2)
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
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
    <div className="min-h-screen overflow-hidden relative" style={{background: 'transparent'}}>
      {/* Floating Hair Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes gentle-sway {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(5px); }
        }
        @keyframes halo-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>

      {/* Main Portrait - Full Screen */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src="https://cdn.poehali.dev/files/7d52a643-f7e3-4c19-a573-1c6901691332.jpeg" 
            alt="AI Artist Portrait" 
            className="w-auto h-full max-w-none object-cover transition-all duration-700 ease-out"
            style={{
              filter: 'brightness(1.05) contrast(1.02) saturate(1.1)',
              transform: `scale(${isHovered ? 1.02 : 1})`,
            }}
          />
          
          {/* Floating Hair Strands */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-b from-amber-300 via-amber-200 to-transparent opacity-40 rounded-full"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${80 + Math.random() * 120}px`,
                  left: `${15 + Math.random() * 70}%`,
                  top: `${5 + Math.random() * 40}%`,
                  transform: `rotate(${-30 + Math.random() * 60}deg)`,
                  animation: `float ${4 + Math.random() * 3}s ease-in-out infinite, gentle-sway ${6 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s, ${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          {/* Interactive Eyes */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              ref={eyeRef}
              className="absolute w-3 h-3 bg-blue-600/60 rounded-full transition-all duration-300 shadow-lg"
              style={{
                left: `${43}%`,
                top: `${38}%`,
                transform: `scale(${isHovered ? 1.3 : 1})`,
                boxShadow: isHovered ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none'
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1 animate-pulse" />
            </div>
            <div 
              className="absolute w-3 h-3 bg-blue-600/60 rounded-full transition-all duration-300 shadow-lg"
              style={{
                left: `${57}%`,
                top: `${38}%`,
                transform: `scale(${isHovered ? 1.3 : 1})`,
                boxShadow: isHovered ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none'
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1 animate-pulse" />
            </div>
            
            {/* Mouth */}
            <div 
              className="absolute border-2 border-pink-400/50 rounded-full transition-all duration-500"
              style={{
                width: isHovered ? '20px' : '16px',
                height: isHovered ? '12px' : '8px',
                left: `${50}%`,
                top: `${52}%`,
                transform: 'translate(-50%, -50%)',
                borderColor: isHovered ? 'rgba(244, 114, 182, 0.8)' : 'rgba(244, 114, 182, 0.5)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Halo Rotating Artworks */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-screen h-screen">
          {artworks.map((artwork) => {
            const angle = (artwork.angle + rotation) * (Math.PI / 180)
            const radiusX = Math.min(window.innerWidth, window.innerHeight) * 0.35
            const radiusY = Math.min(window.innerWidth, window.innerHeight) * 0.25
            const x = Math.cos(angle) * radiusX
            const y = Math.sin(angle) * radiusY - window.innerHeight * 0.12
            
            return (
              <div
                key={artwork.id}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-500 cursor-pointer"
                style={{
                  left: `50%`,
                  top: `30%`,
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rotation * 0.3}deg)`,
                  zIndex: 10
                }}
                onClick={() => setSelectedArtwork(artwork)}
              >
                {/* Halo glow effect */}
                <div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 -z-10 scale-125 blur-md"
                  style={{
                    animation: 'halo-glow 3s ease-in-out infinite'
                  }}
                />
                
                <Card className="w-20 h-20 overflow-hidden border-2 border-gray-200 hover:border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm will-change-transform">
                  <img 
                    src={artwork.thumbnail} 
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {artwork.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Icon name="Play" size={20} className="text-white drop-shadow-lg" />
                    </div>
                  )}
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h1 className="text-6xl font-bold text-gray-800 mb-2 font-serif tracking-wide drop-shadow-sm">
          НЕЙРОННАЯ ГАЛЕРЕЯ
        </h1>
        <p className="text-xl text-gray-600 font-light">
          Цифровое искусство будущего
        </p>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="max-w-4xl bg-white border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-800">
              {selectedArtwork?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedArtwork?.type === 'video' ? (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                <Icon name="Play" size={64} className="text-gray-400" />
                <span className="ml-4 text-gray-600 text-lg">Видео контент</span>
              </div>
            ) : (
              <img 
                src={selectedArtwork?.thumbnail} 
                alt={selectedArtwork?.title}
                className="w-full h-96 object-cover rounded-lg border-2 border-gray-200"
              />
            )}
            <p className="text-gray-700 text-lg leading-relaxed">
              {selectedArtwork?.description}
            </p>
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
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