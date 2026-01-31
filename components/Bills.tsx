import React, { useState, useEffect } from 'react';
import { User, UserRole, Bill, BillStatus } from '../types';

interface BillsProps {
  user: User;
}

const Bills: React.FC<BillsProps> = ({ user }) => {
  const isOwner = user.role === UserRole.OWNER;
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/bills');
      const data = await response.json();
      setBills(data);
    } catch (err) {
      console.error("Failed to fetch bills", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading bills...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Bills & Payments</h2>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Month</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-semibold text-slate-800">{bill.type || (bill as any).BILL_TYPE}</td>
                <td className="px-6 py-4 text-slate-500">{bill.billingMonth || (bill as any).BILLING_MONTH}</td>
                <td className="px-6 py-4 font-bold">৳{bill.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                    bill.status === BillStatus.PAID ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {bill.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {bill.status !== BillStatus.PAID && !isOwner && (
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded font-bold hover:bg-indigo-700">Pay</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bills;