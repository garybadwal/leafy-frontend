"use client";

import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/authenticated";
import { useEffect, useState } from "react";
import ShowErrors from "@/components/custom/showErrors";
import { updateUserAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export default function Component() {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [firstNameErrors, setFirstNameErrors] = useState([]);

  const [lastName, setLastName] = useState("");
  const [lastNameErrors, setLastNameErrors] = useState([]);

  const [email, setEmail] = useState("");

  const [updateProfileProccessing, setUpdateProfileProcessing] =
    useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameErrors([]);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameErrors([]);
  };

  useEffect(() => {
    if (user) {
      setFirstName(user?.user_metadata.first_name);
      setLastName(user?.user_metadata.last_name);
      setEmail(user?.user_metadata.email);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdateProfileProcessing(true);

    if (firstName.trim() === "") {
      setFirstNameErrors(["This field is required."]);
    }

    if (lastName.trim() === "") {
      setLastNameErrors(["This field is required."]);
    }

    if (firstName.trim() === "" || lastName.trim() === "") {
      setUpdateProfileProcessing(false);
      return;
    }

    const res = await updateUserAction({
      first_name: firstName,
      last_name: lastName,
    });

    if (res?.status == 200) {
        debugger;
      toast({
        title: "Success",
        description: "User profile is updated successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "Something went wrong while submitting your data, Please try again later!",
      });
    }

    setUpdateProfileProcessing(false);
  };

  return (
    <div className='space-y-8'>
      <section className="flex flex-col justify-start items-start w-full bg-neutral-50 p-10 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        <p className="text-sm text-gray-500 mb-6">
          Your profile is a record of your personal information that defines who
          you are.
        </p>
        <div className="flex flex-col space-y-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="first_name"
              placeholder="Jhon"
              defaultValue={firstName}
              className={firstNameErrors.length > 0 ? "border-red-500" : ""}
              onChange={handleFirstNameChange}
            />
            <ShowErrors errors={firstNameErrors} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="last_name"
              placeholder="Doe"
              defaultValue={lastName}
              className={lastNameErrors.length > 0 ? "border-red-500" : ""}
              onChange={handleLastNameChange}
            />
            <ShowErrors errors={lastNameErrors} />
          </div>
          <Button
            className="ml-auto mr-0"
            loading={updateProfileProccessing ? "true" : "false"}
            disabled={updateProfileProccessing}
            onClick={handleSubmit}
          >
            {updateProfileProccessing ? (
              <>
                <LoaderCircle className="h-6 w-6 animate-spin me-2" />
                Updating Profile...
              </>
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col justify-start items-start w-full bg-neutral-50 p-10 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Change Password</h2>
        <p className="text-sm text-gray-500 mb-6">
          You can change your password for security reasons or reset it if you
          forget it.
        </p>
        <div className="flex flex-col space-y-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
                <span className="sr-only">
                  {showCurrentPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
                <span className="sr-only">
                  {showNewPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <Button className="ml-auto mr-0">Update Password</Button>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col justify-start items-start w-full bg-red-100 p-10 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Delete Account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Permanently remove your account and all associated data. This action
          cannot be undone.
        </p>
        <Button variant="destructive">Remove Account</Button>
      </section>
    </div>
  );
}
