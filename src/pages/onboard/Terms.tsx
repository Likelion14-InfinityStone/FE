import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { TERMS, type TermId } from '@/constants/term';
import { useAuthStore } from '@/stores/useAuthStore';
import TermDetail from './components/TermDetail';
import TermsList from './components/TermList';

const Terms = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const savedTermIds = useAuthStore((state) => state.agreedTermIds);
  const agreeToTerms = useAuthStore((state) => state.agreeToTerms);
  const [agreedTermIds, setAgreedTermIds] = useState<TermId[]>(savedTermIds);

  const selectedTermId = searchParams.get('detail');
  const selectedTerm = TERMS.find(({ id }) => id === selectedTermId);

  const toggleTermAgreement = (termId: TermId) => {
    setAgreedTermIds((previousIds) =>
      previousIds.includes(termId)
        ? previousIds.filter((id) => id !== termId)
        : [...previousIds, termId]
    );
  };

  const agreeToTerm = (termId: TermId) => {
    setAgreedTermIds((previousIds) =>
      previousIds.includes(termId) ? previousIds : [...previousIds, termId]
    );
  };

  if (selectedTerm) {
    return (
      <TermDetail
        term={selectedTerm}
        checked={agreedTermIds.includes(selectedTerm.id)}
        onToggleAgreement={() => toggleTermAgreement(selectedTerm.id)}
        onClose={() => navigate('/terms', { replace: true })}
        onConfirm={() => {
          agreeToTerm(selectedTerm.id);
          navigate('/terms', { replace: true });
        }}
      />
    );
  }

  return (
    <TermsList
      terms={TERMS}
      agreedTermIds={agreedTermIds}
      onToggleAgreement={toggleTermAgreement}
      onSelectTerm={(termId) => setSearchParams({ detail: termId })}
      onBack={() => navigate('/login')}
      onConfirm={() => {
        agreeToTerms(agreedTermIds);
        navigate('/home', { replace: true });
      }}
    />
  );
};

export default Terms;
