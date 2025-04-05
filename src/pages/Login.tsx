
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Twitch, EyeOff, Eye, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import TestimonialsSection from "@/components/TestimonialsSection";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login form submitted:", data);
    toast({
      title: "Login Attempted",
      description: "This is a demo. Authentication is not yet implemented.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gaming-darker">
      {/* Left side - Testimonials (hidden on small screens) */}
      <div className="hidden md:block md:w-1/2 bg-gaming-dark">
        <TestimonialsSection />
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center space-x-2 mb-8">
            <Twitch className="h-6 w-6 text-twitch" />
            <span className="font-bold text-xl text-white">PUBG Central</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 mb-8">Log in to access your personalized dashboard</p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input 
                          placeholder="Enter your email" 
                          className="pl-10 bg-gaming-light border-gaming-light text-white" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter your password" 
                          className="pl-10 bg-gaming-light border-gaming-light text-white" 
                          {...field} 
                        />
                        <button 
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                          className="data-[state=checked]:bg-twitch" 
                        />
                      </FormControl>
                      <FormLabel className="text-gray-300 font-normal">Remember me</FormLabel>
                    </FormItem>
                  )}
                />
                <Link to="#" className="text-twitch text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button type="submit" className="w-full glow-button">
                Sign In
              </Button>
              
              <p className="text-center text-gray-400 mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="text-twitch hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
