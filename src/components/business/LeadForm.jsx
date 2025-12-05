import { useState } from 'react';
import { X } from 'lucide-react';
import { UAE_EMIRATES, UAE_BANKS, EIB_CREDIT_CARDS, PRODUCT_TYPES, LEAD_SOURCES } from '../../lib/constants';
import db from '../../lib/db';

export default function LeadForm({ lead, onClose, onSave }) {
  const [formData, setFormData] = useState(lead || {
    fullName: '',
    companyName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    location: '',
    source: '',
    bank: '',
    productType: '',
    specificProduct: '',
    salaryAmount: '',
    salaryVariation: false,
    hasCreditCard: false,
    creditCardDuration: '',
    totalCreditLimit: '',
    status: 'new'
  });

  const showEIBCards = formData.bank === 'Emirates Islamic Bank' && formData.productType === 'Credit Card';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (lead?.id) {
        await db.leads.update(lead.id, { ...formData, updatedAt: new Date() });
      } else {
        await db.leads.add({ ...formData, createdAt: new Date(), updatedAt: new Date() });
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving lead:', error);
      alert('Error saving lead');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
          <h2 className="font-semibold">{lead ? 'Edit Lead' : 'Add Lead'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="label">Full Name *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Company Name</label>
              <input
                type="text"
                className="input-field"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Mobile *</label>
              <input
                type="tel"
                required
                className="input-field"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            <div>
              <label className="label">WhatsApp</label>
              <input
                type="tel"
                className="input-field"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Location</label>
              <select
                className="input-field"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              >
                <option value="">Select Emirate</option>
                {UAE_EMIRATES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            <div>
              <label className="label">Source</label>
              <select
                className="input-field"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              >
                <option value="">Select Source</option>
                {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="label">Bank</label>
              <select
                className="input-field"
                value={formData.bank}
                onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
              >
                <option value="">Select Bank</option>
                {UAE_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label className="label">Product Type</label>
              <select
                className="input-field"
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
              >
                <option value="">Select Product</option>
                {PRODUCT_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {showEIBCards && (
              <div>
                <label className="label">Specific Card</label>
                <select
                  className="input-field"
                  value={formData.specificProduct}
                  onChange={(e) => setFormData({ ...formData, specificProduct: e.target.value })}
                >
                  <option value="">Select Card</option>
                  {EIB_CREDIT_CARDS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            <div>
              <label className="label">Salary Amount</label>
              <input
                type="number"
                className="input-field"
                value={formData.salaryAmount}
                onChange={(e) => setFormData({ ...formData, salaryAmount: e.target.value })}
              />
            </div>

            <div>
              <label className="label">Status</label>
              <select
                className="input-field"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="new">New Lead</option>
                <option value="qualified">Qualified Lead</option>
                <option value="appointed">Appointment Booked</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="salaryVariation"
              checked={formData.salaryVariation}
              onChange={(e) => setFormData({ ...formData, salaryVariation: e.target.checked })}
            />
            <label htmlFor="salaryVariation" className="text-sm">Salary variation in last 3 months?</label>
          </div>

          {formData.salaryVariation && (
            <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
              ⚠️ Please provide the last three months' salary payslips.
            </p>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hasCreditCard"
              checked={formData.hasCreditCard}
              onChange={(e) => setFormData({ ...formData, hasCreditCard: e.target.checked })}
            />
            <label htmlFor="hasCreditCard" className="text-sm">Currently using credit card?</label>
          </div>

          {formData.hasCreditCard && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">How long?</label>
                <input
                  type="text"
                  placeholder="e.g., 2 years"
                  className="input-field"
                  value={formData.creditCardDuration}
                  onChange={(e) => setFormData({ ...formData, creditCardDuration: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Total Credit Limit</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.totalCreditLimit}
                  onChange={(e) => setFormData({ ...formData, totalCreditLimit: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-3 border-t">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
