"use client";

import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Pencil, Trash2 } from "lucide-react";

export default function NoteView({ note, onEdit, onDelete, onChange, isEditing }: any) {
  return (
    <section className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between px-8 pt-8 pb-2">
        <div>
          <h1 className="text-3xl font-semibold">{note.title || 'Untitled'}</h1>
          <div className="text-sm text-muted-foreground">Last updated {note.updatedAt}</div>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <Pencil className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash2 className="w-5 h-5 text-destructive" />
          </Button>
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