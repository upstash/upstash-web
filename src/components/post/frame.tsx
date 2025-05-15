export const Frame = ({ children }) => (
  <div className="my-8 inline-block h-full w-full rounded-xl bg-zinc-500/10 p-2 ring-1 ring-inset ring-zinc-700 lg:rounded-2xl lg:p-3">
    <div className="h-full w-full overflow-hidden rounded-lg">{children}</div>
  </div>
);
