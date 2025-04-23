'use client';

import React from 'react';
import type { Card } from './KanbanBoard';

interface KanbanCardProps {
  card: Card;
}

export function KanbanCard({ card }: KanbanCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-2 mb-2 rounded shadow cursor-grab hover:bg-gray-50"
      id={card.id}
    >
      {card.title}
    </div>
  );
}
