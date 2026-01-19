# Soulpath Guide - Architecture Documentation

## Overview

This application follows **Clean Architecture** principles with a clear separation between business logic, infrastructure, and presentation layers. The architecture is designed to be scalable, maintainable, and testable.

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  (React Components, Pages, UI, Feature Modules)             │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    Application Layer                         │
│     (Hooks, Services, Business Logic Orchestration)         │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                      Domain Layer                            │
│        (Entities, Types, Repository Interfaces)             │
└────────────────────▲────────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────────┐
│                  Infrastructure Layer                        │
│    (Storage Adapters, Repository Implementations)           │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── domain/                              # Core business entities and rules
│   ├── entities/
│   │   ├── game.ts                      # Game and GameData types
│   │   ├── trophy.ts                    # Trophy, TrophyType, TrophySubItem
│   │   ├── checklist.ts                 # ChecklistStep, Task
│   │   └── progress.ts                  # GameProgress, ProgressState
│   └── repositories/
│       └── progress-repository.ts       # IProgressRepository interface
│
├── infrastructure/                      # External systems and adapters
│   ├── storage/
│   │   └── local-storage-adapter.ts     # Generic localStorage wrapper
│   └── repositories/
│       └── progress-repository.ts       # LocalStorageProgressRepository
│
├── application/                         # Business logic and orchestration
│   ├── services/
│   │   ├── trophy-service.ts            # Trophy grouping, calculations
│   │   ├── progress-service.ts          # Progress state transformations
│   │   └── game-service.ts              # Game data access logic
│   └── hooks/
│       ├── use-task-progress.ts         # Task progress state management
│       ├── use-trophy-progress.ts       # Trophy progress state management
│       └── use-all-games-progress.ts    # Multi-game progress aggregation
│
├── presentation/                        # UI components and views
│   ├── components/
│   │   ├── ui/                          # Radix UI primitives
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   └── common/                      # Shared components
│   │       ├── page-header.tsx
│   │       ├── progress-bar.tsx
│   │       └── missable-badge.tsx
│   └── features/                        # Feature-based components
│       ├── game/
│       │   ├── game-card.tsx
│       │   └── game-grid.tsx
│       ├── checklist/
│       │   ├── checklist-tab.tsx
│       │   ├── checklist-step.tsx
│       │   └── task-item.tsx
│       └── trophy/
│           ├── trophy-tab.tsx
│           ├── trophy-section.tsx
│           ├── trophy-item.tsx
│           ├── trophy-sub-items-dialog.tsx
│           └── platinum-dialog.tsx
│
├── lib/
│   ├── utils.ts                         # Utility functions (cn, etc.)
│   └── constants/
│       └── game-images.ts               # Game image mappings
│
├── data/                                # Data layer (legacy compatibility)
│   ├── types.ts                         # Re-exports from domain
│   └── games/                           # Game data definitions
│       ├── index.ts
│       ├── demons-souls.ts
│       ├── dark-souls.ts
│       └── ...
│
├── app/                                 # Next.js App Router
│   ├── page.tsx                         # Home page (thin)
│   ├── [gameSlug]/page.tsx              # Game detail page (thin)
│   └── layout.tsx
│
└── providers/
    └── theme-provider.tsx               # Theme context provider
```

## Layer Descriptions

### 1. Domain Layer (`src/domain/`)

**Purpose**: Contains the core business entities and rules. This layer has no dependencies on other layers.

**Responsibilities**:
- Define domain entities (Game, Trophy, ChecklistStep, etc.)
- Define repository interfaces (contracts for data access)
- Pure TypeScript types with no framework dependencies

**Key Files**:
- `entities/`: Pure TypeScript types representing business concepts
- `repositories/`: Interface definitions for data access

**Example**:
```typescript
// domain/entities/progress.ts
export type GameProgress = {
  completedTasks: string[];
  completedTrophies: string[];
  completedSubItems: string[];
};

// domain/repositories/progress-repository.ts
export interface IProgressRepository {
  getProgress(gameSlug: string): GameProgress;
  saveProgress(gameSlug: string, progress: GameProgress): void;
  // ...
}
```

### 2. Infrastructure Layer (`src/infrastructure/`)

**Purpose**: Implements interfaces defined in the domain layer using external systems.

**Responsibilities**:
- Implement repository interfaces
- Handle localStorage operations
- Abstract external dependencies
- Provide concrete implementations

**Key Files**:
- `storage/local-storage-adapter.ts`: Generic localStorage wrapper with error handling
- `repositories/progress-repository.ts`: Implements `IProgressRepository` using localStorage

**Example**:
```typescript
// infrastructure/repositories/progress-repository.ts
export class LocalStorageProgressRepository implements IProgressRepository {
  private storage = createLocalStorageAdapter<ProgressState>(STORAGE_KEY);
  
