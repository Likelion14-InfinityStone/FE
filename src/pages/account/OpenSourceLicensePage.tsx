import { contents } from '@/constants/more';
import AccountBackHeader from './components/AccountBackHeader';
import NoticeContentView from './components/NoticeContentView';

const OpenSourceLicensePage = () => {
  return (
    <div className="h-full w-full pb-10">
      <AccountBackHeader title={contents.openSourceLicense.title} />
      <NoticeContentView body={contents.openSourceLicense.body} />
    </div>
  );
};

export default OpenSourceLicensePage;
