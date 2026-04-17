import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/profile', 'routes/pages/profilePage.tsx'),
  route('*', 'routes/components/notFound.tsx'),
] satisfies RouteConfig;
