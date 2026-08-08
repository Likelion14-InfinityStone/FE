import DropdownIcon from '@/assets/images/sos/dropdownIcon.svg';
import SosLocationIcon from '@/assets/images/sos/sosLocationIcon.svg';
import type { SosQuestionType } from '@/constants/emergency';

interface SosQuestionProps {
  label: string;
  placeholder: string;
  type?: SosQuestionType;
  isOpen: boolean;
  selectedValue?: string;
  options: readonly string[];
  onToggle: () => void;
  onSelect: (value: string) => void;
}

const SosQuestion = ({
  label,
  placeholder,
  type = 'select',
  isOpen,
  selectedValue,
  options,
  onToggle,
  onSelect,
}: SosQuestionProps) => {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="font-Pretendard text-[1rem] leading-5.6 font-medium text-[#000000]">
        {label}
      </p>

      {type === 'text' ? (
        <input
          type="text"
          placeholder={placeholder}
          className="h-15.5 rounded-[18px] border border-[#23408F] bg-transparent px-5 font-Pretendard text-[1rem] outline-none placeholder:text-[#555555]"
        />
      ) : (
        <>
          <button
            type="button"
            onClick={type === 'location' ? undefined : onToggle}
            className="flex items-center justify-between rounded-[20px] border border-[#23408F] px-6.5 py-5.25 text-left"
          >
            <p className="font-Pretendard font-regular text-[1rem] leading-5.6 text-[#191919]">
              {selectedValue ?? placeholder}
            </p>
            <img
              src={type === 'location' ? SosLocationIcon : DropdownIcon}
              alt=""
              className={`shrink-0 ${
                type === 'select'
                  ? `transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`
                  : ''
              }`}
            />
          </button>

          {type !== 'location' && isOpen && (
            <div className="flex flex-col gap-1 rounded-[20px] border border-[#23408F] p-3.5 bg-[#FCFCFC]">
              {options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSelect(option)}
                  className={`rounded-[10px] p-2.5 text-left font-Pretendard text-[0.875rem] ${
                    index === 0
                      ? 'bg-[#EAF0FF] text-[#23408F]'
                      : 'text-[#191919]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SosQuestion;
