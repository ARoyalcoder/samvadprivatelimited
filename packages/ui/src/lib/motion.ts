import type { Variants, Transition } from "framer-motion";

/**
 * SAMVAD Perception Advisory — Motion Choreography
 *
 * Cinematic, restrained physics reflecting high-stakes strategic intelligence.
 * No springy/bouncy cartoon easing; precise cubic beziers and damped springs.
 */

export const transitions = {
  luxury: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1], // Custom editorial cubic-bezier
  } satisfies Transition,
  editorial: {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1],
  } satisfies Transition,
  quick: {
    duration: 0.25,
    ease: [0.2, 0, 0, 1],
  } satisfies Transition,
  spring: {
    type: "spring",
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  } satisfies Transition,
  magneticSpring: {
    type: "spring",
    stiffness: 250,
    damping: 18,
    mass: 0.2,
  } satisfies Transition,
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.editorial,
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.luxury,
  },
};

export const revealClipVariants: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: transitions.luxury,
  },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
