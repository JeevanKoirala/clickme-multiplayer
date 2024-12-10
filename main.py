from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory storage (use a database for production)
scoreboard = []

@app.route('/add_score', methods=['POST'])
def add_score():
    data = request.json
    scoreboard.append(data)
    return jsonify({"message": "Score added!", "scoreboard": scoreboard}), 200

@app.route('/get_scores', methods=['GET'])
def get_scores():
    sorted_scores = sorted(scoreboard, key=lambda x: x['score'], reverse=True)
    return jsonify(sorted_scores), 200

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory storage (use a database for production)
scoreboard = []

@app.route('/add_score', methods=['POST'])
def add_score():
    data = request.json
    scoreboard.append(data)
    return jsonify({"message": "Score added!", "scoreboard": scoreboard}), 200

@app.route('/get_scores', methods=['GET'])
def get_scores():
    sorted_scores = sorted(scoreboard, key=lambda x: x['score'], reverse=True)
    return jsonify(sorted_scores), 200

if __name__ == '__main__':
    app.run(debug=True)
