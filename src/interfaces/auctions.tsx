type AuctionYear = number;
type AuctionYearMonth = number;
type AuctionDate = string;

export interface Auction {
  _id: string;
  name: string;
}

export interface AuctionResponse {
  auctionNames: Auction[];
}

interface AuctionPrice {
  animaltype: string;
  weightRange: string;
  maxPrice: string;
  minPrice: string;
  averagePrice: string;
  date: string;
}

export interface AuctionYearsResponse {
  years: AuctionYear[];
}

export interface AuctionMonthsResponse {
  months: AuctionYearMonth[];
}

export interface AuctionDatesResponse {
  dates: AuctionDate[];
}

export interface AuctionPricesResponse {
  prices: AuctionPrice[];
}
