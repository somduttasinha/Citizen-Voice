import dash
import pandas as pd
import plotly.express as px
from dash import Dash, dcc, html, Output, Input
from dash.dependencies import Input, Output
import json
import plotly.io as pio
import dash_bootstrap_components as dbc
from citizenvoice.dashboard.graph.generator import Generator


path = ""


pio.renderers.default = "browser"
# Building components
stylesheets = [dbc.themes.CYBORG]  # change this when we have our own CSS

app = Dash(__name__, external_stylesheets=stylesheets)
title = dcc.Markdown(children='# Citizen Voice Dashboard')
project_credits = dcc.Markdown(children='Citizen Voice Project')


graph = dcc.Graph(id='choropleth-map',
                  figure={},
                  style={
                      "margin": "0"
                  }
                  )  # this is the graph that we should be updating

# app.layout = dbc.Container([title, input_year, graph])
app.layout = dbc.Container([
    ]
)


@app.callback(
    Output(graph, 'figure'),
    Input(input_year, component_property='value')
)
def update_graph(year):
    return None

def run():
    if __name__ == '__main__':
        app.run_server(debug=True)


run()