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
    const initialDark = saved === 'dark' || (!saved && prefersDark)
    setIsDark(initialDark)
    if (initialDark) document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    try { localStorage.setItem('qrtool-theme', isDark ? 'dark' : 'light') } catch {}
  }, [isDark])

  const generate = async (value) => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsGenerating(true)

    // Use design options or fallback to theme colors
    const fg = designOptions.fgColor || (isDark ? '#e5e7eb' : '#111827')
    const bg = designOptions.bgColor || (isDark ? '#0b1220' : '#ffffff')

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
      if (designOptions.shape !== 'square') {
        ctx.save()
        ctx.globalCompositeOperation = 'destination-in'

        if (designOptions.shape === 'rounded') {
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
        } else if (designOptions.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
          ctx.fill()
        }
        ctx.restore()
      }

      // Apply frame after shape mask
      if (designOptions.frame !== 'none') {
        ctx.save()
        ctx.strokeStyle = fg

        // Set line width based on frame type
        let lineWidth = 4
        if (designOptions.frame === 'thick') lineWidth = 8
        else if (designOptions.frame === 'double') lineWidth = 4
        ctx.lineWidth = lineWidth

        // Set dash for dotted
        if (designOptions.frame === 'dotted') {
          ctx.setLineDash([5, 5])
        } else {
          ctx.setLineDash([])
        }

        // Draw frame based on shape
        if (designOptions.shape === 'square') {
          if (designOptions.frame === 'double') {
            ctx.strokeRect(2, 2, size - 4, size - 4)
            ctx.strokeRect(6, 6, size - 12, size - 12)
          } else {
            ctx.strokeRect(0, 0, size, size)
          }
        } else if (designOptions.shape === 'rounded') {
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
          if (designOptions.frame === 'double') {
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
        } else if (designOptions.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(size / 2, size / 2, size / 2 - lineWidth / 2, 0, 2 * Math.PI)
          if (designOptions.frame === 'double') {
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
      if (designOptions.logo) {
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
          logoImg.src = designOptions.logo
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
