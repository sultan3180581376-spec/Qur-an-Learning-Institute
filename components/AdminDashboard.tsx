
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { getAllUsers, updateUserStatus, deleteUser } from '../services/authService';
import { Users, Search, Trash2, Power, CheckCircle, XCircle, Clock, Shield, CreditCard, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'admin'>('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setUsers(getAllUsers());
  };

  const handleToggleStatus = (userId: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const updatedList = updateUserStatus(userId, newStatus);
    setUsers(updatedList);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const updatedList = deleteUser(userId);
      setUsers(updatedList);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Calculate Statistics
  const stats = {
    totalStudents: users.filter(u => u.role === 'student').length,
    activeUsers: users.filter(u => u.status === 'active').length,
    trialUsers: users.filter(u => u.role === 'student' && u.plan === 'TRIAL').length,
    premiumUsers: users.filter(u => u.hasPaid).length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-sand min-h-screen">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight mb-2 flex items-center">
          <Shield className="mr-3 text-emerald-600" /> Admin Overview
        </h1>
        <p className="text-slate-500">Manage students, track enrollments, and monitor academy performance.</p>
      </div>
        
      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Total Students */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-shadow">
          <div className="p-4 bg-blue-50 rounded-full mr-4 text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Students</p>
            <p className="text-2xl font-bold text-midnight">{stats.totalStudents}</p>
            <p className="text-xs text-emerald-600 flex items-center mt-1"><TrendingUp size={12} className="mr-1" /> +12% this month</p>
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-shadow">
          <div className="p-4 bg-emerald-50 rounded-full mr-4 text-emerald-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Users</p>
            <p className="text-2xl font-bold text-midnight">{stats.activeUsers}</p>
             <p className="text-xs text-slate-400 mt-1">Currently online</p>
          </div>
        </div>

        {/* Card 3: Pending/Trial */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-shadow">
          <div className="p-4 bg-amber-50 rounded-full mr-4 text-amber-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pending Trials</p>
            <p className="text-2xl font-bold text-midnight">{stats.trialUsers}</p>
            <p className="text-xs text-amber-600 mt-1">Action needed</p>
          </div>
        </div>

        {/* Card 4: Premium/Paid */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-shadow">
          <div className="p-4 bg-purple-50 rounded-full mr-4 text-purple-600">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Premium Plans</p>
            <p className="text-2xl font-bold text-midnight">{stats.premiumUsers}</p>
            <p className="text-xs text-slate-400 mt-1">Revenue active</p>
          </div>
        </div>
      </div>

      {/* Controls & Table Header */}
      <div className="bg-white rounded-t-xl border border-slate-200 p-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-b">
        <h2 className="text-lg font-bold text-midnight">User Management</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
          <select 
            className="border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as any)}
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-t-0 border-slate-200 rounded-b-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Current Plan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mr-3 uppercase border border-emerald-200">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded border ${
                        user.plan === 'TRIAL' 
                          ? 'bg-amber-50 text-amber-700 border-amber-100' 
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center text-xs font-bold uppercase ${
                        user.status === 'active' ? 'text-emerald-600' : 'text-red-500'
                      }`}>
                        {user.status === 'active' ? (
                          <><CheckCircle size={14} className="mr-1" /> Active</>
                        ) : (
                          <><XCircle size={14} className="mr-1" /> Inactive</>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        title={user.status === 'active' ? "Deactivate User" : "Activate User"}
                        className={`p-2 rounded-lg transition-colors ${
                          user.status === 'active' 
                            ? 'text-slate-400 hover:text-red-500 hover:bg-red-50' 
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        <Power size={18} />
                      </button>
                      {user.role !== 'admin' && (
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete User"
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400 italic">
                    No users found matching your search.
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
