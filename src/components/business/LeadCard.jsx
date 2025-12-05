import { Mail, MessageCircle, MoreVertical, Phone } from 'lucide-react';

export default function LeadCard({ lead, onClick }) {
  return (
    <div
      onClick={() => onClick(lead)}
      className="card cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{lead.fullName}</h3>
          <p className="text-xs text-gray-600">
            {lead.designation || 'N/A'} | AED {lead.salaryAmount?.toLocaleString() || '0'}
          </p>
          <p className="text-xs text-gray-500 mt-1">{lead.companyName || 'N/A'}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={16} />
        </button>
      </div>
      
      <div className="flex gap-2 mt-3">
        <a
          href={`tel:${lead.mobile}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 rounded text-xs font-medium hover:bg-blue-100"
        >
          <Phone size={14} />
          Call
        </a>
        
        <a
          href={`https://wa.me/${lead.whatsapp || lead.mobile}`}
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-green-50 text-green-600 rounded text-xs font-medium hover:bg-green-100"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
        
        <a
          href={`mailto:${lead.email}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-gray-50 text-gray-600 rounded text-xs font-medium hover:bg-gray-100"
        >
          <Mail size={14} />
          Email
        </a>
      </div>
    </div>
  );
}
