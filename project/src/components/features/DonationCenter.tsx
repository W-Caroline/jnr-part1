import React, { useState } from 'react';
import { Heart, Package, DollarSign, BookOpen, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { useDonationStore } from '../../stores/donationStore';
import { Donation } from '../../types';

export function DonationCenter() {
  const [activeTab, setActiveTab] = useState<'donate' | 'impact'>('donate');
  const [donationType, setDonationType] = useState<'book' | 'educational-material' | 'monetary'>('book');
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    description: '',
    quantity: '',
    amount: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { createDonation, donations, isLoading } = useDonationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.donorName || !formData.donorEmail || !formData.description) return;

    setIsSubmitting(true);
    try {
      const donation: Omit<Donation, 'id' | 'createdAt'> = {
        donorName: formData.donorName,
        donorEmail: formData.donorEmail,
        itemType: donationType,
        description: formData.description,
        quantity: donationType !== 'monetary' ? parseInt(formData.quantity) || 1 : undefined,
        amount: donationType === 'monetary' ? parseFloat(formData.amount) || 0 : undefined,
        status: 'pending',
      };

      await createDonation(donation);
      setSubmitted(true);
      setFormData({
        donorName: '',
        donorEmail: '',
        description: '',
        quantity: '',
        amount: '',
      });
    } catch (error) {
      console.error('Failed to submit donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const donationTypes = [
    {
      type: 'book' as const,
      icon: BookOpen,
      title: 'Books & Stories',
      description: 'Share physical books, storybooks, or educational materials',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      type: 'educational-material' as const,
      icon: Package,
      title: 'Learning Materials',
      description: 'Art supplies, puzzles, games, and educational toys',
      color: 'from-green-500 to-emerald-500',
    },
    {
      type: 'monetary' as const,
      icon: DollarSign,
      title: 'Monetary Support',
      description: 'Help us purchase and distribute materials to children in need',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const impactStats = [
    { label: 'Children Reached', value: '2,847', icon: Heart },
    { label: 'Books Distributed', value: '1,234', icon: BookOpen },
    { label: 'Schools Supported', value: '45', icon: Package },
    { label: 'Active Donors', value: '189', icon: DollarSign },
  ];

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You! 🎉</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Your generous donation has been received and will help bring magical learning experiences 
              to children who need them most. We'll be in touch soon with updates on your impact!
            </p>
            <Button 
              onClick={() => setSubmitted(false)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Make Another Donation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-2xl shadow-lg">
            <Heart className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Share the <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Magic</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Help us bring enchanting stories, creative activities, and educational resources 
          to children in remote schools and communities around the world.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => setActiveTab('donate')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'donate'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Make a Donation
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === 'impact'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Our Impact
          </button>
        </div>
      </div>

      {activeTab === 'donate' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Types */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Donation Type</h2>
            <div className="space-y-4">
              {donationTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card
                    key={type.type}
                    className={`cursor-pointer transition-all ${
                      donationType === type.type
                        ? 'ring-2 ring-purple-500 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setDonationType(type.type)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`bg-gradient-to-r ${type.color} p-3 rounded-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                          <p className="text-gray-600">{type.description}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          donationType === type.type
                            ? 'bg-purple-500 border-purple-500'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Donation Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Donation Details</h2>
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.donorName}
                        onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.donorEmail}
                        onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder={
                        donationType === 'book'
                          ? 'e.g., 20 children\'s storybooks, ages 3-8'
                          : donationType === 'educational-material'
                          ? 'e.g., Art supplies, crayons, coloring books'
                          : 'How would you like your donation to be used?'
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {donationType !== 'monetary' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity (Optional)
                      </label>
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="Number of items"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Donation
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Impact Tab */
        <div className="space-y-8">
          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Impact Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Remote School in Kenya</h3>
                <p className="text-gray-600 mb-4">
                  Thanks to book donations, 150 children at Kibera Primary School now have access 
                  to colorful storybooks and educational materials that spark their imagination 
                  and improve literacy rates.
                </p>
                <div className="text-sm text-purple-600 font-medium">📚 234 books distributed</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Children's Home in Brazil</h3>
                <p className="text-gray-600 mb-4">
                  Art supplies and creative materials have transformed learning time at Casa da 
                  Esperança, where 45 children now enjoy daily creative workshops and storytelling sessions.
                </p>
                <div className="text-sm text-purple-600 font-medium">🎨 12 activity kits delivered</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}