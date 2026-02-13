'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMemo, useState, useRef, type ChangeEvent } from 'react';

const galleryImages = [
  '/1.jpeg',
  '/2.jpeg',
  '/3.jpeg',
  '/4.jpeg',
  '/5.jpeg',
  '/6.jpeg',
  '/7.jpeg',
  '/8.jpeg',
  '/9.jpeg',
  '/10.jpeg',
  '/11.jpeg',
  '/12.jpeg',
  '/13.jpeg',
  '/14.jpeg'
];

const galleryCaptions = [
  'With you, every moment feels like a promise I want to keep forever.',
  'You turned my world into a love story — will you write the next chapter with me?',
  'My heart chose you. Will you be my Valentine, today and always?',
  'In every smile, every glance — I see our forever. Say yes?',
  'You are the answer to every wish I never dared to speak.',
  'I don’t just want a day with you — I want every day. Be mine?',
  'This is one of our moments. I’m asking for a lifetime more.',
  'You make ordinary days extraordinary. Will you be my Valentine?',
  'Every memory with you is a reason I’m asking you to stay by my side.',
  'I fell for you in moments like these. Will you fall with me forever?',
  'You’re the dream I never want to wake from. Be my Valentine?',
  'With you, love isn’t just a word — it’s our story. Say yes?',
  'I’m not just asking for Valentine’s — I’m asking for you, every day.',
  'You’re my favorite place to belong. Will you be my Valentine?'
];

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
const seededBetween = (seed: number, min: number, max: number) => {
  const hash = Math.sin(seed * 9999.123) * 43758.5453;
  const normalized = hash - Math.floor(hash);
  return normalized * (max - min) + min;
};
// Use URL-encoded space to match the actual filename "202602131924 (1).mp4" in /public
const defaultLoveVideo = '/202602131924%20(1).mp4';

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const puzzleBoardRef = useRef<HTMLDivElement | null>(null);
  const activeVideoUrl = videoUrl ?? defaultLoveVideo;

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const floaters = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        // Round to avoid tiny float differences between server and client
        left: Math.round(seededBetween(i + 1, 0, 100) * 1000) / 1000,
        duration: seededBetween(i + 101, 10, 24),
        delay: seededBetween(i + 201, 0, 8),
        size: Math.round(seededBetween(i + 301, 12, 28) * 100) / 100,
        emoji: i % 2 === 0 ? '💖' : '🌸'
      })),
    []
  );

  const confettiHearts = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: seededBetween(i + 401, -45, 45),
        rotate: seededBetween(i + 501, -120, 120),
        delay: seededBetween(i + 601, 0, 0.6),
        duration: seededBetween(i + 701, 2.6, 4.2),
        size: seededBetween(i + 721, 20, 42),
        driftX: seededBetween(i + 741, -16, 16),
        emoji: i % 5 === 0 ? '✨' : i % 3 === 0 ? '🌸' : '💖'
      })),
    []
  );

  const dreamyOrbs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: seededBetween(i + 801, 8, 85),
        left: seededBetween(i + 901, 5, 92),
        size: seededBetween(i + 1001, 180, 320),
        duration: seededBetween(i + 1101, 14, 24),
        delay: seededBetween(i + 1201, 0, 3.5),
        driftX: seededBetween(i + 1301, -40, 40),
        driftY: seededBetween(i + 1401, -30, 30)
      })),
    []
  );

  const puzzlePieces = useMemo(
    () =>
      galleryImages.slice(0, 9).map((src, index) => ({
        id: index,
        src,
        caption: galleryCaptions[index],
        top: seededBetween(index + 1501, 20, 520), // px within the board height
        left: seededBetween(index + 1601, 20, 820), // px within a typical content width
        rotate: seededBetween(index + 1701, -9, 9)
      })),
    []
  );

  const dodgeNoButton = () => {
    // Make the "No" button impossible to catch with the cursor
    setNoPosition({
      x: randomBetween(-180, 180),
      y: randomBetween(-120, 120)
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fff1f5] via-[#ffdbe6] to-[#f4b8c9] text-wine">
      <div className="pointer-events-none absolute inset-0">
        {dreamyOrbs.map((orb) => (
          <motion.span
            key={orb.id}
            className="absolute rounded-full bg-gradient-to-br from-white/45 to-pink-300/30 blur-3xl"
            style={{
              top: `${orb.top}%`,
              left: `${orb.left}%`,
              width: orb.size,
              height: orb.size
            }}
            animate={{
              x: [0, orb.driftX, 0],
              y: [0, orb.driftY, 0],
              scale: [1, 1.15, 0.95, 1],
              opacity: [0.25, 0.45, 0.28]
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
        {floaters.map((floater) => (
          <motion.span
            key={floater.id}
            className="absolute top-[105%] opacity-65"
            style={{ left: `${floater.left}%`, fontSize: floater.size }}
            animate={{ y: ['0vh', '-125vh'], x: [0, 24, -20, 8], rotate: [0, 15, -10, 0] }}
            transition={{ duration: floater.duration, repeat: Infinity, delay: floater.delay, ease: 'easeInOut' }}
          >
            {floater.emoji}
          </motion.span>
        ))}
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          className="glass-card w-full max-w-4xl rounded-3xl border border-white/40 bg-white/25 p-10 backdrop-blur-xl"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mb-3 text-sm uppercase tracking-[0.35em] text-ruby/70"
          >
            A little love letter for you, my Banu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-4xl leading-tight text-ruby md:text-6xl"
          >
            Every heartbeat softly whispers your name, Banu Jeyendran.
            <br />
            <span className="text-wine">Will you be my Valentine?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto mt-6 max-w-2xl text-base text-wine/80 md:text-lg"
          >
            I gathered our sweetest moments in a gallery below and wrapped this page in petals and love, just for you,
            Banu. Press reveal and step into the little universe that exists only for us.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 w-full"
        >
          <h2 className="mb-3 text-3xl text-ruby md:text-4xl">Our Polaroid Moments</h2>
          <p className="mb-4 text-wine/80">
            {showPuzzle
              ? 'Drag each photo around inside the board and create your own love puzzle.'
              : 'Enjoy our memories like before, or tap play to open puzzle mode.'}
          </p>
          <div className="mb-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowPuzzle(true)}
              className="rounded-full bg-ruby px-6 py-2 text-sm font-semibold text-white shadow-md shadow-ruby/30 hover:bg-ruby/90"
            >
              Play Puzzle
            </button>
            <button
              type="button"
              onClick={() => setShowPuzzle(false)}
              className="rounded-full border border-ruby/40 bg-white/80 px-6 py-2 text-sm font-semibold text-ruby hover:bg-white"
            >
              View Images
            </button>
          </div>

          {showPuzzle ? (
            <div
              ref={puzzleBoardRef}
              className="relative h-[640px] w-full overflow-hidden rounded-3xl border border-white/60 bg-white/35 p-4 shadow-glass backdrop-blur-xl"
            >
              {puzzlePieces.map((piece) => (
                <motion.figure
                  key={piece.id}
                  drag
                  dragConstraints={puzzleBoardRef}
                  dragElastic={0.12}
                  whileTap={{ scale: 1.04, rotate: 0, zIndex: 40 }}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, scale: 0.92, y: 18 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18, delay: piece.id * 0.04 }}
                  className="absolute w-[170px] cursor-grab rounded-2xl border border-white/70 bg-white/75 p-2 shadow-xl active:cursor-grabbing sm:w-[190px]"
                  style={{ left: piece.left, top: piece.top, rotate: piece.rotate }}
                >
                  <div className="relative h-44 overflow-hidden rounded-xl sm:h-52">
                    <Image
                      src={piece.src}
                      alt={`Romantic puzzle memory ${piece.id + 1}`}
                      fill
                      sizes="(max-width: 640px) 170px, 190px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-1 pb-1 pt-2 text-center text-xs italic text-wine/75">
                    {piece.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ) : (
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
              {galleryImages.map((src, index) => (
                <motion.figure
                  key={src}
                  className="group mb-6 break-inside-avoid rounded-2xl border border-white/50 bg-white/55 p-3 shadow-glass backdrop-blur"
                  style={{ rotate: (index % 2 === 0 ? 1 : -1) * ((index % 5) + 1) }}
                  initial={{ opacity: 0, y: 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 16, delay: (index % 6) * 0.06 }}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={`Romantic memory ${index + 1}`}
                      width={900}
                      height={1200}
                      className="h-auto w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <figcaption className="px-2 pb-1 pt-3 text-center text-sm italic text-wine/70">
                    {galleryCaptions[index]}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          )}
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative mt-14 w-full max-w-3xl rounded-3xl border border-white/60 bg-white/35 p-8 shadow-glass backdrop-blur-xl"
        >
          <h3 className="text-3xl text-ruby md:text-4xl">Will you be my Valentine?</h3>
          <p className="mt-3 text-wine/80">Choose wisely… one option may be shy.</p>
          <div className="relative mt-8 flex h-32 items-center justify-center gap-6">
            <motion.button
              onClick={() => setAccepted(true)}
              className="rounded-full bg-ruby px-10 py-4 text-lg text-white shadow-xl shadow-ruby/30"
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 10px 24px rgba(157, 35, 69, 0.25)',
                  '0 12px 34px rgba(157, 35, 69, 0.45)',
                  '0 10px 24px rgba(157, 35, 69, 0.25)'
                ]
              }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Yes 💘
            </motion.button>
            <motion.button
              onMouseEnter={dodgeNoButton}
              onMouseMove={dodgeNoButton}
              onFocus={dodgeNoButton}
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              className="rounded-full border border-ruby/40 bg-white/80 px-8 py-4 text-lg text-ruby"
            >
              No 🙈
            </motion.button>
          </div>
        </motion.section>
      </section>

      {accepted && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#5f0a1f]/85 px-6 text-center text-white backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(255, 184, 208, 0.20), transparent 42%), radial-gradient(circle at 80% 80%, rgba(255, 215, 230, 0.18), transparent 40%)',
                'radial-gradient(circle at 80% 25%, rgba(255, 184, 208, 0.24), transparent 45%), radial-gradient(circle at 15% 75%, rgba(255, 215, 230, 0.2), transparent 42%)',
                'radial-gradient(circle at 20% 20%, rgba(255, 184, 208, 0.20), transparent 42%), radial-gradient(circle at 80% 80%, rgba(255, 215, 230, 0.18), transparent 40%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/15 blur-3xl"
            animate={{ scale: [0.9, 1.2, 0.95], opacity: [0.2, 0.45, 0.25] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <button
            type="button"
            onClick={() => setAccepted(false)}
            className="absolute right-5 top-5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/15 text-lg text-pink-50 shadow-md shadow-black/30 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-pink-200"
            aria-label="Close"
          >
            ✕
          </button>
          {confettiHearts.map((item) => (
            <motion.span
              key={item.id}
              className="absolute top-1/2"
              style={{ fontSize: item.size }}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 0.95, 0.9, 0],
                x: [`${item.x}vw`, `${item.x + item.driftX}vw`],
                y: ['8vh', '-18vh', '50vh'],
                rotate: item.rotate,
                scale: [0.6, 1.1, 0.85]
              }}
              transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, repeatDelay: 0.08, ease: 'easeInOut' }}
            >
              {item.emoji}
            </motion.span>
          ))}
          <motion.h2
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{
              scale: [1, 1.03, 1],
              opacity: 1,
              textShadow: [
                '0 0 18px rgba(255, 182, 212, 0.35)',
                '0 0 32px rgba(255, 182, 212, 0.7)',
                '0 0 18px rgba(255, 182, 212, 0.35)'
              ]
            }}
            transition={{ delay: 0.2, duration: 2.8, repeat: Infinity, repeatType: 'mirror' }}
            className="relative z-10 text-4xl md:text-6xl"
          >
            You said YES! 💍
          </motion.h2>
          <p className="relative z-10 mt-4 max-w-2xl text-lg text-pink-100 md:text-2xl">
            You just made my universe glow brighter. Let&apos;s make this Valentine&apos;s Day unforgettable.
          </p>
          <div className="relative z-10 mt-7 flex w-full max-w-xl flex-col items-center gap-4 rounded-xl border border-pink-200/40 bg-white/15 px-5 py-4 text-pink-100">
            <span className="text-sm uppercase tracking-[0.25em] text-pink-200">
              Our song, our moment
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
            <div className="mt-2 w-full overflow-hidden rounded-lg border border-pink-200/40 bg-black/40">
              <video
                src={activeVideoUrl}
                controls
                autoPlay
                className="h-60 w-full max-w-full rounded-lg object-cover md:h-72"
              />
              <p className="px-3 pb-2 pt-1 text-xs text-pink-100/80">
                Turn your volume up — this is our little movie together. 💗
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
