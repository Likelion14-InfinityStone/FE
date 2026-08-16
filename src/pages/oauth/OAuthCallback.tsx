import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, hasAgreedToTerms } = useAuthStore();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      login(accessToken);
      navigate(hasAgreedToTerms ? '/home' : '/terms', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate, login, hasAgreedToTerms]);

  return null;
};

export default OAuthCallback;
