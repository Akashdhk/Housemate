import React from 'react';
import { User, UserRole, BillStatus } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const isOwner = user.role === UserRole.OWNER;

  // Mock Data
  const stats = isOwner ? [
    { name: 'Total Flats', value: '24', icon: '🏢', color: 'bg-blue-500' },
    { name: 'Total Revenue', value: '৳1,24,500', icon: '💰', color: 'bg-green-500' },
    { name: 'Unpaid Bills', value: '5', icon: '⚠️', color: 'bg-amber-500' },
    { name: 'Requests', value: '3', icon: '🔧', color: 'bg-red-500' },
  ] : [
    { name: 'My Rent', value: '৳15,000', icon: '🏠', color: 'bg-indigo-500' },
    { name: 'Due This Month', value: '৳2,500', icon: '📅', color: 'bg-amber-500' },
    { name: 'Active Tickets', value: '1', icon: '🎫', color: 'bg-blue-500' },
    { name: 'Last Payment', value: 'Oct 02', icon: '✅', color: 'bg-green-500' },
  ];

  const recentBills = [
    { id: '1', type: 'Service Charge', amount: 2000, status: BillStatus.PAID, date: '2023-10-01' },
    { id: '2', type: 'Water Bill', amount: 500, status: BillStatus.UNPAID, date: '2023-10-05' },
    { id: '3', type: 'Electricity Bill', amount: 1500, status: BillStatus.UNPAID, date: '2023-10-08' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, {user.name}</h2>
        <p className="text-slate-500">Here's what's happening with your property today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} h-12 w-12 rounded-lg flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Bills</h3>
            <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase text-left">
                <tr>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{bill.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">৳{bill.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        bill.status === BillStatus.PAID ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{bill.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-6">Quick Notifications</h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-lg bg-indigo-50 border border-indigo-100">
              <span className="text-xl">📢</span>
              <div>
                <p className="text-sm font-bold text-indigo-900">Building Maintenance Notice</p>
                <p className="text-xs text-indigo-700 mt-1">Water supply will be suspended on Sunday from 10 AM to 2 PM for tank cleaning.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-lg bg-amber-50 border border-amber-100">
              <span className="text-xl">💳</span>
              <div>
                <p className="text-sm font-bold text-amber-900">Pending Bill Reminder</p>
                <p className="text-xs text-amber-700 mt-1">Your water bill for September is still pending. Please pay by the end of this week.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;