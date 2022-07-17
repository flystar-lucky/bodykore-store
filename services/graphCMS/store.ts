import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Store {
  title: string;
  address: string;
  coordinates: Coordinates;
}

export const getAllStores = async (): Promise<Store[]> => {
  const query = gql`
    query AllStores {
      stores {
        title
        address
        coordinates {
          latitude
          longitude
        }
      }
    }
  `;
  const res = await graphcms.request(query);
  return res.stores;
};
