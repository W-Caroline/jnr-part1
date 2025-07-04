# J&R Magical Moments

A comprehensive web application for children featuring enchanting stories with life lessons, creative activities, and educational content that sparks imagination and learning.

## Features

### 📚 Enchanted Stories & Books
- Personalized stories with valuable life lessons
- Classic public domain books freely accessible
- Categories: Bedtime Tales, Learning Adventures, Epic Quests, Wisdom Stories
- Age-appropriate content (3-5, 6-8, 9-12)

### 🎨 Creative Workshops
- Custom coloring adventures
- Educational puzzles and games
- Drawing inspiration and creative challenges
- Math adventures and number games
- Letter discovery and word building
- Voice recording activities
- Paint-by-magic activities

### 🎙️ Voice Magic
- Parent voice recording for story narration
- Personalized storytelling experiences
- Animated characters and avatars

### ❤️ Community Impact
- Donation system for books and educational materials
- Distribution to remote schools and children's homes

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Database**: Supabase
- **Content Generation**: OpenAI/Anthropic APIs
- **Voice Processing**: ElevenLabs API
- **Image Creation**: Stability AI
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd jnr-magical-moments
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Fill in your API keys and configuration
```

4. Start the development server
```bash
npm run dev
```

Netlify link to project prototype.

https://legendary-pasca-d94f4f.netlify.app/

## Environment Setup

### Required Services

1. **Supabase** - Database and authentication
2. **OpenAI/Anthropic** - Content generation
3. **ElevenLabs** - Voice processing
4. **Stability AI** - Image creation

### Database Schema

The application uses Supabase with the following main tables:
- `users` - User profiles and authentication
- `stories` - Generated and curated stories
- `books` - Public domain books
- `activities` - Interactive learning activities
- `voice_profiles` - Parent voice recordings
- `donations` - Community donation tracking

## Development Workflow

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── services/           # API services
├── stores/             # State management
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
