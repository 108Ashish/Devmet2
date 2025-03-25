from models.recommendation_model import RecommendationModel
import asyncio

async def main():
    model = RecommendationModel()
    await model.preprocess_data()
    user_tech_stack = "Node.js, React, Prisma"
    recommendations = await model.get_recommendations(user_tech_stack)
    print(recommendations)

if __name__ == "__main__":
    asyncio.run(main())