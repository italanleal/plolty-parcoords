import pandas as pd
from dash import Dash, dcc, html
from parcoords.parcoords import Parallel

df = pd.read_csv('./parcoords.csv')

app = Dash(__name__)


app.layout = html.Div([
    Parallel(
        id='parcoords',
        data=df,
        color_encode_columns = ["SEXO", "N_AVALIACOES"],
        width=800,
        height=600
    )
    
])

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True)