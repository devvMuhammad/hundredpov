"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { useMutation } from "@tanstack/react-query";
import { submitOnboarding } from "@/actions/onboarding";
import { toast } from "sonner";

const formSchema = z.object({
  pubgUsername: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters"),
  platform: z.enum(["pc", "xbox", "ps4"], {
    required_error: "Please select a gaming platform",
  }),
  twitchUsername: z.string()
    .min(3, "Twitch username must be at least 3 characters")
    .max(25, "Twitch username cannot exceed 25 characters")
});

type FormValues = z.infer<typeof formSchema>;

const Onboarding = () => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: submitOnboarding,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      router.push("/lobby");
    },
    onError: (error) => {
      toast.error("Failed to update profile. Please try again.");
      console.error(error);
    }
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pubgUsername: "",
      platform: "pc",
      twitchUsername: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    mutate({
      pubg_username: data.pubgUsername,
      twitch_username: data.twitchUsername,
      platform: data.platform,
    });
  };

  return (
    <div className="min-h-screen bg-gaming-darker flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-md bg-gaming-light border border-pubg/20 rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Set Up Your Profile</h1>
          <p className="text-gray-400 mt-2">Help us personalize your experience</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pubgUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">PUBG Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your PUBG username"
                      {...field}
                      className="bg-gaming-darker border-pubg/30 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitchUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    <span>Twitch Username</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Twitch username"
                      {...field}
                      className="bg-gaming-darker border-pubg/30 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-white">Gaming Platform</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2 rounded-md border border-pubg/30 p-3 bg-gaming-darker">
                        <RadioGroupItem value="pc" id="pc" />
                        <label htmlFor="pc" className="flex flex-1 cursor-pointer items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icons.steam className="h-5 w-5 text-pubg" color="#f2a900" fill="#f2a900" />
                            <span className="text-white">PC / Steam</span>
                          </div>
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 rounded-md border border-pubg/30 p-3 bg-gaming-darker">
                        <RadioGroupItem value="xbox" id="xbox" />
                        <label htmlFor="xbox" className="flex flex-1 cursor-pointer items-center justify-between">
                          <div className="flex items-center gap-2">
                            {/* <Box className="h-5 w-5 text-pubg" /> */}
                            <Icons.xbox className="h-5 w-5 text-pubg" color="#f2a900" fill="#f2a900" />
                            <span className="text-white">Xbox</span>
                          </div>
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 rounded-md border border-pubg/30 p-3 bg-gaming-darker">
                        <RadioGroupItem value="ps4" id="ps4" />
                        <label htmlFor="ps4" className="flex flex-1 cursor-pointer items-center justify-between">
                          <div className="flex items-center gap-2">
                            {/* Using a different icon since PS4 is not available in lucide */}
                            <Icons.playstation className="h-5 w-5 text-pubg" />
                            <span className="text-white">PlayStation</span>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <Button
              type="submit"
              className="w-full glow-button"
              disabled={isPending}
            >
              {isPending ? "Setting Up..." : "Complete Setup"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Onboarding;
