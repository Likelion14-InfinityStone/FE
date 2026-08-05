interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <div className="pt-10">
      <p className="text-[#000000] font-Pretendard font-semibold text-[1.5rem] leading-8.5">
        {title}
      </p>
    </div>
  );
};

export default Header;
