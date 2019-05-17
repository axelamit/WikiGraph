from flask import Flask, render_template, request, redirect, Response, url_for
import static.scraper as scraper

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/receiver', methods = ['POST'])
def worker():
  search = request.form['search']
  depth = request.form['depth']
  scraper.scrape(search, depth)
  return 'None'

@app.route('/')
def index():
    return render_template('network.html')

if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True, host='0.0.0.0')
