"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Ahmed K.",
    role: "Professional Athlete",
    text: "The 90-day challenge completely rewired my metabolism. Dr. Akram's pharmaceutical background makes his nutrition protocols unmatched in the industry.",
    rating: 5
  },
  {
    name: "Sarah M.",
    role: "Fitness Enthusiast",
    text: "I was stuck at a plateau for 2 years. Within 4 weeks of the custom training program, I saw more definition than I had in my entire life.",
    rating: 5
  },
  {
    name: "Youssef B.",
    role: "Entrepreneur",
    text: "24/7 support isn't just a buzzword here. The constant adjustments to my diet based on my travel schedule saved my physique.",
    rating: 5
  }
];

export default function HoloTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.holo-card');
    
    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { 
          z: -1000, 
          y: 400, 
          opacity: 0, 
          rotateX: 45,
          scale: 0.8
        },
        {
          z: 0, 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 100%',
            end: 'top 40%',
            scrub: 1.5,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden [perspective:1500px]">
      {/* Cosmic Void Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-red/10 via-brand-dark to-brand-dark z-0" />
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold text-brand-red uppercase tracking-[0.3em] mb-4">Client Voices</h2>
          <h3 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">
            ECHOES FROM THE <br />
            <span className="font-serif italic font-light text-brand-red text-glow">Void</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 [transform-style:preserve-3d]">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="holo-card holo-panel p-10 rounded-[2.5rem] flex flex-col relative group hover:-translate-y-4 transition-transform duration-500"
            >
              <Quote className="text-brand-red/40 absolute top-8 right-8 w-16 h-16 rotate-12 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-brand-red text-brand-red drop-shadow-[0_0_8px_rgba(236,54,66,0.8)]" />
                ))}
              </div>
              
              <p className="text-white/90 text-lg font-light leading-relaxed mb-8 flex-grow relative z-10">
                "{t.text}"
              </p>
              
              <div className="border-t border-brand-red/20 pt-6 mt-auto relative z-10">
                <div className="font-display font-bold text-xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{t.name}</div>
                <div className="text-brand-red text-xs uppercase tracking-widest font-bold mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
