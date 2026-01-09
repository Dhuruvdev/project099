import { Sidebar } from "@/components/Sidebar";
import { useTool, useProcessTool, useJob } from "@/hooks/use-tools";
import { useRoute } from "wouter";
import { ObjectUploader } from "@/components/ObjectUploader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResultViewer } from "@/components/ResultViewer";
import { Loader2, ArrowLeft, UploadCloud, AlertCircle, Image, FileText, Video, Sparkles, ShieldAlert, Braces } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";

export default function ToolDetail() {
  const [, params] = useRoute("/tools/:slug");
  const slug = params?.slug || "";
  const { data: tool, isLoading: isToolLoading } = useTool(slug);
  const processMutation = useProcessTool(slug);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // State
  const [inputText, setInputText] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [jobId, setJobId] = useState<number | undefined>(undefined);
  
  // Job Polling
  const { data: job } = useJob(jobId);

  const handleProcess = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to use this tool.",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await processMutation.mutateAsync({
        text: inputText || undefined,
        fileUrl: fileUrl || undefined,
      });
      setJobId(result.jobId);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = async (file: File) => {
    const res = await fetch("/api/uploads/request-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: file.name,
        size: file.size,
        contentType: file.type,
      }),
    });
    const { uploadURL, objectPath } = await res.json();
    
    // Upload directly to signed URL
    await fetch(uploadURL, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    // We can't use objectPath directly because we need a public URL or a signed GET URL
    // For now we assume we can pass the objectPath to the backend which knows how to read it
    setFileUrl(objectPath); 
    setFileName(file.name);
    
    return { method: "PUT" as const, url: uploadURL, headers: { "Content-Type": file.type } };
  };

  // Reset when leaving/entering new tool
  useEffect(() => {
    setJobId(undefined);
    setFileUrl(null);
    setInputText("");
    setFileName(null);
  }, [slug]);

  if (isToolLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold">Tool Not Found</h2>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const isProcessing = processMutation.isPending || (job && job.status === 'pending') || (job && job.status === 'processing');
  const isComplete = job?.status === 'completed';
  const isFailed = job?.status === 'failed';

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          
          <Link href="/">
            <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Button>
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-display font-bold mb-3">{tool.name}</h1>
            <p className="text-lg text-muted-foreground">{tool.description}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Tools Navigation - Desktop only like screenshot */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-[#F8F9FE] rounded-2xl p-4 border border-border/50 sticky top-6">
                 <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start font-semibold text-muted-foreground hover:bg-transparent px-2">
                       <Image className="w-4 h-4 mr-2" /> Image Tools
                    </Button>
                    <div className="pl-6 space-y-1">
                       <Button variant="secondary" className="w-full justify-start bg-primary/10 text-primary hover:bg-primary/20 rounded-lg h-9">
                          Background Remover
                       </Button>
                       <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-muted/50 rounded-lg h-9">
                          Image Compressor
                       </Button>
                       <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:bg-muted/50 rounded-lg h-9">
                          Image Resize & Crop
                       </Button>
                    </div>
                    <Button variant="ghost" className="w-full justify-start font-semibold text-muted-foreground hover:bg-transparent px-2 mt-4">
                       <FileText className="w-4 h-4 mr-2" /> PDF Tools
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-semibold text-muted-foreground hover:bg-transparent px-2 mt-2">
                       <Video className="w-4 h-4 mr-2" /> Video Tools
                    </Button>
                 </nav>
                 <div className="mt-8">
                    <Button className="w-full bg-primary text-white rounded-xl shadow-lg shadow-primary/20 h-10">
                       Unlock All Features ?
                    </Button>
                 </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 space-y-8">
              <div className="bg-white border border-border rounded-[2rem] p-8 shadow-sm">
                <div className="grid lg:grid-cols-2 gap-12">
                   {/* Upload Section */}
                   <div className="space-y-6">
                      <ObjectUploader
                        onGetUploadParameters={async (file) => {
                          const res = await fetch("/api/uploads/request-url", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              name: file.name,
                              size: file.size,
                              contentType: file.type,
                            }),
                          });
                          const { uploadURL, objectPath } = await res.json();
                          setFileUrl(objectPath);
                          setFileName(file.name);
                          return {
                            method: "PUT",
                            url: uploadURL,
                            headers: { "Content-Type": file.type },
                          };
                        }}
                      >
                        <div className="border-2 border-dashed border-border/60 rounded-[1.5rem] p-12 flex flex-col items-center justify-center text-center hover:bg-muted/30 hover:border-primary/40 transition-all cursor-pointer group relative min-h-[300px]">
                          <div className="w-16 h-16 bg-[#F1F5F9] rounded-2xl flex items-center justify-center mb-6">
                            <Image className="w-8 h-8 text-[#3B82F6]" />
                          </div>
                          <p className="text-xl font-semibold text-[#1E293B]">Drop an image here or</p>
                          <Button className="mt-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-10 rounded-xl h-12 shadow-lg shadow-purple-500/30">
                             Upload Image
                          </Button>
                        </div>
                      </ObjectUploader>

                      <div className="flex bg-[#F1F5F9] p-1.5 rounded-xl gap-1">
                         <Button variant="secondary" className="flex-1 bg-white shadow-sm text-primary rounded-lg h-9">Background Remover</Button>
                         <Button variant="ghost" className="flex-1 text-muted-foreground rounded-lg h-9">Image Compressor</Button>
                         <Button variant="ghost" className="flex-1 text-muted-foreground rounded-lg h-9">Image Resize</Button>
                      </div>

                      {fileName && (
                        <div className="flex items-center gap-2 p-3 bg-primary/5 text-primary rounded-lg text-sm font-medium border border-primary/20">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          {fileName}
                        </div>
                      )}
                      
                      <div className="flex justify-end pt-4">
                        <Button 
                          size="lg" 
                          onClick={handleProcess} 
                          disabled={isProcessing || (!inputText && !fileUrl)}
                          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 rounded-xl h-12 shadow-lg shadow-blue-500/20"
                        >
                          {isProcessing ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                          ) : (
                            "Start Process"
                          )}
                        </Button>
                      </div>
                   </div>

                   {/* Preview / Info Section */}
                   <div className="space-y-8 flex flex-col justify-center">
                      <div className="relative">
                         <div className="w-full aspect-square rounded-2xl bg-[#F8F9FE] flex items-center justify-center overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop" alt="Preview" className="w-full h-full object-cover grayscale opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8F9FE]/80" />
                         </div>
                      </div>

                      <div className="space-y-4">
                         {[
                           { icon: <Sparkles className="w-4 h-4 text-orange-400" />, text: "Remove background fast" },
                           { icon: <ShieldAlert className="w-4 h-4 text-blue-400" />, text: "100% automatic & free to use" },
                           { icon: <Image className="w-4 h-4 text-pink-400" />, text: "Keep high image quality" },
                           { icon: <Braces className="w-4 h-4 text-gray-700" />, text: "AI-powered processing" },
                         ].map((item, i) => (
                           <div key={i} className="flex items-center gap-3 text-[#334155] font-medium">
                             {item.icon} {item.text}
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
