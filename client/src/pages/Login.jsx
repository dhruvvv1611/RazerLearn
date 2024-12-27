import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e, type) => {
    const { name, value } = e.target;
    type === "login"
      ? setLoginInput({
          ...loginInput,
          [name]: value,
        })
      : setSignupInput({
          ...signupInput,
          [name]: value,
        });
  };

  const handleRegistration = (type) => {
    const inputData = type === "login" ? loginInput : signupInput;
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                SignUp to create an account and start using our services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeHandler(e, "signup")}
                  type="text"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeHandler(e, "signup")}
                  type="email"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => changeHandler(e, "signup")}
                  type="password"
                  required="true"
                  name="password"
                  value={signupInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("signup")}>
                Signup
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to your account and start using our services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeHandler(e, "login")}
                  type="email"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => changeHandler(e, "login")}
                  type="password"
                  required="true"
                  name="password"
                  value={signupInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
