# React + RTK (incl. RTK Query) + TypeScript + Vite

#### I created this project while studying RTK queries.

This is my attempt to create something like a boilerplate for RTK query for further implementation of it in [my other project](https://github.com/floster/movies-db).
Therefore, all logic related to the API is maximally removed from React components so that it can be used without binding to any components in the future.

```
npm create vite@latest
```

```
npm install @reduxjs/toolkit react-redux react-router-dom
```

_optinal (if plan to use Tailwind)_:

```
npm install -D tailwindcss postcss autoprefixer
```

```
npx tailwindcss init -p
```

## File structure:

```bash
src
├── components - React components
├── hooks - general hooks
⎮   ├── actions.ts - a custom hook that wraps the `useDispatch` hook from `react-redux` and binds the action creators to the dispatch function
⎮   ├── debounce.ts - a custom hook that debounces a value
⎮   ├── redux.ts - a custom hook that wraps the `useSelector` hook from `react-redux` and is used to type the `RootState`
⎮   └── tmdb
⎮       ├── favourite.ts - a custom hook that toggle favorite state and check if an ID already in favorites
⎮       ├── liveSearch.ts - a custom hook that gets a search term, debounce it and return related search data
⎮       └── movies.ts - a custom hook that fetches and displays a list of favorite movies
├── models
⎮   └── tmdb.models.ts - TS interfaces for data from API
├── pages - React components for app pages
├── store - work with TMDB API using RTK
⎮    ├── index.ts - creating store using RTK `configureStore`
⎮    └── tmdb - all TMDB related logic
⎮        ├── tmdb.api.ts - creating custom hooks to work TMDB API using `createApi` from `@reduxjs/toolkit/query/react`
⎮        └── tmdb.slice.ts - creating logic (reducers) to work with favorites using `createSlice` from RTK
```
