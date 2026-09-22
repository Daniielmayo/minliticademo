"use client";

import React, { useState, useMemo } from 'react';
import { TitlesTable } from './components/TitlesTable';
import { TitlesHeader } from './components/TitlesHeader';
import { TitlesKPIs } from './components/TitlesKPIs';
import { TitlesMap } from './components/TitlesMap';
import { TitleDetailCard } from './components/TitleDetailCard';
import { titlesData } from './constants';

export const Titles = () => {
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(titlesData[0]?.id ?? null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  // Filtered titles list based on search term and status dropdown
  const filteredTitles = useMemo(() => {
    return titlesData.filter(t => {
      const matchesSearch = 
        t.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.titular.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.tipo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'Todos' || t.estado === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const selectedTitle = useMemo(() => {
    return titlesData.find(t => t.id === selectedTitleId) ?? null;
  }, [selectedTitleId]);

  return (
    <div className="flex flex-col gap-lg">
      {/* 1. Header Section */}
      <TitlesHeader />

      {/* 2. Quick Portfolio KPIs */}
      <TitlesKPIs titles={titlesData} />

      {/* 3. Split Interactive Section: Map (65%) + Selected Title Summary Card (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
        <div className="lg:col-span-8">
          <TitlesMap 
            titles={filteredTitles} 
            selectedTitleId={selectedTitleId} 
            onSelectTitle={setSelectedTitleId} 
          />
        </div>
        <div className="lg:col-span-4">
          <TitleDetailCard 
            selectedTitle={selectedTitle} 
            onClearSelection={() => setSelectedTitleId(null)} 
          />
        </div>
      </div>

      {/* 4. Complete Catalog Table Section with Integrated Search & Dropdown Filter */}
      <TitlesTable 
        data={filteredTitles} 
        selectedTitleId={selectedTitleId}
        onSelectTitle={setSelectedTitleId}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
    </div>
  );
};