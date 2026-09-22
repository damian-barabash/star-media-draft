/**
 * Hero 3D star — Three.js scene, loaded lazily (dynamic import) so the
 * main bundle stays small. Model: /3d/star.glb (meshopt + webp, ~540 KB,
 * compressed from the 29 MB Tripo source with gltf-transform).
 *
 * - slow auto-rotate on Y, eased tilt toward the pointer (desktop only)
 * - scroll velocity gives a short spin boost + subtle parallax
 * - rendering pauses when the host is off-screen or the tab is hidden
 * - DPR capped (1.5 desktop / 1.25 mobile) for smooth frame times
 */
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

const GLB_URL = '/3d/star.glb'

let modelPromise: Promise<Group> | null = null

function loadModel(): Promise<Group> {
  if (modelPromise) return modelPromise
  const loader = new GLTFLoader()
  loader.setMeshoptDecoder(MeshoptDecoder)
  modelPromise = new Promise((resolve, reject) => {
    loader.load(
      GLB_URL,
      (gltf) => {
        const model = gltf.scene
        const box = new Box3().setFromObject(model)
        const size = new Vector3()
        const center = new Vector3()
        box.getSize(size)
        box.getCenter(center)
        model.position.sub(center)
        const maxDim = Math.max(size.x, size.y, size.z) || 1
        model.scale.setScalar(1 / maxDim) // normalized to 1 unit
        resolve(model)
      },
      undefined,
      (err) => {
        modelPromise = null
        reject(err)
      },
    )
  })
  return modelPromise
}

export type StarSceneHandle = { dispose: () => void }

export async function mountStarScene(host: HTMLElement, opts: { compact: boolean }): Promise<StarSceneHandle> {
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
  const isSmall = window.innerWidth < 969

  const scene = new Scene()
  const camera = new PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 0, 5)

  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.25 : 1.5))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  host.appendChild(renderer.domElement)

  scene.add(new AmbientLight(0xffffff, 0.55))
  const key = new DirectionalLight(0xffcb7a, 1.4)
  key.position.set(3, 4, 3)
  scene.add(key)
  const rim = new DirectionalLight(0x9b7bff, 0.9)
  rim.position.set(-4, 2, -3)
  scene.add(rim)
  const fill = new DirectionalLight(0xffffff, 0.35)
  fill.position.set(0, -3, 4)
  scene.add(fill)

  let disposed = false
  let w = 1
  let h = 1
  const sizeToHost = () => {
    const rect = host.getBoundingClientRect()
    w = Math.max(100, rect.width)
    h = Math.max(100, rect.height)
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  sizeToHost()
  const ro = new ResizeObserver(() => sizeToHost())
  ro.observe(host)

  const target = { rotX: 0, rotY: 0 }
  const current = { rotX: 0, rotY: 0 }
  let scrollVelocity = 0
  let lastScrollY = window.scrollY
  let parallaxY = 0
  let visible = true
  let pageVisible = !document.hidden

  const onMove = (e: MouseEvent) => {
    if (e.clientY < 0 || e.clientY > window.innerHeight * 1.1) return
    const rect = host.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
    target.rotY = Math.max(-1.5, Math.min(1.5, nx)) * 0.32
    target.rotX = Math.max(-1.5, Math.min(1.5, ny)) * 0.22
  }
  if (!isTouch) window.addEventListener('mousemove', onMove, { passive: true })

  const onScroll = () => {
    const dy = window.scrollY - lastScrollY
    lastScrollY = window.scrollY
    scrollVelocity = Math.max(-0.08, Math.min(0.08, dy * 0.002))
    parallaxY = window.scrollY * 0.0006
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  const io = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true
  })
  io.observe(host)
  const onVis = () => {
    pageVisible = !document.hidden
  }
  document.addEventListener('visibilitychange', onVis)

  let model: Group | null = null
  try {
    const base = await loadModel()
    if (disposed) return { dispose: () => undefined }
    model = base.clone(true)
    model.scale.multiplyScalar(opts.compact ? 1.5 : 1.85)
    scene.add(model)
    host.classList.add('ready')
  } catch (err) {
    console.warn('[star3d] GLB failed to load, keeping SVG fallback', err)
    host.classList.add('failed')
  }

  const AUTO = 0.003
  let raf = 0
  const tick = () => {
    raf = requestAnimationFrame(tick)
    if (!visible || !pageVisible) return
    current.rotX += (target.rotX - current.rotX) * 0.06
    current.rotY += (target.rotY - current.rotY) * 0.06
    if (model) {
      model.rotation.y += AUTO + scrollVelocity
      model.rotation.x = current.rotX
      model.position.y = -parallaxY
    }
    scrollVelocity *= 0.9
    renderer.render(scene, camera)
  }
  tick()

  return {
    dispose() {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVis)
      renderer.dispose()
      renderer.domElement.remove()
      host.classList.remove('ready')
    },
  }
}
