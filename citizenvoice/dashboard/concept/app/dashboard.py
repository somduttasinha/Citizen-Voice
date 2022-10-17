import dash
import pandas as pd
import plotly.express as px
from dash import Dash, dcc, html, Output, Input
from dash.dependencies import Input, Output
import json
import plotly.io as pio
import dash_bootstrap_components as dbc
from citizenvoice.dashboard.concept.graph_utils.graph_generator import Generator

mac_path = "/Users/somduttasinha/Google Drive/Work/CV/Citizen-Voice/citizenvoice/dashboard/concept/resources/census" \
           "-historic-population-borough.csv "
windows_path = "../resources/census-historic-population-borough.csv"
df = pd.read_csv(windows_path)
df = df.drop([33, 34, 35])

year_to_col_name_mapping = {}

for colname in df.columns[2:]:
    year_to_col_name_mapping[colname[-4:]] = colname

pio.renderers.default = "browser"
# Building components
stylesheets = [dbc.themes.SOLAR]  # change this when we have our own CSS

app = Dash(__name__, external_stylesheets=stylesheets)
title = dcc.Markdown(children='# London population evolution by borough')
input_year = dcc.Dropdown(id="select-year",
                          options=year_to_col_name_mapping,
                          multi=False,
                          value=2011,
                          style={'width': "40%"})

graph = dcc.Graph(id='choropleth-map',
                  figure={})  # this is the graph that we should be updating

app.layout = dbc.Container([title, input_year, graph])


@app.callback(
    [Output(graph, component_property='figure')],
    [Input(input_year, component_property='value')]
)
def update_graph(year):

    print(year)
    generator = Generator(df)
    fig = generator.create_choropleth(
        geojson_file="../resources/london_boroughs.json",
        column_name="Persons-"+str(year)
    )
    return fig


def run():
    if __name__ == '__main__':
        app.run_server(debug=True)


run()
