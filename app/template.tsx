/**
 * Page transition: templates re-mount on every navigation, so this CSS
 * animation replays on each route change without shipping extra JavaScript.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
