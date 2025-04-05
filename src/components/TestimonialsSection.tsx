
import { useState, useEffect } from "react";
import { User, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Johnson",
    role: "Pro PUBG Player",
    quote: "This platform has become my go-to for tracking my stats and connecting with my fans. The real-time rankings are incredibly accurate!"
  },
  {
    name: "Sarah Kim",
    role: "Twitch Partner",
    quote: "Since joining PUBG Central, my stream viewership has increased by 40%. The community here is incredibly supportive and engaged."
  },
  {
    name: "Mike Ramirez",
    role: "Tournament Organizer",
    quote: "We use PUBG Central exclusively for all our tournament streaming needs. The integration with Twitch is seamless and our participants love it."
  },
  {
    name: "Emma Chen",
    role: "Casual Gamer",
    quote: "I've discovered so many amazing PUBG streamers through this platform. It's completely changed how I experience the game!"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col justify-center h-full bg-gaming-dark p-8 rounded-l-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Join the PUBG Central Community</h2>
        <p className="text-gray-300">See what our members have to say</p>
      </div>
      
      <div className="relative h-64 flex items-center justify-center">
        <div className="bg-gaming-light p-6 rounded-lg shadow-lg border border-pubg/20 relative z-10">
          <Quote className="text-pubg h-8 w-8 mb-2 opacity-40" />
          <p className="text-white text-lg mb-4">{testimonials[currentIndex].quote}</p>
          <div className="flex items-center">
            <div className="bg-pubg rounded-full p-2 mr-3">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">{testimonials[currentIndex].name}</p>
              <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-pubg' : 'bg-gray-600'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
