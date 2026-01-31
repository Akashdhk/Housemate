
import React, { useState } from 'react';
import { User, UserRole, Bill, BillType, BillStatus } from '../types';

interface BillsProps {
  user: User;
}

const Bills: React.FC<BillsProps> = ({ user }) => {
  const isOwner = user.role === UserRole.OWNER;
  const [bills, setBills] = useState<Bill[]>([
    { id: '1', flatId: 'A-101', type: BillType.SERVICE_CHARGE, amount: 50, status: BillStatus.PAID, dueDate: '2023-10-15', billingMonth: 'October 2023' },
    { id: '2', flatId: 'A-101', type: BillType.WATER, amount: 35, status: BillStatus.UNPAID, dueDate: '2023-10-15', billingMonth: 'October 2023' },
    { id: '3', flatId: 'A-102', type: BillType.ELECTRICITY, amount: 65, status: BillStatus.OVERDUE, dueDate: '2023-09-15', billingMonth: 'September 2023' },
    { id: '4', flatId: 'B-201', type: BillType.MAINTENANCE, amount: 120, status: BillStatus.PAID, dueDate: '2023-10-15', billingMonth: 'October 2023' },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredBills = filterStatus === 'ALL' 
    ? bills 
    : bills.filter(b => b.status === filterStatus);

  const handlePay = (id: string) => {
    setBills(bills.map(b => b.id === id ? { ...b, status: BillStatus.PAID } : b));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Bills & Payments</h2>
          <p className="text-slate-500">Track and settle utility and service dues.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {['ALL', BillStatus.PAID, BillStatus.UNPAID, BillStatus.OVERDUE].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                filterStatus === s ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase text-left">
              <tr>
                <th className="px-6 py-4 font-bold">Bill Type</th>
                <th className="px-6 py-4 font-bold">Flat</th>
                <th className="px-6 py-4 font-bold">Month</th>
                <th className="px-6 py-4 font-bold">Amount</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Due Date</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full mr-3 flex items-center justify-center text-sm ${
                        bill.type === BillType.WATER ? 'bg-blue-100 text-blue-600' : 
                        bill.type === BillType.ELECTRICITY ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {bill.type === BillType.WATER ? '💧' : bill.type === BillType.ELECTRICITY ? '⚡' : '📋'}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{bill.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{bill.flatId}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{bill.billingMonth}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">${bill.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-extrabold uppercase ${
                      bill.status === BillStatus.PAID ? 'bg-green-100 text-green-700' : 
                      bill.status === BillStatus.OVERDUE ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{bill.dueDate}</td>
                  <td className="px-6 py-4 text-right">
                    {!isOwner && bill.status !== BillStatus.PAID ? (
                      <button 
                        onClick={() => handlePay(bill.id)}
                        className="bg-indigo-600 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-indigo-700"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button className="text-slate-400 hover:text-indigo-600">
                        👁️
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredBills.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No bills found matching the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bills;
