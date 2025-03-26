// src/pages/ChatDetailPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Send, Tag } from 'lucide-react';
import { format, parse } from 'date-fns';
import { it } from 'date-fns/locale';

// Funzione per generare dati fittizi di transazioni
const getDummyTransactions = (monthId) => {
  const [year, month] = monthId.split('-');
  const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
  const transactions = [];
  
  // Genera un numero casuale di transazioni (tra 10 e 25)
  const numTransactions = Math.floor(Math.random() * 15) + 10;
  
  for (let i = 0; i < numTransactions; i++) {
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    const date = new Date(parseInt(year), parseInt(month) - 1, day);
    
    // Determina casualmente se è una spesa o un'entrata
    const isExpense = Math.random() > 0.3; // 70% probabilità di essere una spesa
    
    // Categorie fittizie
    const expenseCategories = ['Cibo', 'Trasporti', 'Shopping', 'Casa', 'Svago', 'Salute'];
    const incomeCategories = ['Stipendio', 'Vendite', 'Regali', 'Rimborsi'];
    
    const category = isExpense 
      ? expenseCategories[Math.floor(Math.random() * expenseCategories.length)]
      : incomeCategories[Math.floor(Math.random() * incomeCategories.length)];
    
    // Importo casuale
    const amount = isExpense
      ? Math.round(Math.random() * 80 + 5) // Spese tra 5 e 85 euro
      : Math.round(Math.random() * 500 + 100); // Entrate tra 100 e 600 euro
    
    // Descrizioni fittizie
    const expenseDescriptions = [
      'Spesa al supermercato',
      'Benzina',
      'Pranzo fuori',
      'Farmacia',
      'Bolletta luce',
      'Cinema',
      'Amazon',
      'Abbonamento',
      'Caffè e cornetto'
    ];
    
    const incomeDescriptions = [
      'Accredito stipendio',
      'Vendita online',
      'Rimborso',
      'Regalo compleanno',
      'Bonus',
      'Pagamento cliente'
    ];
    
    const description = isExpense
      ? expenseDescriptions[Math.floor(Math.random() * expenseDescriptions.length)]
      : incomeDescriptions[Math.floor(Math.random() * incomeDescriptions.length)];
    
    // Genera tag casuali
    const tags = [];
    const allTags = ['Necessario', 'Risparmio', 'Svago', 'Lavoro', 'Salute', 'Famiglia', 'Investimento'];
    
    // 30% probabilità di avere almeno un tag
    if (Math.random() < 0.3) {
      const numTags = Math.floor(Math.random() * 2) + 1;
      const shuffledTags = [...allTags].sort(() => 0.5 - Math.random());
      
      for (let j = 0; j < numTags; j++) {
        tags.push(shuffledTags[j]);
      }
    }
    
    transactions.push({
      id: `tx-${i}`,
      date,
      description,
      category,
      amount: isExpense ? -amount : amount,
      tags,
      isExpense
    });
  }
  
  // Ordina per data
  return transactions.sort((a, b) => a.date - b.date);
};

