"use client";

import ShowErrors from "@/components/custom/showErrors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { convertToArray } from "@/lib/config";
import { navigate } from "@/hooks/navigate";
import { Leaf, MoveLeft } from "lucide-react";
import { lugife } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function Plant() {
  const gltf = useLoader(GLTFLoader, "/models/monstera_deliciosa.glb");
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

export function UserSignInForm() {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState([]);

  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  const [processing, setProcessing] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailErrors([]);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordErrors([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (email.trim() === "") {
      setEmailErrors(["This field is required."]);
    }

    if (password.trim() === "") {
      setPasswordErrors(["This field is required."]);
    }

    if (email.trim() === "" || password.trim() === "") {
      setProcessing(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      toast({
        title: "Action completed successfully.",
        description:
          "Congratulations! Your account has been created. Get started by logging in.",
      });
      navigate("/");
    } else {
      const result = JSON.parse(res.error);
      const resultData = result?.data || {};

      setEmailErrors(convertToArray(resultData["email"] || []));
      setPasswordErrors(convertToArray(resultData["password"] || []));
    }

    setProcessing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-start w-full h-fit mb-8">
        <Button
          className="flex flex-row justify-start items-center text-[#16423C]"
          variant="ghost"
          asChild
        >
          <Link href={"/"}>
            <MoveLeft className="w-5 h-5" /> Back to home
          </Link>
        </Button>
      </div>
      <div className="flex flex-col justify-center items-start w-full h-fit">
        <Leaf className="h-8 w-8 text-[#16423C]" />
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mt-5">
          Welcome Back!
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-2 text-sm">
          Let&apos;s get you back in, provide us with your login details.
        </p>
      </div>
      <div className="flex flex-col justify-center items-start w-full h-fit gap-5">
        <div className="flex flex-row justify-center items-center w-full h-fit">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="jhonDoe@example.com"
              className={emailErrors.length > 0 ? "border-red-500" : ""}
              onChange={handleEmailChange}
              onKeyDown={handleKeyPress}
            />
            <ShowErrors errors={emailErrors} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center w-full h-fit gap-5">
          <div className="grid w-full items-center gap-1.5 h-full">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="password"
              className={passwordErrors.length > 0 ? "border-red-500" : ""}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
            />
            <ShowErrors errors={passwordErrors} />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-full h-fit">
          <Button
            className="w-full font-bold"
            loading={processing ? "true" : "false"}
            disabled={processing}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-fit">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t have an account?
          </p>
          <Button variant="link">
            <Link
              href={"/sign-up"}
              className="text-sm font-medium leading-none text-black"
            >
              Sign Up
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default function Component() {
  // const { data, status } = useSession();

  return (
    <main className="flex flex-row w-screen h-screen overflow-hidden">
      <div className="lg:flex flex-col justify-between items-start hidden h-full w-1/2 p-24 bg-[#E9EFEC]">
        <motion.div
          className={cn(
            "flex items-center text-3xl font-medium text-[#16423C]",
            lugife.className
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Link className="flex flex-row gap-1 items-center" href={"/"}>
            <Leaf className="h-8 w-8" />
            LEAFY
          </Link>
        </motion.div>
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0 }} // Start at scale 0
          animate={{ opacity: 1 }} // Animate to scale 1
          transition={{ delay: 0.5, duration: 1 }} // Duration of the animation
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
        <div className="relative z-20 mt-auto">
          <motion.h2
            className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-[#16423C]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to Leafy – Your Personal AI Garden Companion
          </motion.h2>
          <motion.blockquote
            className="space-y-2 text-[#6A9C89]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-sm">
              &ldquo;your AI-powered plant care companion. From real-time health
              monitoring to personalized care tips, Leafy helps you nurture your
              plants effortlessly. Sign in now to access your digital garden and
              watch your plants thrive!&rdquo;
            </p>
          </motion.blockquote>
        </div>
      </div>
      <div className="flex flex-col p-5 lg:p-24 items-center justify-center w-full lg:w-1/2">
        <div className="flex flex-col justify-center items-center w-full md:w-2/3 gap-10">
          <UserSignInForm />
        </div>
      </div>
    </main>
  );
}
