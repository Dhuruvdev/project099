import { Check, Copy, Download, FileText, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface ResultViewerProps {
  type: 'text' | 'image' | 'file' | 'json';
  content: string; // URL or text content
  metadata?: any;
}

export function ResultViewer({ type, content, metadata }: ResultViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (type === 'image') {
    return (
      <div className="space-y-4">
        <div className="rounded-xl overflow-hidden border border-border bg-muted/30 relative group">
          <img src={content} alt="Generated result" className="w-full h-auto max-h-[500px] object-contain" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
            <a href={content} download target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="gap-2">
                <Download className="w-4 h-4" /> Download
              </Button>
            </a>
          </div>
        </div>
        <div className="text-xs text-center text-muted-foreground">
          Right click to save or use the download button above.
        </div>
      </div>
    );
  }

  if (type === 'text' || type === 'json') {
    return (
      <div className="relative">
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="sm" variant="outline" onClick={handleCopy} className="h-8 bg-background/80 backdrop-blur">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <pre className="p-4 rounded-xl bg-muted/30 border border-border overflow-x-auto text-sm font-mono leading-relaxed max-h-[400px]">
          {type === 'json' ? JSON.stringify(JSON.parse(content), null, 2) : content}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-border bg-card flex flex-col items-center justify-center text-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <FileText className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-semibold">Processing Complete</h4>
        <p className="text-sm text-muted-foreground mt-1">Your file is ready for download.</p>
      </div>
      <a href={content} download>
        <Button className="gap-2">
          <Download className="w-4 h-4" /> Download Result
        </Button>
      </a>
    </div>
  );
}
