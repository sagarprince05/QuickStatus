# Quick Status - Religious Images App

## Overview
Quick Status is a tag-based image filtering app that displays religious images organized by tags (Christian, Hindu, Muslim, Sikh, Hindu Quotes). Users can search tags, select multiple tags to filter images, and view them in an Instagram-style feed.

## Key Changes

### 1. **Removed Category Boxes**
- Removed the old system of category boxes below the search bar
- Removed the ability to rename categories, add photos, and manage individual boxes
- Removed the grid layout showing category cards

### 2. **Added Religion Tabs**
Below the search bar, there are now 5 horizontal tabs:
- **ALL** - Shows all images from all religions
- **HINDU** - Shows only Hindu religious images (10 images)
- **MUSLIM** - Shows only Muslim religious images (10 images)
- **SIKH** - Shows only Sikh religious images (11 images)
- **CHRISTIAN** - Shows only Christian religious images (12 images)

### 3. **Image Grid Display**
- All images are now displayed in a 3-column grid layout
- Each image has a small tag in the bottom-right corner showing its religion
- When the app opens, it displays ALL images by default
- Clicking a tab filters the grid to show images from that religion only

### 4. **Image Viewer Modal**
- Tap any image to view it in a larger modal
- The modal shows the image and displays the religion tag
- Close button (✕) in the top-right corner
- Click outside to close

### 5. **Search Functionality**
- Search bar remains but is primarily for future use (currently has placeholder text)
- Can be enhanced later to search image descriptions or add other metadata

## Project Structure

```
QuickStatus/
├── App.tsx                          (Main app component with tag filtering)
├── data.ts                          (Image data & tag helpers)
├── assets/
│   └── images/
│       ├── Christian/               (12 Christian religious images)
│       ├── Hindu/                   (10 Hindu religious images)
│       ├── Muslim/                  (10 Muslim religious images)
│       ├── Sikh/                    (11 Sikh religious images)
│       └── Hindu Quotes/            (10 Hindu Quotes images)
└── [other files unchanged]
```

## Running the App

### Prerequisites
```bash
npm install
# or
yarn install
```

### Start Development Server
```bash
npm start
# or
yarn start
```

### For Android
```bash
npm run android
# or
react-native run-android
```

### For iOS
```bash
npm run ios
# or
react-native run-ios
```

## Component Details

### New File: `data.ts`
Contains:
- `Image` interface with id, uri, and religion properties
- `RELIGION_TAGS` constant array with all 4 religion types
- `getAllImages()` function - Returns all 43 images
- `getImagesByReligion()` function - Filters images by religion type

### Updated File: `App.tsx`
New State:
- `allImages` - All 43 images loaded from data.ts
- `selectedReligion` - Currently selected filter ('ALL', 'HINDU', 'MUSLIM', 'SIKH', or 'CHRISTIAN')
- `searchQuery` - Search input (for future enhancement)
- `viewingImage` - Currently viewed image in modal

UI Components:
- Header with "QUICK STATUS" title
- Search bar for future use
- Horizontal scroll tabs for religion filtering
- 3-column image grid with FlatList
- Full-screen image viewer modal

## Styling
- **Dark Theme**: Primary background color #0A0A14 with accent color #E94560
- **Cards**: Dark background with subtle borders
- **Interactive Elements**: Red accent color for buttons and active states
- **Responsive**: Adjusts to different screen sizes automatically

## Image Count Summary
- Hindu: 10 images
- Muslim: 10 images
- Christian: 12 images
- Sikh: 11 images
- **Total: 43 religious images**

## Future Enhancements (Optional)
- Add image search functionality
- Add ability to add custom images with religion tagging
- Add image zoom functionality
- Add image sharing capability
- Add favorites/bookmarks
- Add image categories within religions
- Add animations for tab switching
