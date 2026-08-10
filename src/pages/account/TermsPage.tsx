import { contents } from '@/constants/more';
import AccountBackHeader from './components/AccountBackHeader';
import NoticeContentView from './components/NoticeContentView';

const TermsPage = () => {
  return (
    <div className="h-full w-full pb-10">
      <AccountBackHeader title={contents.terms.title} />
      <NoticeContentView
        effectiveDate={contents.terms.effectiveDate}
        body={contents.terms.body}
      />
    </div>
  );
};

export default TermsPage;
