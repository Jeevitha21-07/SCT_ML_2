from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.cluster import KMeans

app = FastAPI()

# ✅ Enable CORS (VERY IMPORTANT for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📁 Load dataset (make sure path is correct)
DATA_PATH = "data/Mall_Customers.csv"


# 🔹 ROOT CHECK
@app.get("/")
def home():
    return {"message": "Customer Segmentation API Running 🚀"}


# 🔹 ANALYSIS ENDPOINT
@app.get("/analysis")
def get_analysis():
    data = pd.read_csv(DATA_PATH)

    # 📊 Summary stats
    summary = data.describe().to_dict()

    # 🎯 Features
    X = data[['Annual Income (k$)', 'Spending Score (1-100)']]

    # 📉 Elbow method
    wcss = []
    for i in range(1, 11):
        kmeans = KMeans(n_clusters=i, random_state=42)
        kmeans.fit(X)
        wcss.append(float(kmeans.inertia_))  # convert to JSON-safe

    return {
        "data": data.to_dict(orient="records"),
        "summary": summary,
        "wcss": wcss
    }


# 🔹 CLUSTER ENDPOINT
@app.get("/clusters/{k}")
def get_clusters(k: int):
    data = pd.read_csv(DATA_PATH)

    X = data[['Annual Income (k$)', 'Spending Score (1-100)']]

    kmeans = KMeans(n_clusters=k, random_state=42)
    data['Cluster'] = kmeans.fit_predict(X)

    # Ensure JSON-safe types
    data['Cluster'] = data['Cluster'].astype(int)

    return data.to_dict(orient="records")