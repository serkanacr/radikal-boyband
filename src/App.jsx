import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './App.css'

const STAR_COUNT = 86
const photos = [
  { src: '/image/radikal.jpg', label: 'FRAME 001', position: 'center 41%' },
  { src: '/image/radikal2.jpg', label: 'FRAME 002', position: 'center 35%' },
  { src: '/image/radikal3.jpg', label: 'FRAME 003', position: 'center 38%' },
]
const members = [
  {
    name: 'VEDAT ÇELİK',
    number: '01',
    role: 'MAIN VOCAL',
    color: '#f04444',
    rgb: '240, 68, 68',
    image: '/image/VEDAT.Photographer- @alisaozkirStylist- @duhheloCreative Director&Producer- @gunessdayiogluMUA- .jpg',
  },
  {
    name: 'YUŞA AKBIYIK',
    number: '02',
    role: 'LEAD DANCER',
    color: '#31a9ff',
    rgb: '49, 169, 255',
    image: '/image/YUŞA.Photographer- @alisaozkirStylist- @duhheloCreative Director&Producer- @gunessdayiogluMUA- @.jpg',
  },
  {
    name: 'İBRAHİM CAN KAYA',
    number: '03',
    role: 'MAIN DANCER',
    color: '#58c96b',
    rgb: '88, 201, 107',
    image: '/image/İBRAHİM. Photographer- @alisaozkirStylist- @duhheloCreative Director&Producer- @gunessdayiogluMU.jpg',
  },
  {
    name: 'YUSUF EMRE AKBIYIK',
    number: '04',
    role: 'SUB',
    color: '#f2d64b',
    rgb: '242, 214, 75',
    image: '/image/YUSUF EMRE.Photographer- @alisaozkirStylist- @duhheloCreative Director&Producer- @gunessdayioglu.jpg',
  },
]

