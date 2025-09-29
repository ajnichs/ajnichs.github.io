import { useEffect, useRef, useState } from 'react'

// (removed legacy heart cache)

// ASCII renderer supporting multiple simple 3D shapes and auto-fit behavior.
// Props:
// - cols, rows: manual sizing (ignored when fill=true)
// - fill: boolean, if true the component measures container and fills available width
// - speed: animation speed multiplier
// - shape: 'donut' | 'pyramid' | 'cube'
export default function Ascii3D({ cols = 48, rows = 20, fill = false, speed = 1, shape = 'donut', className = '' }) {
  const elRef = useRef(null)
  const rafRef = useRef(null)
  const [size, setSize] = useState({ cols, rows })

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // measure char size helper
    const measureChar = () => {
      const span = document.createElement('span')
      span.innerText = 'M'
      span.style.font = getComputedStyle(el).font
      span.style.visibility = 'hidden'
      el.appendChild(span)
      const rect = span.getBoundingClientRect()
      el.removeChild(span)
      return { w: rect.width || 8, h: rect.height || 14 }
    }

    let localCols = cols
    let localRows = rows

    if (fill) {
      const ro = new ResizeObserver(() => {
        const { w, h } = measureChar()
        const availableW = el.clientWidth || el.parentElement?.clientWidth || 300
        const availableH = el.clientHeight || el.parentElement?.clientHeight || Math.floor(availableW * 0.33)
        localCols = Math.max(20, Math.floor(availableW / Math.max(1, w)))
        localRows = Math.max(6, Math.floor(availableH / Math.max(1, h)))
        setSize({ cols: localCols, rows: localRows })
      })
      ro.observe(el)
      // initial measurement
      const { w, h } = measureChar()
      const availableW = el.clientWidth || el.parentElement?.clientWidth || 300
      const availableH = el.clientHeight || el.parentElement?.clientHeight || Math.floor(availableW * 0.33)
      localCols = Math.max(20, Math.floor(availableW / Math.max(1, w)))
      localRows = Math.max(6, Math.floor(availableH / Math.max(1, h)))
      setSize({ cols: localCols, rows: localRows })

      return () => ro.disconnect()
    } else {
      setSize({ cols, rows })
    }
  }, [fill, cols, rows])

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const shades = '.,-~:;=!*#$@'

    const renderDonut = (A, B, C, Rcols, Rrows) => {
      const output = []
      const z = new Array(Rcols * Rrows).fill(0)
      const screen = new Array(Rcols * Rrows).fill(' ')

      for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
          const sinA = Math.sin(A), cosA = Math.cos(A)
          const sinB = Math.sin(B), cosB = Math.cos(B)
          const sinI = Math.sin(i), cosI = Math.cos(i)
          const sinJ = Math.sin(j), cosJ = Math.cos(j)
          const h = cosI + 2
          const D = 1 / (sinJ * h * sinA + sinI * cosA + 5)
          const t = sinJ * h * cosA - sinI * sinA
          const x = Math.floor((Rcols / 2) + 30 * D * (cosJ * h * cosB - t * sinB))
          const y = Math.floor((Rrows / 2) + 15 * D * (cosJ * h * sinB + t * cosB))
          const o = x + Rcols * y
          const L = Math.floor((shades.length - 1) * Math.max(0, (cosI * cosJ * sinB - cosI * sinJ * cosB - sinI * cosA)))
          if (y >= 0 && y < Rrows && x >= 0 && x < Rcols && D > z[o]) {
            z[o] = D
            screen[o] = shades[Math.max(0, Math.min(shades.length - 1, L))]
          }
        }
      }
      for (let r = 0; r < Rrows; r++) output.push(screen.slice(r * Rcols, (r + 1) * Rcols).join(''))
      el.innerText = output.join('\n')
    }

    const renderPyramid2D = (A, B, Rcols, Rrows) => {
      // simple 2D pyramid-ish silhouette fallback; rotates sampling for motion
      const cosA = Math.cos(A)
      const sinA = Math.sin(A)
      const out = []
      for (let y = 0; y < Rrows; y++) {
        let row = ''
        for (let x = 0; x < Rcols; x++) {
          const nx = (x / (Rcols - 1)) * 2 - 1
          const ny = (y / (Rrows - 1)) * 2 - 1
          const rx = nx * cosA - ny * sinA
          const ry = nx * sinA + ny * cosA
          // pyramid silhouette approximate: linear pyramid function
          const h = 1 - Math.max(Math.abs(rx), Math.abs(ry)) * 1.4
          if (h > 0) {
            const shadeIdx = Math.floor((shades.length - 1) * Math.max(0, Math.min(1, h)))
            row += shades[shadeIdx]
          } else row += ' '
        }
        out.push(row)
      }
      el.innerText = out.join('\n')
    }

    const renderPyramid3D = (A, B, Rcols, Rrows) => {
      // 3D pyramid (square base + apex) rendered by projecting faces and z-buffering
      const verts = [
        [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1], // base
        [0, 1, 0] // apex
      ]
      const faces = [
        [0,1,2,3], // base (as quad)
        [0,1,4], [1,2,4], [2,3,4], [3,0,4] // sides
      ]

      const cosA = Math.cos(A), sinA = Math.sin(A)
      const cosB = Math.cos(B), sinB = Math.sin(B)
      const scale = Math.min(Rcols / 3, Rrows / 2.2)

      const zbuf = new Array(Rcols * Rrows).fill(-Infinity)
      const screen = new Array(Rcols * Rrows).fill(' ')

      const rot = (v) => {
        const [x0,y0,z0] = v
        const x1 = x0 * cosA + z0 * sinA
        const z1 = -x0 * sinA + z0 * cosA
        const y1 = y0 * cosB - z1 * sinB
        const z2 = y0 * sinB + z1 * cosB
        return [x1, y1, z2]
      }

      // project all verts
      const pts = verts.map(rot)
      const proj = pts.map(([x,y,z]) => [Math.floor(Rcols/2 + x*scale), Math.floor(Rrows/2 - y*scale), z])

      // draw faces (triangulate quads)
      const triangles = []
      for (const f of faces) {
        if (f.length === 4) triangles.push([f[0],f[1],f[2]]), triangles.push([f[0],f[2],f[3]])
        else triangles.push(f)
      }

      for (const tri of triangles) {
        const [a,b,c] = tri
        const [x1,y1,z1] = proj[a]
        const [x2,y2,z2] = proj[b]
        const [x3,y3,z3] = proj[c]
        const minX = Math.max(0, Math.min(x1,x2,x3))
        const maxX = Math.min(Rcols-1, Math.max(x1,x2,x3))
        const minY = Math.max(0, Math.min(y1,y2,y3))
        const maxY = Math.min(Rrows-1, Math.max(y1,y2,y3))
        const area = (x2-x1)*(y3-y1)-(x3-x1)*(y2-y1) || 1
        for (let yy=minY; yy<=maxY; yy++) {
          for (let xx=minX; xx<=maxX; xx++) {
            const w1 = ((x2-x1)*(yy-y1)-(y2-y1)*(xx-x1)) / area
            const w2 = ((x3-x2)*(yy-y2)-(y3-y2)*(xx-x2)) / area
            const w3 = 1 - w1 - w2
            if (w1 >= -0.001 && w2 >= -0.001 && w3 >= -0.001) {
              const depth = z1 * w3 + z2 * w1 + z3 * w2
              const o = xx + yy * Rcols
              if (depth > zbuf[o]) {
                zbuf[o] = depth
                const shadeIdx = Math.floor((shades.length - 1) * Math.max(0, Math.min(1, (depth + 1) / 2)))
                screen[o] = shades[Math.max(0, Math.min(shades.length - 1, shadeIdx))]
              }
            }
          }
        }
      }

      const out = []
      for (let r = 0; r < Rrows; r++) out.push(screen.slice(r * Rcols, (r + 1) * Rcols).join(''))
      el.innerText = out.join('\n')
    }

    const renderCube = (A, B, Rcols, Rrows) => {
      // simple rotating cube by projecting vertices and drawing approximate edges
      const verts = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ]
      const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
      const rot = (v, a, b) => {
        const [x,y,z] = v
        const sinA = Math.sin(a), cosA = Math.cos(a)
        const sinB = Math.sin(b), cosB = Math.cos(b)
        const x1 = x * cosA - z * sinA
        const z1 = x * sinA + z * cosA
        const y1 = y * cosB - z1 * sinB
        const z2 = y * sinB + z1 * cosB
        return [x1, y1, z2]
      }
      const screen = new Array(Rcols * Rrows).fill(' ')
      const zbuf = new Array(Rcols * Rrows).fill(-Infinity)
      const put = (x,y,ch,d) => {
        if (x>=0 && x<Rcols && y>=0 && y<Rrows && d>zbuf[x+y*Rcols]) { zbuf[x+y*Rcols]=d; screen[x+y*Rcols]=ch }
      }
      const pts = verts.map(v => rot(v, A, B))
      const proj = pts.map(([x,y,z])=> [Math.floor(Rcols/2 + x*(Rcols/4)), Math.floor(Rrows/2 + y*(Rrows/4)), z])
      for (const [a,b] of edges) {
        const [x1,y1,z1] = proj[a]
        const [x2,y2,z2] = proj[b]
        const steps = Math.max(Math.abs(x2-x1), Math.abs(y2-y1))
        for (let i=0;i<=steps;i++) {
          const t = steps===0?0:i/steps
          const x = Math.floor(x1 + (x2-x1)*t)
          const y = Math.floor(y1 + (y2-y1)*t)
          const d = z1 + (z2-z1)*t
          put(x,y,'#',d)
        }
      }
      const out = []
      for (let r=0;r<Rrows;r++) out.push(screen.slice(r*Rcols,(r+1)*Rcols).join(''))
      el.innerText = out.join('\n')
    }

    if (prefersReduced) {
      // render single static frame of chosen shape
      const { cols: C, rows: R } = size
      if (shape === 'pyramid') renderPyramid3D(1.2, 0.7, C, R)
  else if (shape === 'cube') renderCube(0.7, 0.4, C, R)
      else renderDonut(1.2, 1.6, 0, size.cols, size.rows)
      return
    }

    let A = 0
    let B = 0
    const loop = () => {
      A += 0.07 * speed
      B += 0.03 * speed
      const { cols: C, rows: R } = size
      if (shape === 'pyramid') renderPyramid3D(A, B, C, R)
  else if (shape === 'cube') renderCube(A, B, C, R)
    else renderDonut(A, B, 0, C, R)
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [size, speed, shape])

  return (
    <pre
      ref={elRef}
      className={`select-none pointer-events-none whitespace-pre font-mono text-[10px] leading-[9px] ${className}`}
      aria-hidden="true"
      style={{ minWidth: 0 }}
    />
  )
}
