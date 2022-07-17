import { gql } from 'graphql-request';
import getGraphcms from './config';

const graphcms = getGraphcms();

export interface Faqs {
  faqTypes: {
    name: string;
  }[];
  faqs: {
    question: string;
    answer: string;
    faqType?: {
      name: string;
    };
  }[];
}

export const getFaqs = async (): Promise<Faqs> => {
  const query = gql`
    query FAQ {
      faqTypes {
        name
      }
      faqs {
        question
        answer
        faqType {
          name
        }
      }
    }
  `;
  const res = await graphcms.request(query);
  return res;
};
