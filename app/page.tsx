"use client";

import Sidebar from "../components/Sidebar";
import NoteView from "../components/NoteView";
import { useState } from "react";

const now = new Date();
const mockNotes = [
  { id: 1, title: "Untitled", updatedAt: now.toISOString() },
  { id: 2, title: "Welcome to Inkwell", updatedAt: new Date(now.getTime() - 3 * 60 * 1000).toISOString() }, // 3 minutes ago
  { id: 3, title: "Markdown Support", updatedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString() }, // 1 day ago
  { id: 4, title: "Keyboard Shortcuts", updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() }, // 2 days ago
];

const mockNote = {
  id: 1,
  title: "Untitled",
  updatedAt: now.toISOString(),
  content: "",
};

export default function Home() {
  const [note, setNote] = useState({ ...mockNote });

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prev) => ({ ...prev, content: e.target.value }));
  };

  return (
    <main className="flex h-screen bg-muted rounded-none overflow-hidden w-screen">
      <Sidebar
        notes={mockNotes}
        selectedNoteId={1}
        onSelectNote={() => {}}
        onNewNote={() => {}}
      />
      <NoteView
        note={note}
        onEdit={() => {}}
        onDelete={() => {}}
        onChange={handleNoteChange}
        isEditing={true}
      />
    </main>
  );
}