  getProgress(gameSlug: string): GameProgress {
    const state = this.storage.get() ?? {};
    return state[gameSlug] ?? createEmptyGameProgress();
  }
  // ...
}
```

### 3. Application Layer (`src/application/`)

**Purpose**: Orchestrates business logic and coordinates between domain and infrastructure.

**Responsibilities**:
- Pure business logic functions (services)
- State management hooks
- Use cases and workflows
- No UI concerns

**Services** (Pure Functions):
- `trophy-service.ts`: Trophy grouping, filtering, calculations
- `progress-service.ts`: State transformations (toggle, update)
- `game-service.ts`: Game data access and calculations

**Hooks** (React State Management):
- `use-task-progress.ts`: Manages task completion state
- `use-trophy-progress.ts`: Manages trophy completion state
- `use-all-games-progress.ts`: Aggregates progress across games

**Example**:
```typescript
// application/services/trophy-service.ts
export const groupTrophiesByType = (
  trophies: Trophy[]
): Record<TrophyType, Trophy[]> => {
  // Pure function - easy to test
  const groups: Record<TrophyType, Trophy[]> = {
    platinum: [], gold: [], silver: [], bronze: [],
  };
  for (const trophy of trophies) {
    groups[trophy.type].push(trophy);
  }
  return groups;
};
```

### 4. Presentation Layer (`src/presentation/`)

**Purpose**: UI components organized by feature and purpose.

**Structure**:
- `components/ui/`: Radix UI primitives (buttons, dialogs, etc.)
- `components/common/`: Shared components used across features
- `features/`: Feature-specific components grouped by domain

**Feature Organization**:
Each feature folder contains:
- Tab/main component
- Child components
- Dialog components
- Feature-specific utilities

**Example Feature Structure**:
```
features/trophy/
├── trophy-tab.tsx              # Main tab container
├── trophy-section.tsx          # Trophy type section
├── trophy-item.tsx             # Individual trophy
├── trophy-icon.tsx             # Trophy icon component
├── trophy-sub-items-dialog.tsx # Sub-items dialog
├── platinum-dialog.tsx         # Platinum confirmation
└── index.ts                    # Barrel exports
```

## Data Flow

### Reading Data
```
User Action
    ↓
Page Component (app/)
    ↓
Feature Component (presentation/features/)
    ↓
Hook (application/hooks/)
    ↓
Repository (infrastructure/repositories/)
    ↓
Storage Adapter (infrastructure/storage/)
    ↓
localStorage
```

### Writing Data
```
User Action (e.g., checkbox toggle)
    ↓
Event Handler in Component
    ↓
Hook Method (e.g., toggleTask)
    ↓
Service Function (pure transformation)
    ↓
Repository Save Method
    ↓
Storage Adapter
    ↓
localStorage
    ↓
