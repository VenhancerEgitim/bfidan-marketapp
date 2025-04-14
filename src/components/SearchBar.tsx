import React, { memo, useRef, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  searchText: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onChangeText }) => {
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <TextInput
      ref={inputRef}
      style={styles.searchInput}
      placeholder="Search Store"
      value={searchText}
      onChangeText={onChangeText}
      returnKeyType="search"
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default memo(SearchBar);
