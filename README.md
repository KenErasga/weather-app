# Weather App

A Next.js weather application that displays 5-day forecasts for cities using the OpenWeather API.

You can look through [notes.md](./notes/notes.md) for my notes. 

## Prerequisites

- Node.js 20

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server |
| `build` | `npm run build` | Production build |
| `test` | `npm run test` | Run tests (Vitest) |
| `lint` | `npm run lint` | Run ESLint |
| `format` | `npm run format` | Format code (Prettier) |

## Project Structure

```
src/
├── app/              # Next.js app router pages & API routes
│   ├── api/          # API route handlers
│   ├── forecast/     # Forecast pages ([city], [city]/[date])
│   └── __tests__/    # Page tests
├── components/       # Reusable UI components
├── lib/              # Utilities and API helpers
├── test/             # Test setup
└── types/            # TypeScript type definitions
```

## Being deployed in Vercel

Check https://weather-app-one-liard-23.vercel.app/

## Notes

- [notes.md](./notes/notes.md): Notes, thoughts and prompts throughout
- [salable-assessment.md](./notes/salable-assessment.md): Assessment brief
