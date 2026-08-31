# Octofit Tracker - Frontend (Presentation Tier)

React 19 + Vite frontend for the Octofit Tracker multi-tier application.

## Features

- **User Dashboard** - Track fitness activities and progress
- **Leaderboard** - Compete with other users
- **Team Management** - Create and manage fitness teams
- **Activity Logging** - Log and view activities
- **Workout Suggestions** - Get personalized workout recommendations

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: Bootstrap 5
- **Language**: JavaScript (ES modules)

## Prerequisites

- Node.js (LTS or newer)
- npm or yarn

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

**IMPORTANT**: The frontend requires `VITE_CODESPACE_NAME` to be configured for API communication.

Create a `.env.local` file in the frontend directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set your GitHub Codespace name:

```
VITE_CODESPACE_NAME=your-codespace-name
```

To find your Codespace name:
1. Look at your browser URL when using GitHub Codespaces
2. It will be in the format: `https://[CODESPACE_NAME].github.dev`
3. Copy the `[CODESPACE_NAME]` part to `.env.local`

**Development Fallback**: If `VITE_CODESPACE_NAME` is not set, the app will use `http://localhost:8000` for API requests, which is useful for local development.

## API Endpoints

The frontend communicates with the backend API at:

```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/
```

Available endpoints (called from components):
- `/activities/` - Fitness activities
- `/leaderboard/` - Competitive leaderboard
- `/teams/` - Team information
- `/users/` - User profiles
- `/workouts/` - Workout programs

## Development

### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output is in the `dist/` directory.

### Lint Code

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Activities.jsx      # Activities listing
│   ├── Leaderboard.jsx     # Competitive leaderboard
│   ├── Teams.jsx           # Team management
│   ├── Users.jsx           # User profiles
│   └── Workouts.jsx        # Workout programs
├── config/
│   └── api.js              # API configuration and helpers
├── App.jsx                 # Main app with routing
├── main.jsx                # React DOM root with Router
└── index.css               # Global styles
```

## Response Handling

The frontend handles both paginated and array API responses:

- **Array Response**: `[{ id: 1, name: "Activity 1" }, ...]`
- **Paginated Response**: `{ data: [{ id: 1, name: "Activity 1" }, ...], total: 100, page: 1 }`

The `api.js` configuration module automatically handles both formats.

## Navigation

Use the navigation bar at the top to navigate between sections:
- **Activities** - View logged fitness activities
- **Leaderboard** - See competitive rankings
- **Teams** - Manage team memberships
- **Users** - Browse user profiles
- **Workouts** - View available workout programs

## Error Handling

- Failed API requests display an error message and return an empty array
- Console logs API errors for debugging
- Loading spinners appear while data is being fetched

## License

Part of the Octofit Tracker multi-tier application
