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

app = dash.Dash(__name__, external_stylesheets=stylesheets)
title = dcc.Markdown(children='')
input = dbc.Input(value = "# Hello World - this is the London population evolution by borough")
app.layout = dbc.Container([title, input])

mac_path = "/Users/somduttasinha/Google Drive/Work/CV/Citizen-Voice/citizenvoice/dashboard/concept/resources/census-historic-population-borough.csv"
windows_path = "resources/census-historic-population-borough.csv"
df = pd.read_csv(mac_path)

year_to_col_name_mapping = {}

for colname in df.columns[2:]:
    year_to_col_name_mapping[colname[-4:]] = colname



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
    Input(input, component_property='value')
)
def update_titlte(user_input):
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