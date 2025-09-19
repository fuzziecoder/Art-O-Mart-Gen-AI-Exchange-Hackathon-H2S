import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIContentGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState('social');
  const [customPrompt, setCustomPrompt] = useState('');

  const contentTypes = [
    { id: 'social', label: 'Social Media Post', icon: 'Share2' },
    { id: 'product', label: 'Product Description', icon: 'FileText' },
    { id: 'story', label: 'Artisan Story', icon: 'BookOpen' },
    { id: 'email', label: 'Email Campaign', icon: 'Mail' }
  ];

  const sampleImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300',
      alt: 'Handwoven textile'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=300',
      alt: 'Wooden craft'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300',
      alt: 'Ceramic pottery'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
      alt: 'Metal jewelry'
    }
  ];

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setGeneratedContent('');
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          id: 'uploaded',
          url: e?.target?.result,
          alt: file?.name
        });
        setGeneratedContent('');
      };
      reader?.readAsDataURL(file);
    }
  };

  const generateContent = async () => {
    if (!selectedImage) return;

    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const mockContent = {
        social: `🎨 Discover the beauty of traditional craftsmanship! ✨\n\nEach piece tells a story of heritage, passion, and skilled artistry passed down through generations. From the careful selection of materials to the intricate details that make each creation unique.\n\n#HandmadeCrafts #ArtisanMade #TraditionalArt #SupportLocal #ArtOMart`,
        product: `This exquisite handcrafted piece represents the finest in traditional artisanship. Made using time-honored techniques passed down through generations, each item is carefully crafted with attention to detail and quality.\n\nKey Features:\n• Premium quality materials\n• Traditional crafting techniques\n• Unique design elements\n• Durable construction\n• Cultural significance\n\nPerfect for collectors and those who appreciate authentic handmade artistry.`,
        story: `Meet the artisan behind this beautiful creation. With over 20 years of experience in traditional craftsmanship, our artisan combines ancestral techniques with contemporary design sensibilities.\n\nBorn and raised in a family of craftspeople, they learned the art from their grandmother, who taught them that every piece should carry the soul of its maker. Today, they continue this legacy, creating pieces that bridge the gap between tradition and modernity.\n\nEach creation is a testament to their dedication to preserving cultural heritage while making it accessible to the modern world.`,
        email: `Subject: Discover Authentic Handcrafted Treasures\n\nDear Valued Customer,\n\nWe're excited to share our latest collection of handcrafted treasures, each piece telling a unique story of tradition and artistry.\n\nOur featured artisan has created something truly special - a piece that embodies centuries of cultural heritage while meeting contemporary aesthetic standards.\n\n🎨 Handcrafted with love and tradition\n✨ Unique design you won't find anywhere else\n🌟 Supporting local artisan communities\n\nExplore the collection and bring home a piece of authentic craftsmanship.\n\nBest regards,\nThe Art O Mart Team`
      };

      setGeneratedContent(mockContent?.[contentType]);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(generatedContent);
    // You could add a toast notification here
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-accent text-accent-foreground rounded-lg">
            <Icon name="Sparkles" size={20} />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            AI Content Generator
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Upload or select an image to generate promotional content using AI
        </p>
      </div>
      <div className="p-6">
        {/* Content Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Content Type
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {contentTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => setContentType(type?.id)}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors duration-200 ${
                  contentType === type?.id
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-foreground'
                }`}
              >
                <Icon name={type?.icon} size={16} />
                <span className="text-sm font-medium">{type?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Image Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Select or Upload Image
          </label>
          
          {/* Upload Button */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="outline" className="cursor-pointer">
                <Icon name="Upload" size={16} className="mr-2" />
                Upload Image
              </Button>
            </label>
          </div>

          {/* Sample Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleImages?.map((image) => (
              <div
                key={image?.id}
                onClick={() => handleImageSelect(image)}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage?.id === image?.id
                    ? 'border-primary shadow-warm-md'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="aspect-square">
                  <Image
                    src={image?.url}
                    alt={image?.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedImage?.id === image?.id && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Icon name="Check" size={16} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Prompt */}
        <div className="mb-6">
          <Input
            label="Custom Prompt (Optional)"
            type="text"
            placeholder="Add specific details or style preferences..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e?.target?.value)}
            description="Provide additional context to customize the generated content"
          />
        </div>

        {/* Generate Button */}
        <div className="mb-6">
          <Button
            variant="default"
            onClick={generateContent}
            disabled={!selectedImage || isGenerating}
            loading={isGenerating}
            className="w-full sm:w-auto"
          >
            <Icon name="Sparkles" size={16} className="mr-2" />
            {isGenerating ? 'Generating Content...' : 'Generate Content'}
          </Button>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Generated Content</h4>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  <Icon name="Copy" size={16} className="mr-2" />
                  Copy
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Edit2" size={16} className="mr-2" />
                  Edit
                </Button>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                {generatedContent}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIContentGenerator;