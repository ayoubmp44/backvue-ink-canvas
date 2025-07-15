import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/useLanguage";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    projectDetails: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            business_type: formData.businessType,
            project_details: formData.projectDetails,
            status: 'new'
          }
        ]);

      if (error) throw error;

      toast({
        title: "نجح الإرسال!",
        description: t('messageSuccess'),
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        businessType: "",
        projectDetails: ""
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "خطأ",
        description: t('messageError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="glass-card border-0">
            <CardHeader className="text-center space-y-4 pb-8">
              <CardTitle className="text-4xl md:text-5xl font-bold gradient-text">
                {t('contactTitle')}
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground">
                {t('contactSubtitle')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium text-foreground">
                    {t('name')}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="glass-input text-base py-3"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium text-foreground">
                    {t('email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="glass-input text-base py-3"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-base font-medium text-foreground">
                    {t('businessType')}
                  </Label>
                  <Select 
                    value={formData.businessType} 
                    onValueChange={(value) => handleInputChange('businessType', value)}
                    required
                  >
                    <SelectTrigger className="glass-input text-base py-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="startup">{t('startup')}</SelectItem>
                      <SelectItem value="small-business">{t('smallBusiness')}</SelectItem>
                      <SelectItem value="enterprise">{t('enterprise')}</SelectItem>
                      <SelectItem value="agency">{t('agency')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDetails" className="text-base font-medium text-foreground">
                    {t('projectDetails')}
                  </Label>
                  <Textarea
                    id="projectDetails"
                    value={formData.projectDetails}
                    onChange={(e) => handleInputChange('projectDetails', e.target.value)}
                    placeholder={t('projectDetailsPlaceholder')}
                    required
                    className="glass-input min-h-[120px] text-base py-3 resize-none"
                    dir="rtl"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full glass-button py-6 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 border-0 mt-8"
                >
                  {isSubmitting ? t('sending') : t('sendMessage')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;