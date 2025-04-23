'use client';

import React, { useState } from 'react';
import { KanbanColumn } from './KanbanColumn';

// Define types for card and column
export interface Card {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', cards: [{ id: 'card-1', title: 'Task 1' }, { id: 'card-2', title: 'Task 2' }] },
  { id: 'in-progress', title: 'In Progress', cards: [{ id: 'card-3', title: 'Task 3' }] },
  { id: 'done', title: 'Done', cards: [{ id: 'card-4', title: 'Task 4' }] },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const handleDrop = (cardId: string, targetColumnId: string) => {
    setColumns((prevColumns) => {
      // First find the dragged card and its source column
      let draggedCard: Card | undefined;
      let sourceColumnId: string | undefined;

      // Find the dragged card and remove it from its source column
      const updatedColumns = prevColumns.map((col) => {
        const cardIndex = col.cards.findIndex((c) => c.id === cardId);
        if (cardIndex > -1) {
          draggedCard = col.cards[cardIndex];
          sourceColumnId = col.id;
          // Remove the card from its source column
          return {
            ...col,
            cards: [...col.cards.slice(0, cardIndex), ...col.cards.slice(cardIndex + 1)]
          };
        }
        return col;
      });

      // If we didn't find the card or it's being dropped in the same column, no changes needed
      if (!draggedCard || !sourceColumnId) {
        console.log('Card not found or invalid source');
        return prevColumns;
      }

      // If dropping in the same column, no need to move
      if (sourceColumnId === targetColumnId) {
        console.log('Dropped in same column');
        return prevColumns;
      }

      // Add the card to the target column
      return updatedColumns.map((col) => {
        if (col.id === targetColumnId && draggedCard) {
          return {
            ...col,
            cards: [...col.cards, draggedCard]
          };
        }
        return col;
      });
    });
  };
  return (
    <div className="flex space-x-4 p-4 bg-gray-100 min-h-screen items-start">
      {columns.map((column) => (
        // Pass column id as key for DropZone identification in onItemDrop
        <KanbanColumn key={column.id} column={column} onDrop={handleDrop} />
      ))}
    </div>
  );
}
