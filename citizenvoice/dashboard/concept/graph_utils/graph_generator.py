import pandas as pd
import plotly.express as px
from citizenvoice.dashboard.concept.data_utils.data_parser import Parser
import json


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
        geojson = json.load(open(geojson_file, "r"))
        fig = px.choropleth_mapbox(map_df,
                                   locations="id",
                                   geojson=geojson,
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
        fig.show()
        return fig


geojson_path = "../resources/london_boroughs.json"
windows_path = "../resources/census-historic-population-borough.csv"
df = pd.read_csv(windows_path)
df = df.drop([33, 34, 35])

combined_df = Parser(df).combine_df_with_geojson(geojson_file="../resources/london_boroughs.json")
filtered_df = combined_df[["Area Name", "id", "Persons-2011"]]
print(filtered_df)

fig = px.choropleth_mapbox(filtered_df,
                           locations="id",
                           geojson=json.load(open("../resources/london_boroughs.json", "r")),
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
fig.show()

generator = Generator(combined_df)

# generator.create_choropleth(geojson_file=geojson_path, column_name="Persons-2011").show()
