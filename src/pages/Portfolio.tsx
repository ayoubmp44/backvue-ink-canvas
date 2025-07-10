
import { ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Corporate Brand Video",
      client: "Tech Startup",
      category: "Corporate",
      description: "Dynamic brand video showcasing company culture and values",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Product Launch Campaign",
      client: "E-commerce Brand",
      category: "Marketing",
      description: "High-impact product showcase with motion graphics",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Documentary Series",
      client: "Non-Profit Organization", 
      category: "Documentary",
      description: "Compelling storytelling for social impact campaign",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Social Media Content",
      client: "Lifestyle Brand",
      category: "Social Media",
      description: "Engaging short-form content optimized for social platforms",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Training Videos",
      client: "Healthcare Company",
      category: "Educational",
      description: "Professional training modules with clear visual communication",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Event Highlights",
      client: "Conference Organizer",
      category: "Event",
      description: "Dynamic event recap with interviews and key moments",
      image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=600&h=400&fit=crop"
    }
  ];

  const categories = ["All", "Corporate", "Marketing", "Documentary", "Social Media", "Educational", "Event"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Our Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our latest video editing projects and see how we transform 
              raw footage into compelling visual stories.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
            {categories.map((category) => (
              <Button 
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className="group bg-card border-border overflow-hidden hover:shadow-2xl transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="sm" className="bg-primary/90 hover:bg-primary">
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Client: {project.client}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                    View Project
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-6">
              Let's create something amazing together
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
