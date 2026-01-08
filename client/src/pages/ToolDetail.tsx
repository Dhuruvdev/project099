import { Sidebar } from "@/components/Sidebar";
import { useTool, useProcessTool, useJob } from "@/hooks/use-tools";
import { useRoute } from "wouter";
import { ObjectUploader } from "@/components/ObjectUploader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResultViewer } from "@/components/ResultViewer";
import { Loader2, ArrowLeft, UploadCloud, AlertCircle } from "lucide-react";
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"/> 
                  Input
                </h3>
                
                {tool.inputType === 'text' && (
                  <Textarea 
                    placeholder="Enter your text here..." 
                    className="min-h-[200px] text-base resize-none focus:ring-primary/20"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                )}

                {tool.inputType === 'file' && (
                  <div className="space-y-4">
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
                        <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-muted/30 hover:border-primary/50 transition-all cursor-pointer group">
                          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                          <p className="font-medium">Click to upload file</p>
                          <p className="text-sm text-muted-foreground mt-1">Max size 10MB</p>
                        </div>
                      </ObjectUploader>
                      
                      {fileName && (
                        <div className="flex items-center gap-2 p-3 bg-primary/5 text-primary rounded-lg text-sm font-medium border border-primary/20">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          {fileName}
                        </div>
                      )}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                   <Button 
                    size="lg" 
                    onClick={handleProcess} 
                    disabled={isProcessing || (!inputText && !fileUrl)}
                    className="w-full sm:w-auto min-w-[150px] shadow-lg shadow-primary/20"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                      </>
                    ) : (
                      "Start Process"
                    )}
                   </Button>
                </div>
              </div>
            </div>

            {/* Output / Status Section */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-6">
                <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                  <div className="w-1 h-6 bg-secondary rounded-full"/> 
                  Result
                </h3>

                <AnimatePresence mode="wait">
                  {!jobId && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="text-center py-12 text-muted-foreground"
                    >
                      <p>Result will appear here</p>
                    </motion.div>
                  )}

                  {isProcessing && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 space-y-4"
                    >
                       <div className="relative w-16 h-16 mx-auto">
                          <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                       </div>
                       <p className="font-medium animate-pulse">Processing your request...</p>
                    </motion.div>
                  )}

                  {isFailed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/20 text-center"
                    >
                      <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">Processing Failed</p>
                      <p className="text-sm opacity-80 mt-1">Please try again later.</p>
                    </motion.div>
                  )}

                  {isComplete && job?.resultUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <ResultViewer 
                        type={tool.outputType as any} 
                        content={job.resultUrl} 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
