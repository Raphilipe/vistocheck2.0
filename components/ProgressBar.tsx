import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ProgressBarProps {
  total: number;
  completed: number;
  notApplicable: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, completed, notApplicable }) => {
  const applicableTotal = total - notApplicable;
  const percentage = applicableTotal > 0 ? Math.round((completed / applicableTotal) * 100) : 0;
  const remaining = applicableTotal - completed;

  const data = [
    { name: 'Pronto', value: completed },
    { name: 'Pendente', value: remaining },
  ];

  const COLORS = ['#10b981', '#e5e7eb']; // Emerald-500 for success, Gray-200 for remaining

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between">
      <div className="flex-1 mb-4 md:mb-0">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Progresso Geral</h2>
        <p className="text-gray-500 text-sm">Baseado apenas nos itens aplicáveis.</p>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
             <div className="bg-blue-50 p-3 rounded-lg">
                <span className="block text-xs text-blue-600 font-semibold uppercase">Total Itens</span>
                <span className="text-xl font-bold text-blue-900">{total}</span>
             </div>
             <div className="bg-gray-50 p-3 rounded-lg">
                <span className="block text-xs text-gray-500 font-semibold uppercase">Não Aplicáveis</span>
                <span className="text-xl font-bold text-gray-700">{notApplicable}</span>
             </div>
             <div className="bg-emerald-50 p-3 rounded-lg">
                <span className="block text-xs text-emerald-600 font-semibold uppercase">Impressos (OK)</span>
                <span className="text-xl font-bold text-emerald-900">{completed}</span>
             </div>
             <div className="bg-orange-50 p-3 rounded-lg">
                <span className="block text-xs text-orange-600 font-semibold uppercase">Faltam</span>
                <span className="text-xl font-bold text-orange-900">{remaining}</span>
             </div>
        </div>
      </div>

      <div className="relative w-48 h-48 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
            <span className="text-xs text-gray-500 font-medium">Concluído</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;