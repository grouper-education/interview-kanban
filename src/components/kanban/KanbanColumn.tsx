'use client';

import React from 'react';
import { KanbanCard } from './KanbanCard';
import type { Column, Card } from './KanbanBoard';

interface KanbanColumnProps {
  column: Column;
  onDrop: (cardId: string, targetColumnId: string) => void;
}

export function KanbanColumn({ column, onDrop }: KanbanColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      onDrop(cardId, column.id);
    }
  };

  return (
    <div className="flex flex-col w-72 bg-gray-200 p-3 rounded-lg shadow">
      <h2 className="font-semibold mb-3 text-lg text-center text-gray-700">{column.title}</h2>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="flex-grow min-h-[100px] border-2 border-dashed border-gray-400 rounded p-2 bg-gray-100 transition-colors"
      >
        <div className="space-y-2">
          {column.cards.length === 0 && (
            <div className="text-gray-500 italic text-center pt-4">
              No tasks yet.
            </div>
          )}
          {column.cards.map(item => (
            <div key={item.id}>
              <KanbanCard card={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
