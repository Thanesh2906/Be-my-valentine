'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

const galleryImages = [
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1526275464258-4050644c3079?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?auto=format&fit=crop&w=900&q=80'
];

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const floaters = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        duration: randomBetween(10, 24),
        delay: randomBetween(0, 8),
        size: randomBetween(12, 28),
        emoji: i % 2 === 0 ? '💖' : '🌸'
      })),
    []
  );

  const confettiHearts = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: randomBetween(-45, 45),
        rotate: randomBetween(-120, 120),
        delay: randomBetween(0, 0.6),
        duration: randomBetween(2.2, 3.4)
      })),
    []
  );

  const dodgeNoButton = () => {
    setNoPosition({
      x: randomBetween(-140, 140),
      y: randomBetween(-90, 90)
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fff1f5] via-[#ffdbe6] to-[#f4b8c9] text-wine">
      <div className="pointer-events-none absolute inset-0">
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
            A little surprise for you
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-4xl leading-tight text-ruby md:text-6xl"
          >
            Every heartbeat writes your name.
            <br />
            <span className="text-wine">Will you be my Valentine?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto mt-6 max-w-2xl text-base text-wine/80 md:text-lg"
          >
            I gathered our sweetest moments in a gallery below and wrapped this page in petals and love.
            Press reveal and step into our story.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 w-full"
        >
          <h2 className="mb-6 text-3xl text-ruby md:text-4xl">Our Polaroid Moments</h2>
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
            {galleryImages.map((src, index) => (
              <motion.figure
                key={src}
                className="group mb-6 break-inside-avoid rounded-2xl border border-white/50 bg-white/55 p-3 shadow-glass backdrop-blur"
                style={{ rotate: `${(index % 2 === 0 ? 1 : -1) * ((index % 5) + 1)}deg` }}
                whileHover={{ scale: 1.03, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 16 }}
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
                  Us, forever — #{index + 1}
                </figcaption>
              </motion.figure>
            ))}
          </div>
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
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Yes 💘
            </motion.button>
            <motion.button
              onMouseEnter={dodgeNoButton}
              onFocus={dodgeNoButton}
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: 'spring', stiffness: 420, damping: 16 }}
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
          {confettiHearts.map((item) => (
            <motion.span
              key={item.id}
              className="absolute top-1/2 text-3xl"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: `${item.x}vw`,
                y: ['0vh', '-20vh', '55vh'],
                rotate: item.rotate,
                scale: [0.6, 1.1, 0.9]
              }}
              transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, repeatDelay: 0.15 }}
            >
              💖
            </motion.span>
          ))}
          <motion.h2
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 text-4xl md:text-6xl"
          >
            You said YES! 💍
          </motion.h2>
          <p className="relative z-10 mt-4 max-w-2xl text-lg text-pink-100 md:text-2xl">
            You just made my universe glow brighter. Let&apos;s make this Valentine&apos;s Day unforgettable.
          </p>
          <div className="relative z-10 mt-7 rounded-xl border border-pink-200/40 bg-white/15 px-5 py-4 text-pink-100">
            🎵 Background music placeholder: <span className="italic">Our Song - Play when ready</span>
          </div>
        </motion.div>
      )}
    </main>
  );
}
