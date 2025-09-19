import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArtisanDetailsForm = ({ formData, onFormChange, errors }) => {
  const [dragActive, setDragActive] = useState(false);

  const craftCategories = [
    { value: 'pottery', label: 'Pottery & Ceramics' },
    { value: 'textiles', label: 'Textiles & Weaving' },
    { value: 'woodwork', label: 'Woodworking' },
    { value: 'metalwork', label: 'Metalwork & Jewelry' },
    { value: 'painting', label: 'Painting & Art' },
    { value: 'sculpture', label: 'Sculpture' },
    { value: 'leather', label: 'Leather Crafts' },
    { value: 'glass', label: 'Glasswork' },
    { value: 'embroidery', label: 'Embroidery & Needlework' },
    { value: 'basketry', label: 'Basketry & Weaving' },
    { value: 'stone', label: 'Stone Carving' },
    { value: 'other', label: 'Other Crafts' }
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'experienced', label: 'Experienced (5-10 years)' },
    { value: 'expert', label: 'Expert (10+ years)' }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileUpload(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newDocument = {
          id: Date.now(),
          name: file?.name,
          type: file?.type,
          size: file?.size,
          preview: e?.target?.result
        };
        
        const updatedDocuments = [...(formData?.verificationDocuments || []), newDocument];
        onFormChange('verificationDocuments', updatedDocuments);
      };
      reader?.readAsDataURL(file);
    }
  };

  const removeDocument = (documentId) => {
    const updatedDocuments = formData?.verificationDocuments?.filter(doc => doc?.id !== documentId) || [];
    onFormChange('verificationDocuments', updatedDocuments);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Artisan Details
        </h2>
        <p className="text-muted-foreground">
          Tell us about your craft and experience
        </p>
      </div>
      <div className="space-y-4">
        <Select
          label="Primary Craft Category"
          placeholder="Select your main craft type"
          options={craftCategories}
          value={formData?.craftCategory}
          onChange={(value) => onFormChange('craftCategory', value)}
          error={errors?.craftCategory}
          description="Choose the category that best represents your primary craft"
          required
          searchable
        />

        <Input
          label="Craft Specialization"
          type="text"
          placeholder="e.g., Traditional Rajasthani pottery, Modern abstract paintings"
          value={formData?.craftSpecialization}
          onChange={(e) => onFormChange('craftSpecialization', e?.target?.value)}
          error={errors?.craftSpecialization}
          description="Describe your specific style or technique"
          required
        />

        <Select
          label="Experience Level"
          placeholder="Select your experience level"
          options={experienceLevels}
          value={formData?.experienceLevel}
          onChange={(value) => onFormChange('experienceLevel', value)}
          error={errors?.experienceLevel}
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            About Your Craft <span className="text-error">*</span>
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            rows={4}
            placeholder="Share your story, inspiration, and what makes your craft unique..."
            value={formData?.craftBio}
            onChange={(e) => onFormChange('craftBio', e?.target?.value)}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-1">
            {errors?.craftBio && (
              <span className="text-sm text-error">{errors?.craftBio}</span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {formData?.craftBio?.length || 0}/500
            </span>
          </div>
        </div>

        <Input
          label="Workshop/Studio Location"
          type="text"
          placeholder="e.g., Jaipur, Rajasthan or Home Studio, Mumbai"
          value={formData?.workshopLocation}
          onChange={(e) => onFormChange('workshopLocation', e?.target?.value)}
          error={errors?.workshopLocation}
          description="Where do you create your crafts?"
          required
        />

        {/* Verification Documents Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Verification Documents
          </label>
          <p className="text-sm text-muted-foreground mb-4">
            Upload photos of your work, workshop, or certificates to build trust with buyers
          </p>

          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 bg-muted/30'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e?.target?.files) {
                  Array.from(e?.target?.files)?.forEach(handleFileUpload);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Icon name="Upload" size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Drop your images here, or <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB each
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Documents Preview */}
          {formData?.verificationDocuments && formData?.verificationDocuments?.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-medium text-foreground">Uploaded Documents</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {formData?.verificationDocuments?.map((doc) => (
                  <div key={doc?.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                      <Image
                        src={doc?.preview}
                        alt={doc?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(doc?.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                    >
                      <Icon name="X" size={14} />
                    </button>
                    <div className="mt-1">
                      <p className="text-xs font-medium text-foreground truncate">
                        {doc?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(doc?.size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors?.verificationDocuments && (
            <p className="text-sm text-error mt-2">{errors?.verificationDocuments}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDetailsForm;