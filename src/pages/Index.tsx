
import { ArrowRight, Play, Eye, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Play className="h-8 w-8" />,
      title: "Video Editing",
      description: "Professional video editing with cinematic quality and attention to detail."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Color Grading",
      description: "Advanced color correction and grading to enhance visual storytelling."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast Turnaround",
      description: "Quick delivery without compromising on quality or creative vision."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Premium Quality",
      description: "Industry-standard results that exceed expectations every time."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
              Premium Video
              <br />
              Editing Agency
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your raw footage into compelling stories that captivate audiences 
              and drive results for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/contact")}
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border hover:bg-accent transition-all duration-300"
                onClick={() => navigate("/portfolio")}
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What We Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional video editing services that bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 text-primary flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Something
            <span className="gradient-text"> Amazing?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and discover how we can bring your vision to life 
            with professional video editing.
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/contact")}
          >
            Schedule Discovery Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
