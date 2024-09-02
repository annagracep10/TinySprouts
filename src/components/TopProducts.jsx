import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GET_TOP_PRODUCTS = gql`
  query GetTopProducts($limit: Int!) {
    getTopProducts(limit: $limit) {
      productId
      productName
      totalQuantity 
    }
  }
`;

const TopProducts = ({ limit = 5 }) => {
  const { loading, error, data } = useQuery(GET_TOP_PRODUCTS, {
    variables: { limit },
    fetchPolicy: 'network-only', 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const chartData = data.getTopProducts.map(product => ({
    name: product.productName,
    quantity: product.totalQuantity,
  }));

  return (
    <div>
      <h2>Top {limit} Products</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProducts;
