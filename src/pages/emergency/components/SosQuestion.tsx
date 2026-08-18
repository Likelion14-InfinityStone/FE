import DropdownIcon from '@/assets/images/sos/dropdownIcon.svg';
import SosLocationIcon from '@/assets/images/sos/sosLocationIcon.svg';
import type { EmergencyOption, SosQuestionType } from '@/constants/emergency';

interface SosQuestionProps {
  label: string;
  placeholder: string;
  type?: SosQuestionType;
  isOpen: boolean;
  selectedValue?: string;
  selectedOptionValue?: string;
  options: readonly EmergencyOption[];
  onToggle: () => void;
  onSelect: (option: EmergencyOption) => void;
  onLocation?: () => void;
  isLocating?: boolean;
}

const SosQuestion = ({
  label,
  placeholder,
  type = 'select',
  isOpen,
  selectedValue,
  selectedOptionValue,
  options,
  onToggle,
  onSelect,
  onLocation,
  isLocating = false,
}: SosQuestionProps) => {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="font-Pretendard text-[1rem] leading-5.6 font-medium text-[#000000]">
        {label}
      </p>

      {type === 'text' ? (
        <input
          type="text"
          value={selectedValue ?? ''}
          onChange={(event) =>
            onSelect({ value: event.target.value, label: event.target.value })
          }
          placeholder={placeholder}
          className="h-15.5 rounded-[18px] border border-[#23408F] bg-transparent px-5 font-Pretendard text-[1rem] outline-none placeholder:text-[#555555]"
        />
      ) : type === 'location' ? (
        <div className="flex items-center justify-between rounded-[20px] border border-[#23408F] px-6.5 py-5.25 text-left">
          <p className="font-Pretendard font-regular text-[1rem] leading-5.6 text-[#191919]">
            {isLocating ? '위치 확인 중...' : (selectedValue ?? placeholder)}
          </p>
          <button
            type="button"
            onClick={onLocation}
            disabled={isLocating}
            aria-label="현재 위치의 국가 확인"
            className="shrink-0 disabled:opacity-50"
          >
            <img src={SosLocationIcon} alt="" />
          </button>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={onToggle}
            className="flex items-center justify-between rounded-[20px] border border-[#23408F] px-6.5 py-5.25 text-left"
          >
            <p className="font-Pretendard font-regular text-[1rem] leading-5.6 text-[#191919]">
              {selectedValue ?? placeholder}
            </p>
            <img
              src={DropdownIcon}
              alt=""
              className={`shrink-0 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="flex flex-col gap-1 rounded-[20px] border border-[#23408F] bg-[#FAFAF6] p-3.5">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSelect(option)}
                  className={`rounded-[10px] p-2.5 text-left font-Pretendard text-[0.875rem] ${
                    option.value === selectedOptionValue
                      ? 'bg-[#EAF0FF] text-[#23408F]'
                      : 'bg-[#FAFAF6] text-[#191919]'
                  }`}
                >
                  {option.label}
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
