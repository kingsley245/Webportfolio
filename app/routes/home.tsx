import type { Route } from './+types/home';
import HomePage from '~/welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Kingsley || KanthCode' },
    {
      name: 'Kanthcode',
      content: 'Welcome to kingsley festus osuya portfolio',
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
