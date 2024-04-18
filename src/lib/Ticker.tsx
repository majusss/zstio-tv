const Ticker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="inline-flex w-full flex-nowrap">
      <ul className="flex animate-infinite-scroll items-center justify-center">
        <li>{children}</li>
      </ul>
      <ul className="flex animate-infinite-scroll items-center justify-center" aria-hidden="true">
        <li>{children}</li>
      </ul>
    </div>
  );
};
export default Ticker;
