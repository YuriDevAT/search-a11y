# searchA11y

**A high-performance, unified search engine for discovering content from leading web accessibility specialists.**

This application aggregates articles and blog posts from a curated list of world-renowned accessibility experts, providing a single, powerful interface to search through their collective knowledge. For many of these valuable resources, this tool provides a much-needed search functionality that was previously unavailable.

The search experience is powered by [**Algolia**](https://www.algolia.com/), delivering instant, typo-tolerant results and an intelligent, user-friendly interface.

## Features

*   **Unified Search:** Instantly search across articles from multiple authors in one place.
*   **Full-Text Content Search:** Queries are matched against the full content of articles, not just titles.
*   **Intelligent Snippets:** Search results display relevant excerpts from the article content with matching keywords highlighted.
*   **Author Filtering:** Easily refine search results by selecting one or more authors from a filter bar.
*   **Typo-Tolerant:** Get relevant results even if you make a spelling mistake.
*   **Fast & Responsive:** Built with vanilla JavaScript and Algolia for a lightweight and instantaneous user experience.

## Project Structure

This project contains two separate applications:

*   `frontend/`: A simple, performant user interface built with HTML, CSS, and vanilla JavaScript.
*   `backend/`: A Node.js script responsible for fetching, parsing, and indexing the article data into Algolia.

## Setup and Installation

Follow these steps to get the project running locally.

### 1. Backend Setup (Populating the Data)

The backend script fetches all the articles and sends them to your Algolia index.

**Prerequisites:**
*   Node.js (v18 or higher)
*   An Algolia account (a free plan is sufficient)

**Instructions:**

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/searcha11y.git
    cd searcha11y/backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set Up Algolia Credentials:**
    *   Create a free account at [algolia.com](https://www.algolia.com).
    *   Create a new Application and an Index (e.g., name it `accessibility_articles`).
    *   Find your **Application ID** and **Admin API Key** under the "API Keys" section of your dashboard.
    *   In the `backend` folder, create a new file named `.env`.
    *   Copy the following into `.env` and fill in your credentials:
        ```env
        ALGOLIA_APP_ID=YOUR_ALGOLIA_APP_ID
        ALGOLIA_ADMIN_API_KEY=YOUR_SECRET_ADMIN_KEY
        ALGOLIA_INDEX_NAME=accessibility_articles
        ```

4.  **Configure Algolia Facets:**
    *   In your Algolia dashboard, go to your index -> **Configuration** -> **Facets**.
    *   Under "Attributes for faceting," click **Add an attribute** and add `author`.
    *   Click **Review and save**. This step is required for the author filter to work.

5.  **Run the Indexing Script:**
    Execute the script from your terminal to fetch all articles and populate your index.
    ```bash
    node index.js
    ```
    You should see a "Success!" message when it's done.

---

### 2. Frontend Setup (Viewing the Application)

The frontend is a simple website that you can run with any local web server.

1.  **Navigate to the Frontend Directory:**
    ```bash
    cd ../frontend
    ```

2.  **Set Up Public API Keys:**
    *   In the `frontend` folder, copy the template file: `cp config.template.js config.js`
    *   Open the new `config.js` file.
    *   Fill in your **Application ID** and your public **Search-Only API Key** (found in your Algolia dashboard). **Do not use your Admin API Key here.**
        ```javascript
        const ALGOLIA_CONFIG = {
          ALGOLIA_APP_ID: 'YOUR_ALGOLIA_APP_ID',
          ALGOLIA_SEARCH_API_KEY: 'YOUR_SEARCH_ONLY_API_KEY',
          ALGOLIA_INDEX_NAME: 'accessibility_articles'
        };
        ```

3.  **Serve the Website:**
    The easiest way to run the frontend is with a simple server. If you have Node.js installed, you can use the `serve` package.
    *   First, install `serve` globally: `npm install -g serve`
    *   Then, from inside the `frontend` directory, run:
        ```bash
        serve
        ```
    *   Open your browser and navigate to the URL provided (usually `http://localhost:3000`).

## Automation

To keep the search index up-to-date with new articles, the backend script can be run automatically on a schedule. This repository includes a pre-configured **GitHub Actions** workflow in `.github/workflows/update-index.yml`.

To enable it:
1.  Push your code to a GitHub repository.
2.  In your repository's **Settings** -> **Secrets and variables** -> **Actions**, add the three repository secrets from your `.env` file (`ALGOLIA_APP_ID`, `ALGOLIA_ADMIN_API_KEY`, `ALGOLIA_INDEX_NAME`).
3.  The workflow will now run automatically once per day to keep your index fresh. You can also trigger it manually from the "Actions" tab.
