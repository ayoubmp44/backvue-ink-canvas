
import { ArrowRight, Users, Target, Palette, Globe, CheckCircle, Star, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      icon: <Users className="h-8 w-8" />,
      title: t('socialMedia'),
      description: t('socialMediaDesc')
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: t('paidAds'),
      description: t('paidAdsDesc')
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: t('webDev'),
      description: t('webDevDesc')
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: t('branding'),
      description: t('brandingDesc')
    }
  ];

  const whyChooseFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: t('localTeam'),
      description: t('localTeamDesc')
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: t('affordable'),
      description: t('affordableDesc')
    },
    {
      icon: <ArrowRight className="h-6 w-6" />,
      title: t('fastDelivery'),
      description: t('fastDeliveryDesc')
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t('personalizedStrategy'),
      description: t('personalizedStrategyDesc')
    }
  ];

  const featuredWork = [
    {
      title: t('foodPackaging'),
      image: "/placeholder.svg",
      category: "Branding"
    },
    {
      title: t('clothingShop'),
      image: "/placeholder.svg", 
      category: "Social Media"
    },
    {
      title: t('fitnessGym'),
      image: "/placeholder.svg",
      category: "Digital Marketing"
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
              {t('heroTitle')}
              <br />
              {t('heroTitleSecond')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://wa.me/212123456789', '_blank')}
              >
                {t('startProject')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border hover:bg-accent transition-all duration-300"
                onClick={() => navigate("/portfolio")}
              >
                {t('viewWork')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t('aboutTitle')}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('aboutDesc')}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('whatWeDo')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('servicesSubtitle')}
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

      {/* Why Choose Backvue */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('whyChooseTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 text-primary flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('featuredWorkTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWork.map((work, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-105 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/60">{work.category}</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{work.title}</h3>
                  <p className="text-muted-foreground text-sm">{work.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t('testimonialTitle')}
          </h2>
          <Card className="bg-card border-border max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-muted-foreground italic mb-4">
                "{t('testimonialText')}"
              </p>
              <p className="font-semibold">- Local Business Owner</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t('finalCtaTitle')}
          </h2>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open('https://wa.me/212123456789', '_blank')}
          >
            {t('finalCtaButton')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold gradient-text">Backvue</h3>
            </div>
            <div className="flex items-center space-x-6">
              <a 
                href="https://instagram.com/backvue" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5 mr-2" />
                @backvue
              </a>
              <span className="text-muted-foreground">Agadir, Morocco</span>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2025 Backvue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
