"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Activity,
  Award,
  Bean,
  Camera,
  Droplet,
  Facebook,
  Flower2,
  Instagram,
  Leaf,
  Linkedin,
  MoveDown,
  Pill,
  Sprout,
  Sun,
  Trees,
  TrendingUp,
  Twitter,
  UserRound,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { lugife } from "@/lib/config";

function Plant() {
  const gltf = useLoader(GLTFLoader, "/models/leafy_elegance.glb");
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={meshRef}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
    />
  );
}

function NavBar() {
  const parentVariants = {
    open: {
      opacity: 1,
      top: 0,
      transition: { staggerChildren: 0.25, delayChildren: 0.25 },
    },
    closed: {
      opacity: 0,
      top: "-100vh",
    },
  };

  const childrenYVariant = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0 },
  };

  const childrenXVariant = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-fit bg-[#E9EFEC] pt-5 px-5">
        <motion.div className="flex flex-row lg:container justify-between items-center w-full h-fit gap-4">
          <h1
            className={cn(
              "text-2xl text-bold text-start text-[#16423C]",
              lugife.className
            )}
          >
            LEAFY
          </h1>
          <div className="flex flex-row justify-end items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/sign-in">
                      <UserRound className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign-In / Sign-Up</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute flex flex-col justify-center items-center z-50 left-0 top-0 w-full h-screen overflow-x-hidden py-10 backdrop-blur-lg"
        initial={{
          opacity: 0,
          top: "-100vh",
        }}
        animate={isOpen ? "open" : "closed"}
        variants={parentVariants}
        exit={{
          opacity: 0,
          top: "-100vh",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="flex flex-col lg:container justify-between items-center w-full h-full px-5 lg:px-24 bg-transparent">
          <div className="flex flex-row justify-end items-center w-full h-fit gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center w-full h-fit gap-9">
            <div className="flex flex-col w-full lg:w-1/2 h-full justify-end items-start">
              <h2 className="scroll-m-20 border-b border-[#16423C] pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-[#16423C]">
                LEAFY
              </h2>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-2 text-[#16423C]">
                Smart Plant Care
              </h1>
              <blockquote className="mt-6 border-l-2 pl-6 italic text-[#16423C] border-[#16423C]">
                &quot;Grow with Care&quot;
              </blockquote>
            </div>
            <div className="flex flex-col w-full lg:w-1/2 justify-center items-start h-full gap-10">
              <motion.span variants={childrenYVariant}>
                <Button
                  asChild
                  variant="link"
                  className="flex flex-row gap-2 justify-center items-end"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl">
                      Home
                    </h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </Link>
                </Button>
              </motion.span>
              <motion.span variants={childrenYVariant}>
                <Button
                  asChild
                  variant="link"
                  className="flex flex-row gap-2 justify-center items-end"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="#about">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl">
                      About
                    </h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </Link>
                </Button>
              </motion.span>
              <motion.span variants={childrenYVariant}>
                <Button
                  asChild
                  variant="link"
                  className="flex flex-row gap-2 justify-center items-end"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="#features">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl">
                      Features
                    </h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </Link>
                </Button>
              </motion.span>
              <motion.span variants={childrenYVariant}>
                <Button
                  asChild
                  variant="link"
                  className="flex flex-row gap-2 justify-center items-end"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="#plans">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-7xl">
                      Plans
                    </h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </Link>
                </Button>
              </motion.span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center gap-5 w-full h-fit">
            <motion.div
              variants={childrenXVariant}
              className="flex flex-row justify-end items-center gap-2"
            >
              <Button
                asChild
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <Link href={"https://github.com/garybadwal"} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-github"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <Link
                  href={"https://www.instagram.com/garybadwal_/"}
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-instagram"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <Link
                  href={"https://www.linkedin.com/in/garybadwal"}
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <Link
                  href={"https://discord.com/users/GaryBadwal#9015/"}
                  target="_blank"
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="1.44"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="1"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z"
                        stroke="#000000"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function Home({ MotionCard }) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (!hasEntered) {
      // Trigger the first-time opacity transition
      setHasEntered(true);
    }
  }, [hasEntered]);

  return (
    <section
      className="lg:relative flex flex-col justify-center items-center gap-4 w-full lg:h-full lg:min-h-[95vh] rounded-b-[5%] bg-[#E9EFEC] pt-10 px-5"
      id="home"
    >
      <div className="flex lg:container flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col lg:flex-row justify-center items-center h-fit w-full gap-8">
          <div className="flex flex-col justify-center items-center lg:items-start h-fit w-full lg:w-1/3 gap-8">
            <motion.h1
              className={cn(
                "text-7xl text-center lg:text-start text-[#16423C]",
                lugife.className
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              SMART PLANT CARE
            </motion.h1>
            <motion.div
              className="flex flex-row justify-center items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Button>Get started</Button>
              <Button variant="ghost">Book a demo</Button>
            </motion.div>
          </div>

          <motion.div
            className="hidden md:flex w-full lg:w-1/3 lg:h-[75vh] h-fit"
            initial={{ opacity: 0 }} // Start at scale 0
            animate={{ opacity: 1 }} // Animate to scale 1
            transition={{ delay: 1.5, duration: 1 }} // Duration of the animation
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
              />
              <pointLight position={[-10, -10, -10]} />
              <Suspense fallback={null}>
                <Plant />
                <Environment preset="sunset" />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </motion.div>

          <div className="flex flex-col justify-center items-center lg:items-start h-fit w-full lg:w-1/3 gap-8">
            <motion.p
              className={cn(
                "text-md border-l-2 border-[#6A9C89] text-[#6A9C89] pl-6 items-center lg:text-start italic"
              )}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              – Your AI-Powered Digital Garden: Experience a personalized,
              interactive garden where cutting-edge AI helps you nurture your
              plants with real-time care, diagnosing diseases, and recommending
              the perfect remedies to keep your plants healthy and thriving.
            </motion.p>
            <div className="flex flex-col gap-2 w-full h-fit">
              <div className="flex lg:flex-row flex-col w-full h-fit">
                <MotionCard
                  className="w-full lg:w-1/2 bg-transparent shadow-none border-none"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <CardHeader className="gap-3 pb-0">
                    <Avatar className="bg-[#16423C]">
                      <AvatarFallback className="bg-[#16423C] text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                          />
                        </svg>
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-bold text-xl text-[#16423C]">
                      Real-Time Plant Health Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#6A9C89]">
                      Get instant updates on your plants&apos; health with
                      AI-driven diagnostics.
                    </CardDescription>
                  </CardContent>
                </MotionCard>
                <MotionCard
                  className="w-full lg:w-1/2 bg-transparent shadow-none border-none"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <CardHeader className="gap-3 pb-0">
                    <Avatar className="bg-[#16423C]">
                      <AvatarFallback className="bg-[#16423C] text-white">
                        <Activity className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-bold text-xl text-[#16423C]">
                      Personalized Care Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#6A9C89]">
                      Tailored watering, sunlight, and soil tips based on your
                      plant&apos;s specific needs.
                    </CardDescription>
                  </CardContent>
                </MotionCard>
              </div>
              <div className="flex lg:flex-row flex-col w-full h-fit">
                <MotionCard
                  className="w-full lg:w-1/2 bg-transparent shadow-none border-none"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <CardHeader className="gap-3 pb-0">
                    <Avatar className="bg-[#16423C]">
                      <AvatarFallback className="bg-[#16423C] text-white">
                        <Pill className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-bold text-xl text-[#16423C]">
                      Disease Detection & Treatment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#6A9C89]">
                      Identify plant diseases and receive the best remedies to
                      restore health.
                    </CardDescription>
                  </CardContent>
                </MotionCard>
                <MotionCard
                  className="w-full lg:w-1/2 bg-transparent shadow-none border-none"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <CardHeader className="gap-3 pb-0">
                    <Avatar className="bg-[#16423C]">
                      <AvatarFallback className="bg-[#16423C] text-white">
                        <Sprout className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-bold text-xl text-[#16423C]">
                      Immersive Plant Growth Visuals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#6A9C89]">
                      Watch your plants thrive with dynamic animations that
                      reflect their health and growth progress in real-time.
                    </CardDescription>
                  </CardContent>
                </MotionCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 hidden lg:flex flex-row lg:container justify-between w-full h-fit items-end">
        <motion.footer
          className="text-sm text-[#6A9C89] w-fit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-black transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
          </div>
        </motion.footer>
        <motion.footer
          className="text-sm flex flex-col justify-center items-center gap-2 p-0 m-0 w-fit"
          initial={{ opacity: hasEntered ? 1 : 0, y: 0 }} // Initial position
          animate={{
            opacity: hasEntered ? 1 : 0, // Only play opacity on first render
            y: [0, 10, 0],
          }}
          transition={{
            opacity: { delay: 0.8, duration: 1, ease: "easeInOut" }, // Opacity only plays once
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.5, // Control the bounce speed
              ease: "easeInOut",
            },
          }}
        >
          <Button variant="ghost" className="p-0 rounded-full">
            <Avatar>
              <AvatarFallback className="bg-[#16423C] text-white">
                <MoveDown className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
          <p className="text-sm text-[#6A9C89]">Scroll Down</p>
        </motion.footer>
        <motion.footer
          className="text-sm text-[#6A9C89] w-fit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-black transition-colors">
              Instagram
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              Twitter
            </Link>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}

function PricingCard({
  MotionCard,
  icon,
  title,
  price,
  features,
  highlighted = false,
}) {
  return (
    <MotionCard
      className={cn(
        "flex flex-col justify-center items-start w-full h-full",
        highlighted ? "ring-2 ring-[#1a3c34]" : ""
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <CardHeader className="gap-3">
        <Avatar className="bg-[#16423C]">
          <AvatarFallback className="bg-[#16423C] text-white">
            {icon}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="font-bold text-2xl text-[#16423C]">
          {title}
        </CardTitle>
        <p className="text-4xl font-bold mb-6">
          {price}
          <span className="text-lg  font-normal">/month</span>
        </p>
      </CardHeader>
      <CardContent>
        <ul className="mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center mb-2">
              <Leaf className="h-5 w-5 mr-2 text-[#1a3c34]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mb-3 mt-auto w-full p-5 flex">
        <Button
          variant={highlighted ? "default" : "outline"}
          className="w-full"
        >
          Choose Plan
        </Button>
      </CardFooter>
    </MotionCard>
  );
}

function Plans({ MotionCard }) {
  return (
    <section
      className="flex flex-col justify-center items-center gap-4 w-full lg:h-full lg:min-h-screen lg:max-h-screen my-24 lg:my-0"
      id="plans"
    >
      <div className="flex flex-row justify-center gap-4 items-center h-fit mb-24">
        <Separator className="my-4" />
        <h2
          className={cn(
            "text-3xl font-serif font-bold text-center text-[#16423C] tracking-tight bg-[#E9EFEC] py-3 px-10 rounded-full -rotate-12",
            lugife.className
          )}
        >
          Plans
        </h2>
        <Separator className="my-4" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-4/5 justify-center items-center">
        <PricingCard
          MotionCard={MotionCard}
          icon={<Bean className="h-5 w-5" />}
          title="Seedling"
          price="$0.00"
          features={[
            "30-days free trial",
            "Up to 2 plants",
            "Basic plant care tips",
            "Limited health reports",
          ]}
          highlighted={true}
        />
        <PricingCard
          MotionCard={MotionCard}
          icon={<Sprout className="h-5 w-5" />}
          title="Sproutling"
          price="$9.99"
          features={[
            "Up to 5 plants",
            "Basic plant care advice",
            "Monthly health reports",
          ]}
        />
        <PricingCard
          MotionCard={MotionCard}
          icon={<Flower2 className="h-5 w-5" />}
          title="Bloom"
          price="$19.99"
          features={[
            "Up to 20 plants",
            "Advanced care recommendations",
            "Weekly health reports",
            "Disease detection",
          ]}
        />
        <PricingCard
          MotionCard={MotionCard}
          icon={<Trees className="h-5 w-5" />}
          title="Forest"
          price="$29.99"
          features={[
            "Unlimited plants",
            "Priority support",
            "Daily health reports",
            "Advanced analytics",
            "Community features",
          ]}
        />
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <Leaf className="h-5 w-5" />,
      title: "AI-Powered Plant Recognition",
      description:
        "Instantly identify plant species using our advanced AI-based image recognition. Simply upload a photo, and Leafy will provide detailed information about your plant’s species, care requirements, and common issues, ensuring you have everything you need to help it thrive.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Smart Watering Schedule",
      description:
        "Receive tailored watering schedules customized to your plant’s needs based on its species, environment, and local weather. Leafy’s AI monitors conditions to suggest the perfect time to water, ensuring your plants get the hydration they need without overwatering.",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Virtual Garden Planner",
      description:
        "Design and plan your dream garden with our intuitive 3D virtual tool. Visualize how different plants fit together in your space, explore combinations, and get AI-driven recommendations for the best plants for your environment based on light, soil, and climate.",
    },
    {
      icon: <Droplet className="h-5 w-5" />,
      title: "Moisture Tracking",
      description:
        "Monitor soil moisture levels in real-time, helping you ensure your plants are always receiving the optimal amount of water. Leafy’s AI offers insights and notifications when it’s time to water, preventing over- or under-watering, so your plants stay healthy.",
    },
    {
      icon: <Sun className="h-5 w-5" />,
      title: "Light Exposure Analysis",
      description:
        "Analyze your space’s sunlight patterns with Leafy’s light exposure tool to help you place plants in the best spots for their growth. Our system will assess whether your plants are getting enough light and offer recommendations for moving them if necessary.",
    },
    {
      icon: <Wind className="h-5 w-5" />,
      title: "Climate Control Integration",
      description:
        "Connect Leafy to your smart home devices to optimize your plant’s environment. Whether it's controlling humidity, temperature, or lighting, Leafy integrates seamlessly to maintain ideal conditions, ensuring your plants are in a space where they can flourish year-round.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      className="flex flex-col justify-center items-center gap-4 w-full lg:h-full lg:min-h-screen lg:max-h-screen bg-[#E9EFEC] lg:rounded-t-[5%] lg:rounded-b-[5%]"
      id="features my-24 lg:my-0"
    >
      <div className="flex flex-row justify-center gap-4 items-center h-fit mb-24 mt-24 lg:mt-0">
        <Separator className="my-4 bg-[#16423C]" />
        <h2
          className={cn(
            "text-3xl font-serif font-bold text-center text-[#E9EFEC] tracking-tight bg-[#16423C] py-3 px-10 rounded-full -rotate-12",
            lugife.className
          )}
        >
          Features
        </h2>
        <Separator className="my-4 bg-[#16423C]" />
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:container"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-fit border-none shadow-none bg-transparent">
              <CardHeader className="gap-3">
                <Avatar>
                  <AvatarFallback className="bg-[#16423C] text-white">
                    {feature.icon}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-semibold text-[#1a3c34]">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#1a3c34]/80">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function About() {
  const aboutFeatures = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Eco-Friendly",
      description:
        "We're committed to promoting sustainable plant care practices.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community-Driven",
      description:
        "Join a thriving community of plant enthusiasts and experts.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Continuous Improvement",
      description:
        "Our AI is constantly learning and improving to serve you better.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Award-Winning",
      description: "Recognized for innovation in plant care technology.",
    },
  ];

  const aboutContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const aboutItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };
  return (
    <section
      className="flex flex-col justify-center items-center gap-4 w-full lg:h-full lg:min-h-screen lg:max-h-screen my-24 lg:my-0"
      id="about"
    >
      <div className="flex flex-row justify-center gap-4 items-center h-fit mb-10">
        <Separator className="my-4" />
        <h2
          className={cn(
            "text-3xl font-serif font-bold text-center text-[#16423C] tracking-tight bg-[#E9EFEC] py-3 px-10 rounded-full -rotate-12",
            lugife.className
          )}
        >
          About
        </h2>
        <Separator className="my-4" />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={aboutContainerVariants}
        >
          <motion.p
            className="text-lg text-center mb-24 text-[#1a3c34]/80 max-w-3xl mx-auto"
            variants={aboutItemVariants}
          >
            Leafy is on a mission to revolutionize plant care through AI-powered
            technology. We believe that everyone can be a successful plant
            parent with the right tools and knowledge.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutFeatures.map((feature, index) => (
              <motion.div key={index} variants={aboutItemVariants}>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#1a3c34] text-[#e8f3f1] p-3 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#1a3c34]">
                    {feature.title}
                  </h3>
                  <p className="text-[#1a3c34]/80">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-24 text-center"
            variants={aboutItemVariants}
          >
            <p className="text-lg text-[#1a3c34]/80 mb-6">
              Join us in creating a greener, healthier world - one plant at a
              time.
            </p>
            <Button>Join Leafy Community</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full bg-[#1a3c34] text-[#e8f3f1]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8" />
              <span className={cn("text-2xl font-bold", lugife.className)}>
                Leafy
              </span>
            </Link>
            <p className="text-sm text-[#e8f3f1]/80">
              Your AI-powered plant care companion. Nurture your green friends
              with cutting-edge technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Features", "Pricing", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-sm hover:text-[#e8f3f1]/60 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm hover:text-[#e8f3f1]/60 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates and tips.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-[#e8f3f1]/10 border-[#e8f3f1]/20 text-[#e8f3f1] placeholder-[#e8f3f1]/50"
              />
              <Button
                type="submit"
                className="w-full bg-[#e8f3f1] text-[#1a3c34] hover:bg-[#e8f3f1]/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8 bg-[#e8f3f1]/20" />
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-[#e8f3f1]/60">
            © {new Date().getFullYear()} Leafy. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="text-[#e8f3f1]/60 hover:text-[#e8f3f1] transition-colors"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  const MotionCard = motion.create(Card);

  return (
    <main className="flex flex-col justify-start items-center w-screen h-screen overflow-x-hidden">
      <NavBar />
      <Home MotionCard={MotionCard} />
      <About />
      <Features />
      <Plans MotionCard={MotionCard} />
      <Footer />
    </main>
  );
}
