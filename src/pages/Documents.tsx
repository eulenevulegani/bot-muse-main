import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Plus,
  Folder,
  File,
  Image,
  Video,
  Music,
  Archive,
  Star,
  Share2,
  MoreHorizontal
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: string;
  isStarred: boolean;
  downloads: number;
  description: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock user and business data for demo
  const user = { email: "demo@botmuse.com", name: "Demo User" };
  const business = { 
    name: "Demo Business", 
    industry: "E-commerce",
    id: "demo-business-1"
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    // Mock data for demo
    const mockDocuments = [
      {
        id: "DOC-001",
        name: "Product Catalog 2024",
        type: "pdf",
        size: "2.4 MB",
        uploadDate: "2024-01-15T10:30:00Z",
        category: "Marketing",
        isStarred: true,
        downloads: 45,
        description: "Complete product catalog with images and descriptions"
      },
      {
        id: "DOC-002",
        name: "WhatsApp Templates",
        type: "docx",
        size: "1.2 MB",
        uploadDate: "2024-01-14T15:45:00Z",
        category: "Templates",
        isStarred: false,
        downloads: 23,
        description: "Pre-written WhatsApp message templates"
      },
      {
        id: "DOC-003",
        name: "Customer Onboarding Guide",
        type: "pdf",
        size: "3.1 MB",
        uploadDate: "2024-01-13T09:15:00Z",
        category: "Training",
        isStarred: true,
        downloads: 67,
        description: "Step-by-step guide for customer onboarding"
      },
      {
        id: "DOC-004",
        name: "Business Logo",
        type: "png",
        size: "456 KB",
        uploadDate: "2024-01-12T14:20:00Z",
        category: "Branding",
        isStarred: false,
        downloads: 12,
        description: "High-resolution business logo"
      },
      {
        id: "DOC-005",
        name: "Campaign Analytics Report",
        type: "xlsx",
        size: "1.8 MB",
        uploadDate: "2024-01-11T11:30:00Z",
        category: "Analytics",
        isStarred: false,
        downloads: 8,
        description: "Detailed analytics report for Q4 campaigns"
      }
    ];
    setDocuments(mockDocuments);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf": return FileText;
      case "docx": return FileText;
      case "png": return Image;
      case "jpg": return Image;
      case "jpeg": return Image;
      case "xlsx": return FileText;
      case "mp4": return Video;
      case "mp3": return Music;
      case "zip": return Archive;
      default: return File;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case "pdf": return "text-red-600";
      case "docx": return "text-blue-600";
      case "png": return "text-green-600";
      case "jpg": return "text-green-600";
      case "jpeg": return "text-green-600";
      case "xlsx": return "text-green-600";
      case "mp4": return "text-purple-600";
      case "mp3": return "text-orange-600";
      case "zip": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || doc.category === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (documentId: string) => {
    toast({
      title: "Download Started",
      description: "Your document is being downloaded.",
    });
  };

  const handleStar = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, isStarred: !doc.isStarred }
        : doc
    ));
    toast({
      title: "Document Updated",
      description: "Star status has been updated.",
    });
  };

  const handleDelete = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: "Document Deleted",
      description: "The document has been removed.",
    });
  };

  const categories = ["all", "Marketing", "Templates", "Training", "Branding", "Analytics"];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={user} business={business} onLogout={() => navigate("/")} />
      
      <div className="lg:ml-64">
        <Header 
          title="Documents" 
          subtitle="Manage your business documents and files"
          actions={
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>
                    Upload a new document to your business library.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600">Drag and drop files here, or click to select</p>
                    <p className="text-xs text-gray-500 mt-2">Supports PDF, DOC, XLS, images, and more</p>
                  </div>
                  <Button className="w-full" onClick={() => setIsUploadOpen(false)}>
                    Upload Files
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          }
        />
        
        <main className="container mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documents.length}</div>
                <p className="text-xs text-muted-foreground">+3 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <Folder className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.9 GB</div>
                <p className="text-xs text-muted-foreground">of 50 GB used</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Starred Files</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documents.filter(d => d.isStarred).length}
                </div>
                <p className="text-xs text-muted-foreground">Important documents</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documents.reduce((sum, doc) => sum + doc.downloads, 0)}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterType === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(category)}
                >
                  {category === "all" ? "All" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => {
              const FileIcon = getFileIcon(document.type);
              return (
                <Card key={document.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getFileColor(document.type).replace('text-', 'bg-').replace('-600', '-100')}`}>
                          <FileIcon className={`h-5 w-5 ${getFileColor(document.type)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg truncate">{document.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {document.size} • {new Date(document.uploadDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStar(document.id)}
                        >
                          <Star className={`h-4 w-4 ${document.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline">{document.category}</Badge>
                        <span className="text-muted-foreground">{document.downloads} downloads</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload(document.id)}
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {/* View document */}}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(document.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No documents found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your search or filter criteria."
                  : "Upload your first document to get started."
                }
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Documents;
