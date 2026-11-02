// Interacciones de la landing. Todo es mejora progresiva: sin JS la página se ve y funciona igual.
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches
const puntero = matchMedia('(hover: hover) and (pointer: fine)').matches
document.documentElement.classList.add('js')

document.getElementById('anio').textContent = new Date().getFullYear()

/* Título del hero: entra palabra por palabra. */
const h1 = document.querySelector('.hero h1')
h1.setAttribute('aria-label', h1.textContent)
h1.innerHTML = h1.textContent
  .split(' ')
  .map((p, i) => `<span class="palabra" aria-hidden="true" style="--i:${i}"><span>${p}</span></span>`)
  .join(' ')
requestAnimationFrame(() => document.body.classList.add('listo'))

/* Aparición al hacer scroll, escalonada dentro de cada grupo. */
const revelar = document.querySelectorAll(
  '.section__head, .service, .gallery img, .about__photo, .about__text, .paso, .pasos__cta, .contact__inner > *'
)
const grupos = new Map()
revelar.forEach(el => {
  const n = grupos.get(el.parentElement) || 0
  grupos.set(el.parentElement, n + 1)
  el.style.setProperty('--d', `${Math.min(n, 5) * 80}ms`)
  el.classList.add('revela')
})
const io = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visto')
      io.unobserve(e.target)
    }
  })
}, { rootMargin: '0px 0px -8% 0px' })
revelar.forEach(el => io.observe(el))

/* Barra de progreso, header compacto, foto del hero con parallax y tallo del proceso. */
const header = document.querySelector('.top')
const fotoHero = document.querySelector('.hero__photo img')
const pasos = document.querySelector('.pasos')
let pendiente = false
function alScrollear() {
  pendiente = false
  const y = scrollY
  const max = document.documentElement.scrollHeight - innerHeight
  document.documentElement.style.setProperty('--progreso', max > 0 ? y / max : 0)
  header.classList.toggle('top--scroll', y > 12)
  if (!quieto && y < innerHeight) fotoHero.style.transform = `translateY(${y * 0.08}px) scale(1.04)`
  const r = pasos.getBoundingClientRect()
  const avance = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / r.height))
  pasos.style.setProperty('--tallo', avance)
}
addEventListener('scroll', () => {
  if (!pendiente) {
    pendiente = true
    requestAnimationFrame(alScrollear)
  }
}, { passive: true })
alScrollear()

/* Sección activa en el menú. */
const links = [...document.querySelectorAll('.nav a')]
const ioNav = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (!e.isIntersecting) return
    links.forEach(a => a.classList.toggle('activo', a.hash === `#${e.target.id}`))
  })
}, { rootMargin: '-45% 0px -50% 0px' })
links.forEach(a => {
  const s = document.querySelector(a.hash)
  if (s) ioNav.observe(s)
})
// El hero y el proceso no tienen link: al pasar por ellos no queda ninguno marcado.
document.querySelectorAll('.hero, #proceso').forEach(s => ioNav.observe(s))

/* Botones que siguen apenas al mouse. */
if (puntero && !quieto) {
  document.querySelectorAll('.hero__cta .btn, .contact .btn--light, .pasos__cta').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * 0.18
      const y = (e.clientY - r.top - r.height / 2) * 0.3
      b.style.transform = `translate(${x}px, ${y}px)`
    })
    b.addEventListener('pointerleave', () => { b.style.transform = '' })
  })
}

