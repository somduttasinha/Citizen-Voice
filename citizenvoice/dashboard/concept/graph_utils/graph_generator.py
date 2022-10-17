import pandas as pd
import plotly.express as px
from citizenvoice.dashboard.concept.data_utils.data_parser import Parser


class Generator:
    def __init__(self, df: pd.DataFrame):
        self.dataframe = df

    def create_choropleth(self, geojson_file):  # eventually use kwargs to configure graph settings
        '''
        Uses geojson file
        '''

        parser = Parser(self.dataframe)
        df = parser.combine_df_with_geojson(geojson_file)

        fig = px.choropleth_mapbox(population_2011,
                                   locations="id",
                                   geojson=geojson_file,
                                   color="Persons-2011",
                                   hover_name="Area Name",
                                   mapbox_style="carto-positron",
                                   center={
                                       'lat': 51.5,
                                       'lon': -0.11
                                   },
                                   zoom=9,
                                   opacity=1
                                   )
        return fig
