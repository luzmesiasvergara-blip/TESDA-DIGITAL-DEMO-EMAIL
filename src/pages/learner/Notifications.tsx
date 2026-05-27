import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertCircle, Clock, Info, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  isRead: boolean;
}

export default function LearnerNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Badge Approved',
      message: 'Your request for "Web Development NC III - Master Badge" has been approved by the District Office.',
      type: 'success',
      timestamp: '2 hours ago',
      isRead: false
    },
    {
      id: '2',
      title: 'Portal Update',
      message: 'The Learner Portal has been updated with the new Badge Wallet feature. Check it out in your dashboard!',
      type: 'info',
      timestamp: '5 hours ago',
      isRead: false
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'The platform will undergo scheduled maintenance on Saturday at 11:00 PM PST.',
      type: 'warning',
      timestamp: '1 day ago',
      isRead: true
    },
    {
      id: '4',
      title: 'Issuance Successful',
      message: 'Your Digital Certificate for "Basic Computer Literacy" is now ready for download.',
      type: 'success',
      timestamp: '2 days ago',
      isRead: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case 'alert': return <AlertCircle className="h-5 w-5 text-rose-500" />;
      case 'warning': return <Clock className="h-5 w-5 text-amber-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const filteredNotifications = notifications.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
        <p className="text-slate-500">Stay updated with your badge requests and system alerts.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search notifications..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 whitespace-nowrap bg-white">
            Mark all as read
          </Button>
          <Button variant="outline" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-100">
            Clear all
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`border-slate-200 transition-all hover:shadow-md ${!notification.isRead ? 'border-l-4 border-l-blue-600 bg-blue-50/30' : 'bg-white'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex gap-4">
                  <div className={`mt-1 h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${
                    notification.type === 'success' ? 'bg-emerald-100' : 
                    notification.type === 'warning' ? 'bg-amber-100' : 
                    notification.type === 'alert' ? 'bg-rose-100' : 'bg-blue-100'
                  }`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold truncate ${!notification.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && <Badge className="bg-blue-600 hover:bg-blue-600 text-[10px] px-1.5 py-0">NEW</Badge>}
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap">{notification.timestamp}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="mt-3 flex gap-3">
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-500 hover:text-slate-700 p-0" onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}>
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-dashed border-slate-200 py-12">
            <CardContent className="text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No notifications found</h3>
              <p className="text-slate-500 mt-1 max-w-xs">
                {searchQuery ? "Try a different search term." : "You're all caught up! New alerts will appear here."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="bg-slate-900 text-white overflow-hidden border-none shadow-xl">
        <CardContent className="p-8 relative">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Ongoing Module: Smart Contracts Integration</h2>
            <p className="text-slate-300 text-sm mb-6 max-w-md">
              We are currently integrating Ethereum-based verification for all issued badges to ensure tamper-proof credentialing.
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500 hover:bg-blue-500">In Development</Badge>
              <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[75%]"></div>
              </div>
              <span className="text-xs text-slate-400">75% Complete</span>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
            <Bell className="h-48 w-48" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
