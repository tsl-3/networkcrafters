import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { sampleContacts, industryCounts, tagCounts, matchSuggestions } from "@/lib/sample-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, Star, BarChart, PieChart, Calendar, Clock, Activity, Zap, Plus, ChevronRight, MessageSquare, Share2, PenSquare 
} from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie } from "recharts";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Color palette based on #6b99d6
const colorPalette = [
  "#6b99d6", // Primary
  "#8bb1e8", // Light
  "#4d7bb8", // Dark
  "#a8c6f0", // Very light
  "#5c88c5", // Mid-dark
  "#799ed9"  // Mid-light
];

const Dashboard = () => {
  const [period, setPeriod] = useState<"week" | "month" | "quarter">("month");
  
  const industryData = Object.entries(industryCounts).map(([name, value], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill: colorPalette[index % colorPalette.length]
  }));
  
  const tagData = Object.entries(tagCounts)
    .filter(([_, value]) => value > 15)
    .map(([name, value], index) => ({
      name,
      value,
      fill: colorPalette[index % colorPalette.length]
    }));
  
  const recentActivity = [
    { id: 1, type: "new-contact", contact: sampleContacts[0], date: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 2, type: "follow-up", contact: sampleContacts[1], date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { id: 3, type: "message", contact: sampleContacts[2], date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: 4, type: "new-contact", contact: sampleContacts[3], date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }
  ];
  
  const formatDate = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    return days > 0 ? `${days}d` : hours > 0 ? `${hours}h` : `${minutes}m`;
  };
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new-contact": return <Plus className="h-4 w-4 text-[#8bb1e8]" />;
      case "follow-up": return <Clock className="h-4 w-4 text-[#a8c6f0]" />;
      case "message": return <MessageSquare className="h-4 w-4 text-[#6b99d6]" />;
      default: return <Activity className="h-4 w-4 text-[#799ed9]" />;
    }
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm text-white p-2 rounded-lg border border-[#6b99d6]/30 shadow-lg shadow-[#6b99d6]/20">
          <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="flex min-h-screen flex-col bg-black font-sans antialiased"
      style={{
        backgroundImage: `url('/bg-arch.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.4)' // 60% transparency
      }}
    >
      <Navbar />
      <main className="flex-1 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-[#a8c6f0] mt-2 text-lg opacity-80">Advanced network analytics</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Total Contacts", value: sampleContacts.length, icon: Users },
              { title: "High-Value", value: sampleContacts.filter(c => c.matchScore && c.matchScore > 80).length, icon: Star },
              { title: "Follow-Ups", value: sampleContacts.filter(c => c.tags?.includes("follow-up")).length, icon: Calendar },
              { title: "Matches", value: matchSuggestions.length, icon: Zap }
            ].map((stat, idx) => (
              <Card 
                key={idx}
                className="bg-gray-900/70 backdrop-blur-md border-[#6b99d6]/20 shadow-md shadow-[#6b99d6]/10 hover:shadow-[#6b99d6]/30 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#a8c6f0] font-medium opacity-80">{stat.title}</p>
                      <h3 className="text-3xl font-semibold text-white mt-1">{stat.value}</h3>
                    </div>
                    <div className="p-3 bg-[#6b99d6]/10 rounded-xl">
                      <stat.icon className="h-6 w-6 text-[#6b99d6]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gray-900/70 backdrop-blur-md border-[#6b99d6]/20 shadow-md shadow-[#6b99d6]/10">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-[#799ed9]" />
                    Industry Distribution
                  </CardTitle>
                  <div className="flex gap-2">
                    {["week", "month", "quarter"].map(p => (
                      <Button
                        key={p}
                        variant={period === p ? "default" : "ghost"}
                        size="sm"
                        className={`text-xs h-8 rounded-full ${period === p ? 'bg-[#6b99d6] hover:bg-[#5c88c5]' : 'text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20'}`}
                        onClick={() => setPeriod(p as any)}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={industryData} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 10 }}>
                      <XAxis type="number" stroke="#6b99d6" tick={{ fill: '#a8c6f0' }} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#6b99d6"
                        tick={{ fill: '#fff', fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={8}>
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/70 backdrop-blur-md border-[#6b99d6]/20 shadow-md shadow-[#6b99d6]/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#799ed9]" />
                  Tag Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={tagData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={{ stroke: '#6b99d6', strokeWidth: 1 }}
                      >
                        {tagData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Matches and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 bg-gray-900/70 backdrop-blur-md border-[#6b99d6]/20 shadow-md shadow-[#6b99d6]/10">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#6b99d6]" />
                    Suggested Matches
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20 gap-1 text-xs h-8">
                    View All <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {matchSuggestions.map((match, index) => {
                  const contact1 = sampleContacts.find(c => c.id === match.contact1);
                  const contact2 = sampleContacts.find(c => c.id === match.contact2);
                  if (!contact1 || !contact2) return null;
                  return (
                    <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-[#6b99d6]/30">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-[#6b99d6]/20 text-[#6b99d6] border-[#6b99d6]/40">
                            {match.score}% Match
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20">
                              <PenSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <Link to={`/contacts/${contact1.id}`} className="flex items-center gap-3 flex-1 group">
                            <Avatar className="h-11 w-11 border-2 border-[#6b99d6]/30 group-hover:border-[#6b99d6]/50 transition-colors">
                              <AvatarImage src={contact1.imageUrl} alt={contact1.name} />
                              <AvatarFallback className="bg-[#6b99d6]/20 text-white">
                                {contact1.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-white group-hover:text-[#6b99d6] transition-colors">{contact1.name}</p>
                              <p className="text-sm text-[#a8c6f0] opacity-80">{contact1.jobTitle}</p>
                            </div>
                          </Link>
                          <div className="flex flex-col items-center gap-2">
                            <div className="h-px w-12 bg-[#6b99d6]/50"></div>
                            <Button size="sm" className="h-7 text-xs bg-[#6b99d6]/20 text-[#6b99d6] hover:bg-[#6b99d6] hover:text-white border-[#6b99d6]/40">
                              Introduce
                            </Button>
                            <div className="h-px w-12 bg-[#6b99d6]/50"></div>
                          </div>
                          <Link to={`/contacts/${contact2.id}`} className="flex items-center gap-3 flex-1 justify-end text-right group">
                            <div>
                              <p className="font-medium text-white group-hover:text-[#6b99d6] transition-colors">{contact2.name}</p>
                              <p className="text-sm text-[#a8c6f0] opacity-80">{contact2.jobTitle}</p>
                            </div>
                            <Avatar className="h-11 w-11 border-2 border-[#6b99d6]/30 group-hover:border-[#6b99d6]/50 transition-colors">
                              <AvatarImage src={contact2.imageUrl} alt={contact2.name} />
                              <AvatarFallback className="bg-[#6b99d6]/20 text-white">
                                {contact2.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                        </div>
                        <div className="mt-4 text-sm text-[#a8c6f0] bg-gray-900/30 p-3 rounded-lg">
                          <p>Reason: {match.reason}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/70 backdrop-blur-md border-[#6b99d6]/20 shadow-md shadow-[#6b99d6]/10">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#799ed9]" />
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-[#a8c6f0] hover:text-white hover:bg-[#6b99d6]/20 gap-1 text-xs h-8">
                    View All <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="mt-1">
                      <div className="h-9 w-9 rounded-full bg-[#6b99d6]/10 flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">
                          {activity.type === "new-contact" && "New Contact"}
                          {activity.type === "follow-up" && "Follow-Up"}
                          {activity.type === "message" && "Message Sent"}
                        </p>
                        <time className="text-xs text-[#a8c6f0] opacity-80">{formatDate(activity.date)}</time>
                      </div>
                      <Link 
                        to={`/contacts/${activity.contact.id}`}
                        className="flex items-center mt-1 text-sm text-[#a8c6f0] hover:text-[#6b99d6] transition-colors"
                      >
                        <span className="font-medium">{activity.contact.name}</span>
                        {activity.contact.jobTitle && <span className="opacity-80 ml-1">• {activity.contact.jobTitle}</span>}
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
