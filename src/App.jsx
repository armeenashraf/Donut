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

    // 1. Text out
    tl.to(textRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power3.in"
    })
    // 2. Big donut out + rotate
   .to(bigDonutRef.current, {
      scale: 0.5,
      rotation: -90,
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => setActive(index)
    }, "<")
    // 3. BG color morph
   .to(container.current, {
      backgroundColor: next.color,
      duration: 0.6,
      ease: "power2.inOut"
    }, "<")
    // 4. Big donut in (after state change)
   .fromTo(bigDonutRef.current,
      { scale: 0.5, rotation: 90, y: -100, opacity: 0 },
      { scale: 1, rotation: 0, y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.7)" }
    )
    // 5. Text in
   .fromTo(textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
      "-=0.4"
    );
  };

  return (
    <>
    <header>
   <nav class="flex py-2 px-4 md:px-8 min-h-[68px] relative z-20" aria-label="Main navigation" style={{ backgroundColor: donuts[active].color, transition: "background-color 0.3s" }}>
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 w-full">
         <a href="#" class="min-w-9 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded">
            <span class="sr-only text-black">Donut</span>
            <img src="https://readymadeui.com/logo-alt.svg" alt="readymadeui logo" class="h-9 w-auto" />
         </a>

         <div id="collapseMenu" tabindex="-1" class="hidden lg:block max-lg:bg-white dark:max-lg:bg-neutral-900 max-lg:border-l max-lg:border-slate-300 dark:max-lg:border-neutral-700 max-lg:w-1/2 max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto max-sm:w-full z-50 outline-none">

            <div class="py-2 px-4 flex justify-between items-center border-b border-slate-300 sticky top-0 bg-white dark:border-neutral-700 dark:bg-neutral-900 lg:hidden max-lg:min-h-[68px]">
               <a href="#" class="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 text-black rounded">
                  <span class="sr-only">Donut</span>
                  <img src="#" alt="readymadeui logo dialog" class="h-9 w-auto" />
               </a>
               <button type="button" aria-controls="collapseMenu" id="toggleClose" class="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded">
                  <span class="sr-only">Close main menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-4 fill-slate-900 dark:fill-slate-50" aria-hidden="true" viewBox="0 0 329.269 329">
                     <path d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.27 21.27 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0" data-original="#000000"></path>
                  </svg>
               </button>
            </div>

            <ul class="flex flex-col text-black gap-8 font-semibold text-sm text-slate-900 dark:text-slate-50 lg:flex-row max-lg:p-6">
               <li>
                  <a href="#" class="hover:text-pink-700 dark:hover:text-pink-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded text-black" aria-current="page">Home</a>
               </li>
               <li>
                  <a href="#" class="hover:text-pink-700 dark:hover:text-pink-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded text-black">About</a>
               </li>
               <li>
                  <a href="#" class="hover:text-pink-700 dark:hover:text-pink-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded text-black">OurStory</a>
               </li>
            </ul>
         </div>

         <div class="flex items-center gap-4">
            <a href="#" class="py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer text-white border border-pink-600 bg-[#FF2E93] hover:bg-pink-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">Contact</a>

            <button type="button" aria-controls="collapseMenu" aria-expanded="false" aria-haspopup="true" id="toggleOpen" class="cursor-pointer lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded">
               <span class="sr-only">Open main menu</span>
               <svg class="size-7 fill-slate-900 dark:fill-slate-50" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
               </svg>
            </button>
         </div>
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