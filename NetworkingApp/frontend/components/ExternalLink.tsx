import { Link, type LinkProps } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform } from 'react-native';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      {...rest}
      href={href as LinkProps['href']} // Force-cast to satisfy TS
      target="_blank"
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          event.preventDefault();
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
