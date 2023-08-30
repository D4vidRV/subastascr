import {
  Select,
  Container,
  FormControl,
  FormLabel,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
  getAuctionsNamesFromApi,
  getDatesByAuctionYearAndMonth,
  getMonthsFromAuctionAndYear,
  getYearsFromAuction,
} from '../api/auctions';

interface Params {
  selectedAuction: string | undefined;
  selectedYear: string | undefined;
  selectedMonth: string | undefined;
  selectedDate: string | undefined;
  setSelectedAuction: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const HeaderFilter = ({
  selectedAuction,
  selectedYear,
  selectedMonth,
  selectedDate,
  setSelectedAuction,
  setSelectedYear,
  setSelectedMonth,
  setSelectedDate,
}: Params) => {
  const query = useQuery(['auctions'], getAuctionsNamesFromApi);

  const queryYear = useQuery({
    queryKey: ['years', selectedAuction],
    queryFn: async () => getYearsFromAuction(selectedAuction ?? ''),
    enabled: !!selectedAuction,
  });

  const queryMonths = useQuery({
    queryKey: ['months', selectedYear],
    queryFn: async () =>
      getMonthsFromAuctionAndYear(selectedAuction ?? '', selectedYear ?? ''),
    enabled: !!selectedYear,
  });

  const queryDates = useQuery({
    queryKey: ['dates', selectedMonth],
    queryFn: async () =>
      getDatesByAuctionYearAndMonth(
        selectedAuction ?? '',
        selectedYear ?? '',
        selectedMonth ?? ''
      ),
    enabled: !!selectedMonth,
  });

  const handleAuctionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuction(event.target.value);
    setSelectedYear(undefined);
    setSelectedMonth(undefined);
    setSelectedDate(undefined);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    setSelectedMonth(undefined);
    setSelectedDate(undefined);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    setSelectedDate(undefined);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <Container
      rounded={'xl'}
      centerContent
      shadow={'xl'}
      maxW={'90%'}
      minH={'250'}
      bgColor={'gray.100'}
      padding={'4'}
    >
      {/* <h1 className='text-4xl pt-4 font-bold'>Subastas Ganaderas Costa Rica</h1> */}
      <Text fontSize='4xl'>Subastas Ganaderas Costa Rica</Text>
      {query.isLoading && <h2>Cargando...</h2>}
      {query.isError && <h2>Ha ocurrido un error</h2>}
      {!query.isLoading && !query.isError && query.data && (
        <div className='pt-4'>
          <form>
            <FormControl>
              <FormLabel>Subasta</FormLabel>
              <Select
                placeholder='Seleccione una opcion'
                size={'lg'}
                onChange={handleAuctionChange}
                value={selectedAuction}
              >
                {query.data.auctionNames.map((auction) => (
                  <option key={auction._id} value={auction.name}>
                    {auction.name.toUpperCase()}
                  </option>
                ))}
              </Select>
            </FormControl>
            <SimpleGrid
              marginTop={'4'}
              columns={3}
              spacingX='10px'
              spacingY='20px'
            >
              <FormControl>
                <FormLabel>Año</FormLabel>
                <Select
                  placeholder='Seleccione una opcion'
                  onChange={handleYearChange}
                  value={selectedYear}
                >
                  {queryYear?.data?.years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Mes</FormLabel>
                <Select
                  placeholder='Seleccione una opcion'
                  onChange={handleMonthChange}
                  value={selectedMonth}
                >
                  {queryMonths?.data?.months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Fecha</FormLabel>
                <Select
                  placeholder='Seleccione una opcion'
                  onChange={handleDateChange}
                  value={selectedDate}
                >
                  {queryDates.data?.dates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </SimpleGrid>
          </form>
        </div>
      )}
    </Container>
  );
};
