
import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    projectDetails: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast({
        title: "Request Submitted!",
        description: "Thank you! We'll contact you within 24 hours to schedule your discovery call.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        businessType: "",
        projectDetails: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: "hello@backvue.com",
      action: "mailto:hello@backvue.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      details: "Los Angeles, CA",
      action: null
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Let's Create Together
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your raw footage into compelling stories? 
              Schedule a discovery call to discuss your project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-2xl">Request Discovery Call</CardTitle>
                  <p className="text-muted-foreground">
                    Tell us about your project and we'll schedule a call to discuss how we can help.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          required
                          className="bg-input border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="bg-input border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="small-business">Small Business</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                          <SelectItem value="agency">Marketing Agency</SelectItem>
                          <SelectItem value="non-profit">Non-Profit</SelectItem>
                          <SelectItem value="personal">Personal Project</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectDetails">Project Details *</Label>
                      <Textarea
                        id="projectDetails"
                        value={formData.projectDetails}
                        onChange={(e) => handleInputChange("projectDetails", e.target.value)}
                        placeholder="Tell us about your video editing needs, timeline, and goals..."
                        rows={5}
                        required
                        className="bg-input border-border resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit Request
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-card border-border animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <p className="text-muted-foreground">
                    Ready to discuss your project? Reach out through any of these channels.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <div className="text-primary">
                        {info.icon}
                      </div>
                      <div>
                        <p className="font-medium">{info.title}</p>
                        {info.action ? (
                          <a 
                            href={info.action}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card border-border animate-scale-in" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle>What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="text-sm">We'll review your request within 24 hours</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className="text-sm">Schedule a 30-minute discovery call</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className="text-sm">Receive a custom proposal for your project</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
