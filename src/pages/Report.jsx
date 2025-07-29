import React, { useState } from 'react';
import { Camera, Upload, MapPin, AlertTriangle, Home, Wrench, Building2, Ellipsis, RefreshCw } from 'lucide-react';

const Report = () => {
  const [formData, setFormData] = useState({
    issueType: 'public',
    description: '',
    category: '',
    severity: '',
    location: '',
    zipCode: '',
    hasImage: false
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({ ...prev, hasImage: true }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Report submitted successfully!');
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleInputChange('location', `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser');
    }
  };

  const refreshIssues = () => {
    // Simulate refresh
    alert('Issues refreshed!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Home className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Report a Community Issue</h1>
            <span className="text-blue-200">🏘️</span>
          </div>
          <button 
            onClick={refreshIssues}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm">Refresh Issues</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* AI Feature Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4 mb-8 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Camera className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                Snap a photo 📸 of the problem and our AI will analyze it automatically!
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Get instant categorization and severity assessment
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Report an Issue</h2>
                <p className="text-gray-600 text-sm">Help improve your community by reporting issues</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Issue Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Type of Issue</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => handleInputChange('issueType', 'public')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.issueType === 'public'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Public Issue</div>
                      <div className="text-sm opacity-75">(e.g., potholes, garbage)</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleInputChange('issueType', 'business')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.issueType === 'business'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Home className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Business/Private Issue</div>
                      <div className="text-sm opacity-75">(e.g., home repairs)</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Visual Evidence Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Visual Evidence</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-md" />
                    <button
                      onClick={() => {setImagePreview(null); setFormData(prev => ({...prev, hasImage: false}));}}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Click to upload or capture an image</p>
                      <p className="text-sm text-gray-500 mt-1">Max 5MB • JPEG, PNG</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-2">
                        <Upload className="h-4 w-4" />
                        <span>Upload Image</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                      </label>
                      <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center space-x-2">
                        <Camera className="h-4 w-4" />
                        <span>Capture Photo</span>
                        <input type="file" className="hidden" accept="image/*" capture="environment" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the issue in detail (max 500 characters)..."
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 transition-all duration-200"
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {formData.description.length}/500 characters
              </div>
            </div>

            {/* Category and Severity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'furniture', label: 'Furniture Damage', icon: Home },
                    { value: 'repair', label: 'Home Repair', icon: Wrench },
                    { value: 'property', label: 'Property Damage', icon: Building2 },
                    { value: 'other', label: 'Other', icon: Ellipsis }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => handleInputChange('category', value)}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        formData.category === value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <Icon className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-xs font-medium">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Severity</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'low', label: 'Low', color: 'green' },
                    { value: 'medium', label: 'Medium', color: 'blue' },
                    { value: 'high', label: 'High', color: 'orange' },
                    { value: 'critical', label: 'Critical', color: 'red' }
                  ].map(({ value, label, color }) => (
                    <button
                      key={value}
                      onClick={() => handleInputChange('severity', value)}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        formData.severity === value
                          ? `border-${color}-500 bg-${color}-50 text-${color}-700`
                          : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                    >
                      <div className="text-sm font-medium">{label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Street address or landmark"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="Zip code (e.g., 12345)"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 text-sm">OR</span>
                </div>
                <button
                  onClick={useCurrentLocation}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 p-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Use Current Location</span>
                </button>
                {!formData.location && !formData.zipCode && (
                  <p className="text-gray-500 text-sm text-center">No GPS coordinates available</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.description || !formData.category || !formData.severity}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white p-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Generating Report...</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5" />
                    <span>Generate Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Your report helps improve community safety and infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default Report;