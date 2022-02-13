from math import nan
import math
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from nltk.stem.snowball import SnowballStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import wordnet
from surprise import Reader, Dataset, SVD
import ast

import warnings; warnings.simplefilter('ignore')

md = pd.read_csv('/home/master-lab/Desktop/projects/moviesAPI/data/movies_metadata.csv')
md['genres'] = md['genres'].fillna('[]').apply(literal_eval).apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else [])

vote_counts = md[md['vote_count'].notnull()]['vote_count'].astype('int')
vote_averages = md[md['vote_average'].notnull()]['vote_average'].astype('int')
C = vote_averages.mean()

m = vote_counts.quantile(0.95)

md['year'] = pd.to_datetime(md['release_date'], errors='coerce').apply(lambda x: str(x).split('-')[0] if x != np.nan else np.nan)

qualified = md[(md['vote_count'] >= m) & (md['vote_count'].notnull()) & (md['vote_average'].notnull())][['id', 'belongs_to_collection','title', 'year', 'vote_count', 'vote_average', 'popularity', 'genres']]
qualified['vote_count'] = qualified['vote_count'].astype('int')
qualified['vote_average'] = qualified['vote_average'].astype('int')

def weighted_rating(x):
    v = x['vote_count']
    R = x['vote_average']
    return (v/(v+m) * R) + (m/(m+v) * C)

qualified['wr'] = qualified.apply(weighted_rating, axis=1)

qualified = qualified.sort_values('wr', ascending=False).head(250)

# index = [
#     qualified.head(0),
#     qualified.head(1),
#     qualified.head(2),
#     qualified.head(3),
#     qualified.head(4),
#     qualified.head(5),
#     qualified.head(6),
#     qualified.head(7),
#     qualified.head(8),
#     qualified.head(9),
# ]

# for x in index:
#     print(x)

movies = []

for x in qualified.head(10).values.tolist():
    if isinstance(x[1], str):
        movies.append(
            {
                'id': x[0],
                'obj': ast.literal_eval(x[1]),
                'title': x[2],
                'year': x[3],
            },
        )
    else:
        movies.append(
            {
                'id': x[0],
                'obj': [],
                'title': x[2],
                'year': x[3],
            },
        )

if __name__ == "__main__":
    print(movies)