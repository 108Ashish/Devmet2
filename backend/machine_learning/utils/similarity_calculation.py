from sklearn.metrics.pairwise import cosine_similarity # type: ignore
from sklearn.feature_extraction.text import CountVectorizer # type: ignore

def calculate_similarity(user_tech_stack, tech_matrix, vectorizer):
    user_tech_vector = vectorizer.transform([user_tech_stack.lower()])
    similarities = cosine_similarity(user_tech_vector, tech_matrix).flatten()
    return similarities