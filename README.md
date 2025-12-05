
````markdown
# PixelStream - Pexels API Image Gallery

PixelStream is a modern, responsive image gallery web application built using **HTML**, **Tailwind CSS**, and **Vanilla JavaScript**. It consumes the **Pexels API** to fetch high-quality curated images and allows users to search for specific topics.

## 🚀 Features

* **Search Functionality:** Instantly search through millions of photos.
* **Curated Feed:** Displays trending images on initial load.
* **Responsive Grid:** Fully responsive masonry-style layout using Tailwind CSS.
* **Load More:** Pagination button to fetch more results seamlessly.
* **Image Info:** Hover effects showing photographer name and download links.
* **Dark Mode:** Sleek dark-themed UI.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Styling:** Tailwind CSS (via CDN)
* **API:** [Pexels API](https://www.pexels.com/api/)

---

## ⚙️ Installation & Setup

Since the API Key is sensitive data, it is not included in this repository. Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone [https://github.com/Jash-codes/Pexels---API.git](https://github.com/Jash-codes/Pexels---API.git)
cd Pexels---API
````

### 2\. Generate Your API Key

1.  Go to the [Pexels API Website](https://www.pexels.com/api/).
2.  Log in or Sign up for a free account.
3.  Click on **"Your API Key"** and copy the long alphanumeric string.

### 3\. Configure the API Key

This project requires a `config.js` file to store your credentials securely.

1.  Create a new file named `config.js` in the root folder of the project.
2.  Paste the following code into `config.js`:

<!-- end list -->

```javascript
const config = {
    apiKey: "PASTE_YOUR_PEXELS_API_KEY_HERE"
};
```

3.  Replace `"PASTE_YOUR_PEXELS_API_KEY_HERE"` with the key you copied in Step 2.

### 4\. Run the Project

Simply open `index.html` in your web browser.

> **Note:** If you are using VS Code, it is recommended to use the "Live Server" extension for the best experience.

-----

## 📂 Project Structure

```
├── index.html      # Main HTML structure
├── style.css       # Custom styles & animations
├── script.js       # Main logic (Fetching API, UI updates)
├── config.js       # API Key storage (Not included in repo)
└── README.md       # Project documentation
```

## 🛡️ Security Note

The `config.js` file is added to `.gitignore` to prevent your API key from being exposed publicly on GitHub. Never commit your API keys to version control.

## 🤝 Credits

  * Photos provided by [Pexels](https://www.pexels.com/).
