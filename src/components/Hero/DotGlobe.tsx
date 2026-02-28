import { useRef, useEffect } from 'react'
import * as THREE from 'three'

interface DotGlobeProps {
  visible: boolean
}

export function DotGlobe({ visible }: DotGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // Delay init slightly so the container has measured dimensions
    const initTimeout = setTimeout(() => {
      const w = el.clientWidth || 500
      const h = el.clientHeight || 500

      // Scene setup
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
      camera.position.z = 3.8 // Distance from globe - controls perceived size

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Cap at 2× to avoid GPU strain on eyes
      renderer.setClearColor(0x000000, 0) // Transparent background
      el.appendChild(renderer.domElement)

      const globe = new THREE.Group()
      scene.add(globe)
      const radius = 1.2

      // Scatter dots on the sphere using Fibonacci distribution
      // This produces a nearly uniform point spread without clustering at the poles
      const dotCount = 1200
      const goldenRatio = (1 + Math.sqrt(5)) / 2
      const dotGeo = new THREE.SphereGeometry(0.012, 6, 6)
      const dotMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.45,
      })
      const dots = new THREE.InstancedMesh(dotGeo, dotMat, dotCount)
      const dummy = new THREE.Object3D()
      const color = new THREE.Color()

      for (let i = 0; i < dotCount; i++) {
        const theta = (2 * Math.PI * i) / goldenRatio
        const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount)
        dummy.position.set(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        )
        dummy.updateMatrix()
        dots.setMatrixAt(i, dummy.matrix)

        // Randomize color within a purple range, vary brightness for depth
        const t = Math.random()
        const brightness = 0.6 + Math.random() * 0.4
        color.setRGB(
          (0.55 + t * 0.2) * brightness,
          (0.36 + t * 0.15) * brightness,
          (0.92 + t * 0.08) * brightness
        )
        dots.setColorAt(i, color)
      }
      dots.instanceMatrix.needsUpdate = true
      dots.instanceColor!.needsUpdate = true
      globe.add(dots)

      // Wireframe grid lines
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x8b5cf6, // Accent purple
        transparent: true,
        opacity: 0.05,
      })

      // 7 latitude rings evenly spaced from -0.75 to +0.75 on the Y axis
      for (let i = 0; i < 7; i++) {
        const lat = -0.75 + (i / 6) * 1.5
        const ringR = Math.sqrt(Math.max(0, radius * radius - lat * lat)) // Radius of ring at this latitude
        const pts: THREE.Vector3[] = []
        for (let j = 0; j <= 64; j++) {
          const a = (j / 64) * Math.PI * 2
          pts.push(new THREE.Vector3(Math.cos(a) * ringR, lat, Math.sin(a) * ringR))
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        globe.add(new THREE.Line(geo, lineMat))
      }

      // 10 longitude meridians evenly spaced around the sphere
      for (let i = 0; i < 10; i++) {
        const lng = (i / 10) * Math.PI * 2
        const pts: THREE.Vector3[] = []
        for (let j = 0; j <= 64; j++) {
          const lat = -Math.PI / 2 + (j / 64) * Math.PI
          pts.push(
            new THREE.Vector3(
              radius * Math.cos(lat) * Math.cos(lng),
              radius * Math.sin(lat),
              radius * Math.cos(lat) * Math.sin(lng)
            )
          )
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        globe.add(new THREE.Line(geo, lineMat))
      }

      // Mouse interaction - normalize position to [-1, 1] range
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2
      }
      window.addEventListener('mousemove', onMove)

      // Animation loop
      let raf: number
      const smoothMouse = { x: 0, y: 0 }
      const animate = () => {
        const time = performance.now() * 0.001 // Convert ms -> seconds
        // Double lerp: 0.12 scales mouse influence, 0.03 smooths the approach
        smoothMouse.x += (mouse.current.x * 0.12 - smoothMouse.x) * 0.03
        smoothMouse.y += (mouse.current.y * 0.12 - smoothMouse.y) * 0.03
        globe.rotation.y = time * 0.06 + smoothMouse.x // Slow idle spin + mouse offset
        globe.rotation.x = 0.2 + smoothMouse.y          // Slight tilt + mouse offset
        renderer.render(scene, camera)
        raf = requestAnimationFrame(animate)
      }
      raf = requestAnimationFrame(animate)

      const onResize = () => {
        const nw = el.clientWidth
        const nh = el.clientHeight
        if (nw === 0 || nh === 0) return
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
        renderer.setSize(nw, nh)
      }
      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      }
    }, 100)

    return () => {
      clearTimeout(initTimeout)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.5s cubic-bezier(.4,0,.2,1) 0.3s',
      }}
    />
  )
}
