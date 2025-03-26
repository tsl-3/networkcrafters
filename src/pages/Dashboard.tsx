
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ContactCard } from "@/components/ContactCard";
import { sampleContacts, industryCounts, tagCounts, matchSuggestions } from "@/lib/sample-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Star, 
  BarChart, 
  PieChart,
  Calendar, 
  Clock, 
  Activity,
  Tag,
  Building,
  Zap,
  Plus,
  ChevronRight,
  MessageSquare,
  Share2,
  PenSquare
} from "lucide-react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie } from "recharts";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const colorPalette = [
  "hsl(221, 83%, 53%)",
  "hsl(217, 91%, 60%)",
  "hsl(142, 71%, 45%)",
  "hsl(250, 91%, 60%)",
  "hsl(45, 93%, 47%)",
  "hsl(0, 84%, 60%)"
];

const Dashboard = () => {
  const [period, setPeriod] = useState<"week" | "month" | "quarter">("month");
  
  // Convert industry data for chart
  const industryData = Object.entries(industryCounts).map(([name, value], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill: colorPalette[index % colorPalette.length]
  }));
  
  // Convert tag data for chart
  const tagData = Object.entries(tagCounts)
    .filter(([_, value]) => value > 15) // Filter to show only tags with count > 15
    .map(([name, value], index) => ({
      name,
      value,
      fill: colorPalette[index % colorPalette.length]
    }));
  
  // Recent activity data (mock)
  const recentActivity = [
    {
      id: 1,
      type: "new-contact",
      contact: sampleContacts[0],
      date: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: 2,
      type: "follow-up",
      contact: sampleContacts[1],
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: 3,
      type: "message",
      contact: sampleContacts[2],
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: 4,
      type: "new-contact",
      contact: sampleContacts[3],
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    }
  ];
  
  // Format date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
  };
  
  // Activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new-contact":
        return <Plus className="h-4 w-4 text-green-500" />;
      case "follow-up":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-primary" />;
    }
  };
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover text-popover-foreground p-2 rounded-md border text-sm">
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/20">
        <div className="container py-8 px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your professional network
            </p>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Contacts
                    </p>
                    <h3 className="text-3xl font-bold mt-1">
                      {sampleContacts.length}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      High-Value Contacts
                    </p>
                    <h3 className="text-3xl font-bold mt-1">
                      {sampleContacts.filter(c => c.matchScore && c.matchScore > 80).length}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-amber-500/10 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Follow-Ups Due
                    </p>
                    <h3 className="text-3xl font-bold mt-1">
                      {sampleContacts.filter(c => c.tags?.includes("follow-up")).length}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Match Suggestions
                    </p>
                    <h3 className="text-3xl font-bold mt-1">
                      {matchSuggestions.length}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts and analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-muted-foreground" />
                    Network by Industry
                  </CardTitle>
                  <div className="flex gap-1">
                    {["week", "month", "quarter"].map((p) => (
                      <Button
                        key={p}
                        variant={period === p ? "default" : "ghost"}
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => setPeriod(p as any)}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px] pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={industryData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 70, bottom: 10 }}
                    >
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false}
                        tickLine={false}
                        width={60}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="value" 
                        radius={[4, 4, 4, 4]}
                      >
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                  Contact Tags Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={tagData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={{ stroke: 'rgba(156, 163, 175, 0.5)', strokeWidth: 1 }}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Collaboration suggestions */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-500" />
                      Suggested Matches
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1 text-xs h-8">
                      View All
                      <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matchSuggestions.map((match, index) => {
                      const contact1 = sampleContacts.find(c => c.id === match.contact1);
                      const contact2 = sampleContacts.find(c => c.id === match.contact2);
                      
                      if (!contact1 || !contact2) return null;
                      
                      return (
                        <Card key={index} className="bg-muted/30 overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                                {match.score}% Match
                              </Badge>
                              <div className="flex gap-2">
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                  <PenSquare className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between gap-4">
                              <Link to={`/contacts/${contact1.id}`} className="flex items-center gap-3 flex-1">
                                <Avatar className="h-10 w-10 border">
                                  <AvatarImage src={contact1.imageUrl} alt={contact1.name} />
                                  <AvatarFallback>
                                    {contact1.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{contact1.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {contact1.jobTitle}
                                  </p>
                                </div>
                              </Link>
                              
                              <div className="flex flex-col items-center">
                                <div className="h-0.5 w-10 bg-amber-500/50"></div>
                                <Button size="sm" variant="outline" className="my-1 h-7 text-xs">
                                  Introduce
                                </Button>
                                <div className="h-0.5 w-10 bg-amber-500/50"></div>
                              </div>
                              
                              <Link to={`/contacts/${contact2.id}`} className="flex items-center gap-3 flex-1 justify-end text-right">
                                <div>
                                  <p className="font-medium">{contact2.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {contact2.jobTitle}
                                  </p>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                  <AvatarImage src={contact2.imageUrl} alt={contact2.name} />
                                  <AvatarFallback>
                                    {contact2.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                            </div>
                            
                            <div className="mt-3 text-sm text-muted-foreground bg-background/50 p-2 rounded-md">
                              <p>Reason: {match.reason}</p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent activity */}
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs h-8">
                    View All
                    <ChevronRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="mt-1">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {activity.type === "new-contact" && "Added new contact"}
                            {activity.type === "follow-up" && "Follow-up reminder"}
                            {activity.type === "message" && "Sent message"}
                          </p>
                          <time className="text-xs text-muted-foreground">
                            {formatDate(activity.date)}
                          </time>
                        </div>
                        <Link 
                          to={`/contacts/${activity.contact.id}`}
                          className="flex items-center mt-1 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <span className="font-medium">{activity.contact.name}</span>
                          {activity.contact.jobTitle && (
                            <span className="text-muted-foreground ml-1">
                              • {activity.contact.jobTitle}
                            </span>
                          )}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
