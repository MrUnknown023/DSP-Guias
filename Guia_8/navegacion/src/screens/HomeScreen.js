import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const images = [
  {
    id: 1,
    source:
      "https://img.freepik.com/vector-gratis/seminario-web-concepto-ecologia-diseno-plano_23-2149849805.jpg",
    description: "Reduce, Reutiliza, Recicla",
    info: "Descubre cómo contribuir al medio ambiente con simples acciones.",
  },
  {
    id: 2,
    source:
      "https://img.freepik.com/vector-gratis/ninos-plantando-arboles-utilizando-energia-renovable_1150-43076.jpg",
    description: "Reciclaje en tu Comunidad",
    info: "Conoce programas de reciclaje y participa activamente.",
  },
  {
    id: 3,
    source:
      "https://img.freepik.com/vector-gratis/ilustracion-concepto-gestion-residuos_114360-8685.jpg?t=st=1743278280~exp=1743281880~hmac=8011070cab5c5d989e32b7a51b7d530bc6cb1536d7984494f520f5d843230821&w=740",
    description: "Clasificación de Residuos",
    info: "Aprende cómo separar los residuos de forma correcta.",
  },
  {
    id: 4,
    source:
      "https://img.freepik.com/foto-gratis/campana-energia-sostenible-mano-sujetando-arbol-bombilla-media-remix_53876-104824.jpg?t=st=1743278145~exp=1743281745~hmac=3c87269daf2b1c570a6e8bb052193de5443d8304c742e8262f148b786c71aee2&w=996",
    description: "Energía Sostenible",
    info: "Conoce cómo la energía renovable ayuda a reducir la contaminación.",
  },
  {
    id: 5,
    source:
      "https://img.freepik.com/vector-gratis/ilustracion-contaminacion-plastica-oceano-dibujado-mano_23-2150364046.jpg?t=st=1743278316~exp=1743281916~hmac=bbe4f68438c20526bf437aaabd7077fadc89d954e285f3269f08cc255510b660&w=740",
    description: "Menos Plástico",
    info: "Descubre alternativas ecológicas para reducir el uso del plástico.",
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.bannerTitle}>Bienvenido a Reciclaje Eco</Text>
        <Text style={styles.bannerText}>
          Ayudamos a cuidar el medio ambiente. ¡Únete a nosotros!
        </Text>
        <Button
          title="Ir a Detalles"
          onPress={() => navigation.navigate("Details")}
        />
      </View>

      <View style={styles.featured}>
        <Text style={styles.featuredTitle}>Destacado</Text>
        {images.map((image) => (
          <TouchableOpacity key={image.id} style={styles.featuredItem}>
            <Image
              source={{ uri: image.source }}
              style={styles.featuredImage}
            />
            <Text style={styles.featuredItemTitle}>{image.description}</Text>
            <Text style={styles.featuredItemText}>{image.info}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: "#CEFF25",
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  bannerText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  featured: {
    padding: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  featuredItem: {
    marginBottom: 20,
    alignItems: "center",
  },
  featuredImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  featuredItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  featuredItemText: {
    fontSize: 16,
    textAlign: "center",
  },
});
