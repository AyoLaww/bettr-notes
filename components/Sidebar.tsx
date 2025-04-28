"use client";

import { Button } from "./ui/button";
import { Menu, Plus, X } from "lucide-react";
import { cn } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function Sidebar({
  notes,
  onSelectNote,
  onNewNote,
  selectedNoteId,
  isSidebarOpen = true,
  isMobile = false,
  toggleSidebar = () => {},
}: any) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border h-screen bg-background transition-all duration-300",
        isSidebarOpen ? "w-64" : isMobile ? "w-0" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {isSidebarOpen && <h1 className="font-medium text-base">Notes</h1>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
          {isMobile ? (
            isSidebarOpen ? <X size={18} /> : <Menu size={18} />
          ) : (
            <Menu size={18} />
          )}
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {isSidebarOpen && (
          <div className="space-y-1 p-2">
            {notes.map((note: any) => (
              <button
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md transition-colors text-sm",
                  selectedNoteId === note.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-secondary"
                )}
              >
                <div className="font-medium truncate text-sm">{note.title}</div>
                <div className="text-[0.7rem] text-muted-foreground">
                  {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 border-t">
        <Button
          onClick={onNewNote}
          variant="outline"
          size={isSidebarOpen ? "default" : "icon"}
          className="w-full text-sm"
        >
          <Plus size={16} className="mr-1" />
          {isSidebarOpen && "New Note"}
        </Button>
      </div>
    </aside>
  );
} 