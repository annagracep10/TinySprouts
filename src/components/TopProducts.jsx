import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList
} from 'recharts';
import { Spin, Typography } from 'antd';  

const { Title } = Typography;  

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

  if (loading) return <Spin size="large" />;  
  if (error) return <p>Error: {error.message}</p>;

  const chartData = data.getTopProducts.map(product => ({
    name: product.productName,
    quantity: product.totalQuantity,
  }));

  return (
    <div style={{ padding: '20px', background: '#f0f2f5', borderRadius: '8px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Top {limit} Products
      </Title>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.2)' }}
          />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <Bar dataKey="quantity" fill="#1890ff" barSize={40} radius={[10, 10, 0, 0]}>
            <LabelList dataKey="quantity" position="top" style={{ fill: '#333', fontWeight: 'bold' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProducts;
