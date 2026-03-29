import React, {useState, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {getAllImages, ALL_TAGS, Image as AppImage} from './data';

const {width} = Dimensions.get('window');

export default function App(): React.JSX.Element {
  const [allImages] = useState<AppImage[]>(getAllImages());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingImage, setViewingImage] = useState<AppImage | null>(null);

  // Filter tags based on search query
  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return ALL_TAGS;
    return ALL_TAGS.filter(tag =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Filter images based on selected tags
  const filteredImages = useMemo(() => {
    if (selectedTags.length === 0) return allImages;
    return allImages.filter(img =>
      selectedTags.some(tag => img.tags.includes(tag))
    );
  }, [allImages, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A14" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QUICK STATUS</Text>
        <Text style={styles.headerSub}>Select tags to filter images</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIconText}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tags..."
            placeholderTextColor="#555"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContent}>
          {filteredTags.map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tag,
                  isSelected && styles.tagActive,
                ]}
                onPress={() => toggleTag(tag)}>
                <Text
                  style={[
                    styles.tagText,
                    isSelected && styles.tagTextActive,
                  ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Selected Tags Summary */}
      {selectedTags.length > 0 && (
        <View style={styles.selectedSummary}>
          <Text style={styles.selectedText}>
            {selectedTags.length} {selectedTags.length === 1 ? 'tag' : 'tags'} selected
          </Text>
          <TouchableOpacity onPress={() => setSelectedTags([])}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Images Feed (Instagram-style) */}
      <ScrollView
        style={styles.feedContainer}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}>
        {filteredImages.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.feedItem}
            onPress={() => setViewingImage(item)}>
            <Image source={item.uri} style={styles.feedImage} resizeMode="cover" />
            <View style={styles.feedTags}>
              {item.tags.map((tag, idx) => (
                <View key={idx} style={styles.feedTag}>
                  <Text style={styles.feedTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
        {filteredImages.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🖼</Text>
            <Text style={styles.emptyStateText}>No images found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try selecting different tags
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Image Viewer Modal */}
      <Modal
        visible={!!viewingImage}
        transparent
        animationType="fade"
        onRequestClose={() => setViewingImage(null)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalCloseArea}
            activeOpacity={1}
            onPress={() => setViewingImage(null)}>
            <View style={styles.modalContainer}>
              {viewingImage && (
                <>
                  <Image
                    source={viewingImage.uri}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                  <View style={styles.modalInfo}>
                    {viewingImage.tags.map((tag, idx) => (
                      <View key={idx} style={styles.modalTag}>
                        <Text style={styles.modalTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setViewingImage(null)}>
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const ACCENT = '#E94560';
const BG = '#0A0A14';
const CARD_BG = '#12121F';
const BORDER = '#1E1E35';
const TEXT_PRIMARY = '#F0F0FF';
const TEXT_MUTED = '#555570';

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: BG},

  header: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    alignItems: 'center',
  },
  headerTitle: {
    color: ACCENT,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 4,
  },
  headerSub: {
    color: TEXT_MUTED,
    fontSize: 11,
    letterSpacing: 1.5,
    marginTop: 4,
  },

  searchRow: {paddingHorizontal: 16, paddingVertical: 12},
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    height: 46,
  },
  searchIconText: {color: TEXT_MUTED, fontSize: 20, marginRight: 8},
  searchInput: {flex: 1, color: TEXT_PRIMARY, fontSize: 15},
  clearText: {color: TEXT_MUTED, fontSize: 16, paddingLeft: 8},

  tagsContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tagsContent: {
    paddingHorizontal: 12,
    gap: 10,
  },
  tag: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
  },
  tagActive: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  tagText: {
    color: TEXT_MUTED,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  tagTextActive: {
    color: '#fff',
  },

  selectedSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: CARD_BG,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  selectedText: {
    color: TEXT_PRIMARY,
    fontSize: 13,
    fontWeight: '500',
  },
  clearAllText: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '600',
  },

  feedContainer: {
    flex: 1,
  },
  feedContent: {
    paddingVertical: 8,
  },
  feedItem: {
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER,
  },
  feedImage: {
    width: width - 16,
    height: width - 16,
  },
  feedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 8,
  },
  feedTag: {
    backgroundColor: ACCENT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  feedTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateText: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: TEXT_MUTED,
    fontSize: 14,
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '85%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: CARD_BG,
  },
  modalImage: {
    width: '100%',
    height: 400,
  },
  modalInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  modalTag: {
    backgroundColor: ACCENT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  modalTagText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
