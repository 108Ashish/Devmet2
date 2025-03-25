import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity # type: ignore
from sklearn.feature_extraction.text import CountVectorizer # type: ignore
from prisma import Prisma

class RecommendationModel:
    def __init__(self):
        self.prisma = Prisma()
        self.vectorizer = CountVectorizer(tokenizer=lambda x: x.split(','))

    async def preprocess_data(self):
        await self.prisma.connect()
        posts = await self.prisma.post.find_many()
        self.data = pd.DataFrame(posts)
        self.data['Tech'] = self.data['Tech'].apply(lambda x: ','.join(x).lower())
        self.tech_matrix = self.vectorizer.fit_transform(self.data['Tech'])

    async def get_recommendations(self, user_tech_stack):
        user_tech_vector = self.vectorizer.transform([user_tech_stack.lower()])
        similarities = cosine_similarity(user_tech_vector, self.tech_matrix).flatten()
        recommendations = self.data.iloc[similarities.argsort()[::-1]]
        return recommendations

# Example usage
if __name__ == "__main__":
    import asyncio

    async def main():
        model = RecommendationModel()
        await model.preprocess_data()
        #user_tech_stack