/* Visor de fotos de la galería. */
const fotos = [...document.querySelectorAll('.gallery img')]
const visor = document.querySelector('.visor')
const visorImg = visor.querySelector('.visor__img')
const visorPie = visor.querySelector('.visor__pie')
let actual = 0
function mostrar(i) {
  actual = (i + fotos.length) % fotos.length
  const f = fotos[actual]
  visorImg.src = f.currentSrc.replace('-600.webp', '-1200.webp')
  visorImg.alt = f.alt
  visorPie.textContent = `${f.alt} · ${actual + 1}/${fotos.length}`
}
fotos.forEach((f, i) => {
  f.tabIndex = 0
  f.setAttribute('role', 'button')
  f.setAttribute('aria-label', `Ampliar foto: ${f.alt}`)
  const abrir = () => { mostrar(i); visor.showModal() }
  f.addEventListener('click', abrir)
  f.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir() }
  })
})
visor.querySelector('.visor__cerrar').addEventListener('click', () => visor.close())
visor.querySelector('.visor__ant').addEventListener('click', () => mostrar(actual - 1))
visor.querySelector('.visor__sig').addEventListener('click', () => mostrar(actual + 1))
visor.addEventListener('click', e => { if (e.target === visor) visor.close() })
visor.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') mostrar(actual - 1)
  if (e.key === 'ArrowRight') mostrar(actual + 1)
})
let toqueX = null
visor.addEventListener('touchstart', e => { toqueX = e.touches[0].clientX }, { passive: true })
visor.addEventListener('touchend', e => {
  if (toqueX === null) return
  const dx = e.changedTouches[0].clientX - toqueX
  if (Math.abs(dx) > 40) mostrar(actual + (dx < 0 ? 1 : -1))
  toqueX = null
})

/* Pasto sobre el bloque de contacto: se mece con el viento y se aparta del mouse. */
const lienzo = document.querySelector('.pasto')
const ctx = lienzo.getContext('2d')
const tonos = ['#2a6b42', '#1f5233', '#3d8a52', '#4f9a5c', '#173a26']
let briznas = []
let mouseX = -1e4
let visible = false
let w = 0
let h = 0
function armarPasto() {
  const dpr = Math.min(devicePixelRatio || 1, 2)
  w = lienzo.clientWidth
  h = lienzo.clientHeight
  lienzo.width = w * dpr
  lienzo.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  const cantidad = Math.round(w / 4)
  briznas = Array.from({ length: cantidad }, (_, i) => ({
    x: (i / cantidad) * w + Math.random() * 6 - 3,
    alto: h * (0.45 + Math.random() * 0.55),
    ancho: 2 + Math.random() * 2.5,
    fase: Math.random() * Math.PI * 2,
    color: tonos[(Math.random() * tonos.length) | 0],
    curva: 0,
  }))
}
function dibujar(t) {
  ctx.clearRect(0, 0, w, h)
  for (const b of briznas) {
    const viento = quieto ? 0 : Math.sin(t / 1300 + b.x / 140 + b.fase) * 6 + Math.sin(t / 470 + b.fase) * 1.5
    const dx = b.x - mouseX
    const empuje = Math.abs(dx) < 90 ? (1 - Math.abs(dx) / 90) * 28 * Math.sign(dx || 1) : 0
    b.curva += (viento + empuje - b.curva) * 0.12
    const puntaX = b.x + b.curva
    const puntaY = h - b.alto
    ctx.beginPath()
    ctx.moveTo(b.x - b.ancho, h)
    ctx.quadraticCurveTo(b.x - b.ancho / 2 + b.curva * 0.3, h - b.alto * 0.5, puntaX, puntaY)
    ctx.quadraticCurveTo(b.x + b.ancho / 2 + b.curva * 0.3, h - b.alto * 0.5, b.x + b.ancho, h)
    ctx.fillStyle = b.color
    ctx.fill()
  }
  if (visible && !quieto) requestAnimationFrame(dibujar)
}
new IntersectionObserver(([e]) => {
  visible = e.isIntersecting
  if (visible) requestAnimationFrame(dibujar)
}).observe(lienzo)
new ResizeObserver(() => { armarPasto(); requestAnimationFrame(dibujar) }).observe(lienzo)
addEventListener('pointermove', e => {
  if (!visible) return
  const r = lienzo.getBoundingClientRect()
  const cerca = e.clientY > r.top - 60 && e.clientY < r.bottom + 120
  mouseX = cerca ? e.clientX - r.left : -1e4
}, { passive: true })
