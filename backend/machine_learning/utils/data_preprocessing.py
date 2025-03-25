import pandas as pd

def preprocess_tech_stack(data):
    data['Tech'] = data['Tech'].apply(lambda x: ','.join(x).lower())
    return data