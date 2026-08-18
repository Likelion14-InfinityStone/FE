import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import Header from '@/components/layout/Header';
import ConfirmModal from '@/components/modal/ConfirmModal';
import LogoutIcon from '@/assets/images/account/logoutIcon.svg';
import { contents } from '@/constants/more';
import { useAuthStore } from '@/stores/useAuthStore';
import MoreMenuGroup from './components/MoreMenuGroup';
import ProfileCard from './components/ProfileCard';
import { accountKeys, useUserMe } from './services/useAccount';

const Account = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { data: userMe } = useUserMe();

  const handleLogout = () => {
    logout();
    queryClient.removeQueries({ queryKey: accountKeys.me() });
    navigate('/login');
  };

  return (
    <div className="w-full h-full">
      <Header title="더보기" />

      <div className="mt-9 flex flex-col gap-3">
        <p className="font-Pretendard text-base tracking-[0.384px] text-[#191919]">
          내 계정
        </p>
        <ProfileCard
          name={userMe?.nickName ?? contents.profile.name}
          email={userMe?.email ?? contents.profile.email}
        />
      </div>

      <div className="mt-9 flex flex-col gap-3">
        <p className="font-Pretendard text-base tracking-[0.384px] text-[#191919]">
          약관 및 정책
        </p>
        <MoreMenuGroup
          items={contents.policies.map((item) => ({
            label: item.label,
            onClick: () => navigate(item.path),
          }))}
        />
      </div>

      <div className="mt-9 flex flex-col gap-3">
        <p className="font-Pretendard text-base leading-[1.6] tracking-[0.384px] text-[#42403A]">
          고객 지원
        </p>
        <MoreMenuGroup
          items={[
            ...contents.support.map((item) => ({
              label: item.label,
              onClick: () => navigate(item.path),
            })),
            {
              label: '로그아웃',
              showChevron: false,
              onClick: () => setIsLogoutModalOpen(true),
            },
          ]}
        />
      </div>

      <p className="mt-9 text-center font-Pretendard text-xs tracking-[0.288px] text-[#848B9C]">
        {contents.version}
      </p>

      {isLogoutModalOpen && (
        <ConfirmModal
          icon={LogoutIcon}
          title="로그아웃"
          description="로그아웃 하시겠습니까?"
          onCancel={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default Account;
