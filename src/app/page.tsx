import { KanbanBoard } from '@/components/kanban/KanbanBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Kanban Board</h1>
      <KanbanBoard />
    </main>
  );
}
