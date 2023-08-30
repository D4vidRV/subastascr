import { useState } from 'react';
import './App.css';
import { Container } from '@chakra-ui/react';
import { HeaderFilter } from './components/HeaderFilter';
import { TablePrices } from './components/TablePrices';

function App() {
  const [selectedAuction, setSelectedAuction] = useState<string>();
  const [selectedYear, setSelectedYear] = useState<string>();
  const [selectedMonth, setSelectedMonth] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();

  return (
    <main>
      <Container maxW={'100%'} padding={'10'}>
        <HeaderFilter
          selectedAuction={selectedAuction}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDate={selectedDate}
          setSelectedAuction={setSelectedAuction}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedDate={setSelectedDate}
        />
        <Container rounded={'xl'} centerContent marginTop={'5'} maxW={'100%'}>
          {/* TABLE */}
          <TablePrices
            selectedDate={selectedDate}
            selectedAuction={selectedAuction}
          />
        </Container>
      </Container>
    </main>
  );
}

export default App;
