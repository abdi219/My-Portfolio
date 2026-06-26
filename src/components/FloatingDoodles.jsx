import React from "react";
import "./FloatingDoodles.css";

/* ─── SVG shapes ────────────────────────────────────────────────────────────── */
const SHAPES = {
  brain:       <path d="M24 6C16 6 10 12 10 18c0 4 2 7 4 9-2 1-4 3-4 6 0 6 5 10 11 10h6c6 0 11-4 11-10 0-3-2-5-4-6 2-2 4-5 4-9 0-6-6-12-14-12zm0 37V28m-4-10c0-2 2-4 4-4s4 2 4 4" strokeLinecap="round" strokeLinejoin="round"/>,
  brackets:    <path d="M18 10l-6 0 0 14 6 14M30 10l6 0 0 14-6 14M21 30l6-12" strokeLinecap="round" strokeLinejoin="round"/>,
  gradcap:     <path d="M8 22l16-8 16 8-16 8zM32 26v10c0 0-4 4-8 4s-8-4-8-4V26M40 22v10m-2 3l2-3 2 3" strokeLinecap="round" strokeLinejoin="round"/>,
  pencil:      <path d="M10 38l4-12 20-18c2-2 6 0 6 2s-2 4-4 4L16 34zM14 26l8 8" strokeLinecap="round" strokeLinejoin="round"/>,
  circuit:     <path d="M10 24h6M32 24h6M24 10v6M24 32v6M16 24l4-4h8M28 20l4 4M32 24l-4 4h-8M20 28l-4-4M22 22h4v4h-4z" strokeLinecap="round" strokeLinejoin="round"/>,
  atom:        <path d="M24 21a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM24 8v32M8 24h32M11.5 11.5l25 25M36.5 11.5l-25 25" strokeLinecap="round"/>,
  book:        <path d="M8 10h16v28H8zM24 10h16v28H24zM24 10v28M12 18h8M12 24h8M12 30h8M28 18h8M28 24h8M28 30h8" strokeLinecap="round" strokeLinejoin="round"/>,
  terminal:    <path d="M6 10h36v28H6zM6 16h36M12 26l6-4-6 8M20 30h8" strokeLinecap="round" strokeLinejoin="round"/>,
  folder:      <path d="M6 16v22h36V18H22l-4-6H6zM6 20h36" strokeLinecap="round" strokeLinejoin="round"/>,
  gear:        <path d="M24 16a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM24 10v4M24 34v4M10 24h4M34 24h4M14.3 14.3l2.8 2.8M30.8 30.8l2.9 2.9M14.3 33.7l2.8-2.8M30.8 17.2l2.9-2.9" strokeLinecap="round"/>,
  gitbranch:   <path d="M16 10v20M28 14v10M16 30c0 0 6 0 12-6M16 10c0 0-2-2 0-4s0 4 0 4zM28 14c0 0-2-2 0-4s0 4 0 4zM16 30c0 0-2 2 0 4s0-4 0-4z" strokeLinecap="round" strokeLinejoin="round"/>,
  code:        <path d="M16 14L6 24l10 10M32 14l10 10-10 10M26 10l-4 28" strokeLinecap="round" strokeLinejoin="round"/>,
  puzzle:      <path d="M10 10h12v4c0 2 4 2 4 0v-4h12v12h-4c-2 0-2 4 0 4h4v12H26v-4c0-2-4-2-4 0v4H10V26h4c2 0 2-4 0-4h-4z" strokeLinecap="round" strokeLinejoin="round"/>,
  star:        <path d="M24 8l3.5 10H38l-8 6.5 3 10.5-9-6.5-9 6.5 3-10.5-8-6.5h10.5z" strokeLinecap="round" strokeLinejoin="round"/>,
  medal:       <path d="M24 28c-6 0-10 4-10 9s4 9 10 9 10-4 10-9-4-9-10-9zM18 10l6 18M30 10l-6 18M14 10h20l-4-6H18zM21 37l2 2 4-6" strokeLinecap="round" strokeLinejoin="round"/>,
  scroll:      <path d="M12 10c0-2 2-4 4-4s4 2 4 4v28c0 2 2 4 4 4h14c2 0 4-2 4-4V10c0-2-2-4-4-4H16M20 14h18M20 20h18M20 26h12" strokeLinecap="round" strokeLinejoin="round"/>,
  sparkle:     <path d="M24 6l2 12 12-2-10 8 10 8-12-2-2 12-2-12-12 2 10-8-10-8 12 2z" strokeLinecap="round" strokeLinejoin="round"/>,
  ribbon:      <path d="M24 6c-6 0-12 4-12 10s6 10 12 10 12-4 12-10S30 6 24 6zM18 24l-4 16 10-6 10 6-4-16" strokeLinecap="round" strokeLinejoin="round"/>,
  diamond:     <path d="M24 6l16 16-16 20L8 22zM8 22h32" strokeLinecap="round" strokeLinejoin="round"/>,
  chess:       <path d="M18 38h12M16 38h16M20 30h8v8h-8zM24 8c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4zM20 16l2 8M28 16l-2 8M22 24h4M22 24l-2 6M26 24l2 6" strokeLinecap="round" strokeLinejoin="round"/>,
  lightbulb:   <path d="M24 6c-8 0-14 6-14 14 0 6 4 10 8 13v5h12v-5c4-3 8-7 8-13 0-8-6-14-14-14zM18 38h12M19 42h10M21 46h6M24 6v4M10 20H6M38 20h4" strokeLinecap="round" strokeLinejoin="round"/>,
  trophy:      <path d="M16 8h16v18c0 6-4 10-8 10s-8-4-8-10zM16 14H10c0 0-2 6 4 10M32 14h6c0 0 2 6-4 10M24 36v4M18 40h12M18 44h12" strokeLinecap="round" strokeLinejoin="round"/>,
  people:      <path d="M16 16c0-3 2-5 4-5s4 2 4 5-2 5-4 5-4-2-4-5zM8 36c0-8 5-12 12-12M24 16c0-3 2-5 4-5s4 2 4 5-2 5-4 5-4-2-4-5zM28 24c7 0 12 4 12 12" strokeLinecap="round" strokeLinejoin="round"/>,
  crown:       <path d="M8 34h32v4H8zM8 28l6-14 10 8 10-8 6 14z" strokeLinecap="round" strokeLinejoin="round"/>,
  lightning:   <path d="M28 6L14 26h12l-4 16 18-24H28z" strokeLinecap="round" strokeLinejoin="round"/>,
  envelope:    <path d="M6 14h36v24H6zM6 14l18 14 18-14" strokeLinecap="round" strokeLinejoin="round"/>,
  paperplane:  <path d="M6 24l36-16-12 34-8-14zM22 28l20-20" strokeLinecap="round" strokeLinejoin="round"/>,
  chatbubble:  <path d="M8 10h32c1 0 2 1 2 2v18c0 1-1 2-2 2H20l-10 8v-8H8c-1 0-2-1-2-2V12c0-1 1-2 2-2zM14 22h4M22 22h4M30 22h4" strokeLinecap="round" strokeLinejoin="round"/>,
  pin:         <path d="M24 6c-6 0-12 5-12 11 0 8 12 25 12 25s12-17 12-25c0-6-6-11-12-11zM24 14c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z" strokeLinecap="round" strokeLinejoin="round"/>,
  signal:      <path d="M24 30c0 0-2-2 0-4s0 4 0 4zM18 34c-2-4-2-12 6-16s8 12 6 16M12 38c-4-6-4-20 12-28s16 22 12 28" strokeLinecap="round" strokeLinejoin="round"/>,
  phone:       <path d="M12 10h8l3 8-4 2c1 4 5 8 9 9l2-4 8 3v8c-14 2-28-12-26-26z" strokeLinecap="round" strokeLinejoin="round"/>,
};

