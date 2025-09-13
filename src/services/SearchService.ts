import { SearchHistoryItem } from '../interfaces/Weather';
import { AddSearchDTO } from '../dto/WeatherDTO';

export class SearchService {
  private searches: SearchHistoryItem[] = [];

  // Add a search to history
  addSearch(searchData: AddSearchDTO): SearchHistoryItem {
    const searchItem: SearchHistoryItem = {
      id: this.generateId(),
      city: searchData.city,
      country: searchData.country,
      searchedAt: new Date().toISOString(),
      coordinates: {
        lat: searchData.lat,
        lon: searchData.lon
      }
    };

    // Remove duplicate if exists (same city)
    this.searches = this.searches.filter(
      search => search.city.toLowerCase() !== searchData.city.toLowerCase()
    );

    // Add to beginning of array (most recent first)
    this.searches.unshift(searchItem);

    // Keep only last 10 searches
    this.searches = this.searches.slice(0, 10);

    return searchItem;
  }

  // Get all searches
  getAllSearches(): SearchHistoryItem[] {
    return this.searches;
  }

  // Get search by city
  getSearchByCity(city: string): SearchHistoryItem | undefined {
    return this.searches.find(
      search => search.city.toLowerCase() === city.toLowerCase()
    );
  }

  // Clear all searches
  clearSearches(): void {
    this.searches = [];
  }

  // Generate unique ID
  private generateId(): string {
    return `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get searches count
  getSearchCount(): number {
    return this.searches.length;
  }
}