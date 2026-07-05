import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { useStore } from '../lib/store'
import Greeting from './Greeting'
import DateTime from './DateTime'
import PromptBar from './PromptBar'
import QuickLinks from './QuickLinks'
import type { WidgetId } from '../types'

const WIDGET_MAP: Record<WidgetId, React.ReactNode> = {
  greeting: <Greeting />,
  dateTime: <DateTime />,
  promptBar: <PromptBar />,
  quickLinks: <QuickLinks />,
}

interface SortableWidgetProps {
  id: WidgetId
  isDragging?: boolean
  index: number
  editing: boolean
  fullWidth?: boolean
}

function SortableWidget({ id, isDragging, index, editing, fullWidth }: SortableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortDragging,
  } = useSortable({ id, disabled: !editing })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortDragging ? 0.3 : 1,
    animationDelay: `${index * 0.08}s`,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative widget-enter w-full
        ${fullWidth ? '' : 'max-w-xl mx-auto'}
        ${isDragging ? 'z-50' : ''}
        ${editing ? 'ring-1 ring-accent/20 rounded-[var(--cl-radius)]' : ''}
        ${isSortDragging ? 'ring-2 ring-accent/40' : ''}
      `}
    >
      {/* Drag handle — only visible in edit mode */}
      {editing ? (
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="absolute -left-10 top-1/2 -translate-y-1/2 p-1.5
            text-dim hover:text-accent cursor-grab active:cursor-grabbing
            z-10"
          aria-label="Drag to reorder"
        >
          <GripVertical size={16} />
        </button>
      ) : null}

      {WIDGET_MAP[id]}
    </div>
  )
}

function CenteredList({
  visibleWidgets,
  editing,
  activeId,
}: {
  visibleWidgets: { id: WidgetId }[]
  editing: boolean
  activeId: WidgetId | null
}) {
  return (
    <div
      className="flex flex-col items-center w-full max-w-xl mx-auto"
      style={{ rowGap: `var(${editing ? '--w-gap-edit' : '--w-gap'})` }}
    >
      {visibleWidgets.map((w, i) => (
        <SortableWidget
          key={w.id}
          id={w.id}
          isDragging={w.id === activeId}
          index={i}
          editing={editing}
        />
      ))}
    </div>
  )
}

function DashboardList({
  visibleWidgets,
  editing,
  activeId,
}: {
  visibleWidgets: { id: WidgetId }[]
  editing: boolean
  activeId: WidgetId | null
}) {
  // Wide vertical stack; widgets naturally fill the wider container.
  // Quick Links' internal grid promotes to 3 columns at lg via index.css.
  return (
    <div
      className="flex flex-col items-center w-full max-w-5xl mx-auto"
      style={{ rowGap: `var(${editing ? '--w-gap-edit' : '--w-gap'})` }}
    >
      {visibleWidgets.map((w, i) => (
        <SortableWidget
          key={w.id}
          id={w.id}
          isDragging={w.id === activeId}
          index={i}
          editing={editing}
          fullWidth
        />
      ))}
    </div>
  )
}

function SidebarList({
  visibleWidgets,
  editing,
  activeId,
}: {
  visibleWidgets: { id: WidgetId }[]
  editing: boolean
  activeId: WidgetId | null
}) {
  // Vertically stacked sidebar column, left-aligned on desktop.
  return (
    <div
      className="flex flex-col items-stretch w-full max-w-sm md:ml-12 md:mr-auto my-auto"
      style={{ rowGap: `var(${editing ? '--w-gap-edit' : '--w-gap'})` }}
    >
      {visibleWidgets.map((w, i) => (
        <SortableWidget
          key={w.id}
          id={w.id}
          isDragging={w.id === activeId}
          index={i}
          editing={editing}
          fullWidth
        />
      ))}
    </div>
  )
}

export default function WidgetGrid() {
  const widgets = useStore((s) => s.widgets)
  const reorderWidgets = useStore((s) => s.reorderWidgets)
  const editing = useStore((s) => s.editing)
  const layoutId = useStore((s) => s.layoutId)
  const [activeId, setActiveId] = useState<WidgetId | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  )

  const visibleWidgets = widgets.filter((w) => w.visible)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as WidgetId)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over || active.id === over.id) return

    const visibleIds = visibleWidgets.map((w) => w.id)
    const oldIndex = visibleIds.indexOf(active.id as WidgetId)
    const newIndex = visibleIds.indexOf(over.id as WidgetId)

    if (oldIndex === newIndex) return

    const newVisibleIds = arrayMove(visibleIds, oldIndex, newIndex)

    const allIds = widgets.map((w) => w.id)
    const hiddenIds = allIds.filter((id) => !visibleIds.includes(id))
    const merged: WidgetId[] = []
    let vi = 0
    for (const id of allIds) {
      if (hiddenIds.includes(id)) {
        merged.push(id)
      } else {
        merged.push(newVisibleIds[vi])
        vi++
      }
    }

    reorderWidgets(merged)
  }


  if (visibleWidgets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center select-none">
        <p className="font-sans text-sm text-muted/60">
          All widgets are hidden
        </p>
        <p className="font-sans text-xs text-dim/50 mt-2">
          Open settings to show some widgets
        </p>
      </div>
    )
  }

  const listProps = { visibleWidgets, editing, activeId }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={visibleWidgets.map((w) => w.id)}
        strategy={verticalListSortingStrategy}
      >
        {layoutId === 'centered' && <CenteredList {...listProps} />}
        {layoutId === 'sidebar' && <SidebarList {...listProps} />}
        {layoutId === 'dashboard' && <DashboardList {...listProps} />}
      </SortableContext>

      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <div
            className="w-full max-w-xl opacity-90
              ring-2 ring-accent/30 rounded-[var(--cl-radius)] shadow-lg shadow-black/10"
          >
            {WIDGET_MAP[activeId]}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
