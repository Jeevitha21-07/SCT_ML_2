import pandas as pd

data = pd.read_csv("../data/Mall_Customers.csv")

print(data.head())
print(data.info())
print(data.describe())

import seaborn as sns
import matplotlib.pyplot as plt
sns.scatterplot(x='Annual Income (k$)', y='Spending Score (1-100)', data=data)
plt.title("Income vs Spending Score")
plt.show()
sns.histplot(data['Age'], bins=20)
plt.title("Age Distribution")
plt.show()

X = data[['Annual Income (k$)', 'Spending Score (1-100)']]
print(X.head())

from sklearn.cluster import KMeans

wcss = []

for i in range(1, 11):
    kmeans = KMeans(n_clusters=i, random_state=42)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)

plt.plot(range(1, 11), wcss)
plt.title("Elbow Method")
plt.xlabel("Number of Clusters")
plt.ylabel("WCSS")
plt.show()

kmeans = KMeans(n_clusters=5, random_state=42)
y_kmeans = kmeans.fit_predict(X)

data['Cluster'] = y_kmeans
print(data.head())

plt.scatter(X['Annual Income (k$)'], X['Spending Score (1-100)'], c=y_kmeans, cmap='rainbow')

# Centroids
plt.scatter(kmeans.cluster_centers_[:, 0],
            kmeans.cluster_centers_[:, 1],
            s=300, c='black', label='Centroids')

plt.xlabel("Annual Income")
plt.ylabel("Spending Score")
plt.title("Customer Segmentation")
plt.legend()
plt.show()