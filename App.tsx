import React, { useState, useEffect, useMemo } from 'react';
import { Category, DocStatus } from './types';
import { loadCategories, saveCategories, resetData } from './services/storageService';
import ChecklistItem from './components/ChecklistItem';
import ProgressBar from './components/ProgressBar';
import { FileText, RefreshCw, ChevronDown, ChevronUp, Printer, Filter } from 'lucide-react';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  // Load data on mount
  useEffect(() => {
    const data = loadCategories();
    setCategories(data);
    
    // Initially expand the first category
    if (data.length > 0) {
      setExpandedCategories({ [data[0].id]: true });
    }
    setIsLoaded(true);
  }, []);

  // Save data whenever it changes (after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveCategories(categories);
    }
  }, [categories, isLoaded]);

  const handleStatusChange = (itemId: string, newStatus: DocStatus) => {
    setCategories(prev => 
      prev.map(cat => ({
        ...cat,
        items: cat.items.map(item => 
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      }))
    );
  };

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja apagar todo o progresso?')) {
      const freshData = resetData();
      setCategories(freshData);
      window.location.reload();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Stats calculation (Always based on ALL data, not filtered)
  const stats = useMemo(() => {
    let total = 0;
    let completed = 0;
    let notApplicable = 0;

    categories.forEach(cat => {
      cat.items.forEach(item => {
        total++;
        if (item.status === DocStatus.OK) completed++;
        if (item.status === DocStatus.NA) notApplicable++;
      });
    });

    return { total, completed, notApplicable };
  }, [categories]);

  // Derived state for display
  const displayCategories = useMemo(() => {
    if (!showPendingOnly) return categories;

    // Filter categories to show only those with pending items, and only show pending items within them
    return categories
      .map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.status === DocStatus.PENDING)
      }))
      .filter(cat => cat.items.length > 0);
  }, [categories, showPendingOnly]);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center text-gray-500">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-30 no-print">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="bg-white/10 p-2 rounded-lg">
                <FileText size={24} className="text-blue-100" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">VistoCheck</h1>
              <p className="text-blue-200 text-xs font-medium">Checklist B1/B2</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
                onClick={() => setShowPendingOnly(!showPendingOnly)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${showPendingOnly ? 'bg-blue-700 text-white' : 'bg-blue-800/50 text-blue-100 hover:bg-blue-800'}`}
                title={showPendingOnly ? "Mostrar todos" : "Mostrar apenas pendentes"}
            >
              <Filter size={18} />
              <span className="hidden sm:inline">{showPendingOnly ? 'Filtro Ativo' : 'Filtrar Pendentes'}</span>
            </button>

            <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-800/50 text-blue-100 hover:bg-blue-800 transition-colors"
                title="Imprimir Checklist"
            >
              <Printer size={18} />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <div className="w-px h-6 bg-blue-800 mx-1"></div>

            <button 
              onClick={handleReset}
              className="p-2 text-blue-300 hover:text-white hover:bg-red-900/50 rounded-full transition-colors"
              title="Resetar dados"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Print Header */}
      <div className="hidden print:block text-center py-8 border-b mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Checklist Visto Americano (B1/B2)</h1>
        <p className="text-gray-500">Relatório de conferência de documentos</p>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6 print-full-width">
        
        {/* Dashboard Section */}
        <section className="no-print">
            <ProgressBar 
                total={stats.total} 
                completed={stats.completed} 
                notApplicable={stats.notApplicable} 
            />
        </section>

        {/* Filter Warning */}
        {showPendingOnly && (
             <div className="bg-orange-50 border border-orange-100 text-orange-800 px-4 py-3 rounded-lg flex items-center justify-between no-print">
                <span className="text-sm font-medium">Exibindo apenas documentos pendentes ({displayCategories.reduce((acc, cat) => acc + cat.items.length, 0)})</span>
                <button onClick={() => setShowPendingOnly(false)} className="text-xs underline hover:text-orange-900">Limpar filtro</button>
             </div>
        )}

        {/* Categories List */}
        <div className="space-y-4">
          {displayCategories.map((category) => {
            const isExpanded = showPendingOnly || !!expandedCategories[category.id]; // Always expand in filter mode
            const originalCategory = categories.find(c => c.id === category.id) || category;
            
            // Calc stats based on ORIGINAL category to show correct summary even when filtered
            const catTotal = originalCategory.items.length;
            const catCompleted = originalCategory.items.filter(i => i.status === DocStatus.OK).length;
            const catNA = originalCategory.items.filter(i => i.status === DocStatus.NA).length;
            const isComplete = catTotal > 0 && (catCompleted + catNA === catTotal);

            return (
              <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden print-shadow-none print-break-inside-avoid">
                <button 
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left no-print"
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-bold ${isComplete ? 'text-emerald-700' : 'text-gray-800'}`}>
                                {category.title}
                            </h3>
                            {isComplete && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Completo</span>}
                        </div>
                        <p className="text-xs text-gray-500">
                           {catCompleted} ok, {catNA} n/a de {catTotal} itens
                        </p>
                    </div>
                    {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </button>
                
                {/* Print Title */}
                <div className="hidden print:block px-5 py-3 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-900">{category.title}</h3>
                </div>

                {/* Content */}
                {(isExpanded || window.matchMedia('print').matches) && (
                    <div className="px-5 pb-5 pt-1 space-y-3 bg-gray-50/50 border-t border-gray-100 print:bg-white print:space-y-1 print:pt-3">
                        {category.items.map(item => (
                            <ChecklistItem 
                                key={item.id} 
                                item={item} 
                                onStatusChange={handleStatusChange} 
                            />
                        ))}
                    </div>
                )}
              </div>
            );
          })}
          
          {displayCategories.length === 0 && showPendingOnly && (
              <div className="text-center py-10">
                  <p className="text-gray-500">Nenhum documento pendente!</p>
                  <button onClick={() => setShowPendingOnly(false)} className="text-blue-600 font-medium mt-2 hover:underline">Ver checklist completo</button>
              </div>
          )}
        </div>
      </main>

      {/* Floating Action Button (Mobile Only context if needed, currently using sticky header) */}
      <footer className="mt-8 text-center text-gray-400 text-sm pb-8 no-print">
        <p>Os dados são salvos automaticamente neste navegador.</p>
      </footer>
    </div>
  );
}

export default App;