import { useState, useRef } from "react";
import gsap from "gsap";
import "./App.css"
import { useGSAP } from "@gsap/react";
import pink from "./assets/do1.png"
import brown from "./assets/do2.png"
import blue from "./assets/do3.png"

const donuts = [
  {
    id: "strawberry",
    name: "Strawberry",
    desc: "Raised ring donut with strawberry frosting and colorful round sprinkles",
    color: "#ffd9e0",
    accent: "#ff3d8a",
    image: pink, // transparent png
  },
  {
    id: "chocolate",
    name: "Chocolate",
    desc: "Raised ring donut with chocolate frosting and colorful round sprinkles",
    color: "#e5c5a8",
    accent: "#6b3a2a",
    image: brown,
  },
  {
    id: "blueberry",
    name: "Blueberry",
    desc: "Raised ring donut with blueberry frosting and colorful round sprinkles",
    color: "#a8d8ea",
    accent: "#2a7fff",
    image: blue,
  },
];

export default function DonutHero() {
  const [active, setActive] = useState(0);
  const container = useRef();
  const bigDonutRef = useRef();
  const textRef = useRef();

  const changeDonut = (index) => {
    if (index === active) return;

    const next = donuts[index];
    const tl = gsap.timeline();

 
    tl.to(textRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power3.in"
    })

   .to(bigDonutRef.current, {
      scale: 0.5,
      rotation: -90,
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => setActive(index)
    }, "<")
  
   .to(container.current, {
      backgroundColor: next.color,
      duration: 0.6,
      ease: "power2.inOut"
    }, "<")
  
   .fromTo(bigDonutRef.current,
      { scale: 0.5, rotation: 90, y: -100, opacity: 0 },
      { scale: 1, rotation: 0, y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.7)" }
    )
 
   .fromTo(textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
      "-=0.4"
    );
  };

  return (
    <>
  
<header>
  <nav
    className="relative z-20 min-h-[68px] px-4 py-2 md:px-8"
    style={{
      backgroundColor: donuts[active].color,
      transition: "background-color 0.3s ease",
    }}
    aria-label="Main navigation"
  >
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">

      <a
        href="#"
        className="text-2xl font-extrabold tracking-tight text-white focus:outline-none"
      >
        Donut
      </a>
      <ul className="hidden items-center gap-8 text-sm font-semibold text-white lg:flex">
        <li>
          <a href="#home" className="transition-opacity hover:opacity-75">
            Home
          </a>
        </li>
        <li>
          <a href="#about" className="transition-opacity hover:opacity-75">
            About
          </a>
        </li>
        <li>
          <a href="#story" className="transition-opacity hover:opacity-75">
            Our Story
          </a>
        </li>
      </ul>
      <a
        href="#contact"
        className="rounded-lg border border-white/70 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
        style={{
          backgroundColor: "transparent",
        }}
      >
        Contact
      </a>

    </div>
  </nav>
</header>

  
    <div ref={container} className="min-h-screen p-8 flex items-center justify-between"
      style={{ backgroundColor: donuts[active].color, transition: "background-color 0.3s" }}>

      <div ref={textRef}>
        <p className="text-xs tracking-widest uppercase opacity-60">Fresh - Sweet - Delicious</p>
        <h1 className="text-7xl font-black leading-none mt-2">
          {donuts[active].name} <br/> Donut
        </h1>
        <p className="max-w-sm mt-4 opacity-70">{donuts[active].desc}</p>

        <div className="flex gap-3 mt-6">
          <button style={{ backgroundColor: donuts[active].accent }}
            className="text-white px-6 py-2 rounded-full">Order Now</button>
          <button className="border px-6 py-2 rounded-full">View Menu</button>
        </div>

        <div className="flex gap-4 mt-10">
          {donuts.map((d, i) => (
            <button key={d.id} onClick={() => changeDonut(i)}
              className={`w-12 h-12 rounded-full p-1 border-2 ${i === active? "border-black" : "border-transparent"}`}>
              <img src={d.image} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      <img ref={bigDonutRef} src={donuts[active].image}
        className="w-[550px] h-[550px] object-contain drop-shadow-[0_0_80px_rgba(255,0,0,0.3)]" />
    </div>
      </>
  );
}
