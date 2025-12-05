import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import LeadCard from '../components/business/LeadCard';
import LeadForm from '../components/business/LeadForm';
import DealKanban from '../components/business/DealKanban';
import db from '../lib/db';

export default function Professional() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    if (activeTab === 'leads') loadLeads();
  }, [activeTab]);

  const loadLeads = async () => {
    try {
      const allLeads = await db.leads.toArray();
      setLeads(allLeads);
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1>Professional</h1>
      </div>

      <div className="flex gap-2 mb-4 border-b">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'leads'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600'
          }`}
        >
          Leads
        </button>
        <button
          onClick={() => setActiveTab('deals')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'deals'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600'
          }`}
        >
          Deals
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'connections'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600'
          }`}
        >
          Connections
        </button>
      </div>

      {activeTab === 'leads' && (
        <>
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search leads..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                setSelectedLead(null);
                setShowLeadForm(true);
              }}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={18} />
              Add Lead
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onClick={(l) => {
                  setSelectedLead(l);
                  setShowLeadForm(true);
                }}
              />
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No leads found</p>
              <button
                onClick={() => setShowLeadForm(true)}
                className="btn-primary mt-4"
              >
                Add Your First Lead
              </button>
            </div>
          )}
        </>
      )}

      {activeTab === 'deals' && <DealKanban />}

      {activeTab === 'connections' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Connections coming in Phase 2</p>
        </div>
      )}

      {showLeadForm && (
        <LeadForm
          lead={selectedLead}
          onClose={() => {
            setShowLeadForm(false);
            setSelectedLead(null);
          }}
          onSave={loadLeads}
        />
      )}
    </div>
  );
}
