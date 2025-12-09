import React from 'react';
import { DocumentItem, DocStatus } from '../types';
import { Check, X, Minus, Square, CheckSquare } from 'lucide-react';

interface ChecklistItemProps {
  item: DocumentItem;
  onStatusChange: (id: string, status: DocStatus) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onStatusChange }) => {
  
  const getCardStyle = () => {
    switch (item.status) {
        case DocStatus.OK: return "border-emerald-200 bg-emerald-50/30 print:border-gray-100 print:bg-white";
        case DocStatus.NA: return "border-gray-200 bg-gray-50 opacity-60 print:opacity-100 print:text-gray-400 print:bg-white";
        default: return "border-gray-200 bg-white";
    }
  };

  return (
    <div className={`p-4 rounded-lg border transition-all duration-200 ${getCardStyle()} flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between print:border-b print:border-x-0 print:border-t-0 print:rounded-none print:p-2 print:gap-2`}>
      <div className="flex-1 flex items-start gap-3">
        {/* Print Only Checkbox Visual */}
        <div className="hidden print:block mt-1">
             {item.status === DocStatus.OK ? <CheckSquare size={16} /> : <Square size={16} className="text-gray-300" />}
        </div>
        
        <p className={`text-sm md:text-base font-medium ${item.status === DocStatus.NA ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          {item.text}
          {item.status === DocStatus.NA && <span className="hidden print:inline ml-2 text-xs text-gray-400">(N/A)</span>}
        </p>
      </div>

      <div className="flex items-center bg-gray-100 p-1 rounded-lg shrink-0 w-full sm:w-auto print:hidden">
        <button
          onClick={() => onStatusChange(item.id, DocStatus.PENDING)}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            item.status === DocStatus.PENDING 
              ? 'bg-white text-gray-700 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          title="Pendente"
        >
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          Pendente
        </button>

        <button
          onClick={() => onStatusChange(item.id, DocStatus.OK)}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            item.status === DocStatus.OK 
              ? 'bg-emerald-500 text-white shadow-sm' 
              : 'text-gray-500 hover:text-emerald-600'
          }`}
          title="Documento Impresso/OK"
        >
          <Check size={14} />
          OK
        </button>

        <button
          onClick={() => onStatusChange(item.id, DocStatus.NA)}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            item.status === DocStatus.NA 
              ? 'bg-gray-500 text-white shadow-sm' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Não Aplicável"
        >
           <Minus size={14} />
           N/A
        </button>
      </div>
    </div>
  );
};

export default ChecklistItem;