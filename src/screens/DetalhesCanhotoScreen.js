import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetalhesCanhotoScreen({ route }) {
  const { canhoto } = route.params; // Pegando os dados do canhoto

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Canhoto</Text>
      <Text style={styles.detailText}>
        <Text style={styles.bold}>ID: </Text>
        {canhoto.id}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.bold}>Cliente: </Text>
        {canhoto.cliente}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.bold}>Transportadora: </Text>
        {canhoto.transportadora}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.bold}>Volumes: </Text>
        {canhoto.volumes}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.bold}>Data: </Text>
        {canhoto.dataCriacao}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 18,
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
  },
});
