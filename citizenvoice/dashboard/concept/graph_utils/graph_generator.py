import pandas as pd
import plotly.express as px
from citizenvoice.dashboard.concept.data_utils.data_parser import Parser


class Generator:
    def __init__(self, df: pd.DataFrame):
        self.dataframe = df

    def create_choropleth(self, geojson_file, column_name):  # eventually use kwargs to configure graph settings
        """
        Uses geojson file provided to create a choropleth map using the statistic given by column_name
        """

        parser = Parser(self.dataframe)
        df = parser.combine_df_with_geojson(geojson_file)
        map_df = df[["Area Name", column_name, "id"]]
        fig = px.choropleth_mapbox(map_df,
                                   locations="id",
                                   geojson=geojson_file,
                                   color=column_name,
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
