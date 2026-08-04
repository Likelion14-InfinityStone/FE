import { useState } from 'react';

const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{3,10}$/;

type NicknameCheckStatus = 'default' | 'success' | 'error';

const NICKNAME_GUIDE_MESSAGE =
  '3~10 사이의 한글, 영어, 숫자로만 입력해 주세요.';

const MESSAGES: Record<NicknameCheckStatus, string> = {
  default: NICKNAME_GUIDE_MESSAGE,
  success: '사용할 수 있는 닉네임입니다.',
  error: '사용할 수 없는 닉네임입니다.',
};

export const useNicknameCheck = () => {
  const [nickname, setNickname] = useState('');
  const [status, setStatus] = useState<NicknameCheckStatus>('default');

  const isValidFormat = NICKNAME_REGEX.test(nickname);

  const handleChange = (value: string) => {
    setNickname(value);
    if (value.trim() === '') {
      setStatus('default');
    }
  };

  const checkNickname = () => {
    setStatus(isValidFormat ? 'success' : 'error');
  };

  const message =
    status === 'error' && nickname.trim() === ''
      ? NICKNAME_GUIDE_MESSAGE
      : MESSAGES[status];

  return {
    nickname,
    status,
    message,
    isCheckable: nickname.trim().length > 0,
    isVerified: status === 'success',
    handleChange,
    checkNickname,
  };
};
