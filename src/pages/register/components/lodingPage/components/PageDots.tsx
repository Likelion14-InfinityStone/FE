type PageDotsProps = {
  total: number;
  activeIndex: number;
};

const PageDots = ({ total, activeIndex }: PageDotsProps) => {
  return (
    <div className="flex items-center justify-center gap-4.5">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={
            index === activeIndex
              ? 'h-3 w-6 rounded-[100px] bg-[#23408F]'
              : 'h-3 w-3 rounded-[100px] bg-[#E2E2E2]'
          }
        />
      ))}
    </div>
  );
};

export default PageDots;