React State Update (re-render)
```

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- Each component has one reason to change
- Services handle only one type of business logic
- Hooks manage only one type of state
- **Example**: `use-progress.ts` (400 lines) split into:
  - `use-task-progress.ts` (task state only)
  - `use-trophy-progress.ts` (trophy state only)
  - `use-all-games-progress.ts` (aggregation only)

### Open/Closed Principle (OCP)
- New games can be added without modifying existing code
- Service functions are composable and extensible
- **Example**: Adding a new game requires only adding a data file in `data/games/`

### Liskov Substitution Principle (LSP)
- Repository implementations are interchangeable
- Any `IProgressRepository` implementation can be used
- **Example**: Could swap `LocalStorageProgressRepository` for `IndexedDBProgressRepository`

### Interface Segregation Principle (ISP)
- Focused interfaces for specific use cases
- Components receive only the props they need
- **Example**: `TrophyItem` receives `onToggle` callback, not entire progress hook

### Dependency Inversion Principle (DIP)
- High-level modules depend on abstractions (interfaces)
- Hooks depend on `IProgressRepository`, not concrete implementations
- **Example**: `useTaskProgress` depends on `progressRepository` (abstraction), not localStorage directly

## Adding New Features

### Adding a New Game

1. Create game data file in `src/data/games/`:
```typescript
// dark-souls-3.ts
export const darkSouls3Data: GameData = {
  game: { id: "dark-souls-3", slug: "dark-souls-3", ... },
  checklist: [...],
  trophies: [...],
};
```

2. Add to registry in `src/data/games/index.ts`:
```typescript
const GAME_DATA_REGISTRY: Record<string, GameData> = {
  "dark-souls-3": darkSouls3Data,
  // ...
};
```

3. Add game image to `src/lib/constants/game-images.ts`:
```typescript
export const GAME_IMAGES: Record<string, string> = {
  "dark-souls-3": "/games-icon/dark-souls-3.png",
  // ...
};
```

No other code changes needed! The architecture handles the rest.

### Adding a New Storage Backend

1. Create new repository implementation:
```typescript
// infrastructure/repositories/indexeddb-progress-repository.ts
export class IndexedDBProgressRepository implements IProgressRepository {
  // Implement interface methods using IndexedDB
}
```

2. Update the singleton export:
```typescript
// infrastructure/repositories/index.ts
export const progressRepository = new IndexedDBProgressRepository();
```

All application code continues to work without changes!

### Adding a New Feature Component

1. Create feature folder in `presentation/features/`:
```
features/statistics/
├── statistics-tab.tsx
├── statistics-card.tsx
└── index.ts
```

2. Use existing hooks and services:
```typescript
export const StatisticsTab = ({ gameSlug }: Props) => {
  const { getChecklistProgress } = useTaskProgress(gameSlug);
  const { getTrophyProgress } = useTrophyProgress(gameSlug);
  // Render statistics...
};
```

## Testing Strategy

### Unit Tests (Services)
Services contain pure functions that are easy to test:
```typescript
// trophy-service.test.ts
test('groupTrophiesByType groups trophies correctly', () => {
  const trophies = [
    { id: '1', type: 'gold', ... },
    { id: '2', type: 'silver', ... },
  ];
  const result = groupTrophiesByType(trophies);
  expect(result.gold).toHaveLength(1);
  expect(result.silver).toHaveLength(1);
});
```

### Integration Tests (Hooks)
Test hooks with React Testing Library:
```typescript
// use-task-progress.test.ts
test('toggleTask updates completion state', () => {
  const { result } = renderHook(() => useTaskProgress('dark-souls'));
  act(() => {
    result.current.toggleTask('task-1');
  });
  expect(result.current.isTaskComplete('task-1')).toBe(true);
});
```

### Component Tests
Test components in isolation with mocked hooks:
```typescript
// checklist-tab.test.tsx
test('renders checklist steps', () => {
  render(<ChecklistTab gameSlug="dark-souls" checklist={mockChecklist} />);
  expect(screen.getByText('Gates of Boletaria')).toBeInTheDocument();
});
```

## Best Practices

### 1. Component Design
- Keep components focused and small (< 200 lines)
- Use composition over inheritance
- Extract complex logic into hooks or services

### 2. State Management
- Use hooks for React-specific state
- Keep business logic in services (pure functions)
- Minimize component state

### 3. Type Safety
- Use TypeScript strict mode
- Define types in domain layer
- Avoid `any` type

### 4. File Organization
- Group by feature, not by type
- Use barrel exports (`index.ts`)
- Keep related files together

### 5. Code Style
- Use named exports (project rule)
- Follow existing patterns
- Document complex logic

## Performance Considerations

### Optimization Techniques Used
1. **Memoization**: `useCallback` for stable function references
2. **Lazy Initialization**: `useState(() => ...)` for expensive initial values
3. **Code Splitting**: Next.js automatic code splitting by route
4. **Efficient Updates**: Only update state when necessary

### Future Optimizations
- Implement virtual scrolling for large trophy lists
- Add React Query for server-side data (if needed)
- Implement service workers for offline support

## Migration Notes

### From Old Architecture
The refactoring preserved all existing functionality while improving structure:

**Before**:
- `use-progress.ts`: 400 lines, mixed concerns
- Page components: 342 lines, coupled to implementation
- Flat component structure
- Direct localStorage access

**After**:
- Focused hooks: < 100 lines each, single responsibility
- Page components: ~100 lines, declarative composition
- Feature-based component organization
- Abstract storage layer

### Breaking Changes
None! The refactoring is internal - all user-facing behavior remains identical.

## Resources

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Hooks Best Practices](https://react.dev/reference/react)

## Contributing

When adding new features:
1. Start in the domain layer (define types)
2. Implement business logic in services (pure functions)
3. Create hooks for state management (if needed)
4. Build UI components in presentation layer
5. Wire everything together in pages

Keep the layers separate and dependencies flowing in one direction: Presentation → Application → Domain ← Infrastructure.