function App() {
  const heroRef = useRef(null)
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 22 })
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 22 })
  const photoX = useTransform(smoothX, [0, 1], [3, -3])
  const photoY = useTransform(smoothY, [0, 1], [2, -2])
  const [spotlight, setSpotlight] = useState({ x: 50, y: 45 })
  const [activePhoto, setActivePhoto] = useState(0)
  const [activeMember, setActiveMember] = useState(null)
  const [memberSpot, setMemberSpot] = useState({ x: 50, y: 45 })
  const [activeRelease, setActiveRelease] = useState(0)
  const [discLight, setDiscLight] = useState({ x: 50, y: 40 })
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 800)

  useEffect(() => {
    const updateLayout = () => setIsMobile(window.innerWidth <= 800)
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [mobileMenuOpen])

  const stars = useMemo(() => {
    let seed = 84721
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }

    return Array.from({ length: STAR_COUNT }, (_, index) => {
      const bright = random() > 0.86
      return {
        id: index,
        x: random() * 100,
        y: random() * 100,
        size: bright ? 4 + random() * 4 : 0.7 + random() * 2.1,
        delay: random() * 6,
        duration: 5 + random() * 7,
        bright,
      }
    })
  }, [])

  const handlePointerMove = (event) => {
    const bounds = heroRef.current?.getBoundingClientRect()
    if (!bounds) return
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height))
    pointerX.set(x)
    pointerY.set(y)
    setSpotlight({ x: x * 100, y: y * 100 })
  }

  const handleMemberPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    setMemberSpot({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    })
  }

  const selectedMember = activeMember === null ? null : members[activeMember]
  const releases = [
    { title: 'HAYRAN', type: 'DEBUT SINGLE', date: '19.06.2026', duration: '2:43', cover: '/image/hayran-cover.jpg', live: true },
    { title: 'KORKMAM BEN', type: 'YENİ SINGLE', date: '21.08.2026', duration: '—:—', cover: null, live: false },
  ]
  const release = releases[activeRelease]

  return (
    <main className="site-shell">
      <section ref={heroRef} className="radikal-hero" onPointerMove={handlePointerMove} onPointerLeave={() => setSpotlight({ x: 50, y: 45 })} aria-label="Radikal grubu">
        <header className="hero-nav">
          <a className="brand" href="#top" aria-label="Radikal ana sayfa">
            <img src="/image/radikallogo.jpg" alt="Radikal logosu" />
            <span>RADİKAL</span>
          </a>
          <button className={`menu-toggle${mobileMenuOpen ? ' open' : ''}`} type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-controls="main-menu" aria-label="Menüyü aç veya kapat"><span /><span /></button>
          <nav id="main-menu" className={`main-menu${mobileMenuOpen ? ' mobile-open' : ''}`} aria-label="Ana menü">
            <a href="#uyeler" onClick={() => setMobileMenuOpen(false)}>ÜYELER</a>
            <a href="#diskografi" onClick={() => setMobileMenuOpen(false)}>DİSKOGRAFİ</a>
            <a href="#klipler" onClick={() => setMobileMenuOpen(false)}>KLİPLER</a>
            <a href="#konser" onClick={() => setMobileMenuOpen(false)}>KONSER</a>
            <a href="#sosyal" onClick={() => setMobileMenuOpen(false)}>SOSYAL</a>
          </nav>
        </header>

        <div className="star-field" aria-hidden="true">
          {stars.map((star) => <i key={star.id} className={star.bright ? 'star bright' : 'star'} style={{ '--x': `${star.x}%`, '--y': `${star.y}%`, '--size': `${star.size}px`, '--delay': `${star.delay}s`, '--duration': `${star.duration}s` }} />)}
        </div>

        <div className="spotlight" style={{ '--spot-x': `${spotlight.x}%`, '--spot-y': `${spotlight.y}%` }} aria-hidden="true" />

        <div className="hero-copy" id="top">
          <motion.h1 aria-label="RADİKAL" initial={{ opacity: 0, x: -45 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}>
            RAD<span className="dotted-i" aria-hidden="true">I</span>KAL
          </motion.h1>
        </div>

        <motion.div className="photo-orbit" style={{ x: photoX, y: photoY }} initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.15, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}>
          {photos.map((photo, index) => {
            const slot = (index - activePhoto + photos.length) % photos.length
            const poses = isMobile ? [
              { x: 0, y: 0, scale: 1, rotateY: 0, rotateZ: -1, opacity: 1, zIndex: 3 },
              { x: 132, y: 35, scale: 0.63, rotateY: -16, rotateZ: 6, opacity: .92, zIndex: 1 },
              { x: -132, y: 35, scale: 0.63, rotateY: 16, rotateZ: -6, opacity: .92, zIndex: 2 },
            ] : [
              { x: 0, y: 0, scale: 1, rotateY: 0, rotateZ: -1, opacity: 1, zIndex: 3 },
              { x: 235, y: 38, scale: 0.74, rotateY: -20, rotateZ: 6, opacity: 1, zIndex: 1 },
              { x: -235, y: 38, scale: 0.74, rotateY: 20, rotateZ: -6, opacity: 1, zIndex: 2 },
            ]
            return (
              <motion.figure
                className="hero-portrait"
                key={photo.src}
                animate={poses[slot]}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActivePhoto((current) => (current + 1) % photos.length)}
              >
                <div className="photo-frame">
                  <img src={photo.src} alt={`Radikal grubu — ${photo.label}`} style={{ objectPosition: photo.position, objectFit: photo.fit ?? 'cover' }} />
                  <span className="frame-corner top-left" /><span className="frame-corner top-right" />
                  <span className="frame-corner bottom-left" /><span className="frame-corner bottom-right" />
                  <span className="photo-index">{photo.label}</span>
                </div>
                <figcaption><span>NEW FACES ON FILM</span><span>{String(index + 1).padStart(2, '0')} / 03</span></figcaption>
              </motion.figure>
            )
          })}
        </motion.div>

        <motion.p
          className="side-note side-note-left"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>THE CAMERA LOVES THEM</span>
        </motion.p>
        <motion.p
          className="side-note side-note-right"
          initial={{ opacity: 0, y: -70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          NO AUTOGRAPHS · YET
        </motion.p>
        <div className="marquee" id="discover" aria-label="The next generation of stars">
          <div className="marquee-track">
            {[0, 1, 2, 3].map((copy) => <span key={copy} aria-hidden={copy > 0}>THE NEXT GENERATION OF STARS <b>★</b> RADİKAL <b>★</b> NO RULES AFTER MIDNIGHT <b>★</b></span>)}
          </div>
        </div>
      </section>

      <section
        id="uyeler"
        className={`members-section${selectedMember ? ' has-selection' : ''}`}
        style={{
          '--member-color': selectedMember?.color ?? '#8892b8',
          '--member-rgb': selectedMember?.rgb ?? '136, 146, 184',
          '--member-spot-x': `${memberSpot.x}%`,
          '--member-spot-y': `${memberSpot.y}%`,
        }}
        onPointerMove={handleMemberPointer}
        onMouseLeave={() => setActiveMember(null)}
      >
        <div className="member-stars" aria-hidden="true">
          {members.map((member, index) => (
            <span key={member.number} className={activeMember === index ? 'member-star active' : 'member-star'} style={{ '--star-color': member.color }}>
              ✦
            </span>
          ))}
          <i className="constellation-line" />
        </div>

        <motion.header
          className="members-heading"
          initial={{ opacity: 0, x: -55 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: .6 }}
          transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>HER YILDIZIN BİR RENGİ VAR</p>
          <h2>YILDIZINI SEÇ</h2>
        </motion.header>

        <div className="member-stage" aria-live="polite">
          <div className="member-spotlight" aria-hidden="true" />
          <div className="member-starburst" aria-hidden="true" />
          <AnimatePresence mode="wait">
            {selectedMember ? (
              <motion.div key={selectedMember.number} className="selected-member" initial={{ opacity: 0, scale: .94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.04, y: -16 }} transition={{ duration: .55, ease: [0.16, 1, 0.3, 1] }}>
                <span className="member-big-number" aria-hidden="true">{selectedMember.number}</span>
                <img src={selectedMember.image} alt={selectedMember.name} />
                <p className="member-role">{selectedMember.role}</p>
              </motion.div>
            ) : (
              <motion.div key="neutral" className="neutral-star" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span>✦</span>
                <p>BİR YILDIZ SEÇ</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="member-picker"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: .25 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: .08 } } }}
        >
          {members.map((member, index) => (
            <motion.button
              type="button"
              key={member.number}
              className={activeMember === index ? 'active' : ''}
              style={{ '--item-color': member.color }}
              onMouseEnter={() => setActiveMember(index)}
              onFocus={() => setActiveMember(index)}
              onClick={() => setActiveMember(index)}
              variants={{ hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0, transition: { duration: .58, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <span className="picker-star">✦{member.number}</span>
              <span className="picker-name">{member.name}</span>
              <span className="picker-role">{member.role}</span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      <section
        id="diskografi"
        className="discography-section"
        aria-labelledby="discography-title"
        style={{ '--disc-x': `${discLight.x}%`, '--disc-y': `${discLight.y}%` }}
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          setDiscLight({ x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 })
        }}
      >
        <div className="disco-stars" aria-hidden="true">
          {stars.slice(0, 42).map((star) => (
            <span key={`disco-${star.id}`} style={{ left: `${star.x}%`, top: `${star.y}%`, fontSize: `${Math.max(5, star.size * 1.2)}px`, opacity: .18 + (star.size / 8) * .5 }}>✦</span>
          ))}
        </div>

        <motion.header
          className="disco-heading"
          initial={{ opacity: 0, x: -42 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: .55 }}
          transition={{ duration: .68, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>RADİKAL KAYITLARI · 2026</p>
          <h2 id="discography-title">DİSKOGRAFİ</h2>
        </motion.header>

        <motion.div
          className="record-carousel"
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: .3 }}
          transition={{ duration: .78, delay: .08, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="record-arrow prev" type="button" onClick={() => setActiveRelease((activeRelease + releases.length - 1) % releases.length)} aria-label="Önceki single">←</button>

          <div className="record-stage">
            <AnimatePresence mode="wait">
              <motion.div className="record-artwork" key={release.title} initial={{ opacity: 0, x: 70, rotateY: -14 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -70, rotateY: 14 }} transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}>
                <div className="compact-disc" aria-hidden="true">
                  <div className="disc-hologram" />
                  <div className="disc-hole" />
                  <i className="disc-marker marker-one">✦</i>
                  <i className="disc-marker marker-two">02</i>
                  <i className="disc-marker marker-three">RADİKAL</i>
                  <span>RADİKAL · {String(activeRelease + 1).padStart(2, '0')}</span>
                </div>
                <div className={`album-sleeve${release.live ? '' : ' unreleased-sleeve'}`}>
                  {release.cover ? <img src={release.cover} alt={`${release.title} single kapağı`} /> : (
                    <div className="mystery-cover">
                      <span>✦</span>
                      <p>RADİKAL</p>
                      <h3>KORKMAM<br />BEN</h3>
                      <small>21 · 08 · 26</small>
                    </div>
                  )}
                  <span className="sleeve-label">{release.live ? 'YAYINDA' : 'YAKINDA'}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="record-details" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={`${release.title}-info`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .4 }}>
                <p>{release.type} · {release.date}</p>
                <h3>{release.title}</h3>
                <span>{release.duration}</span>
                {release.live ? (
                  <a href="https://open.spotify.com/intl-tr/track/6D4UduWC97tRdqQlaal2EI?si=b6b6e723ad4641e2" target="_blank" rel="noreferrer">SPOTIFY'DA DİNLE <b aria-hidden="true">↗</b></a>
                ) : <span className="release-countdown">21 AĞUSTOS'TA</span>}
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="record-arrow next" type="button" onClick={() => setActiveRelease((activeRelease + 1) % releases.length)} aria-label="Sonraki single">→</button>
        </motion.div>

        <motion.div className="release-tabs" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .55, delay: .3, ease: [0.16, 1, 0.3, 1] }}>
          {releases.map((item, index) => <button type="button" key={item.title} className={activeRelease === index ? 'active' : ''} onClick={() => setActiveRelease(index)}><span>0{index + 1}</span>{item.title}</button>)}
        </motion.div>

        <p className="disco-side-note">TWO SIGNALS · ONE UNIVERSE</p>
      </section>

      <section id="klipler" className="videos-section" aria-labelledby="videos-title">
        <div className="disco-stars video-stars" aria-hidden="true">
          {stars.slice(12, 58).map((star) => (
            <span key={`video-${star.id}`} style={{ left: `${star.x}%`, top: `${star.y}%`, fontSize: `${Math.max(5, star.size * 1.2)}px`, opacity: .18 + (star.size / 8) * .5 }}>✦</span>
          ))}
        </div>
        <motion.header className="videos-heading" initial={{ opacity: 0, x: -42 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .68, ease: [0.16, 1, 0.3, 1] }}>
          <h2 id="videos-title">KLİPLER</h2>
        </motion.header>
        <motion.article className="featured-video" initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }} whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .72, delay: .08, ease: [0.16, 1, 0.3, 1] }}>
          <div className={`video-frame${videoPlaying ? ' is-playing' : ''}`}>
            {videoPlaying ? (
              <iframe
                src="https://www.youtube.com/embed/JaCZ9-G52Jc?autoplay=1&rel=0"
                title="Radikal - HAYRAN | Official Music Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button type="button" className="video-poster" onClick={() => setVideoPlaying(true)} aria-label="HAYRAN resmi klibini oynat">
                <img src="https://i.ytimg.com/vi/JaCZ9-G52Jc/maxresdefault.jpg" alt="HAYRAN resmi klip kapağı" />
                <span className="video-scanline" aria-hidden="true" />
                <span className="video-play" aria-hidden="true"><i>▶</i></span>
                <span className="video-timecode">MV · 001</span>
                <span className="video-corner vc-one" /><span className="video-corner vc-two" />
                <span className="video-corner vc-three" /><span className="video-corner vc-four" />
              </button>
            )}
          </div>
          <div className="video-meta">
            <div><span>01</span><p>OFFICIAL MUSIC VIDEO</p></div>
            <h3>HAYRAN</h3>
            <a href="https://www.youtube.com/watch?v=JaCZ9-G52Jc" target="_blank" rel="noreferrer">YOUTUBE'DA İZLE <b>↗</b></a>
          </div>
        </motion.article>
        <motion.div className="video-queue" aria-label="Gelecek klipler" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .35 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .08 } } }}>
          {[2, 3, 4].map((number) => (
            <motion.div className="video-slot" key={number} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .52, ease: [0.16, 1, 0.3, 1] } } }}>
              <span>0{number}</span><div className="slot-signal">✦</div>
              <p>YENİ GÖRÜNTÜ<br />BEKLENİYOR</p><small>COMING SOON</small>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="konser" className="concerts-section" aria-labelledby="concerts-title">
        <div className="disco-stars concert-stars" aria-hidden="true">
          {stars.slice(24, 64).map((star) => (
            <span key={`concert-${star.id}`} style={{ left: `${star.x}%`, top: `${star.y}%`, fontSize: `${Math.max(5, star.size * 1.2)}px`, opacity: .15 + (star.size / 8) * .42 }}>✦</span>
          ))}
        </div>

        <motion.header className="concerts-heading" initial={{ opacity: 0, x: -42 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .68, ease: [0.16, 1, 0.3, 1] }}>
          <h2 id="concerts-title">KONSERLER</h2>
        </motion.header>

        <motion.div className="concert-empty" initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .72, delay: .08, ease: [0.16, 1, 0.3, 1] }}>
          <div className="concert-signal" aria-hidden="true">
            <span>✦</span>
            <i /><i /><i />
          </div>
          <p className="concert-kicker">İLK SAHNE SİNYALİ BEKLENİYOR</p>
          <h3>HENÜZ<br />KONSER YOK</h3>
          <p className="concert-copy">Radikal’in ilk konser tarihi açıklandığında<br />bütün detaylar burada olacak.</p>
          <div className="concert-status"><span>00</span><b>GEÇMİŞ KONSER</b><i /><span>00</span><b>YAKLAŞAN KONSER</b></div>
        </motion.div>

        <motion.p className="concert-side-note" initial={{ opacity: 0, y: -60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .72, delay: .16, ease: [0.16, 1, 0.3, 1] }}>THE FIRST NIGHT IS YET TO COME</motion.p>
      </section>

      <section id="sosyal" className="social-section" aria-labelledby="social-title">
        <div className="disco-stars social-stars" aria-hidden="true">
          {stars.slice(8, 54).map((star) => <span key={`social-${star.id}`} style={{ left: `${star.x}%`, top: `${star.y}%`, fontSize: `${Math.max(5, star.size * 1.2)}px`, opacity: .15 + (star.size / 8) * .42 }}>✦</span>)}
        </div>
        <motion.header className="social-heading" initial={{ opacity: 0, x: -42 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .68, ease: [0.16, 1, 0.3, 1] }}>
          <p>RADİKAL'I TAKİP ET</p><h2 id="social-title">SOSYAL</h2>
        </motion.header>
        <motion.div className="social-links" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .07 } } }}>
          {[
            ['01','INSTAGRAM','@RADIK5L','https://www.instagram.com/radik5l/?hl=en','#ef5da8'],
            ['02','X','@RADIK5L','https://x.com/radik5l','#dce3ff'],
            ['03','TIKTOK','@RADIK5L','https://www.tiktok.com/@radik5l','#58e7e0'],
            ['04','SPOTIFY','RADİKAL','https://open.spotify.com/intl-tr/artist/16CDaDlBd2bji8I4Ck1iuV?si=ee6dmwirTo6PAJp1dpl1FQ','#1ed760'],
            ['05','YOUTUBE','RADIK5L','https://www.youtube.com/channel/UCxhQ92su4PAYWCiBN1fZBBg','#ff4747'],
          ].map(([number,name,handle,url,color]) => (
            <motion.a key={name} href={url} target="_blank" rel="noreferrer" style={{ '--social-color': color }} variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: .52, ease: [0.16,1,.3,1] } } }}>
              <span>{number}</span><b>{name}</b><small>{handle}</small><i>✦</i><em>↗</em>
            </motion.a>
          ))}
        </motion.div>
        <footer className="site-footer"><img src="/image/radikallogo.jpg" alt="Radikal logosu" /><span>RADİKAL © 2026</span><span>THE NEXT GENERATION OF STARS</span></footer>
      </section>
    </main>
  )
}

export default App
