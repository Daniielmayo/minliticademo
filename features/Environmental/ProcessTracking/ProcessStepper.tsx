import React from 'react';
import { ProcessStateId } from '@/features/Environmental/types';

interface ProcessStepperProps {
  currentState: ProcessStateId;
  selectedState: string;
  onSelectState: (state: string) => void;
}

const states = [
  { id: 'A', label: 'Elaboración', icon: 'edit_document' },
  { id: 'B', label: 'Presentado', icon: 'file_present' },
  { id: 'C', label: 'Requerimientos', icon: 'warning' },
  { id: 'D', label: 'Aprobado', icon: 'check_circle' },
  { id: 'E', label: 'Rechazado', icon: 'cancel' }
];

const visibleStatesMap: Record<string, string[]> = {
  'A': ['A'],
  'B': ['A', 'B'],
  'C': ['A', 'B', 'C'],
  'D': ['A', 'B', 'C', 'D'],
  'E': ['A', 'B', 'C', 'E']
};

export const ProcessStepper = ({ currentState, selectedState, onSelectState }: ProcessStepperProps) => {
  
  const getStatusColor = (id: string, isCurrent: boolean, isAvailable: boolean) => {
    if (isCurrent) {
      if (id === 'A') return 'bg-[#FBBF24] text-white';
      if (id === 'B') return 'bg-[#3B82F6] text-white';
      if (id === 'C') return 'bg-error text-white';
      if (id === 'D') return 'bg-success-alert text-white';
      if (id === 'E') return 'bg-error text-white';
    }
    if (isAvailable) {
      return 'bg-primary/20 text-primary';
    }
    return 'bg-surface-container-high text-on-surface-variant';
  };

  const availableStates = visibleStatesMap[currentState] || [currentState];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white border border-slate-200/90 rounded-2xl p-lg shadow-md w-full gap-y-md">
      {states.map((state, index) => {
        const isCurrent = state.id === currentState;
        const isSelected = state.id === selectedState;
        const isAvailable = availableStates.includes(state.id);
        const colorClass = getStatusColor(state.id, isCurrent, isAvailable);
        const isLast = index === states.length - 1;

        return (
          <React.Fragment key={state.id}>
            <button 
              disabled={!isAvailable}
              onClick={() => onSelectState(state.id)}
              className={`flex flex-col items-center gap-sm relative z-10 transition-all ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'} ${isSelected ? 'scale-105 ring-4 ring-primary/20 rounded-xl p-2' : 'p-2'}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${colorClass} transition-all duration-300`}>
                <span className="material-symbols-outlined text-[28px]">{state.icon}</span>
              </div>
              <span className={`font-label-md text-center w-24 ${isCurrent ? 'font-bold text-on-surface' : 'text-on-surface-variant'}`}>
                {state.id}. {state.label}
              </span>
            </button>
            
            {!isLast && (
              <div className={`hidden sm:block flex-1 h-[2px] mx-sm relative -top-3 ${isAvailable ? 'bg-primary/30' : 'bg-outline-variant opacity-50'}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
