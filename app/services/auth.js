import {gql, useQuery} from '@apollo/client';
import client from './api';

export const getAllCategories = () => {
  const query = gql`
    query {
      collections {
        items {
          name
        }
      }
    }
  `;
  const {loading, error, data} = useQuery(query);
  return {loading, error, data};
};

export const getAllProducts = () => {
  const query = gql`
    query {
      products {
        items {
          name
          assets {
            source
          }
          variants {
            price
          }
        }
      }
    }
  `;
  const {loading, error, data} = useQuery(query);
  return {loading, error, data};
};

export const getProducts = (ids) => {
  const query = gql`
    query ($ids: ID) {
      search(input: { collectionId: $ids }) {
        items {
          productName
          productAsset {
            preview
          }
        }
      }
    }
  `;
  const {loading, error, data} = useQuery(query, {variables: {ids}});
  return {loading, error, data};
};

// client
//   .query({
//     query: gql`
//       query {
//         collections {
//           items {
//             name
//           }
//         }
//       }
//     `,
//   })
//   .then(res => );
