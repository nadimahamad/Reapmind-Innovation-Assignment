import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { getUsers } from '../services/localDatabase';

const DashboardScreen = () => {
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });

  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const users = await getUsers();
      const monthCounts = {};

      users.forEach(user => {
        const month = new Date(user.createdAt).getMonth();
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });

      const labels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
      const data = labels.map((_, i) => monthCounts[i + 5] || 0);

      setUserData({ labels, datasets: [{ data }] });

      // Prepare data for PieChart (example distribution)
      const pieData = [
        { name: 'Jun', population: monthCounts[5] || 0, color: '#FF6F61', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Jul', population: monthCounts[6] || 0, color: '#FFA07A', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Aug', population: monthCounts[7] || 0, color: '#FFD700', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Sep', population: monthCounts[8] || 0, color: '#FF6347', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Oct', population: monthCounts[9] || 0, color: '#FF4500', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Nov', population: monthCounts[10] || 0, color: '#FF8C00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      ];

      setPieData(pieData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <BarChart
        data={userData}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel=""
        yAxisSuffix=" Units"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          barPercentage: 0.7,
          color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#333',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

   
      {/* Demo Bar Chart with Static Data */}
      <BarChart
        data={{
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            {
              data: [30, 45, 28, 80],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel=""
        yAxisSuffix=" Sales"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          barPercentage: 0.7,
          color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#333',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
            <Text style={styles.title}>This Feature Under Development...</Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    alignSelf:'center',
    marginTop:20
  },
});

export default DashboardScreen;