const ChatDetailPage = () => {
  const { monthId } = useParams();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [monthName, setMonthName] = useState('');
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [newTransactionDescription, setNewTransactionDescription] = useState('');
  const chatEndRef = useRef(null);
  
  useEffect(() => {
    if (monthId) {
      // Imposta il nome del mese formattato
      try {
        const date = parse(monthId, 'yyyy-MM', new Date());
        setMonthName(format(date, 'MMMM yyyy', { locale: it }));
      } catch (error) {
        console.error('Errore nel parsing della data:', error);
        setMonthName(monthId); // Fallback
      }
      
      // Carica le transazioni (simulazione API)
      setTransactions(getDummyTransactions(monthId));
    }
  }, [monthId]);
  
  // Raggruppa le transazioni per giorno
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const dayKey = format(transaction.date, 'yyyy-MM-dd');
    
    if (!acc[dayKey]) {
      acc[dayKey] = {
        date: transaction.date,
        transactions: []
      };
    }
    
    acc[dayKey].transactions.push(transaction);
    return acc;
  }, {});
  
  // Converte il raggruppamento in array per renderizzarlo
  const transactionDays = Object.values(groupedTransactions).sort((a, b) => 
    a.date - b.date
  );
  
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [transactions, isNewTransactionOpen]);
  
  const handleBack = () => {
    navigate('/chats');
  };
  
  const toggleNewTransaction = () => {
    setIsNewTransactionOpen(!isNewTransactionOpen);
    setNewTransactionAmount('');
    setNewTransactionDescription('');
  };
  
  const handleAddTransaction = () => {
    if (!newTransactionAmount) return;
    
    // Validazione dell'importo
    const amountValue = parseFloat(newTransactionAmount.replace(',', '.'));
    if (isNaN(amountValue)) return;
    
    // Crea una nuova transazione
    const newTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date(),
      description: newTransactionDescription || 'Nuova transazione',
      category: amountValue < 0 ? 'Altro' : 'Entrata',
      amount: amountValue,
      tags: [],
      isExpense: amountValue < 0
    };
    
    // Aggiungi la transazione all'elenco
    setTransactions([...transactions, newTransaction]);
    
    // Resetta il form
    setIsNewTransactionOpen(false);
    setNewTransactionAmount('');
    setNewTransactionDescription('');
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm z-10 flex items-center">
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600"
          onClick={handleBack}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-2 capitalize">
          {monthName}
        </h1>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-auto p-4">
        {transactionDays.length > 0 ? (
          transactionDays.map((day) => (
            <div key={format(day.date, 'yyyy-MM-dd')} className="mb-6">
              {/* Data */}
              <div className="flex justify-center mb-4">
                <div className="bg-gray-200 rounded-full px-4 py-1 text-sm text-gray-700">
                  {format(day.date, 'EEEE d MMMM', { locale: it })}
                </div>
              </div>
              
              {/* Transazioni del giorno */}
              <div className="space-y-3">
                {day.transactions.map((transaction) => (
                  <div key={transaction.id} className={`flex ${transaction.isExpense ? 'justify-start' : 'justify-end'}`}>
                    <div 
                      className={`rounded-lg p-3 max-w-[80%] shadow-sm ${
                        transaction.isExpense 
                        ? 'bg-white border border-gray-200 text-gray-800' 
                        : 'bg-rose-500 text-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">
                          {transaction.description}
                        </span>
                        <span className={`ml-4 font-bold ${transaction.isExpense ? 'text-red-600' : 'text-white'}`}>
                          {transaction.amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                        </span>
                      </div>
                      
                      <div className="text-sm flex justify-between items-center">
                        <span className={`${transaction.isExpense ? 'text-gray-600' : 'text-rose-200'}`}>
                          {transaction.category}
                        </span>
                        <span className={`text-xs ${transaction.isExpense ? 'text-gray-500' : 'text-rose-200'}`}>
                          {format(transaction.date, 'HH:mm')}
                        </span>
                      </div>
                      
                      {/* Tags */}
                      {transaction.tags && transaction.tags.length > 0 && (
                        <div className="flex mt-2 flex-wrap">
                          {transaction.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className={`flex items-center text-xs px-2 py-1 rounded-full mr-1 mb-1 ${
                                transaction.isExpense 
                                ? 'bg-gray-100 text-gray-700' 
                                : 'bg-rose-400 text-white'
                              }`}
                            >
                              <Tag size={10} className="mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 mb-4">Nessuna transazione per questo mese</p>
            <button 
              className="px-4 py-2 bg-rose-600 text-white rounded-lg flex items-center"
              onClick={toggleNewTransaction}
            >
              <Plus size={18} className="mr-1" />
              Aggiungi transazione
            </button>
          </div>
        )}
        
        {/* Form per nuova transazione */}
        {isNewTransactionOpen && (
          <div className="bg-white rounded-lg p-4 shadow-md mt-4 mb-16">
            <h3 className="text-lg font-medium mb-3">Nuova transazione</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Importo (€)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="-10,50 o 100"
                  value={newTransactionAmount}
                  onChange={(e) => setNewTransactionAmount(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Usa il segno negativo (-) per le spese
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrizione
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Pranzo, Benzina, Stipendio..."
                  value={newTransactionDescription}
                  onChange={(e) => setNewTransactionDescription(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                  onClick={toggleNewTransaction}
                >
                  Annulla
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-md flex justify-center items-center"
                  onClick={handleAddTransaction}
                >
                  <Send size={16} className="mr-1" />
                  Aggiungi
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Riferimento per lo scroll automatico */}
        <div ref={chatEndRef} />
      </div>
      
      {/* Bottom Action Bar */}
      {!isNewTransactionOpen && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-2 flex items-center z-10">
          <button
            className="flex-1 flex items-center justify-center p-3 bg-rose-600 text-white rounded-lg"
            onClick={toggleNewTransaction}
          >
            <Plus size={20} className="mr-2" />
            Nuova transazione
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatDetailPage;