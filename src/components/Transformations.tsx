import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  { img: "/books/WhatsApp Image 2026-02-25 at 12.28.03 AM (4).jpeg", name: "Sara", tag: "Female Program", isFemale: true },
  { img: "/books/WhatsApp Image 2026-02-25 at 12.28.06 AM.jpeg", name: "Yacine", tag: "Muscle Gain" },
  { img: "/books/WhatsApp Image 2026-02-25 at 12.28.03 AM (1).jpeg", name: "Farid", tag: "Fat Loss" },
  { img: "https://akramcoach.com/wp-content/uploads/2024/12/24-819x1024.png", name: "Ahmed", tag: "Fat Loss" },
  { img: "/books/transformation7mths.png", name: "Walid", tag: "Muscle Gain" },
  { img: "/books/photo_2024-12-28_02-39-43-818x1024 (2).webp", name: "Omar", tag: "90-Day Challenge" },
  { img: "https://akramcoach.com/wp-content/uploads/2024/12/17-1-819x1024.png", name: "Karim", tag: "Muscle Gain" },
  { img: "/books/WhatsApp Image 2026-02-25 at 12.28.02 AM.jpeg", name: "Amine", tag: "Muscle Gain" },
  { img: "/books/WhatsApp Image 2026-02-25 at 12.27.59 AM (1).jpeg", name: "Bilal", tag: "Muscle Gain" }
];

export default function Transformations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.trans-card');

    gsap.fromTo('.trans-title',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.trans-title',
          start: 'top 80%',
        }
      }
    );

    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100, rotateY: 15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="transformations" className="py-32 relative overflow-hidden perspective-1000">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="trans-title flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-brand-red uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-px bg-brand-red" /> Success Stories
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">
              REAL PEOPLE. <br />
              <span className="font-serif italic font-light text-brand-red">Real Results.</span>
            </h3>
          </div>
          <p className="text-white/50 max-w-sm text-lg font-light">
            Join hundreds of others who have transformed their lives through our science-based approach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 [transform-style:preserve-3d]">
          {transformations.map((item, index) => (
            <div
              key={index}
              className={`trans-card relative rounded-[2rem] overflow-hidden group border border-white/5 bg-white/5 ${index === 0 || index === 3 ? "aspect-[3/4]" : "aspect-square"
                }`}
            >
              <img
                src={item.img}
                alt={`${item.name} Transformation`}
                className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-lg">{item.name}</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-brand-red">{item.tag}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md text-white">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="px-12 py-5 rounded-full border border-white/20 font-bold hover:bg-white hover:text-brand-dark transition-all duration-300 tracking-wide">
            View All Transformations
          </button>
        </div>
      </div>
    </section>
  );
}
