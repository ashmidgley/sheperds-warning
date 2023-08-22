import { Preferences } from "@capacitor/preferences";

const KEY = "searches";

export interface ISearchStore {
  addSearch(value: string): Promise<void>;
  getSearches(): Promise<string[]>;
}

export class SearchStore implements ISearchStore {
  async addSearch(value: string): Promise<void> {
    let searches = await this.getSearches();
    if (searches.includes(value)) return;

    if (searches.length === 5) {
      // Remove first element to keep max suggestions at 5.
      searches.splice(0, 1);
    }

    const update = searches.length > 0 ? `${searches},${value}` : value;
    await Preferences.set({
      key: KEY,
      value: update,
    });
  }

  private async getSearchesString(): Promise<string> {
    const { value } = await Preferences.get({ key: KEY });
    return value ? (value as string) : "";
  }

  async getSearches(): Promise<string[]> {
    const searchesString = await this.getSearchesString();
    return searchesString ? searchesString.split(",") : [];
  }
}
