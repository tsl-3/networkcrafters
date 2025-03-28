
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilePlus, FilePenLine, FileText } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size?: string;
  date?: string;
}

interface KnowledgeBaseCardProps {
  title: string;
  documents: Document[];
  onAddDocument?: () => void;
  onEditDocument?: (id: string) => void;
  className?: string;
}

export function KnowledgeBaseCard({
  title,
  documents = [],
  onAddDocument,
  onEditDocument,
  className = ""
}: KnowledgeBaseCardProps) {
  return (
    <Card className={`bg-gray-900/50 border-gray-800 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Button 
          onClick={onAddDocument} 
          variant="outline" 
          size="sm" 
          className="h-8 border-gray-700 hover:bg-gray-800"
        >
          <FilePlus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No documents added yet</p>
            <p className="text-sm">Add documents to train your agent</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-md">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#6b99d6]" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">{doc.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs py-0 h-5">
                        {doc.type}
                      </Badge>
                      {doc.size && <span className="text-xs text-gray-400">{doc.size}</span>}
                    </div>
                  </div>
                </div>
                {onEditDocument && (
                  <Button 
                    onClick={() => onEditDocument(doc.id)} 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                  >
                    <FilePenLine className="h-4 w-4" />
                    <span className="sr-only">Edit document</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
