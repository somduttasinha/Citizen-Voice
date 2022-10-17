import dash
import pandas as pd
import plotly.express as px
from dash import Dash, dcc, html, Output, Input
from dash.dependencies import Input, Output
import json
import plotly.io as pio
import dash_bootstrap_components as dbc


pio.renderers.default = "browser"
# Building components
stylesheets = [dbc.themes.SOLAR] # change this when we have our own CSS

app = Dash(__name__, external_stylesheets=stylesheets)
title = dcc.Markdown(children='')
user_input = dbc.Input(value="# Hello World - this is the London population evolution by borough")
graph = dcc.Graph(figure='') # this is the graph that we should be updating

app.layout = dbc.Container([title, user_input])

mac_path = "/Users/somduttasinha/Google Drive/Work/CV/Citizen-Voice/citizenvoice/dashboard/concept/resources/census" \
           "-historic-population-borough.csv "
windows_path = "resources/census-historic-population-borough.csv"
df = pd.read_csv(windows_path)

year_to_col_name_mapping = {}

for colname in df.columns[2:]:
    year_to_col_name_mapping[colname[-4:]] = colname


def initialise_graph(initial_year=2011):
    fig = px.choropleth_mapbox(population_2011,
                               locations="id",
                               geojson=london_boroughs,
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



'''
app.layout = html.Div([
    html.H1("London population evolution by borough"),
    dcc.Dropdown(
        id="select-year",
        options=year_to_col_name_mapping,
        multi=False,
        value=2011, # default value?
        style={'width': "40%"}
    ),

    # the div below is where our output graph will eventually lie
    html.Div(id='output-container',
             children=[]),

    dcc.Graph(id='choropleth-map',
              figure={})
])
'''

@app.callback(
    Output(title, component_property='children'),
    Input(user_input, component_property='value')
)
def update_title(user_input):
    return user_input # this will be assigned to the output

'''
@app.callback(
    [Output(component_id='output-container', component_property='children'),
     Output(component_id='choropleth-map', component_property='figure')],
    [Input(component_id='select-year', component_property='value')]
)
def update_graph(selected_option):
    print("The user selected ", selected_option)
'''


def run():
    if __name__ == '__main__':
        app.run_server(debug=True)


run()