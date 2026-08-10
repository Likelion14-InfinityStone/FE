import { contents } from '@/constants/more';
import AccountBackHeader from './components/AccountBackHeader';

const FaqPage = () => {
  return (
    <div className="h-full w-full pb-10">
      <AccountBackHeader title="자주 묻는 질문 (FAQ)" />
      <div className="mt-9 flex flex-col gap-2.5">
        {contents.faq.map((item) => (
          <div
            key={item.question}
            className="flex flex-col gap-2.5 rounded-[20px] border border-[#23408F] bg-[#FCFCFC] p-5 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.04)]"
          >
            <p className="font-Pretendard text-base font-semibold tracking-[0.384px] text-[#23408F]">
              {item.question}
            </p>
            <div className="flex flex-col gap-2.5">
              {item.answer.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-Pretendard text-sm tracking-[0.336px] text-[#6D6D6D]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
