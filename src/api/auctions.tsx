import {
  AuctionDatesResponse,
  AuctionMonthsResponse,
  AuctionPricesResponse,
  AuctionResponse,
  AuctionYearsResponse,
} from '../interfaces/auctions';

const apiUrl = import.meta.env.VITE_API_URL;

export const getAuctionsNamesFromApi = async (): Promise<AuctionResponse> => {
  try {
    const res = await fetch(`${apiUrl}/api/auctions`);
    if (!res.ok) {
      throw new Error(`${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
    throw new Error(`Error occurred.`);
  }
};

export const getYearsFromAuction = async (
  auctionName: string
): Promise<AuctionYearsResponse> => {
  try {
    const res = await fetch(
      `${apiUrl}/api/auctions/years_by_auction?auction_name=${auctionName}`
    );
    if (!res.ok) {
      throw new Error(`${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
    throw new Error(`Error occurred.`);
  }
};

export const getMonthsFromAuctionAndYear = async (
  name: string,
  year: string
): Promise<AuctionMonthsResponse> => {
  try {
    const res = await fetch(
      `${apiUrl}/api/auctions/months_by_name_and_year?auction_name=${name}&year=${year}`
    );
    if (!res.ok) {
      throw new Error(`${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
    throw new Error(`Error occurred.`);
  }
};

export const getDatesByAuctionYearAndMonth = async (
  name: string,
  year: string,
  month: string
): Promise<AuctionDatesResponse> => {
  try {
    const res = await fetch(
      `${apiUrl}/api/auctions/auctions_by_name_and_date?auction_name=${name}&year=${year}&month=${month}`
    );
    if (!res.ok) {
      throw new Error(`${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
    throw new Error(`Error occurred.`);
  }
};

export const getPricesByAuctionAndDate = async (
  name: string,
  date: string
): Promise<AuctionPricesResponse> => {
  try {
    const res = await fetch(
      `${apiUrl}/api/auctions/prices_by_name_and_auction?auction_name=${name}&date=${date}`
    );
    if (!res.ok) {
      throw new Error(`${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
    throw new Error(`Error occurred.`);
  }
};
