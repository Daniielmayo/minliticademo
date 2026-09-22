"use client";

import React, { useState } from 'react';
import { GeneralHeader } from './components/GeneralHeader';
import { GeneralFilters } from './components/GeneralFilters';
import { GeneralKPIs } from './components/GeneralKPIs';
import { GeneralCharts } from './components/GeneralCharts';
import { GeneralTable } from './components/GeneralTable';
import { productionRecords } from '../constants';

export const ProductionGeneral = () => {
  const [selectedTitle, setSelectedTitle] = useState('Todos');
  const [selectedMine, setSelectedMine] = useState('Todos');
  const [period, setPeriod] = useState('01 Oct - 31 Oct 2023');

  // Filter logic
  const filteredData = productionRecords.filter(record => {
    const matchesTitle = selectedTitle === 'Todos' || record.titulo === selectedTitle;
    const matchesMine = selectedMine === 'Todos' || record.minaFrente === selectedMine;
    return matchesTitle && matchesMine;
  });

  return (
    <div className="flex flex-col gap-lg">
      <GeneralHeader />
      <GeneralFilters
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
        selectedMine={selectedMine}
        setSelectedMine={setSelectedMine}
        period={period}
        setPeriod={setPeriod}
      />
      <GeneralKPIs />
      <GeneralCharts />
      <GeneralTable data={filteredData} />
    </div>
  );
};
