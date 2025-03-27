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

// Enhanced dark color palette with neon accents
const colorPalette = [
  "#00ffff",   // Cyan accent
  "#1e90ff",   // Dodger blue
  "#7b68ee",   // Medium slate blue
  "#00bfff",   // Deep sky blue
  "#1434A4",   // Dark blue
  "#191970"    // Midnight blue
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

  return (
    <div 
      className="flex min-h-screen flex-col bg-black font-sans antialiased overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at bottom, rgba(0,0,20,1) 0%, rgba(0,0,10,1) 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Futuristic grid overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3
        }}
      />

      {/* Glowing neon border effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-10" 
        style={{
          boxShadow: 'inset 0 0 200px rgba(0,255,255,0.2)',
          border: '2px solid rgba(0,255,255,0.1)',
          borderRadius: '0'
        }}
      />

      <Navbar />
      
      <main className="flex-1 py-12 px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#00ffff] tracking-tight drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
              Network Intelligence
            </h1>
            <p className="text-[#00bfff] mt-2 text-lg opacity-80">
              Advanced Connectivity Analytics
            </p>
          </div>
          
          {/* Stats Cards with Neon Glow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: "Total Contacts", value: sampleContacts.length, icon: Users },
              { title: "High-Value", value: sampleContacts.filter(c => c.matchScore && c.matchScore > 80).length, icon: Star },
              { title: "Follow-Ups", value: sampleContacts.filter(c => c.tags?.includes("follow-up")).length, icon: Calendar },
              { title: "Matches", value: matchSuggestions.length, icon: Zap }
            ].map((stat, idx) => (
              <Card 
                key={idx}
                className="bg-[#000020] border-[#00ffff]/20 shadow-xl 
                  hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] 
                  transition-all duration-300 
                  relative overflow-hidden
                  before:absolute before:inset-0 
                  before:bg-gradient-to-br 
                  before:from-transparent 
                  before:via-[#00ffff]/10 
                  before:to-transparent 
                  before:opacity-0 
                  hover:before:opacity-100 
                  before:transition-opacity"
              >
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#00bfff] font-medium opacity-80">{stat.title}</p>
                      <h3 className="text-3xl font-semibold text-[#00ffff] mt-1 drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
                        {stat.value}
                      </h3>
                    </div>
                    <div className="p-3 bg-[#00ffff]/10 rounded-xl">
                      <stat.icon className="h-6 w-6 text-[#00ffff] drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Charts with Cyberpunk Styling */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-[#000020] border-[#00ffff]/20 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-[#00ffff] flex items-center gap-2 drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
                  <BarChart className="h-5 w-5 text-[#00bfff]" />
                  Industry Ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[340px] border-b border-[#00ffff]/20">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart 
                      data={industryData} 
                      layout="vertical" 
                      margin={{ top: 20, right: 30, left: 80, bottom: 10 }}
                    >
                      <XAxis 
                        type="number" 
                        stroke="#00ffff" 
                        tick={{ fill: '#00bfff', fontWeight: 'bold' }} 
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        stroke="#00ffff"
                        tick={{ fill: '#00ffff', fontWeight: 'bold' }}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(0,255,255,0.1)' }}
                        content={({ active, payload }) => 
                          active && payload?.length ? (
                            <div className="bg-[#000030] border border-[#00ffff]/30 p-3 rounded-lg shadow-2xl">
                              <p className="text-[#00ffff]">{`${payload[0].name}: ${payload[0].value}`}</p>
                            </div>
                          ) : null
                        } 
                      />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {industryData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.fill} 
                            style={{ 
                              filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.3))'
                            }}
                          />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#000020] border-[#00ffff]/20 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-[#00ffff] flex items-center gap-2 drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
                  <PieChart className="h-5 w-5 text-[#00bfff]" />
                  Connection Topology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[340px] border-b border-[#00ffff]/20">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={tagData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={{ 
                          stroke: '#00ffff', 
                          strokeWidth: 1,
                          strokeDasharray: '3 3'
                        }}
                      >
                        {tagData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.fill}
                            style={{ 
                              filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.3))'
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        cursor={{ fill: 'rgba(0,255,255,0.1)' }}
                        content={({ active, payload }) => 
                          active && payload?.length ? (
                            <div className="bg-[#000030] border border-[#00ffff]/30 p-3 rounded-lg shadow-2xl">
                              <p className="text-[#00ffff]">{`${payload[0].name}: ${payload[0].value}`}</p>
                            </div>
                          ) : null
                        } 
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Optional: Cyberpunk terminal-like background noise */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-10" 
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
};

export default Dashboard;
