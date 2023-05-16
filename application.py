import psycopg2
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, send_from_directory
from flask_restx import Api, Resource, reqparse
import psycopg2.extras
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler


application = app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)
app.secret_key = 'APPSECRET'

DB_HOST = "localhost"
DB_NAME = "themes"
DB_USER = "floho"
DB_PASS = "postgres"

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)

@app.route('/', defaults={'path': ''})
def index(path):
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor) 
    s = "SELECT * FROM Theme"
    cur.execute(s)
    list_products = cur.fetchall()
    return send_from_directory(app.static_folder, 'index.html', list_products = list_products)

api.add_resource(HelloApiHandler, '/flask/hello')

@app.route('/add_product', methods=['POST'])
def add_product():
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    if request.method == 'POST':
        name = request.form['name']
        thumbnailURL = request.form['thumbnailURL']
        sourceURL = request.form['sourceURL']
        category = request.form['category']
        cur.execute("INSERT INTO Theme (name, thumbnailURL, sourceURL, category) VALUES (%s,%s,%s,%s)", (name, thumbnailURL, sourceURL, category))
        conn.commit()
        flash('Product Added Successfully')
        return redirect(url_for('index'))

@app.route('/edit/<id>', methods = ['POST', 'GET'])
def get_product(id):
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    cur.execute('SELECT * FROM Theme WHERE id = %s', (id,))
    data = cur.fetchall()
    cur.close()
    print(data[0])
    return render_template('edit.html', theme = data[0])

@app.route('/update/<id>', methods=['POST'])
def update_product(id):
    if request.method == 'POST':
        name = request.form['name']
        thumbnailurl = request.form['thumbnailurl']
        sourceurl = request.form['sourceurl']
        category = request.form['category']
        cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cur.execute("""
        UPDATE Theme
        SET name = %s,
            thumbnailurl = %s,
            sourceurl = %s,
            category = %s
        WHERE id = %s
        """, (name, thumbnailurl, sourceurl, category, id))
        flash('Product Updated Successfully')
        conn.commit()
        return redirect(url_for('index'))

@app.route('/delete/<string:id>', methods = ['POST', 'GET'])
def delete_product(id):
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute('DELETE FROM Theme WHERE id = {0}'.format(id))
    conn.commit()
    flash('Product Removed Successfully')
    return redirect(url_for('index'))


@app.route('/allproducts')
def all_products():
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor) 
    s = "SELECT * FROM Theme"
    cur.execute(s)
    list_products = cur.fetchall()

    return jsonify(list_products)

        
        
@app.route('/product/<int:count>/<int:start>')
def products(count, start):
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    s = "SELECT * FROM Theme LIMIT %s OFFSET %s"
    cur.execute(s, (count, start - 1))
    list_products = cur.fetchall()

    if not list_products:
        return jsonify([])
    else:
        return jsonify(list_products)


