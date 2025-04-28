"use client";

import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Trash2, Save } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function NoteView({ note, onDelete, onChange, onSave, isEditing }: {
  note: Note;
  onDelete: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSave: () => void;
  isEditing: boolean;
}) {
  return (
    <section className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between px-8 pt-8 pb-2">
        <div>
          <h1 className="text-3xl font-semibold">{note.title || 'Untitled'}</h1>
          <div className="text-sm text-muted-foreground">
            Last updated {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
          </div>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={onSave}
                  className="transition-transform active:scale-95 hover:bg-accent"
                >
                  <Save className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={onDelete}
                  className="transition-transform active:scale-95 hover:bg-destructive/10"
                >
                  <Trash2 className="w-5 h-5 text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Separator className="mb-4 mx-8" />
      <div className="flex-1 px-8 pb-8">
        <Card className="h-full shadow-none bg-transparent border-none p-0">
          <Textarea
            className="h-full min-h-[400px] resize-none shadow-none focus-visible:ring-0 text-base bg-transparent border-0 outline-none"
            value={note.content}
            onChange={onChange}
            readOnly={!isEditing}
            placeholder="Start writing your note..."
          />
        </Card>
      </div>
    </section>
  );
} 