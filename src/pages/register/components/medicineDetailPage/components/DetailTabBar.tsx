type Tab = {
  key: string;
  label: string;
}; //Tab이라는 새로운 자료형을 만든거고 이 자료형의 객체는 key,label이라는 두가지 속성을 가진 객체다.

//DetailTabBar 컴포넌트가 받을 props의 자료형을 정의
type DetailTabBarProps = {
  tabs: Tab[]; //Tab객체들이 들어있는 배열
  activeKey: string; //현재 선택된 탭의 key값
  onChange: (key: string) => void;
};

const DetailTabBar = ({ tabs, activeKey, onChange }: DetailTabBarProps) => {
  const activeIndex = tabs.findIndex((tab) => tab.key === activeKey);

  return (
    <div className="relative w-full h-12">
      <div className="flex h-full">
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`flex-1 h-full flex items-center justify-center text-sm tracking-[0.336px] ${
                isActive
                  ? 'font-semibold text-[#23408F]'
                  : 'font-normal text-[#848B9C]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#E2E2E2]" />
      <div
        className="absolute bottom-0 h-[4px] bg-[#23408F] transition-all duration-200"
        style={{
          width: `${100 / tabs.length}%`,
          left: `${(100 / tabs.length) * activeIndex}%`,
        }}
      />
    </div>
  );
};

export default DetailTabBar;
