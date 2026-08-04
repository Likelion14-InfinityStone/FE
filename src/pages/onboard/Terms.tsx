import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { TERMS, type TermId } from '@/constants/term';
import TermDetail from './components/TermDetail';
import TermsList from './components/TermList';

const Terms = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [agreedTermIds, setAgreedTermIds] = useState<TermId[]>([]);

  const selectedTermId = searchParams.get('detail');
  const selectedTerm = TERMS.find(({ id }) => id === selectedTermId);

  const toggleTermAgreement = (termId: TermId) => {
    setAgreedTermIds((previousIds) =>
      previousIds.includes(termId)
        ? previousIds.filter((id) => id !== termId)
        : [...previousIds, termId]
    );
  };

  if (selectedTerm) {
    return (
      <TermDetail
        term={selectedTerm}
        checked={agreedTermIds.includes(selectedTerm.id)}
        onToggleAgreement={() => toggleTermAgreement(selectedTerm.id)}
        onClose={() => navigate(-1)}
      />
    );
  }

  return (
    <TermsList
      terms={TERMS}
      agreedTermIds={agreedTermIds}
      onToggleAgreement={toggleTermAgreement}
      onSelectTerm={(termId) => setSearchParams({ detail: termId })}
      onBack={() => navigate('/onboard')}
      onConfirm={() => navigate('/login')}
    />
  );
};

export default Terms;
