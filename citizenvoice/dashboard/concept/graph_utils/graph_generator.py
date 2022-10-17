import pandas as pd
import plotly.express


class Generator:
    def __init__(self, df: pd.DataFrame):
        self.dataframe = df
