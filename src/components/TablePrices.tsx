import {
  TableContainer,
  Table,
  Tfoot,
  Tr,
  Td,
  Tbody,
  Th,
  Thead,
  Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getPricesByAuctionAndDate } from '../api/auctions';

interface Params {
  selectedDate: string | undefined;
  selectedAuction: string | undefined;
}

export const TablePrices = ({ selectedDate, selectedAuction }: Params) => {
  const queryPrices = useQuery({
    queryKey: ['prices', selectedDate],
    queryFn: async () =>
      getPricesByAuctionAndDate(selectedAuction ?? '', selectedDate ?? ''),
    enabled: !!selectedDate,
  });

  return (
    <>
      {queryPrices.isLoading && queryPrices.fetchStatus === 'fetching' &&<Spinner size='xl' />}
      {!queryPrices.isLoading && !queryPrices.isError && queryPrices.data && (
        <TableContainer
          marginTop={8}
          minW={'90%'}
          border={'1px'}
          borderColor='gray.200'
        >
          <Table variant='striped' colorScheme='linkedin'>
            <Thead>
              <Tr>
                <Th>Tipo</Th>
                <Th isNumeric>Peso</Th>
                <Th isNumeric>Precio Minimo</Th>
                <Th isNumeric>Precio Maximo</Th>
                <Th isNumeric>Precio Promedio</Th>
                <Th isNumeric>Fecha</Th>
              </Tr>
            </Thead>
            <Tbody>
              {queryPrices.data.prices.map((price, index) => (
                <Tr key={price.animaltype + price.weightRange + index}>
                  <Td>{price.animaltype}</Td>
                  <Td isNumeric>{price.weightRange}</Td>
                  <Td isNumeric>{price.minPrice}</Td>
                  <Td isNumeric>{price.maxPrice}</Td>
                  <Td isNumeric>{price.averagePrice}</Td>
                  <Td isNumeric>{selectedDate ?? ''}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Tipo</Th>
                <Th isNumeric>Peso</Th>
                <Th isNumeric>Precio Minimo</Th>
                <Th isNumeric>Precio Maximo</Th>
                <Th isNumeric>Precio Promedio</Th>
                <Th isNumeric>Fecha</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
