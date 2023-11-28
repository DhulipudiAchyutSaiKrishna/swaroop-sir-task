from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
import pandas as pd
import json

app = Flask(__name__)

# Function to process uploaded CSV files
def process_uploaded_csv(file):
    if file and file.filename.endswith('.csv'):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return filename

# Function to process uploaded JSON files
def process_uploaded_json(file):
    if file and file.filename.endswith('.json'):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return filename

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        uploaded_file = request.files['file']
        if uploaded_file:
            filename = None
            if uploaded_file.filename.endswith('.csv'):
                filename = process_uploaded_csv(uploaded_file)
            elif uploaded_file.filename.endswith('.json'):
                filename = process_uploaded_json(uploaded_file)

            if filename:
                # Read and display the data
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                if filename.endswith('.csv'):
                    df = pd.read_csv(file_path)
                elif filename.endswith('.json'):
                    with open(file_path, 'r') as json_file:
                        data = json.load(json_file)
                        df = pd.DataFrame(data)

                # Display the data in a table
                return render_template('index.html', tables=[df.to_html(classes='data')])

    return render_template('index.html', tables=[])

if __name__ == '__main__':
    app.config['UPLOAD_FOLDER'] = 'uploads'
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)

# from flask import Flask, render_template, request
# from werkzeug.utils import secure_filename
# import os
# import pandas as pd
# import json

# app = Flask(__name__)

# # Function to process uploaded CSV files
# def process_uploaded_csv(file):
#     if file and file.filename.endswith('.csv'):
#         filename = secure_filename(file.filename)
#         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#         return filename

# # Function to process uploaded JSON files
# def process_uploaded_json(file):
#     if file and file.filename.endswith('.json'):
#         filename = secure_filename(file.filename)
#         file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#         return filename

# @app.route('/', methods=['GET', 'POST'])
# def index():
#     if request.method == 'POST':
#         uploaded_file = request.files['file']
#         if uploaded_file:
#             filename = None
#             if uploaded_file.filename.endswith('.csv'):
#                 filename = process_uploaded_csv(uploaded_file)
#             elif uploaded_file.filename.endswith('.json'):
#                 filename = process_uploaded_json(uploaded_file)

#             if filename:
#                 # Read and display the data
#                 file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#                 if filename.endswith('.csv'):
#                     df = pd.read_csv(file_path)
#                 elif filename.endswith('.json'):
#                     with open(file_path, 'r') as json_file:
#                         data = json.load(json_file)
#                         df = pd.DataFrame(data)

#                 # Display the data in a table
#                 return render_template('index.html', tables=[df.to_html(classes='data', escape=False)])

#     return render_template('index.html', tables=[])

# if __name__ == '__main__':
#     app.config['UPLOAD_FOLDER'] = 'uploads'
#     os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
#     app.run(debug=True)