/* ─── Section → shape rotation list ─────────────────────────────────────── */
const SECTION_SHAPES = {
  about:           ["brain","brackets","gradcap","pencil","circuit","atom","book","brain","brackets","gradcap","pencil","circuit","atom","book","brain","brackets","gradcap","pencil","circuit","atom"],
  projects:        ["terminal","folder","gear","gitbranch","puzzle","code","terminal","folder","gear","gitbranch","puzzle","code","terminal","folder","gear","gitbranch","puzzle","code","terminal","folder"],
  certificates:    ["star","medal","scroll","sparkle","ribbon","diamond","star","medal","scroll","sparkle","ribbon","diamond","star","medal","scroll","sparkle","ribbon","diamond","star","medal"],
  extracurricular: ["chess","lightbulb","trophy","people","crown","lightning","chess","lightbulb","trophy","people","crown","lightning","chess","lightbulb","trophy","people","crown","lightning","chess","lightbulb"],
  contact:         ["envelope","paperplane","chatbubble","pin","signal","phone","envelope","paperplane","chatbubble","pin","signal","phone","envelope","paperplane","chatbubble","pin","signal","phone","envelope","paperplane"],
};

/* ─── 20 positions spread across the FULL section interior ──────────────── */
const POSITIONS = [
  // top row
  { top:"5%",  left:"4%",   anim:"doodle-float-a", delay:"0s",    rot:"-8deg"  },
  { top:"6%",  left:"18%",  anim:"doodle-float-b", delay:"0.5s",  rot:"4deg"   },
  { top:"4%",  left:"36%",  anim:"doodle-float-c", delay:"1.1s",  rot:"-5deg"  },
  { top:"5%",  left:"55%",  anim:"doodle-float-a", delay:"1.7s",  rot:"9deg"   },
  { top:"6%",  left:"72%",  anim:"doodle-float-b", delay:"2.3s",  rot:"-3deg"  },
  { top:"5%",  left:"88%",  anim:"doodle-float-c", delay:"2.9s",  rot:"6deg"   },
  // upper-mid row
  { top:"28%", left:"2%",   anim:"doodle-float-b", delay:"3.4s",  rot:"7deg"   },
  { top:"25%", left:"16%",  anim:"doodle-float-a", delay:"3.9s",  rot:"-6deg"  },
  { top:"30%", left:"40%",  anim:"doodle-float-c", delay:"4.4s",  rot:"4deg"   },
  { top:"27%", left:"62%",  anim:"doodle-float-a", delay:"4.9s",  rot:"-9deg"  },
  { top:"28%", left:"86%",  anim:"doodle-float-b", delay:"5.4s",  rot:"5deg"   },
  // lower-mid row
  { top:"55%", left:"5%",   anim:"doodle-float-c", delay:"5.9s",  rot:"-4deg"  },
  { top:"52%", left:"24%",  anim:"doodle-float-a", delay:"6.4s",  rot:"8deg"   },
  { top:"58%", left:"48%",  anim:"doodle-float-b", delay:"6.9s",  rot:"-7deg"  },
  { top:"54%", left:"70%",  anim:"doodle-float-c", delay:"7.4s",  rot:"3deg"   },
  { top:"55%", left:"90%",  anim:"doodle-float-a", delay:"7.9s",  rot:"-5deg"  },
  // bottom row
  { top:"80%", left:"3%",   anim:"doodle-float-b", delay:"8.4s",  rot:"6deg"   },
  { top:"82%", left:"20%",  anim:"doodle-float-c", delay:"8.9s",  rot:"-8deg"  },
  { top:"80%", left:"52%",  anim:"doodle-float-a", delay:"9.4s",  rot:"5deg"   },
  { top:"82%", left:"80%",  anim:"doodle-float-b", delay:"9.9s",  rot:"-3deg"  },
];

/* Alternating sizes so it doesn't look uniform */
const SIZES = [20, 24, 18, 26, 22, 20, 24, 18, 26, 22, 20, 24, 18, 26, 22, 20, 24, 18, 26, 22];

const FloatingDoodles = ({ section }) => {
  const shapeKeys = SECTION_SHAPES[section];
  if (!shapeKeys) return null;

  return (
    <>
      {POSITIONS.map((pos, i) => {
        const key  = shapeKeys[i % shapeKeys.length];
        const size = SIZES[i % SIZES.length];
        const style = {
          top:            pos.top,
          left:           pos.left,
          animationDelay: pos.delay,
          "--rot":        pos.rot,
        };

        return (
          <div
            key={`${section}-doodle-${i}`}
            className={`doodle-item ${pos.anim}`}
            style={style}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 48 48"
              width={size}
              height={size}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              {SHAPES[key]}
            </svg>
          </div>
        );
      })}
    </>
  );
};

export default FloatingDoodles;
