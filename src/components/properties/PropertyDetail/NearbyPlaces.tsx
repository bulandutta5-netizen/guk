'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Hospital, Train, MapPin } from 'lucide-react';

export interface NearbyPlace {
  name: string;
  distance: string;
  type?: string;
}

interface NearbyPlacesProps {
  schools: NearbyPlace[];
  hospitals: NearbyPlace[];
  metro: NearbyPlace[];
}

export default function NearbyPlaces({ schools, hospitals, metro }: NearbyPlacesProps) {
  const [activeTab, setActiveTab] = useState<'schools' | 'hospitals' | 'metro'>('schools');

  const tabs = [
    { id: 'schools', label: 'Schools', icon: <GraduationCap className="w-5 h-5" />, data: schools, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'hospitals', label: 'Hospitals', icon: <Hospital className="w-5 h-5" />, data: hospitals, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'metro', label: 'Metro', icon: <Train className="w-5 h-5" />, data: metro, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ] as const;

  const currentTab = tabs.find(t => t.id === activeTab);
  
  if (!schools.length && !hospitals.length && !metro.length) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-heading font-semibold text-navy mb-2">Nearby Places</h2>
      <div className="w-16 h-1 bg-gold mb-6 rounded"></div>

      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`relative flex-1 py-3 flex items-center justify-center gap-2 font-medium text-sm md:text-base transition-colors ${
              activeTab === tab.id ? 'text-navy' : 'text-gray-500 hover:text-navy-mid'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {currentTab?.data.length ? (
              currentTab.data.map((place, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-off-white border border-transparent hover:border-gray-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${currentTab.bg} ${currentTab.color}`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-navy-mid">{place.name}</span>
                  </div>
                  <span className="text-sm font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {place.distance}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-gray-400">
                No {currentTab?.label.toLowerCase()} information available.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
