import { type MouseEvent, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { BookOpenCheck, Clock3, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 120, damping: 18 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 120, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  const scrollRotateX = useTransform(scrollYProgress, [0, 1], [14, 2]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 1], [-12, 8]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1.03, 0.92]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const mouseRotateY = useTransform(smoothPointerX, [-0.5, 0.5], [8, -8]);
  const mouseRotateX = useTransform(smoothPointerY, [-0.5, 0.5], [-6, 6]);
  const finalRotateX = useTransform([scrollRotateX, mouseRotateX], ([a, b]) => a + b);
  const finalRotateY = useTransform([scrollRotateY, mouseRotateY], ([a, b]) => a + b);

  const cardAY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cardBY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const cardCY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const orbLeftY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbRightY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const orbitAX = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orbitAY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const orbitBX = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const orbitBY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orbitCX = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const orbitCY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden gradient-hero pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={reduceMotion ? undefined : { y: orbLeftY }}
          className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          style={reduceMotion ? undefined : { y: orbRightY }}
          className="absolute -right-24 top-44 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.16),transparent_40%),radial-gradient(circle_at_80%_15%,rgba(251,191,36,0.14),transparent_38%),linear-gradient(to_bottom,rgba(255,255,255,0.35),transparent_42%)]" />
      </div>

      <div className="container relative mx-auto grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-10 px-4 py-12 md:px-6 lg:grid-cols-2 lg:gap-14">
        <motion.div style={reduceMotion ? undefined : { y: textY, opacity: textOpacity }} className="text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-accent-foreground shadow-soft backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />
            Adaptive Learning Platform
          </div>

          <h1 className="mx-auto mb-6 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:mx-0 lg:text-6xl">
            Learning that{" "}
            <span className="bg-gradient-to-r from-primary to-lumio-teal-dark bg-clip-text text-transparent">
              adapts to you
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground lg:mx-0">
            Lumio isn't just a classroom. It's an adaptive ecosystem for students to master
            skills, instructors to teach freely, and institutions to grow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link to="/signup">
              <Button variant="lumio-primary" size="lg">
                Get Started Free
              </Button>
            </Link>

            <Link to="/how-it-works">
              <Button variant="lumio-outline" size="lg">
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">50K+</span> Active Learners
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">1000+</span> Teachers
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">100+</span> Institutions
            </div>
          </div>
        </motion.div>

        <div
          className="relative mx-auto h-[28rem] w-full max-w-2xl [perspective:1400px] md:h-[34rem]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={
              reduceMotion
                ? undefined
                : { rotateX: finalRotateX, rotateY: finalRotateY, scale: sceneScale, y: sceneY }
            }
            className="relative h-full w-full [transform-style:preserve-3d]"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 blur-3xl" />

            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/40 bg-white/55 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.55)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />
              <img
                src="https://i.postimg.cc/k4kKT7Vp/hero-illustration-png.jpg"
                alt="Teacher guiding students in a modern classroom"
                className="h-full w-full object-cover object-center opacity-90"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-900/5 to-white/10" />
            </div>

            <motion.div
              style={reduceMotion ? undefined : { y: cardAY }}
              className="absolute left-4 top-4 rounded-2xl border border-white/40 bg-white/80 p-4 shadow-soft backdrop-blur md:left-6 md:top-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mastery</p>
              <p className="mt-1 text-2xl font-extrabold text-foreground">87%</p>
              <p className="mt-1 text-xs text-primary">+12% this week</p>
            </motion.div>

            <motion.div
              style={reduceMotion ? undefined : { y: cardBY }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-2xl border border-white/35 bg-slate-900/85 px-4 py-3 text-white shadow-2xl backdrop-blur md:px-5"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <BookOpenCheck className="h-4 w-4 text-emerald-300" />
                AI Session: Linear Functions
              </div>
            </motion.div>

            <motion.div
              style={reduceMotion ? undefined : { y: cardCY }}
              className="absolute right-4 top-12 rounded-2xl border border-primary/20 bg-primary/90 px-4 py-3 text-white shadow-soft md:right-6 md:top-14"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <TrendingUp className="h-4 w-4" />
                6 day streak
              </div>
            </motion.div>

            <motion.div
              aria-hidden="true"
              style={reduceMotion ? undefined : { x: orbitAX, y: orbitAY }}
              className="absolute -left-10 bottom-20 hidden h-20 w-40 rotate-[-16deg] rounded-2xl border border-white/35 bg-white/75 p-3 text-slate-800 shadow-soft backdrop-blur md:block"
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold">
                <Target className="h-3.5 w-3.5 text-primary" />
                Weekly Goal
              </div>
              <p className="mt-1 text-sm font-bold">12/15 lessons</p>
            </motion.div>
            <motion.div
              aria-hidden="true"
              style={reduceMotion ? undefined : { x: orbitBX, y: orbitBY }}
              className="absolute -right-6 top-24 hidden h-16 w-36 rotate-[18deg] rounded-2xl border border-white/30 bg-secondary/45 p-3 text-slate-900 shadow-soft backdrop-blur md:block"
            >
              <div className="flex items-center gap-2 text-[11px] font-semibold">
                <Clock3 className="h-3.5 w-3.5" />
                Avg study time
              </div>
              <p className="mt-1 text-sm font-bold">42 min/day</p>
            </motion.div>
            <motion.div
              aria-hidden="true"
              style={reduceMotion ? undefined : { x: orbitCX, y: orbitCY }}
              className="absolute left-20 -top-8 hidden h-14 w-28 rotate-[10deg] rounded-xl border border-primary/30 bg-primary/35 p-2 text-white shadow-soft backdrop-blur md:block"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                <BookOpenCheck className="h-3.5 w-3.5" />
                Live class
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={reduceMotion ? undefined : { opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium">Explore more</span>
          <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/50 p-1">
            <div className="h-2 w-1.5 animate-bounce-gentle rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
