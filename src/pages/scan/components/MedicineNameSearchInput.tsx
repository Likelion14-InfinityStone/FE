import { useEffect, useRef, useState } from 'react';

import searchIcon from '@/assets/images/home/cardSearchIcon.svg';
import { searchMedicationCandidates } from '@/apis/medication/medication.api';
import type { MedicationCandidate } from '@/types/medication/medication.type';

type MedicineNameSearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSelectCandidate: (candidate: MedicationCandidate) => void;
  required?: boolean;
};

const SEARCH_DEBOUNCE_MS = 300;

const MedicineNameSearchInput = ({
  value,
  onChangeText,
  onSelectCandidate,
  required,
}: MedicineNameSearchInputProps) => {
  const [candidates, setCandidates] = useState<MedicationCandidate[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<number | undefined>(undefined);
  const requestVersionRef = useRef(0);

  useEffect(() => {
    const timer = debounceRef.current;
    return () => window.clearTimeout(timer);
  }, []);

  const runSearch = (keyword: string) => {
    window.clearTimeout(debounceRef.current);

    const trimmed = keyword.trim();
    if (!trimmed) {
      requestVersionRef.current += 1;
      setCandidates([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    debounceRef.current = window.setTimeout(() => {
      const requestVersion = ++requestVersionRef.current;
      setIsLoading(true);

      searchMedicationCandidates(trimmed)
        .then(({ result }) => {
          if (requestVersionRef.current !== requestVersion) return;
          setCandidates(result.candidates);
          setIsOpen(true);
        })
        .catch(() => {
          if (requestVersionRef.current !== requestVersion) return;
          setCandidates([]);
          setIsOpen(true);
        })
        .finally(() => {
          if (requestVersionRef.current === requestVersion) setIsLoading(false);
        });
    }, SEARCH_DEBOUNCE_MS);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    onChangeText(next);
    runSearch(next);
  };

  const handleSelect = (candidate: MedicationCandidate) => {
    onSelectCandidate(candidate);
    setIsOpen(false);
    setCandidates([]);
  };

  return (
    <div className="relative w-full">
      <div className="flex h-[40px] w-full items-center gap-[8px] rounded-full border border-[#E2E2E2] bg-[#FCFCFC] px-[16px]">
        <input
          value={value}
          onChange={handleInputChange}
          onFocus={() => candidates.length > 0 && setIsOpen(true)}
          onBlur={() => window.setTimeout(() => setIsOpen(false), 150)}
          placeholder="제품명을 입력해 주세요"
          className={`min-w-0 flex-1 bg-transparent text-right font-Pretendard text-[14px] font-normal tracking-[0.336px] text-[#191919] outline-none ${
            required ? 'placeholder:text-[#EF5050]' : 'placeholder:text-[#848B9C]'
          }`}
        />
        <img src={searchIcon} alt="" className="h-[18px] w-[18px] shrink-0" />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-10 max-h-[220px] overflow-y-auto rounded-[16px] border border-[#E2E2E2] bg-[#FCFCFC] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
          {isLoading ? (
            <p className="px-[16px] py-[14px] font-Pretendard text-[14px] text-[#848B9C]">
              검색 중...
            </p>
          ) : candidates.length === 0 ? (
            <p className="px-[16px] py-[14px] font-Pretendard text-[14px] text-[#848B9C]">
              검색 결과가 없어요
            </p>
          ) : (
            candidates.map((candidate, index) => (
              <button
                key={candidate.mfdsProductCode}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(candidate)}
                className={`block w-full px-[16px] py-[14px] text-left font-Pretendard text-[14px] text-[#191919] ${
                  index > 0 ? 'border-t border-[#E2E2E2]' : ''
                }`}
              >
                {candidate.productKoName}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MedicineNameSearchInput;
