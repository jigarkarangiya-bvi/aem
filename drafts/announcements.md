# Announcements Block

This block displays a scrolling announcement bar at the top of the page. It supports multiple announcements and custom background colors.

### Where to Author

The best place to author this is at the **very top** of your `nav` document (the document that builds your header/navigation menu). Our custom logic will automatically pull it out and place it at the very top of the screen above the navigation. 

Alternatively, you can place it at the top of your homepage document.

### How to Author in Google Drive:

1. Create a Table with **2 columns**.
2. In the top merged header row, type: **Announcements**
3. Each row underneath represents one announcement that will scroll/fade into view.
4. **Column 1** is the Announcement Text.
5. **Column 2** is the Background Color (e.g. `#7a8b5e`, `black`, `#000000`). If left blank, it defaults to the olive green color from the screenshot.

| Announcements | |
| :--- | :--- |
| <p>📍 Visit Us — Find a Define Studio Near You</p> | `#7a8b5e` |
| <p>Free Shipping on all orders over $500! 🚚</p> | `black` |
| <p>New Custom Swatches available in store now.</p> | `#333333` |

### How it Works
The code will automatically stack them on top of each other and fade between them every 4 seconds. The text color is automatically set to white to stand out against the colored backgrounds.
