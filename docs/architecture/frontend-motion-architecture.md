# SAMVAD PERCEPTION ADVISORY — Frontend & Motion Architecture

## 1. Design Philosophy: Executive Authority & Tactical Sophistication

SAMVAD represents elite reputation management, institutional diplomacy, and sovereign risk advisory. The frontend experience must convey:

- **Discretion**: Deep obsidian surfaces (`#09090b`, `#050608`), subtle borders (`hsl(240, 4%, 16%)`), and muted typography.
- **Prestige**: Warm champagne/gold accents (`#c39651`, `#e0caa0`) applied with restraint.
- **Modernity**: Real-time 3D data visualization (Three.js/R3F) and fluid scroll kinematics.

---

## 2. Animation & Interaction Pipeline

To balance visual impact with zero layout shift and 60fps performance:

```
[User Scroll Action]
       │
       ▼
 [Lenis Engine]  ──(Normalizes Wheel/Touch inertia)
       │
       ├─────────────────────────────────┐
       ▼                                 ▼
 [GSAP ScrollTrigger]          [Framer Motion Islands]
 (Pinning, scrubs, text splits)  (Component enters, exits, hovers)
       │                                 │
       └────────────────┬────────────────┘
                        ▼
            [React Three Fiber Canvas]
        (Rotates Perception Network nodes
         tied to requestAnimationFrame)
```

1. **Lenis Smooth Scrolling**:
   - Manages virtual scroll inertia.
   - Synchronized with `requestAnimationFrame`.
   - Accessible: Automatically disabled or reduced when `prefers-reduced-motion: reduce` is detected.
2. **GSAP (GreenSock)**:
   - Reserved for complex timeline sequencing, SVG morphing, and pinned scroll-driven storytelling.
3. **Framer Motion**:
   - Used for micro-interactions, modal overlays, form state transitions, and staggered component mounting.
4. **Three.js & React Three Fiber (R3F)**:
   - Isolated in client-side canvas components (e.g. `PerceptionGlobe`).
   - WebGL context is suspended when out of viewport via `IntersectionObserver` to preserve battery and GPU memory.
