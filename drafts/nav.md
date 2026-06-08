# Navigation / Header Authoring Guide

To create the perfect Header, your Google Document (typically named `nav`) needs to be split into distinct sections using horizontal lines (`---`). 

The javascript code reads the document from top to bottom and expects the sections in a specific order:
1. **Announcements** (Optional, requires Section Metadata)
2. **Brand / Logo** (1st standard section)
3. **Navigation Links** (2nd standard section)
4. **Tools / Icons** (3rd standard section)

Copy and paste the example below into your `nav` Google Doc to see the full layout in action!

***

Hello Meet And Jigar

| Section Metadata | |
| :--- | :--- |
| Style | announcements |

---

**[Interior Define](/)**

---

* [Shop By Brands](/brands)
  * [Pottery Barn](/pottery-barn)
  * [West Elm](/west-elm)
  * [Williams Sonoma](/williams-sonoma)
* [Shop By Category](/category)
  * [Seating](/seating)
  * [Tables](/tables)
  * [Beds](/beds)
* [About Us](/about)

---

* [![Search](/icons/search.svg)](/search)
* [![Profile](/icons/profile.svg)](/profile)
* [![Cart](/icons/cart.svg)](/cart)


***

### Authoring Rules:
1. **The Horizontal Lines (`---`) are Mandatory!** They are what separate the Logo from the Links, and the Links from the Icons.
2. **Sub-menus:** To create a dropdown menu (like under 'Shop By Brands'), simply use the 'Indent' button in Google Docs to make a nested bulleted list. The CSS we wrote earlier will automatically attach the chevron icon to it!
3. **Icons:** The Tools section expects standard AEM icons (like `![Cart](/icons/cart.svg)`). If you don't have SVG icons uploaded to your project yet, you can leave that entire last section empty or type simple text links like `[Cart](/cart)`.
