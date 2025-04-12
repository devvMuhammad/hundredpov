"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Monitor,
  Gamepad2,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { createGame, CreateGameData } from "@/actions/games";

// Define the form schema with zod
const formSchema = z.object({
  name: z.string().min(3, "Game name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(300, "Description must be less than 300 characters"),
  map_name: z.enum(["erangel", "miramar", "sanhok", "vikendi", "karakin"], {
    required_error: "Please select a map",
  }),
  platform: z.enum(["pc", "xbox", "playstation", "mobile"], {
    required_error: "Please select a platform",
  }),
  game_mode: z.enum(["tpp", "fpp"], {
    required_error: "Please select a game mode",
  }),
  match_type: z.enum(["solo", "duo", "squad"], {
    required_error: "Please select a match type",
  }),
  region: z.enum(["eu", "sa", "na", "me", "krjp"], {
    required_error: "Please select a match type",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function HostGame() {
  const router = useRouter();

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      map_name: "erangel",
      platform: "pc",
      game_mode: "tpp",
      match_type: "squad",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateGameData) => createGame(data),
    onSuccess: (data) => {
      toast.success("Game created successfully!");
      router.push(`/game/${data.id}`);
    },
    onError: (error) => {
      toast.error("Failed to create game. Please try again.");
      console.error(error);
    }
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  // Platform icon mapping
  // const getPlatformIcon = (platform: string) => {
  //   switch (platform.toLowerCase()) {
  //     case 'pc':
  //       return <Monitor className="h-4 w-4" />;
  //     case 'xbox':
  //     case 'playstation':
  //       return <Gamepad2 className="h-4 w-4" />;
  //     case 'mobile':
  //       return <Smartphone className="h-4 w-4" />;
  //     default:
  //       return <Gamepad2 className="h-4 w-4" />;
  //   }
  // };

  return (
    <div className="min-h-screen bg-gaming-darker text-white pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8 gap-4">
          <Link href="/lobby">
            <Button variant="ghost" className="text-gray-300 hover:text-white p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Host Your Own Game</h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-pubg/20 bg-gaming-light">
            <CardHeader>
              <CardTitle className="text-white text-xl">Create a PUBG Match</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Game Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Game Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter game name" {...field} className="bg-gaming-darker border-gaming-darker text-white" />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          This will be displayed in the lobby list.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Game Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter game description" {...field} className="bg-gaming-darker border-gaming-darker text-white resize-none" />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Briefly describe your game session (max 300 characters).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Map Selection */}
                    <FormField
                      control={form.control}
                      name="map_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Map</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gaming-darker border-gaming-darker text-white">
                                <SelectValue placeholder="Select map" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gaming-light border-gaming-darker">
                              <SelectItem value="erangel" className="text-white">Erangel</SelectItem>
                              <SelectItem value="miramar" className="text-white">Miramar</SelectItem>
                              <SelectItem value="sanhok" className="text-white">Sanhok</SelectItem>
                              <SelectItem value="vikendi" className="text-white">Vikendi</SelectItem>
                              <SelectItem value="karakin" className="text-white">Karakin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-gray-400">
                            Choose the battlefield for your match.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Region */}
                    <FormField
                      control={form.control}
                      name="region"

                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Region</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gaming-darker border-gaming-darker text-white">
                                <SelectValue placeholder="Select region" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gaming-light border-gaming-darker">
                              <SelectItem value="na" className="text-white">North America</SelectItem>
                              <SelectItem value="sa" className="text-white">South America</SelectItem>
                              <SelectItem value="eu" className="text-white">Europe</SelectItem>
                              <SelectItem value="krjp" className="text-white">Korea and Japan</SelectItem>
                              <SelectItem value="asia" className="text-white">Asia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-gray-400">
                            Select the region for your match.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Platform */}
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Platform</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gaming-darker border-gaming-darker text-white">
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gaming-light border-gaming-darker">
                              <SelectItem value="pc" className="text-white flex items-center gap-2">
                                <Monitor className="h-4 w-4" /> PC
                              </SelectItem>
                              <SelectItem value="xbox" className="text-white flex items-center gap-2">
                                <Gamepad2 className="h-4 w-4" /> Xbox
                              </SelectItem>
                              <SelectItem value="playstation" className="text-white flex items-center gap-2">
                                <Gamepad2 className="h-4 w-4" /> PlayStation
                              </SelectItem>
                              <SelectItem value="mobile" className="text-white flex items-center gap-2">
                                <Smartphone className="h-4 w-4" /> Mobile
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-gray-400">
                            Select which platform this match is for.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Game Mode Selection */}
                  <FormField
                    control={form.control}
                    name="game_mode"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-white">Game Mode</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="tpp" />
                              </FormControl>
                              <FormLabel className="font-normal text-white cursor-pointer">
                                Third Person Perspective (TPP)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fpp" />
                              </FormControl>
                              <FormLabel className="font-normal text-white cursor-pointer">
                                First Person Perspective (FPP)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Match Type Selection */}
                  <FormField
                    control={form.control}
                    name="match_type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-white">Match Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="solo" />
                              </FormControl>
                              <FormLabel className="font-normal text-white cursor-pointer">
                                Solo
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="duo" />
                              </FormControl>
                              <FormLabel className="font-normal text-white cursor-pointer">
                                Duo
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="squad" />
                              </FormControl>
                              <FormLabel className="font-normal text-white cursor-pointer">
                                Squad
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-pubg hover:bg-pubg-light text-white font-medium"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Creating..." : "Create Game"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

