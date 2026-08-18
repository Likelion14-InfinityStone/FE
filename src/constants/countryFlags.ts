import Japan from '@/assets/images/register/tripTicket/Example-Japan.svg';
import France from '@/assets/images/register/tripTicket/flags/fra.svg';
import Thailand from '@/assets/images/register/tripTicket/flags/tha.svg';
import Czechia from '@/assets/images/register/tripTicket/flags/cze.svg';
import Korea from '@/assets/images/register/tripTicket/flags/kor.svg';
import UnitedStates from '@/assets/images/register/tripTicket/flags/usa.svg';
import China from '@/assets/images/register/tripTicket/flags/chn.svg';
import HongKong from '@/assets/images/register/tripTicket/flags/hkg.svg';
import Macau from '@/assets/images/register/tripTicket/flags/mac.svg';
import Taiwan from '@/assets/images/register/tripTicket/flags/twn.svg';
import Vietnam from '@/assets/images/register/tripTicket/flags/vnm.svg';
import Singapore from '@/assets/images/register/tripTicket/flags/sgp.svg';
import Philippines from '@/assets/images/register/tripTicket/flags/phl.svg';
import Malaysia from '@/assets/images/register/tripTicket/flags/mys.svg';
import Indonesia from '@/assets/images/register/tripTicket/flags/idn.svg';
import Cambodia from '@/assets/images/register/tripTicket/flags/khm.svg';
import India from '@/assets/images/register/tripTicket/flags/ind.svg';
import Canada from '@/assets/images/register/tripTicket/flags/can.svg';
import Mexico from '@/assets/images/register/tripTicket/flags/mex.svg';
import UnitedKingdom from '@/assets/images/register/tripTicket/flags/gbr.svg';
import Germany from '@/assets/images/register/tripTicket/flags/deu.svg';
import Italy from '@/assets/images/register/tripTicket/flags/ita.svg';
import Spain from '@/assets/images/register/tripTicket/flags/esp.svg';
import Netherlands from '@/assets/images/register/tripTicket/flags/nld.svg';
import Switzerland from '@/assets/images/register/tripTicket/flags/che.svg';
import Austria from '@/assets/images/register/tripTicket/flags/aut.svg';
import Portugal from '@/assets/images/register/tripTicket/flags/prt.svg';
import Greece from '@/assets/images/register/tripTicket/flags/grc.svg';
import Turkiye from '@/assets/images/register/tripTicket/flags/tur.svg';
import UnitedArabEmirates from '@/assets/images/register/tripTicket/flags/are.svg';
import Qatar from '@/assets/images/register/tripTicket/flags/qat.svg';

export const COUNTRY_FLAGS: Record<string, string> = {
  프랑스: France,
  태국: Thailand,
  체코: Czechia,
  대한민국: Korea,
  미국: UnitedStates,
  일본: Japan,
  중국: China,
  홍콩: HongKong,
  마카오: Macau,
  대만: Taiwan,
  베트남: Vietnam,
  싱가포르: Singapore,
  필리핀: Philippines,
  말레이시아: Malaysia,
  인도네시아: Indonesia,
  캄보디아: Cambodia,
  인도: India,
  캐나다: Canada,
  멕시코: Mexico,
  영국: UnitedKingdom,
  독일: Germany,
  이탈리아: Italy,
  스페인: Spain,
  네덜란드: Netherlands,
  스위스: Switzerland,
  오스트리아: Austria,
  포르투갈: Portugal,
  그리스: Greece,
  튀르키예: Turkiye,
  아랍에미리트: UnitedArabEmirates,
  카타르: Qatar,
};

export const getCountryFlag = (countryNameKo: string): string =>
  COUNTRY_FLAGS[countryNameKo] ?? Japan;
