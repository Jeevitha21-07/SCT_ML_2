# 🚀 CustomerScope – ML Customer Segmentation Dashboard

A full-stack machine learning dashboard that segments customers using K-Means clustering and visualizes insights through interactive graphs.

---

## 🌐 Live Demo

👉 https://customer-segmentation-dashboard.vercel.app

---

## 🧠 Project Overview

CustomerScope is an end-to-end data analytics and machine learning project that:

* Segments customers based on income & spending behavior
* Visualizes patterns using interactive charts
* Helps understand customer groups for better decision-making

---

## ⚙️ Tech Stack

### 🔹 Frontend

* React.js
* Chart.js (react-chartjs-2)
* Axios
* Custom CSS (Dark + Modern UI)

### 🔹 Backend

* FastAPI
* Pandas
* Scikit-learn (KMeans)

### 🔹 Deployment

* Frontend: Vercel
* Backend: Render

---

## 📊 Features

* 📌 Customer segmentation using K-Means clustering
* 📈 Interactive visualizations:

  * Income vs Spending
  * Age vs Spending
  * Gender Distribution
  * Elbow Method (WCSS)
* 🔄 Dynamic cluster selection (K value)
* 📋 Data table with customer details
* 🎨 Premium responsive UI (dark theme + cards)

---

## 🧮 Machine Learning

* Algorithm: **K-Means Clustering**
* Input Features:

  * Annual Income
  * Spending Score
* Output:

  * Cluster labels assigned to each customer

---

## 📁 Project Structure

```
customer-segmentation-dashboard/
│
├── backend/
│   ├── app.py
│   ├── data/
│   │   └── Mall_Customers.csv
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── ...
│   └── package.json
│
└── README.md
```

---

## 🚀 Setup Instructions

### 🔹 Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

---

### 🔹 Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 🔗 API Endpoints

| Endpoint        | Description                |
| --------------- | -------------------------- |
| `/analysis`     | Summary + dataset insights |
| `/clusters/{k}` | Returns clustered data     |

---

## 💡 Future Improvements

* 🔐 User authentication
* 📊 Advanced ML metrics (Silhouette Score)
* 📥 Upload custom datasets
* 🌍 Multi-dataset support

---

## 👩‍💻 Author

**Jeevitha S**
🎓 AIML Engineering Student
📍 Bangalore

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
