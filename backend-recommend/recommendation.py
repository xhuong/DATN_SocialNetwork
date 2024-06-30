# import pandas as pd
# from gensim.models import Word2Vec
# from sklearn.metrics.pairwise import cosine_similarity
# import numpy as np
# import nltk

# nltk.download('punkt')

# def preprocess(text):
#     text = text.lower()
#     tokens = nltk.word_tokenize(text)
#     tokens = [word for word in tokens if word.isalnum()]
#     return tokens

# def get_vector(model, text):
#     tokens = preprocess(text)
#     vectors = [model.wv[word] for word in tokens if word in model.wv]
#     return np.mean(vectors, axis=0) if vectors else np.zeros(model.vector_size)

# def build_model(liked_posts_df, unliked_posts_df):
#     # Kết hợp các tiêu đề của bài viết đã thích và chưa thích
#     titles = pd.concat([liked_posts_df['title'], unliked_posts_df['title']])
#     processed_titles = titles.apply(preprocess)

#     # Huấn luyện mô hình Word2Vec
#     model = Word2Vec(sentences=processed_titles, vector_size=100, window=5, min_count=1, workers=4)
#     return model

# def recommend_unliked_posts(liked_posts_df, unliked_posts_df, model, top_n=5):
#     # Tính vector cho các bài viết đã thích
#     liked_vectors = liked_posts_df['title'].apply(lambda x: get_vector(model, x)).tolist()

#     # Tính vector cho các bài viết chưa thích
#     unliked_vectors = unliked_posts_df['title'].apply(lambda x: get_vector(model, x)).tolist()

#     # Tính toán độ tương đồng giữa các bài viết chưa thích và các bài viết đã thích
#     scores = []
#     for unliked_vector in unliked_vectors:
#         similarities = [cosine_similarity([unliked_vector], [liked_vector])[0][0] for liked_vector in liked_vectors]
#         average_similarity = np.mean(similarities)
#         scores.append(average_similarity)

#     unliked_posts_df['similarity_score'] = scores

#     # Sắp xếp các bài viết chưa thích theo điểm tương đồng và chọn top_n
#     recommended_posts = unliked_posts_df.sort_values(by='similarity_score', ascending=False).head(top_n)

#     return recommended_posts


import pandas as pd
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import nltk

nltk.download('punkt')

def preprocess(text):
    text = text.lower()
    tokens = nltk.word_tokenize(text)
    tokens = [word for word in tokens if word.isalnum()]
    return tokens

def get_vector(model, text):
    tokens = preprocess(text)
    vectors = [model.wv[word] for word in tokens if word in model.wv]
    return np.mean(vectors, axis=0) if vectors else np.zeros(model.vector_size)

def build_model(liked_posts_df, unliked_posts_df):
    # Kết hợp các tiêu đề của bài viết đã thích và chưa thích
    titles = pd.concat([liked_posts_df['title'], unliked_posts_df['title']])
    processed_titles = titles.apply(preprocess)

    # Huấn luyện mô hình Word2Vec
    model = Word2Vec(sentences=processed_titles, vector_size=100, window=5, min_count=1, workers=4)
    return model

def recommend_unliked_posts(liked_posts_df, unliked_posts_df, model, min_similarity=0.3, top_n=5):
    # Tính vector cho các bài viết đã thích
    liked_vectors = liked_posts_df['title'].apply(lambda x: get_vector(model, x)).tolist()

    # Tính vector cho các bài viết chưa thích
    unliked_vectors = unliked_posts_df['title'].apply(lambda x: get_vector(model, x)).tolist()

    # Tính toán độ tương đồng giữa các bài viết chưa thích và các bài viết đã thích
    scores = []
    for unliked_vector in unliked_vectors:
        similarities = [cosine_similarity([unliked_vector], [liked_vector])[0][0] for liked_vector in liked_vectors]
        average_similarity = np.mean(similarities)
        scores.append(average_similarity)

    unliked_posts_df['similarity_score'] = scores

    # Lọc các bài viết chưa thích có độ tương đồng >= min_similarity
    filtered_posts = unliked_posts_df[unliked_posts_df['similarity_score'] >= min_similarity]

    # Sắp xếp các bài viết chưa thích theo điểm tương đồng và chọn top_n
    recommended_posts = filtered_posts.sort_values(by='similarity_score', ascending=False).head(top_n)

    return recommended_posts
