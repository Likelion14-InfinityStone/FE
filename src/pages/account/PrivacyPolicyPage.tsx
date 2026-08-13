import { contents } from '@/constants/more';
import AccountBackHeader from './components/AccountBackHeader';
import NoticeContentView from './components/NoticeContentView';

const PrivacyPolicyPage = () => {
  return (
    <div className="h-full w-full pb-10">
      <AccountBackHeader title={contents.privacyPolicy.title} />
      <NoticeContentView
        effectiveDate={contents.privacyPolicy.effectiveDate}
        body={contents.privacyPolicy.body}
      />
    </div>
  );
};

export default PrivacyPolicyPage;
