import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { Video, Palette, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      icon: Video,
      title: t('service1Title'),
      description: t('service1Description')
    },
    {
      icon: Palette,
      title: t('service2Title'),
      description: t('service2Description')
    },
    {
      icon: TrendingUp,
      title: t('service3Title'),
      description: t('service3Description')
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-fade-in-glass space-y-8">
            <div className="inline-flex items-center glass-card px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                {t('freeStrategy')}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">{t('heroTitle')}</span>
              <br />
              <span className="text-foreground">{t('heroTitleSecond')}</span>
              <br />
              <span className="primary-gradient-text">{t('heroTitleThird')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="glass-button px-8 py-6 text-lg font-medium text-foreground border-0 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate("/contact")}
              >
                {t('startProject')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-button px-8 py-6 text-lg font-medium"
                onClick={() => navigate("/portfolio")}
              >
                {t('viewWork')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            {t('servicesTitle')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="glass-card border-0 animate-fade-in-glass hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-card p-12 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('ctaSubtitle')}
            </p>
            <Button 
              size="lg" 
              className="glass-button px-8 py-6 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 border-0"
              onClick={() => navigate("/contact")}
            >
              {t('getStarted')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;