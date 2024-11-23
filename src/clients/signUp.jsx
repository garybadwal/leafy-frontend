"use client";

import ShowErrors from "@/components/custom/showErrors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { navigate } from "@/hooks/navigate";
import { useToast } from "@/hooks/use-toast";
import { API_URL, convertToArray, lugife } from "@/lib/config";
import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, LoaderCircle, MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function UserSignUpForm() {
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [firstNameErrors, setFirstNameErrors] = useState([]);

  const [lastName, setLastName] = useState("");
  const [lastNameErrors, setLastNameErrors] = useState([]);

  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState([]);

  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState([]);

  const [processing, setProcessing] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameErrors([]);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameErrors([]);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailErrors([]);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordErrors([]);
  };

  const handleConfirmPassworChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordErrors([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (firstName.trim() === "") {
      setFirstNameErrors(["This field is required."]);
    }

    if (lastName.trim() === "") {
      setLastNameErrors(["This field is required."]);
    }

    if (email.trim() === "") {
      setEmailErrors(["This field is required."]);
    }

    if (password.trim() === "") {
      setPasswordErrors(["This field is required."]);
    }

    if (confirmPassword.trim() === "") {
      setConfirmPasswordErrors(["This field is required."]);
    }

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      confirmPassword.trim() === "" ||
      password.trim() === ""
    ) {
      setProcessing(false);
      return;
    }

    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordErrors(["Password does not match."]);
      setIsLoading(false);
      return;
    }

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();

      if (res.ok) {
        toast({
          title: "Action completed successfully.",
          description:
            response["message"] ||
            "Congratulations! Your account has been created. Get started by logging in.",
        });
        navigate("/sign-in");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            response["message"] ||
            "Something went wrong while submitting your data, Please validate your data and try again!",
        });
        const data = response?.data;

        if (data?.first_name) {
          setFirstNameErrors(convertToArray(data?.first_name));
        }

        if (data?.last_name) {
          setLastNameErrors(convertToArray(data?.last_name));
        }

        if (data?.email) {
          setEmailErrors(convertToArray(data?.email));
        }

        if (data?.password) {
          setPasswordErrors(convertToArray(data?.password));
        }
      }
    } catch (exception) {
      console.log("Error while creating user: ", exception);
    }

    setProcessing(false);
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
          Let&apos;s set your account!
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-2 text-sm">
          Tell us about your basic information so we can start by creating a
          account for you.
        </p>
      </div>
      <div className="flex flex-col justify-center items-start h-fit w-full gap-5">
        <div className="flex flex-col lg:flex-row justify-center items-center w-full h-fit gap-5">
          <div className="grid lg:w-1/2 w-full items-center gap-1.5 h-full">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              type="text"
              id="first_name"
              placeholder="Jhon"
              className={firstNameErrors.length > 0 ? "border-red-500" : ""}
              onChange={handleFirstNameChange}
            />
            <ShowErrors errors={firstNameErrors} />
          </div>
          <div className="grid lg:w-1/2 w-full items-center gap-1.5 h-full">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              type="text"
              id="last_name"
              placeholder="Doe"
              className={lastNameErrors.length > 0 ? "border-red-500" : ""}
              onChange={handleLastNameChange}
            />
            <ShowErrors errors={lastNameErrors} />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-full h-fit">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="jhonDoe@example.com"
              className={emailErrors.length > 0 ? "border-red-500" : ""}
              onChange={handleEmailChange}
            />
            <ShowErrors errors={emailErrors} />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center w-full h-fit gap-5">
          <div className="grid lg:w-1/2 w-full items-center gap-1.5 h-full">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="password"
              className={passwordErrors.length > 0 ? "border-red-500" : ""}
              onChange={handlePasswordChange}
            />
            <ShowErrors errors={passwordErrors} />
          </div>
          <div className="grid lg:w-1/2 w-full items-center gap-1.5 h-full">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              type="password"
              id="confirm_password"
              placeholder="Confirm password"
              className={
                confirmPasswordErrors.length > 0 ? "border-red-500" : ""
              }
              onChange={handleConfirmPassworChange}
            />
            <ShowErrors errors={confirmPasswordErrors} />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center w-full h-fit">
          <Button
            className="w-full font-bold"
            onClick={handleSubmit}
            loading={processing ? "true" : "false"}
            disabled={processing}
          >
            {processing ? (
              <>
                <LoaderCircle className="h-6 w-6 animate-spin me-2" />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-fit">
          <p className="text-sm text-muted-foreground">
            Already have an account?
          </p>
          <Button variant="link">
            <Link
              href={"/sign-in"}
              className="text-sm font-medium leading-none text-black"
            >
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

export default function Component() {
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
          <UserSignUpForm />
        </div>
      </div>
    </main>
  );
}
