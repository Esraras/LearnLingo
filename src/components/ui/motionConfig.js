export const motionSpringHover = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
  mass: 0.95,
};

export const motionSpringPage = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 1,
};

export const motionSpringSoft = {
  type: 'spring',
  stiffness: 200,
  damping: 22,
  mass: 1,
};

export const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ...motionSpringPage, duration: 0.42 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { ...motionSpringPage, duration: 0.32 },
  },
};
