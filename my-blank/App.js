import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Button,
  Alert,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';

const CATEGORIES = {
  Ficción: 'subject:fiction',
  Historia: 'subject:history',
  Tecnología: 'subject:technology',
};

const MAX_DESCRIPTION_LENGTH = 150;

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Ficción');

  // Estado para controlar qué libros tienen la descripción expandida
  const [expandedIds, setExpandedIds] = useState({});

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${CATEGORIES[selectedCategory]}&maxResults=40`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.items) {
        throw new Error('No se encontraron libros');
      }

      // Agrupar por autor
      const grouped = {};
      data.items.forEach((item) => {
        const volume = item.volumeInfo;
        const authors = volume.authors || ['Autor desconocido'];
        const author = authors[0];

        if (!grouped[author]) grouped[author] = [];

        grouped[author].push({
          id: item.id,
          title: volume.title,
          thumbnail: volume.imageLinks?.thumbnail,
          description: volume.description || 'Sin descripción',
          publisher: volume.publisher || 'Desconocido',
        });
      });

      // Autores con 2 o más libros
      const filteredSections = Object.entries(grouped)
        .filter(([_, books]) => books.length >= 2)
        .map(([author, books]) => ({
          title: author,
          data: books,
        }));

      // Limitar a 12 libros totales
      const limitedSections = [];
      for (const section of filteredSections) {
        if (limitedSections.reduce((acc, sec) => acc + sec.data.length, 0) >= 12) break;

        const remaining = 12 - limitedSections.reduce((acc, sec) => acc + sec.data.length, 0);
        const booksToAdd = section.data.slice(0, remaining);

        if (booksToAdd.length > 0) {
          limitedSections.push({
            title: section.title,
            data: booksToAdd,
          });
        }
      }

      // Si no se alcanzan los 12 libros, agregar autores con solo 1 libro
      let currentTotal = limitedSections.reduce((acc, sec) => acc + sec.data.length, 0);
      if (currentTotal < 12) {
        const singleAuthors = Object.keys(grouped)
          .filter((author) => grouped[author].length === 1)
          .map((author) => ({
            title: author,
            data: grouped[author],
          }));

        for (const section of singleAuthors) {
          if (currentTotal >= 12) break;
          limitedSections.push(section);
          currentTotal += section.data.length;
        }
      }

      setBooks(limitedSections);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    setExpandedIds({}); // resetear expandido al cambiar categoría
  }, [selectedCategory]);

  // Controla el toggle de "leer más" para cada libro
  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedIds[item.id];
    const shouldTruncate = item.description.length > MAX_DESCRIPTION_LENGTH;

    return (
      <View style={styles.item}>
        {item.thumbnail && (
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
        )}
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.publisher}>Editorial: {item.publisher}</Text>
          <Text style={styles.description}>
            {shouldTruncate && !isExpanded
              ? item.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
              : item.description}
          </Text>
          {shouldTruncate && (
            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
              <Text style={styles.readMore}>
                {isExpanded ? 'Leer menos' : 'Leer más'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={styles.categoryButtons}>
        {Object.keys(CATEGORIES).map((cat) => (
          <Button
            key={cat}
            title={cat}
            onPress={() => setSelectedCategory(cat)}
            color={selectedCategory === cat ? '#6200ee' : '#aaa'}
          />
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />
      ) : (
        <SectionList
          sections={books}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay resultados</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 18,
    backgroundColor: '#eee',
    padding: 6,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  publisher: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    marginTop: 4,
    color: '#444',
  },
  readMore: {
    marginTop: 4,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  image: {
    width: 60,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
