import axios from 'axios';

export interface Generation {
	name: string;
	displayName: string;
	starters: Array<{
		name: string;
		number: number;
		sprite: string;
	}>;
}

export interface Pokemon {
	displayName: string;
	sprite: string;
	number: number;
	types: string[];
}

export interface PokemonDetails {
	name: string;
	number: number;
	types: string[];
	description: string;
	sprite: string;
	weaknesses: string[];
	evolutionChain: {
		common: Pokemon[];
		variant: Pokemon[];
	};
}

interface GetPokemonListParams {
	generation?: string;
	search?: string;
	types?: string[];
	page?: number;
}

const { VITE_BACKEND_URL: BACKEND_URL } = import.meta.env;

const apiBase = axios.create({ baseURL: BACKEND_URL });

export const api = {
	async getGenerations() {
		const { data } = await apiBase.get<Generation[]>('/generations');
		return data;
	},

	async getTypes() {
		const { data } = await apiBase.get<string[]>('/types');
		return data;
	},

	async getPokemonList({ generation, search, types, page = 1 }: GetPokemonListParams) {
		const { data, headers } = await apiBase.get<Pokemon[]>('/pokemon', {
			params: { generation, search, types, page },
		});
		return { items: data, total: Number(headers['x-total-items']) };
	},

	async getPokemon(id: number) {
		const { data } = await apiBase.get<PokemonDetails>(`/pokemon/${id}`);
		return data;
	},
};
