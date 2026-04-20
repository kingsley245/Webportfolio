import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/profile', 'routes/pages/profilePage.tsx'),
  route('/experience', 'routes/pages/ExperincePage.tsx'),
  route('/projects', 'routes/pages/ProjectPage.tsx'),
  route('/contact', 'routes/pages/contactPage.tsx'),
  route('/projects/:id', 'routes/pages/ProjectDetails.tsx'),
  route('*', 'routes/components/notFound.tsx'),
] satisfies RouteConfig;
