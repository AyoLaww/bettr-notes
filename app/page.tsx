"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoteView from "../components/NoteView";
import NewNoteDialog from "../components/NewNoteDialog";
import { supabase } from "../lib/supabase";

type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
      if (data && data.length > 0) {
        setNote(data[0]);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNoteChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!note) return;
    
    const updatedNote = { ...note, content: e.target.value };
    setNote(updatedNote);
  };

  const saveNote = async () => {
    if (!note) return;

    try {
      const { error } = await supabase
        .from('notes')
        .update({ 
          content: note.content, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', note.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const deleteNote = async () => {
    if (!note) return;

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', note.id);

      if (error) throw error;
      
      // Update the UI after successful deletion
      setNotes((prev) => prev.filter((n) => n.id !== note.id));
      
      // Select the first note in the list if available
      if (notes.length > 1) {
        const nextNote = notes.find((n) => n.id !== note.id);
        if (nextNote) {
          setNote(nextNote);
        } else {
          setNote(null);
        }
      } else {
        setNote(null);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleNewNote = () => {
    setIsNewNoteDialogOpen(true);
  };

  const handleCreateNote = async (title: string) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([
          {
            title,
            content: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setNotes((prev) => [data, ...prev]);
        setNote(data);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleSelectNote = (id: number) => {
    const selectedNote = notes.find((n) => n.id === id);
    if (selectedNote) {
      setNote(selectedNote);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex h-screen bg-muted rounded-none overflow-hidden w-screen">
      <Sidebar
        notes={notes}
        selectedNoteId={note?.id}
        onSelectNote={handleSelectNote}
        onNewNote={handleNewNote}
      />
      {note && (
        <NoteView
          note={note}
          onDelete={deleteNote}
          onChange={handleNoteChange}
          onSave={saveNote}
          isEditing={true}
        />
      )}
      <NewNoteDialog
        isOpen={isNewNoteDialogOpen}
        onClose={() => setIsNewNoteDialogOpen(false)}
        onSubmit={handleCreateNote}
      />
    </main>
  );
}