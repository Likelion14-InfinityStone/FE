const ScreenContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-6.5 flex w-full max-w-100.5 flex-col items-start justify-start bg-[#FCFCFC]">
      <div className="w-full flex-1 p-0">{children}</div>
    </div>
  );
};

export default ScreenContainer;
