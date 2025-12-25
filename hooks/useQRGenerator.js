import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export function useQRGenerator() {
  const [qrType, setQrType] = useState('text')
  const [text, setText] = useState('qrtool.ir')
  const [isDark, setIsDark] = useState(false)
  const [hasQr, setHasQr] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef(null)

  // Design options state
  const [designOptions, setDesignOptions] = useState({
    showDesign: false,
    fgColor: '',
    bgColor: '',
    frame: 'none',
    shape: 'square',
    logo: null
  })

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('qrtool-theme') : null
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    // Default to dark mode if no saved preference
    const initialDark = saved === 'light' ? false : (saved === 'dark' || !saved || prefersDark)
    setIsDark(initialDark)
    if (initialDark) document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    try { localStorage.setItem('qrtool-theme', isDark ? 'dark' : 'light') } catch { }
  }, [isDark])

  const generate = async (value, customDesignOptions = null) => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsGenerating(true)

    // Use custom design options if provided, otherwise use state
    const options = customDesignOptions || designOptions
    const fg = options.fgColor || (isDark ? '#e5e7eb' : '#111827')
    const bg = options.bgColor || (isDark ? '#0b1220' : '#ffffff')

    try {
      await QRCode.toCanvas(canvas, value || text || ' ', {
        margin: 2,
        width: 280,
        color: { dark: fg, light: bg }
      })

      // Apply design customizations
      const ctx = canvas.getContext('2d')
      const size = canvas.width

      // Apply shape mask first
      if (options.shape !== 'square') {
        ctx.save()
        ctx.globalCompositeOperation = 'destination-in'

        if (options.shape === 'rounded') {
          const radius = size * 0.1
          ctx.beginPath()
          ctx.moveTo(radius, 0)
          ctx.lineTo(size - radius, 0)
          ctx.quadraticCurveTo(size, 0, size, radius)
          ctx.lineTo(size, size - radius)
          ctx.quadraticCurveTo(size, size, size - radius, size)
          ctx.lineTo(radius, size)
          ctx.quadraticCurveTo(0, size, 0, size - radius)
          ctx.lineTo(0, radius)
          ctx.quadraticCurveTo(0, 0, radius, 0)
          ctx.closePath()
          ctx.fill()
        } else if (options.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
          ctx.fill()
        }
        ctx.restore()
      }

      // Apply frame after shape mask
      if (options.frame !== 'none') {
        ctx.save()
        ctx.strokeStyle = fg

        // Set line width based on frame type
        let lineWidth = 4
        if (options.frame === 'thick') lineWidth = 8
        else if (options.frame === 'double') lineWidth = 4
        ctx.lineWidth = lineWidth

        // Set dash for dotted
        if (options.frame === 'dotted') {
          ctx.setLineDash([5, 5])
        } else {
          ctx.setLineDash([])
        }

        // Draw frame based on shape
        if (options.shape === 'square') {
          if (options.frame === 'double') {
            ctx.strokeRect(2, 2, size - 4, size - 4)
            ctx.strokeRect(6, 6, size - 12, size - 12)
          } else {
            ctx.strokeRect(0, 0, size, size)
          }
        } else if (options.shape === 'rounded') {
          const radius = size * 0.1
          ctx.beginPath()
          ctx.moveTo(radius, 0)
          ctx.lineTo(size - radius, 0)
          ctx.quadraticCurveTo(size, 0, size, radius)
          ctx.lineTo(size, size - radius)
          ctx.quadraticCurveTo(size, size, size - radius, size)
          ctx.lineTo(radius, size)
          ctx.quadraticCurveTo(0, size, 0, size - radius)
          ctx.lineTo(0, radius)
          ctx.quadraticCurveTo(0, 0, radius, 0)
          ctx.closePath()
          if (options.frame === 'double') {
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(radius + 4, 4)
            ctx.lineTo(size - radius - 4, 4)
            ctx.quadraticCurveTo(size - 4, 4, size - 4, radius + 4)
            ctx.lineTo(size - 4, size - radius - 4)
            ctx.quadraticCurveTo(size - 4, size - 4, size - radius - 4, size - 4)
            ctx.lineTo(radius + 4, size - 4)
            ctx.quadraticCurveTo(4, size - 4, 4, size - radius - 4)
            ctx.lineTo(4, radius + 4)
            ctx.quadraticCurveTo(4, 4, radius + 4, 4)
            ctx.closePath()
            ctx.stroke()
          } else {
            ctx.stroke()
          }
        } else if (options.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(size / 2, size / 2, size / 2 - lineWidth / 2, 0, 2 * Math.PI)
          if (options.frame === 'double') {
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(size / 2, size / 2, size / 2 - lineWidth - 4, 0, 2 * Math.PI)
            ctx.stroke()
          } else {
            ctx.stroke()
          }
        }
        ctx.restore()
      }

      // Add logo
      if (options.logo) {
        await new Promise((resolve) => {
          const logoImg = new Image()
          logoImg.onload = () => {
            const logoSize = size * 0.2
            const logoX = (size - logoSize) / 2
            const logoY = (size - logoSize) / 2

            ctx.save()
            ctx.globalCompositeOperation = 'source-over'
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
            ctx.restore()
            resolve()
          }
          logoImg.src = options.logo
        })
      }

      setHasQr(true)
    } catch (e) {
      setHasQr(false)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'qrtool.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  useEffect(() => {
    // Generate initial QR based on selected type
    if (qrType === 'text') generate(text)
    else if (qrType === 'link') generate('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrType])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      generate()
    }
  }

  return {
    qrType,
    setQrType,
    text,
    setText,
    isDark,
    setIsDark,
    hasQr,
    isGenerating,
    canvasRef,
    designOptions,
    setDesignOptions,
    generate,
    downloadPng,
    onKeyDown
  }
}
